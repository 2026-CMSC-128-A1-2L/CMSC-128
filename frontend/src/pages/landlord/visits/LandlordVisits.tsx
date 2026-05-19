import type { FunctionComponent } from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { api } from '../../../service/axiosInstance';
import { Icon } from '@iconify/react';
import LandlordLayout, { type BreadcrumbItem } from '../../../components/landlord/LandlordLayout';
import SetAvailableTime from '../../../components/landlord/VisitsSections/SetAvailableTime';
import PortalPopup from '../../../components/landlord/VisitsSections/PortalPopup';
import UpcomingVisitsSection from '../../../components/landlord/VisitsSections/UpcomingVisitsSection';
import VisitRequestsSection from '../../../components/landlord/VisitsSections/VisitRequestsSection';
import LandlordDayEventsPopout, {
  type VisitSlot,
} from '../../../components/landlord/VisitsSections/LandlordDayEventsPopout';
import LandlordEventPopout from '../../../components/landlord/VisitsSections/LandlordEventPopout';
import { BookingService } from '../../../service/BookingService';
import NotificationToast from '../../../components/general/NotificationToast';

const Visits: FunctionComponent = () => {
  const [isSetAvailableTimeOpen, setSetAvailableTimeOpen] = useState(false);
  const [isDayPopoutOpen, setDayPopoutOpen] = useState(false);
  const [isEventPopoutOpen, setEventPopoutOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayVisits, setSelectedDayVisits] = useState<VisitSlot[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<VisitSlot | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const MONTH_SHORT = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [allVisits, setAllVisits] = useState<VisitSlot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = useCallback(async () => {
    try {
      const response = await api.get('/api/bookings');
      if (response.data?.data) {
        // Map backend bookings to VisitSlot interface
        const mapped: VisitSlot[] = response.data.data.map((b: any) => ({
          id: b._id,
          visitorName: b.userId?.firstName ? `${b.userId.firstName} ${b.userId.lastName}` : 'Student',
          time: new Date(b.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: b.status,
          dayOfWeek: new Date(b.startDate).getDay(),
          startDate: new Date(b.startDate),
          backgroundColor: b.status === 'accepted' ? 'bg-blue-100 dark:bg-[#12342e]' : 'bg-orange-100 dark:bg-[#342e12]',
        }));
        setAllVisits(mapped);
      }
    } catch (error) {
      console.error('Failed to fetch visits:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const openSetAvailableTime = useCallback(() => {
    setSetAvailableTimeOpen(true);
  }, []);

  const closeSetAvailableTime = useCallback(() => {
    setSetAvailableTimeOpen(false);
  }, []);

  const handleAvailabilitySaved = useCallback(() => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    closeSetAvailableTime();
  }, [closeSetAvailableTime]);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  }, []);

  const handleMonthSelect = (monthIdx: number) => {
    setCurrentDate(new Date(year, monthIdx));
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (selectedYear: number) => {
    setCurrentDate(new Date(selectedYear, month));
    setShowYearDropdown(false);
  };

  const openDayPopout = useCallback((date: Date, visits: VisitSlot[]) => {
    setSelectedDate(date);
    setSelectedDayVisits(visits);
    setDayPopoutOpen(true);
  }, []);

  const closeDayPopout = useCallback(() => {
    setDayPopoutOpen(false);
    setSelectedDate(null);
    setSelectedDayVisits([]);
  }, []);

  const openEventPopout = useCallback((event: VisitSlot) => {
    setSelectedEvent(event);
    setEventPopoutOpen(true);
  }, []);

  const closeEventPopout = useCallback(() => {
    setEventPopoutOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleUpcomingVisitClick = useCallback(
    (visitId: string) => {
      const visit = allVisits.find((v) => v.id === visitId);
      if (visit) {
        openEventPopout(visit);
      }
    },
    [allVisits],
  );

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();

  const getVisitsForDay = (day: number) => {
    const targetDate = new Date(year, month, day);
    return allVisits.filter((visit) => {
      const vDate = new Date(visit.startDate);
      return visit.status === 'accepted' &&
        vDate.getDate() === targetDate.getDate() &&
        vDate.getMonth() === targetDate.getMonth() &&
        vDate.getFullYear() === targetDate.getFullYear();
    });
  };

  // Transform visits to show all upcoming visits
  const upcomingVisits = allVisits
    .filter((v) => v.status === 'accepted')
    .map((visit) => ({
      id: visit.id,
      propertyName: visit.visitorName,
      visitCount: 1,
    }));

  const pendingRequests = allVisits
    .filter((v) => v.status === 'pending')
    .map((v) => ({
      id: v.id,
      visitorName: v.visitorName,
      dateTime: `${v.startDate.toLocaleDateString()} - ${v.time}`,
      propertyName: v.propertyName,
      buildingName: 'Building',
    }));

  const getDaysForCalendar = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days: (number | null)[] = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(null);
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Next month's days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(null);
    }

    return days;
  };

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [{ label: 'Visits' }], []);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await BookingService.updateBookingStatus(requestId as any, 'accepted');
      fetchVisits();
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await BookingService.updateBookingStatus(requestId as any, 'cancelled');
      fetchVisits();
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  return (
    <LandlordLayout activeSidebarItem="visits" breadcrumbs={breadcrumbs}>
      <div className="flex flex-col w-full gap-4 sm:gap-6">
        {/* Header Section - Large Title with Divider */}
        <div className="flex flex-col gap-3 px-0">
          <b className="relative text-xl sm:text-num-24 leading-8 text-gray dark:text-[#d7e0ef] font-inter shrink-0">
            My Calendar
          </b>
          <div className="h-0.5 bg-whitesmoke-200 dark:bg-[#303331]" />
        </div>

        {/* Main Content - Two Column Layout - Responsive */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
            {/* Set Available Time Slots Button */}
            <button
              type="button"
              onClick={openSetAvailableTime}
              className="w-full rounded-lg bg-lightcyan dark:bg-[#12342e] text-teal dark:text-[#72cbb8] font-semibold py-2 sm:py-3 px-3 sm:px-4 hover:opacity-90 transition-opacity border-none cursor-pointer font-inter text-sm sm:text-base whitespace-normal"
            >
              Set Available Time Slots
            </button>

            {/* Mini Calendar */}
            <div className="rounded-xl bg-white dark:bg-[#141515] border border-whitesmoke-200 dark:border-[#303331] flex flex-col items-center p-4 gap-4 w-full overflow-hidden text-black dark:text-[#d7e0ef]">
              {/* Nav */}
              <div className="self-stretch flex items-center gap-3">
                <button
                  onClick={handlePrevMonth}
                  className="rounded-full p-2 hover:bg-whitesmoke-100 dark:hover:bg-[#1f2022] transition-colors cursor-pointer"
                >
                  <Icon icon="ic:round-chevron-left" className="h-5 w-5 dark:text-[#d7e0ef]" />
                </button>
                <div className="flex-1 flex gap-2 relative">
                  {/* Month Dropdown */}
                  <div className="flex-1 relative">
                    <button
                      onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                      className="w-full rounded-md border border-gainsboro dark:border-[#303331] flex items-center p-2 gap-1 text-xs hover:bg-gray-50 dark:hover:bg-[#1f2022] dark:bg-[#1f2022] cursor-pointer"
                    >
                      <span className="flex-1">{MONTHS[month].substring(0, 3)}</span>
                      <Icon
                        icon="ic:round-keyboard-arrow-down"
                        className={`h-4 w-4 transition-transform ${showMonthDropdown ? 'rotate-180' : ''
                          } cursor-pointer`}
                      />
                    </button>
                    {showMonthDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#141515] border border-gainsboro dark:border-[#303331] rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                        {MONTHS.map((m, idx) => (
                          <button
                            key={m}
                            onClick={() => handleMonthSelect(idx)}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 dark:hover:bg-[#1f3a34] ${idx === month ? 'bg-lightcyan-100 dark:bg-[#12342e] font-bold text-teal dark:text-[#72cbb8]' : ''
                              } cursor-pointer`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Year Dropdown */}
                  <div className="flex-1 relative cursor-pointer">
                    <button
                      onClick={() => setShowYearDropdown(!showYearDropdown)}
                      className="w-full rounded-md border border-gainsboro dark:border-[#303331] flex items-center p-2 gap-1 text-xs hover:bg-gray-50 dark:hover:bg-[#1f2022] dark:bg-[#1f2022] cursor-pointer"
                    >
                      <span className="flex-1">{year}</span>
                      <Icon
                        icon="ic:round-keyboard-arrow-down"
                        className={`h-4 w-4 transition-transform ${showYearDropdown ? 'rotate-180' : ''
                          } cursor-pointer`}
                      />
                    </button>
                    {showYearDropdown && (
                      <div className="absolute top-full right-0 left-0 mt-1 bg-white dark:bg-[#141515] border border-gainsboro dark:border-[#303331] rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                        {Array.from({ length: 21 }, (_, i) => year - 10 + i).map((y) => (
                          <button
                            key={y}
                            onClick={() => handleYearSelect(y)}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 dark:hover:bg-[#1f3a34] ${y === year ? 'bg-lightcyan-100 dark:bg-[#12342e] font-bold text-teal dark:text-[#72cbb8]' : ''
                              } cursor-pointer`}
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleNextMonth}
                  className="rounded-full p-2 hover:bg-whitesmoke-100 dark:hover:bg-[#1f2022] transition-colors cursor-pointer"
                >
                  <Icon icon="ic:round-chevron-right" className="h-5 w-5 dark:text-[#d7e0ef]" />
                </button>
              </div>

              {/* Day labels */}
              <div className="self-stretch flex flex-col gap-0.5 text-center">
                <div className="grid grid-cols-7 text-xs text-gray dark:text-[#a4acba] font-inter">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div key={d} className="flex items-center justify-center py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Date grid */}
                <div className="flex flex-col gap-0.5 text-xs text-black dark:text-[#d7e0ef]">
                  {(() => {
                    const daysInMonth = getDaysInMonth(month, year);
                    const firstDay = getFirstDayOfMonth(month, year);
                    const weeks: (number | null)[][] = [];
                    let week: (number | null)[] = new Array(firstDay).fill(null);
                    for (let day = 1; day <= daysInMonth; day++) {
                      week.push(day);
                      if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                      }
                    }
                    if (week.length > 0) {
                      while (week.length < 7) {
                        week.push(null);
                      }
                      weeks.push(week);
                    }
                    const today = new Date();
                    const isCurrentMonth =
                      today.getFullYear() === year && today.getMonth() === month;
                    return weeks.map((weekDays, wi) => (
                      <div key={wi} className="grid grid-cols-7 gap-0.5">
                        {weekDays.map((day, di) => {
                          const isTodayDay =
                            isCurrentMonth && day === today.getDate() && day !== null;
                          return (
                            <button
                              key={di}
                              onClick={() => {
                                if (day !== null) {
                                  const clickedDate = new Date(year, month, day);
                                  const dayVisits = getVisitsForDay(day);
                                  openDayPopout(clickedDate, dayVisits);
                                }
                              }}
                              disabled={day === null}
                              className={[
                                'rounded-md flex items-center justify-center p-2 aspect-square transition-colors',
                                day === null
                                  ? 'cursor-default opacity-0'
                                  : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1f2022]',
                                isTodayDay
                                  ? 'bg-teal text-white font-bold hover:bg-teal/80 dark:bg-[#72cbb8] dark:text-[#141515] dark:hover:bg-[#5db8a5]'
                                  : '',
                              ].join(' ')}
                            >
                              {day ?? ''}
                            </button>
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* Upcoming Visits Section */}
            <div className="bg-white dark:bg-[#141515] rounded-num-8 p-3 sm:p-4 border border-whitesmoke-200 dark:border-[#303331] w-full cursor-pointer">
              <UpcomingVisitsSection
                visits={upcomingVisits}
                onVisitClick={handleUpcomingVisitClick}
              />
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-w-0">
            {/* Calendar Header - Month and Year only */}
            <div className="flex items-center justify-center px-2">
              <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-[#d7e0ef] font-inter">
                {MONTHS[month]} {year}
              </h2>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white dark:bg-[#141515] rounded-num-8 p-3 sm:p-6 border border-whitesmoke-200 dark:border-[#303331] flex-1 min-w-0 overflow-auto">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4 text-center text-xs sm:text-num-14 font-semibold text-dimgray dark:text-[#a4acba] font-inter">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Calendar Days Grid - 6 weeks */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {getDaysForCalendar().map((day, idx) => {
                  const dayVisits = day ? getVisitsForDay(day) : [];
                  const hasEvents = day && dayVisits.length > 0;
                  return (
                    <div
                      key={idx}
                      className={`min-h-20 sm:min-h-28 p-1 sm:p-3 rounded border transition-colors text-xs sm:text-base ${day === null
                        ? 'bg-whitesmoke-100 border-whitesmoke-200 dark:bg-[#1f2022] dark:border-[#303331] cursor-default'
                        : day === new Date().getDate() &&
                          month === new Date().getMonth() &&
                          year === new Date().getFullYear()
                          ? 'bg-teal-50 border-teal dark:bg-[#12342e] dark:border-[#72cbb8]'
                          : 'bg-white border-whitesmoke-200 cursor-default dark:bg-[#141515] dark:border-[#303331]'
                        }`}
                    >
                      {day && (
                        <>
                          <div
                            className={`text-xs sm:text-num-14 font-semibold font-inter mb-1 ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'text-teal dark:text-[#72cbb8]' : 'text-dimgray dark:text-[#d7e0ef]'}`}
                          >
                            {day}
                          </div>
                          <div className="flex flex-col gap-0.5 sm:gap-1 text-xs">
                            {dayVisits.slice(0, 1).map((visit) => (
                              <button
                                key={visit.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEventPopout(visit);
                                }}
                                className={`w-full text-left p-0.5 sm:p-1 rounded ${visit.backgroundColor} cursor-pointer hover:opacity-80 transition-opacity overflow-hidden`}
                              >
                                <div className="truncate font-semibold text-xs cursor-pointer">
                                  {visit.visitorName}
                                </div>
                              </button>
                            ))}
                            {dayVisits.length > 1 && (
                              <div className="text-xs text-teal font-semibold">
                                +{dayVisits.length - 1}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Visit Requests Section - Full Width Below */}
        {/* TODO: put actual requests */}
        <VisitRequestsSection
          requests={pendingRequests}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      </div>

      {isSetAvailableTimeOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSetAvailableTime}
        >
          <SetAvailableTime
            onClose={closeSetAvailableTime}
            onSave={handleAvailabilitySaved}
          />
        </PortalPopup>
      )}

      <NotificationToast
        show={showNotification}
        message="Availability Time Changed"
        onClose={() => setShowNotification(false)}
      />

      {isDayPopoutOpen && selectedDate && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDayPopout}
        >
          <LandlordDayEventsPopout
            date={selectedDate}
            events={selectedDayVisits}
            onClose={closeDayPopout}
          />
        </PortalPopup>
      )}

      {isEventPopoutOpen && selectedEvent && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeEventPopout}
        >
          <LandlordEventPopout event={selectedEvent} onClose={closeEventPopout} />
        </PortalPopup>
      )}
    </LandlordLayout>
  );
};

export default Visits;