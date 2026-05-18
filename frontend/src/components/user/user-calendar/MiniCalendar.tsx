import { type FunctionComponent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { CalendarService, type CalendarEvent } from '../../../service/CalendarService';
import { SkeletonBlock } from '../../general/Skeleton';

interface MiniCalendarProps {
  currentDate: Date;
  events: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  loading: boolean;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onDateChange?: (date: Date) => void;
  onDateClick?: (date: Date, events: CalendarEvent[]) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
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

const getEventIcon = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'booking':
      return 'ic:round-calendar-today';
    case 'billing':
      return 'ic:round-receipt';
    case 'move-in':
      return 'ic:round-home';
    case 'move-out':
      return 'ic:round-logout';
    default:
      return 'ic:round-circle';
  }
};

const MiniCalendar: FunctionComponent<MiniCalendarProps> = ({
  currentDate,
  events,
  upcomingEvents,
  loading,
  onPrevMonth,
  onNextMonth,
  onDateChange,
  onDateClick,
  onEventClick,
}) => {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'short',
  });
  const yearStr = currentDate.getFullYear().toString();

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(year, monthIndex);
    onDateChange?.(newDate);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (selectedYear: number) => {
    const newDate = new Date(selectedYear, month);
    onDateChange?.(newDate);
    setShowYearDropdown(false);
  };

  const yearRange = Array.from({ length: 21 }, (_, i) => year - 10 + i);

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    const clickedDate = new Date(year, month, day);
    const dayEvents = getEventsForDay(day);
    onDateClick?.(clickedDate, dayEvents);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Mini calendar */}
      <div className="rounded-xl bg-white border border-whitesmoke-200 flex flex-col items-center p-4 gap-4 dark:bg-[#101111] dark:border-[#303331]">
        {/* Nav */}
        <div className="self-stretch flex items-center gap-3">
          <button
            onClick={onPrevMonth}
            className="rounded-full p-2 hover:bg-whitesmoke-100 transition-colors dark:hover:bg-[#1f2022] cursor-pointer"
          >
            <Icon icon="ic:round-chevron-left" className="h-5 w-5" />
          </button>
          <div className="flex-1 flex gap-2 relative">
            {/* Month Dropdown */}
            <div className="flex-1 relative">
              <button
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                className="w-full rounded-md border border-gainsboro flex items-center p-2 gap-1 text-xs hover:bg-gray-50 dark:border-[#303331] dark:bg-[#141515] dark:text-[#edf6f4] dark:hover:bg-[#1f2022] cursor-pointer"
              >
                <span className="flex-1">{monthName}</span>
                <Icon
                  icon="ic:round-keyboard-arrow-down"
                  className={`h-4 w-4 transition-transform ${
                    showMonthDropdown ? 'rotate-180' : ''
                  } cursor-pointer`}
                />
              </button>
              {showMonthDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gainsboro rounded-md z-10 shadow-lg max-h-48 overflow-y-auto dark:bg-[#141515] dark:border-[#303331]">
                  {MONTH_SHORT.map((m, idx) => (
                    <button
                      key={m}
                      onClick={() => handleMonthSelect(idx)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 ${
                        idx === month
                          ? 'bg-lightcyan-100 text-teal-200 font-bold dark:bg-[#17362f] dark:text-[#72cbb8]'
                          : ''
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
                className="w-full rounded-md border border-gainsboro flex items-center p-2 gap-1 text-xs hover:bg-gray-50 dark:border-[#303331] dark:bg-[#141515] dark:text-[#edf6f4] dark:hover:bg-[#1f2022] cursor-pointer"
              >
                <span className="flex-1">{yearStr}</span>
                <Icon
                  icon="ic:round-keyboard-arrow-down"
                  className={`h-4 w-4 transition-transform ${showYearDropdown ? 'rotate-180' : ''} cursor-pointer`}
                />
              </button>
              {showYearDropdown && (
                <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-gainsboro rounded-md z-10 shadow-lg max-h-48 overflow-y-auto dark:bg-[#141515] dark:border-[#303331]">
                  {yearRange.map((y) => (
                    <button
                      key={y}
                      onClick={() => handleYearSelect(y)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 ${
                        y === year
                          ? 'bg-lightcyan-100 text-teal-200 font-bold dark:bg-[#17362f] dark:text-[#72cbb8]'
                          : ''
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
            onClick={onNextMonth}
            className="rounded-full p-2 hover:bg-whitesmoke-100 transition-colors dark:hover:bg-[#1f2022] cursor-pointer"
          >
            <Icon icon="ic:round-chevron-right" className="h-5 w-5" />
          </button>
        </div>

        {/* Day labels */}
        <div className="self-stretch flex flex-col gap-0.5 text-center">
          <div className="grid grid-cols-7 text-xs text-gray font-inter">
            {DAYS.map((d) => (
              <div key={d} className="flex items-center justify-center py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="flex flex-col gap-0.5 text-xs text-black">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-0.5">
                {week.map((day, di) => {
                  const isTodayDay = isCurrentMonth && day === today.getDate() && day !== null;
                  return (
                    <button
                      key={di}
                      onClick={() => handleDateClick(day)}
                      disabled={day === null}
                      className={[
                        'rounded-md flex items-center justify-center p-2 aspect-square transition-colors dark:text-[#edf6f4]',
                        day === null
                          ? 'cursor-default opacity-40'
                          : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1f2022]',
                        isTodayDay
                          ? 'bg-lightcyan-100 text-teal-200 font-bold hover:bg-lightcyan-200 dark:bg-[#17362f] dark:text-[#72cbb8] dark:hover:bg-[#1c473d]'
                          : '',
                      ].join(' ')}
                    >
                      {day ?? ''}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming events - moved outside mini calendar container */}
      <div className="flex flex-col gap-2 cursor-pointer">
        <b className="text-num-14 font-bold text-darkslategray-100 font-inter">Upcoming Events</b>
        {loading ? (
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-12 w-full rounded-num-8" />
            <SkeletonBlock className="h-12 w-full rounded-num-8" />
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="flex flex-col gap-2">
            {upcomingEvents.map((event) => (
              <button
                key={event.referenceId}
                onClick={() => {
                  // Click on upcoming event should show day popup with all events for that date
                  const eventDate = new Date(event.date);
                  const dayEvents = getEventsForDay(eventDate.getDate());
                  onDateClick?.(eventDate, dayEvents);
                }}
                className="w-full h-12 rounded-num-8 border border-whitesmoke-200 box-border overflow-hidden flex items-center p-3 gap-2 hover:bg-whitesmoke-200 transition-colors cursor-pointer font-inter dark:border-[#303331] dark:bg-[#101111] dark:hover:bg-[#1f2022]"
              >
                <Icon icon={getEventIcon(event.type)} className="h-6 w-6 shrink-0 text-teal" />
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2">
                  <div className="text-num-14 font-medium text-dimgray truncate">{event.title}</div>
                  <div className="text-xs text-dimgray shrink-0">{formatEventDate(event.date)}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs text-dimgray">No upcoming events</div>
        )}
      </div>
    </div>
  );
};

export default MiniCalendar;
