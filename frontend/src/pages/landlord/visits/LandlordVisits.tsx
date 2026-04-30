import type { FunctionComponent } from 'react';
import { useState, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
import LandlordLayout, { type BreadcrumbItem } from '../../../components/landlord/LandlordLayout';
import SetAvailableTime from '../../../components/landlord/VisitsSections/SetAvailableTime';
import PortalPopup from '../../../components/landlord/VisitsSections/PortalPopup';
import UpcomingVisitsSection from '../../../components/landlord/VisitsSections/UpcomingVisitsSection';
import VisitRequestsSection from '../../../components/landlord/VisitsSections/VisitRequestsSection';
import LandlordDayEventsPopout, { type VisitSlot } from '../../../components/landlord/VisitsSections/LandlordDayEventsPopout';
import LandlordEventPopout from '../../../components/landlord/VisitsSections/LandlordEventPopout';

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
  
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Fetch visit data from API (currently empty, waiting for backend integration)
  const allVisits: VisitSlot[] = [];
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const openSetAvailableTime = useCallback(() => {
    setSetAvailableTimeOpen(true);
  }, []);

  const closeSetAvailableTime = useCallback(() => {
    setSetAvailableTimeOpen(false);
  }, []);

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

  const handleUpcomingVisitClick = useCallback((visitId: string) => {
    const visit = allVisits.find(v => v.id === visitId);
    if (visit) {
      openEventPopout(visit);
    }
  }, [allVisits]);

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();

  const getVisitsForDay = (day: number) => {
    const dayOfWeek = new Date(year, month, day).getDay();
    return allVisits.filter(visit => visit.dayOfWeek === dayOfWeek);
  };

  // Transform visits to show all upcoming visits
  const upcomingVisits = allVisits.map((visit, index) => ({
    id: visit.id,
    propertyName: visit.visitorName,
    visitCount: 1,
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

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accept request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Reject request:', requestId);
  };

  return (
    <LandlordLayout activeSidebarItem="visits" breadcrumbs={breadcrumbs}>
      <div className="flex flex-col w-full gap-4 sm:gap-6">
        {/* Header Section - Large Title with Divider */}
        <div className="flex flex-col gap-3 px-0">
          <b className="relative text-xl sm:text-num-24 leading-8 text-gray font-inter shrink-0">
            My Calendar
          </b>
          <div className="h-0.5 bg-whitesmoke-200" />
        </div>

        {/* Main Content - Two Column Layout - Responsive */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
            {/* Set Available Time Slots Button */}
            <button
              type="button"
              onClick={openSetAvailableTime}
              className="w-full rounded-lg bg-lightcyan text-teal font-semibold py-2 sm:py-3 px-3 sm:px-4 hover:opacity-90 transition-opacity border-none cursor-pointer font-inter text-sm sm:text-base whitespace-normal"
            >
              Set Available Time Slots
            </button>

            {/* Mini Calendar */}
            <div className="rounded-xl bg-white border border-whitesmoke-200 flex flex-col items-center p-4 gap-4 w-full overflow-hidden">
              {/* Nav */}
              <div className="self-stretch flex items-center gap-3">
                <button
                  onClick={handlePrevMonth}
                  className="rounded-full p-2 hover:bg-whitesmoke-100 transition-colors"
                >
                  <Icon icon="ic:round-chevron-left" className="h-5 w-5" />
                </button>
                <div className="flex-1 flex gap-2 relative">
                  {/* Month Dropdown */}
                  <div className="flex-1 relative">
                    <button
                      onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                      className="w-full rounded-md border border-gainsboro flex items-center p-2 gap-1 text-xs hover:bg-gray-50"
                    >
                      <span className="flex-1">{MONTHS[month].substring(0, 3)}</span>
                      <Icon
                        icon="ic:round-keyboard-arrow-down"
                        className={`h-4 w-4 transition-transform ${
                          showMonthDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {showMonthDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gainsboro rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                        {MONTHS.map((m, idx) => (
                          <button
                            key={m}
                            onClick={() => handleMonthSelect(idx)}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 ${
                              idx === month ? 'bg-lightcyan-100 font-bold' : ''
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Year Dropdown */}
                  <div className="flex-1 relative">
                    <button
                      onClick={() => setShowYearDropdown(!showYearDropdown)}
                      className="w-full rounded-md border border-gainsboro flex items-center p-2 gap-1 text-xs hover:bg-gray-50"
                    >
                      <span className="flex-1">{year}</span>
                      <Icon
                        icon="ic:round-keyboard-arrow-down"
                        className={`h-4 w-4 transition-transform ${
                          showYearDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {showYearDropdown && (
                      <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-gainsboro rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                        {Array.from({ length: 21 }, (_, i) => year - 10 + i).map((y) => (
                          <button
                            key={y}
                            onClick={() => handleYearSelect(y)}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 ${
                              y === year ? 'bg-lightcyan-100 font-bold' : ''
                            }`}
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
                  className="rounded-full p-2 hover:bg-whitesmoke-100 transition-colors"
                >
                  <Icon icon="ic:round-chevron-right" className="h-5 w-5" />
                </button>
              </div>

              {/* Day labels */}
              <div className="self-stretch flex flex-col gap-0.5 text-center">
                <div className="grid grid-cols-7 text-xs text-gray font-inter">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div key={d} className="flex items-center justify-center py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Date grid */}
                <div className="flex flex-col gap-0.5 text-xs text-black">
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
                                day === null ? 'cursor-default' : 'cursor-pointer hover:bg-gray-100',
                                isTodayDay
                                  ? 'bg-lightcyan-100 text-teal-200 font-bold hover:bg-lightcyan-200'
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
            <div className="bg-white rounded-num-8 p-3 sm:p-4 border border-whitesmoke-200 w-full">
              <UpcomingVisitsSection visits={upcomingVisits} onVisitClick={handleUpcomingVisitClick} />
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-w-0">
            {/* Calendar Header - Month and Year only */}
            <div className="flex items-center justify-center px-2">
              <h2 className="text-xl sm:text-2xl font-bold text-black font-inter">
                {MONTHS[month]} {year}
              </h2>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-num-8 p-3 sm:p-6 border border-whitesmoke-200 flex-1 min-w-0 overflow-auto">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4 text-center text-xs sm:text-num-14 font-semibold text-dimgray font-inter">
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
                      className={`min-h-20 sm:min-h-28 p-1 sm:p-3 rounded border transition-colors text-xs sm:text-base ${
                        day === null
                          ? 'bg-whitesmoke-100 border-whitesmoke-200 cursor-default'
                          : day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                          ? 'bg-lightcyan border-teal'
                          : 'bg-white border-whitesmoke-200 cursor-default'
                      }`}
                    >
                      {day && (
                        <>
                          <div className="text-xs sm:text-num-14 font-semibold text-dimgray font-inter mb-1">
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
                                <div className="truncate font-semibold text-xs">{visit.visitorName}</div>
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
          requests={[]}
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
          <SetAvailableTime onClose={closeSetAvailableTime} />
        </PortalPopup>
      )}

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
          <LandlordEventPopout
            event={selectedEvent}
            onClose={closeEventPopout}
          />
        </PortalPopup>
      )}
    </LandlordLayout>
  );
};

export default Visits;
