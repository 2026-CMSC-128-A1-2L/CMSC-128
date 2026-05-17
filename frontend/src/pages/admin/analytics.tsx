import { useEffect, useState, useMemo, useRef } from 'react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import PageBackground from '../../components/general/PageBackground';
import { Icon } from '@iconify/react';
import { motion, useInView, animate } from 'framer-motion';
import { UserService } from '../../service/UserService';
import { ReportService } from '../../service/ReportService';
import { FacilityService } from '../../service/FacilityService';

type UserData = {
  _id: string;
  userType?: string;
  createdAt?: string;
};

type ReportData = {
  _id: string;
  status: string;
};

type StatsCard = {
  value: string;
  label: string;
  iconName: string;
  numericValue: number;
};

// Build the last 7 months labels (e.g. ["Dec", "Jan", "Feb", ...])
const buildMonthLabels = (): { labels: string[]; dates: Date[] } => {
  const now = new Date();
  const labels: string[] = [];
  const dates: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString('en-US', { month: 'short' }));
    dates.push(d);
  }
  return { labels, dates };
};

const countByMonth = (
  users: UserData[],
  months: Date[],
  filterFn?: (u: UserData) => boolean,
): number[] => {
  return months.map((monthStart, i) => {
    const nextMonth =
      i < months.length - 1
        ? months[i + 1]
        : new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1);
    return users.filter((u) => {
      if (!u.createdAt) return false;
      if (filterFn && !filterFn(u)) return false;
      const created = new Date(u.createdAt);
      return created >= monthStart && created < nextMonth;
    }).length;
  });
};

const Y_STEPS = 5;

const AnimatedCounter = ({ value, duration = 1.5 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!ref.current) return;

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toLocaleString();
        }
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
};

