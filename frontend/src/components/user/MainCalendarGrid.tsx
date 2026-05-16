import { type FunctionComponent, useEffect, useState } from 'react';
import { CalendarService, type CalendarEvent } from '../../service/CalendarService';

interface MainCalendarGridProps {
  currentDate: Date;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

const getEventColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'booking':
      return 'from-[#c00f0f] to-[#e44f4f]';
    case 'billing':
      return 'from-[#ff9800] to-[#ffb74d]';
    case 'move-in':
      return 'from-[#4caf50] to-[#81c784]';
    case 'move-out':
      return 'from-[#2196f3] to-[#64b5f6]';
    default:
      return 'from-[#c00f0f] to-[#e44f4f]';
  }
};

const MainCalendarGrid: FunctionComponent<MainCalendarGridProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onEventClick,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await CalendarService.getCalendarEvents(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
        );
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to load calendar events:', error);
      }
    };

    fetchEvents();
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { day: number; inactive: boolean }[] = [];

  // Previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, inactive: true });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, inactive: false });
  }

  // Next month's days
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, inactive: true });
  }

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

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-full rounded-[14px] overflow-hidden flex flex-col bg-white">
      {/* Month header */}
      <div className="flex items-center justify-center px-4 py-4 border-b border-whitesmoke-200">
        <div className="text-base font-semibold tracking-tight">{monthName}</div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 bg-blue-50 text-dimgray text-[9px] font-medium">
        {DAYS.map((d) => (
          <div key={d} className="border border-whitesmoke-200 p-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 flex-1">
        {calendarDays.map((item, i) => {
          const { day, inactive } = item;
          const isTodayDay = isCurrentMonth && day === today.getDate() && !inactive;
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={i}
              className={[
                'border border-whitesmoke-200 flex flex-col items-start p-1 gap-1 min-h-[60px] sm:min-h-[80px] md:min-h-[100px]',
                inactive
                  ? 'bg-whitesmoke-200 text-dimgray'
                  : isTodayDay
                    ? 'bg-lightcyan-200 text-teal-100'
                    : 'bg-white',
              ].join(' ')}
            >
              <b className="text-[10px] sm:text-xs">{day}</b>
              <div className="w-full flex flex-col gap-0.5">
                {dayEvents.map((event) => (
                  <button
                    key={event.referenceId}
                    onClick={() => onEventClick?.(event)}
                    className="w-full rounded-sm bg-blue-50 py-0.5 px-1 opacity-80 hover:opacity-100 transition-opacity text-left cursor-pointer"
                  >
                    <b
                      className={`text-[9px] sm:text-[11px] bg-gradient-to-b ${getEventColor(
                        event.type,
                      )} bg-clip-text text-transparent cursor-pointer`}
                    >
                      {event.title}
                    </b>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCalendarGrid;
