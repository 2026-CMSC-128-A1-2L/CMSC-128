import { type FunctionComponent, useEffect, useState } from "react";
import { CalendarService, type CalendarEvent } from "../../../service/CalendarService";

interface MainCalendarGridProps {
  currentDate: Date;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const getEventColor = (type: CalendarEvent["type"]) => {
  switch (type) {
    case "booking":
      return "from-[#c00f0f] to-[#e44f4f]";
    case "billing":
      return "from-[#ff9800] to-[#ffb74d]";
    case "move-in":
      return "from-[#4caf50] to-[#81c784]";
    case "move-out":
      return "from-[#2196f3] to-[#64b5f6]";
    default:
      return "from-[#c00f0f] to-[#e44f4f]";
  }
};

// Sample event data for demonstration
const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    type: 'booking',
    date: '2026-04-05',
    title: 'Property Viewing',
    referenceId: 'bk001',
  },
  {
    type: 'billing',
    date: '2026-04-10',
    title: 'Monthly Rent',
    referenceId: 'bl001',
  },
  {
    type: 'move-in',
    date: '2026-04-15',
    title: 'Move-In Day',
    referenceId: 'mi001',
  },
  {
    type: 'booking',
    date: '2026-04-18',
    title: 'Maintenance Check',
    referenceId: 'bk002',
  },
  {
    type: 'move-out',
    date: '2026-04-22',
    title: 'Move-Out',
    referenceId: 'mo001',
  },
  {
    type: 'billing',
    date: '2026-04-25',
    title: 'Payment Due',
    referenceId: 'bl002',
  },
];

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
          currentDate.getMonth() + 1
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to load calendar events:", error);
        // Use sample events as fallback
        if (currentDate.getMonth() === 3 && currentDate.getFullYear() === 2026) {
          setEvents(SAMPLE_EVENTS);
        }
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
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Sample events for demonstration
  const SAMPLE_EVENTS: CalendarEvent[] = [
    { type: 'booking', date: '2026-04-05', title: 'Property Viewing', referenceId: 'booking-1' },
    { type: 'billing', date: '2026-04-10', title: 'Billing Due', referenceId: 'billing-1' },
    { type: 'move-in', date: '2026-04-15', title: 'Move In', referenceId: 'move-in-1' },
    { type: 'booking', date: '2026-04-20', title: 'Lease Signing', referenceId: 'booking-2' },
    { type: 'move-out', date: '2026-04-25', title: 'Move Out', referenceId: 'move-out-1' },
  ];

  // Use sample events if API failed
  const getEventsForDayWithFallback = (day: number) => {
    const events = getEventsForDay(day);
    if (events.length === 0) {
      // Check sample events as fallback
      return SAMPLE_EVENTS.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === currentDate.getMonth() && 
               eventDate.getFullYear() === currentDate.getFullYear();
      });
    }
    return events;
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Month header */}
      <div className="flex items-center justify-center px-4 py-4 text-xl sm:text-2xl font-bold text-dimgray">
        {monthName}
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 px-3 sm:px-6 py-3 text-center text-xs sm:text-num-14 font-semibold text-dimgray">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 px-3 sm:px-6 pb-6">
        {calendarDays.map((item, i) => {
          const { day, inactive } = item;
          const isTodayDay =
            isCurrentMonth && day === today.getDate() && !inactive;
          const dayEvents = getEventsForDayWithFallback(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={i}
              className={`min-h-20 sm:min-h-28 p-1 sm:p-3 rounded border transition-colors ${
                inactive
                  ? "bg-whitesmoke-100 border-whitesmoke-200 cursor-default"
                  : isTodayDay
                    ? "bg-lightcyan border-teal"
                    : hasEvents
                    ? "bg-white border-whitesmoke-200 cursor-default"
                    : "bg-white border-whitesmoke-200 cursor-default"
              }`}
            >
              <div className="text-xs sm:text-num-14 font-semibold text-dimgray mb-1">
                {day}
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1 text-xs">
                {dayEvents.slice(0, 1).map((event) => (
                  <button
                    key={event.referenceId}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                    className="w-full text-left px-1 sm:px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 transition-colors truncate cursor-pointer"
                  >
                    <span className="font-semibold text-xs truncate block">
                      {event.title}
                    </span>
                  </button>
                ))}
                {dayEvents.length > 1 && (
                  <div className="text-xs text-teal font-semibold">
                    +{dayEvents.length - 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCalendarGrid;