function Analytics() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [facilityCount, setFacilityCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [usersRes, reportsRes, facilitiesRes] = await Promise.allSettled([
          UserService.getUsers({}),
          ReportService.getReports(),
          FacilityService.getFacilities(),
        ]);

        if (usersRes.status === 'fulfilled') setUsers(usersRes.value.data ?? []);
        if (reportsRes.status === 'fulfilled') setReports(reportsRes.value.data ?? []);
        if (facilitiesRes.status === 'fulfilled') {
          const facilities = facilitiesRes.value.data ?? [];
          setFacilityCount(Array.isArray(facilities) ? facilities.length : 0);
        }
      } catch {
        // Partial data is fine
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const resolvedReportCount = useMemo(
    () => reports.filter((r) => r.status === 'resolved').length,
    [reports],
  );

  const statsCards: StatsCard[] = useMemo(
    () => [
      {
        value: isLoading ? '...' : users.length.toString(),
        label: 'Total Users',
        iconName: 'solar:users-group-rounded-outline',
        numericValue: users.length,
      },
      {
        value: isLoading ? '...' : facilityCount.toString(),
        label: 'Total Facilities',
        iconName: 'fluent-emoji-flat:house',
        numericValue: facilityCount,
      },
      {
        value: isLoading ? '...' : reports.length.toString(),
        label: 'Total Reports',
        iconName: 'solar:document-text-outline',
        numericValue: reports.length,
      },
      {
        value: isLoading ? '...' : resolvedReportCount.toString(),
        label: 'Reports Handled',
        iconName: 'oui:nav-judgements',
        numericValue: resolvedReportCount,
      },
    ],
    [isLoading, users, facilityCount, reports, resolvedReportCount],
  );

  // Chart data
  const { labels: monthLabels, dates: monthDates } = useMemo(() => buildMonthLabels(), []);

  const landlordData = useMemo(
    () =>
      countByMonth(users, monthDates, (u) => u.userType === 'Landlord' || u.userType === 'Manager'),
    [users, monthDates],
  );

  const studentData = useMemo(
    () => countByMonth(users, monthDates, (u) => u.userType === 'Student'),
    [users, monthDates],
  );

  const maxVal = useMemo(() => {
    const allVals = [...landlordData, ...studentData];
    const m = Math.max(...allVals, 1);
    return Math.ceil(m / Y_STEPS) * Y_STEPS;
  }, [landlordData, studentData]);

  const yLabels = useMemo(() => {
    const labels: number[] = [];
    for (let i = Y_STEPS; i >= 0; i--) {
      labels.push(Math.round((maxVal / Y_STEPS) * i));
    }
    return labels;
  }, [maxVal]);

  const CHART_HEIGHT = 300;

  const toY = (val: number) => CHART_HEIGHT - (val / maxVal) * CHART_HEIGHT;

  const buildPath = (data: number[]): string => {
    if (data.length === 0) return '';
    const segW = 100 / Math.max(data.length - 1, 1);
    return data
      .map((v, i) => {
        const x = i * segW;
        const y = toY(v);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const landlordPath = buildPath(landlordData);
  const studentPath = buildPath(studentData);

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin activeItem="analytics" />
          <div className="flex-1 overflow-y-auto bg-transparent px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black dark:text-[#d7e0ef]">
              Analytics
            </h1>

            {/* Stats Cards */}
            <motion.div
              className="mt-6 flex gap-6 rounded-xl bg-white dark:bg-[#141515] dark:border dark:border-[#303331] p-5 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {statsCards.map((card) => (
                <motion.div
                  key={card.label}
                  className="flex flex-1 flex-col gap-1"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit'] text-[40px] font-semibold text-black dark:text-[#d7e0ef]">
                      {card.value === '...' ? (
                        '...'
                      ) : (
                        <AnimatedCounter value={card.numericValue} />
                      )}
                    </span>
                    <div className="flex h-15 w-15 items-center justify-center rounded-xl border border-[#d0d0d0] dark:border-[#303331] bg-white dark:bg-[#1f2022] shadow-[0px_2px_10px_0px_rgba(124,141,181,0.12)]">
                      <Icon
                        icon={card.iconName}
                        className="h-10 w-10 text-black dark:text-[#d7e0ef]"
                      />
                    </div>
                  </div>
                  <span className="font-['Outfit'] text-[24px] text-black dark:text-[#a4acba]">
                    {card.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Line Chart */}
            <div className="mt-8 rounded-xl bg-white dark:bg-[#141515] dark:border dark:border-[#303331] p-8 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <h2 className="font-['Outfit'] text-[30px] font-medium text-black dark:text-[#d7e0ef]">
                  Newly Joined Users
                </h2>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#4a90d9]" />
                    <span className="font-['Outfit'] text-[18px] text-black dark:text-[#d7e0ef]">
                      Landlords
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#60d394]" />
                    <span className="font-['Outfit'] text-[18px] text-black dark:text-[#d7e0ef]">
                      Students
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-white dark:bg-[#1f2022] dark:border dark:border-[#303331] px-4 py-1.5 shadow-[0px_3px_15px_0px_rgba(124,141,181,0.12)]">
                    <span className="font-['Outfit'] text-[18px] text-black dark:text-[#d7e0ef]">
                      Monthly
                    </span>
                    <Icon
                      icon="solar:alt-arrow-down-outline"
                      className="h-6 w-6 text-black dark:text-[#a4acba]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-9 flex">
                {/* Y-axis labels */}
                <div
                  className="flex flex-col justify-between pr-4"
                  style={{ height: CHART_HEIGHT }}
                >
                  {yLabels.map((label) => (
                    <span
                      key={label}
                      className="font-['Outfit'] text-[18px] text-[#7c8db5] text-right w-9"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Chart area */}
                <div className="flex flex-1 flex-col">
                  <div
                    className="relative w-full rounded-lg border border-dashed border-[#e0e0e0] dark:border-[#404341] bg-[#fafafa] dark:bg-[#1a1b1b]"
                    style={{ height: CHART_HEIGHT }}
                  >
                    {isLoading ? (
                      <p className="absolute inset-0 flex items-center justify-center font-['Outfit'] text-[16px] text-[#7c8db5] dark:text-[#a4acba]">
                        Loading chart data...
                      </p>
                    ) : (
                      <svg
                        viewBox={`0 0 100 ${CHART_HEIGHT}`}
                        preserveAspectRatio="none"
                        className="h-full w-full"
                        style={{ overflow: 'visible' }}
                      >
                        {/* Grid lines */}
                        {yLabels.map((label) => (
                          <line
                            key={`grid-${label}`}
                            x1="0"
                            y1={toY(label)}
                            x2="100"
                            y2={toY(label)}
                            stroke="#e0e0e0"
                            strokeWidth="0.3"
                            strokeDasharray="1,1"
                          />
                        ))}

                        {/* Gradient definitions */}
                        <defs>
                          <linearGradient id="landlordGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4a90d9" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#4a90d9" stopOpacity="0.05" />
                          </linearGradient>
                          <linearGradient id="studentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#60d394" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#60d394" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>

                        {/* Landlord area fill */}
                        <motion.path
                          d={landlordPath ? `${landlordPath} L 100,${CHART_HEIGHT} L 0,${CHART_HEIGHT} Z` : ''}
                          fill="url(#landlordGradient)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        {/* Landlord line */}
                        <motion.path
                          d={landlordPath}
                          fill="none"
                          stroke="#4a90d9"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                        {/* Landlord dots */}
                        {landlordData.map((v, i) => {
                          const segW = 100 / Math.max(landlordData.length - 1, 1);
                          return (
                            <motion.circle
                              key={`ld-${i}`}
                              cx={i * segW}
                              cy={toY(v)}
                              r="2"
                              fill="#4a90d9"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                            />
                          );
                        })}

                        {/* Student area fill */}
                        <motion.path
                          d={studentPath ? `${studentPath} L 100,${CHART_HEIGHT} L 0,${CHART_HEIGHT} Z` : ''}
                          fill="url(#studentGradient)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        {/* Student line */}
                        <motion.path
                          d={studentPath}
                          fill="none"
                          stroke="#60d394"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                        />
                        {/* Student dots */}
                        {studentData.map((v, i) => {
                          const segW = 100 / Math.max(studentData.length - 1, 1);
                          return (
                            <motion.circle
                              key={`sd-${i}`}
                              cx={i * segW}
                              cy={toY(v)}
                              r="2"
                              fill="#60d394"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                            />
                          );
                        })}
                      </svg>
                    )}
                  </div>

                  {/* X-axis labels */}
                  <div className="mt-3 flex justify-between px-2">
                    {monthLabels.map((m) => (
                      <span key={m} className="font-['Outfit'] text-[18px] text-[#7c8db5]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Analytics;
