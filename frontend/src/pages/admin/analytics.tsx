import { useEffect, useState, useMemo } from 'react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import PageBackground from '../../components/general/PageBackground';
import { Icon } from '@iconify/react';
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
        value: isLoading ? '...' : users.length.toLocaleString(),
        label: 'Total Users',
        iconName: 'solar:users-group-rounded-outline',
      },
      {
        value: isLoading ? '...' : facilityCount.toLocaleString(),
        label: 'Total Facilities',
        iconName: 'fluent-emoji-flat:house',
      },
      {
        value: isLoading ? '...' : reports.length.toLocaleString(),
        label: 'Total Reports',
        iconName: 'solar:document-text-outline',
      },
      {
        value: isLoading ? '...' : resolvedReportCount.toLocaleString(),
        label: 'Reports Handled',
        iconName: 'oui:nav-judgements',
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
            <div className="mt-6 flex gap-6 rounded-xl bg-white dark:bg-[#141515] dark:border dark:border-[#303331] p-5 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]">
              {statsCards.map((card) => (
                <div key={card.label} className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Outfit'] text-[40px] font-semibold text-black dark:text-[#d7e0ef]">
                      {card.value}
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
                </div>
              ))}
            </div>

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

                        {/* Landlord line */}
                        <path
                          d={landlordPath}
                          fill="none"
                          stroke="#4a90d9"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                        {/* Landlord dots */}
                        {landlordData.map((v, i) => {
                          const segW = 100 / Math.max(landlordData.length - 1, 1);
                          return (
                            <circle
                              key={`ld-${i}`}
                              cx={i * segW}
                              cy={toY(v)}
                              r="1.2"
                              fill="#4a90d9"
                            />
                          );
                        })}

                        {/* Student line */}
                        <path
                          d={studentPath}
                          fill="none"
                          stroke="#60d394"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                        {/* Student dots */}
                        {studentData.map((v, i) => {
                          const segW = 100 / Math.max(studentData.length - 1, 1);
                          return (
                            <circle
                              key={`sd-${i}`}
                              cx={i * segW}
                              cy={toY(v)}
                              r="1.2"
                              fill="#60d394"
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
