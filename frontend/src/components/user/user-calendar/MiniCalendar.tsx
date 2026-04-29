import { type FunctionComponent, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { CalendarService, type CalendarEvent } from "../../../service/CalendarService";

interface MiniCalendarProps {
  currentDate: Date;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onDateChange?: (date: Date) => void;
  onDateClick?: (date: Date, events: CalendarEvent[]) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getEventIcon = (type: CalendarEvent["type"]) => {
  switch (type) {
    case "booking":
      return "ic:round-calendar-today";
    case "billing":
      return "ic:round-receipt";
    case "move-in":
      return "ic:round-home";
    case "move-out":
      return "ic:round-logout";
    default:
      return "ic:round-circle";
  }
};

const MiniCalendar: FunctionComponent<MiniCalendarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onDateChange,
  onDateClick,
  onEventClick,
}) => {
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Sample events for demonstration
  const SAMPLE_EVENTS: CalendarEvent[] = [
    { type: 'booking', date: '2026-04-05', title: 'Property Viewing', referenceId: 'booking-1' },
    { type: 'billing', date: '2026-04-10', title: 'Billing Due', referenceId: 'billing-1' },
    { type: 'move-in', date: '2026-04-15', title: 'Move In', referenceId: 'move-in-1' },
    { type: 'booking', date: '2026-04-20', title: 'Lease Signing', referenceId: 'booking-2' },
    { type: 'move-out', date: '2026-04-25', title: 'Move Out', referenceId: 'move-out-1' },
  ];

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first, fall back to sample events if CORS error
        const response = await CalendarService.getUpcomingEvents();
        setUpcomingEvents(response.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load upcoming events, using sample data:", error);
        // Use sample events as fallback
        setUpcomingEvents(SAMPLE_EVENTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Fetch all events for current month
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await CalendarService.getCalendarEvents(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1
        );
        setAllEvents(response.data);
      } catch (error) {
        console.error("Failed to load all events, using sample data:", error);
        // Use sample events as fallback
        const sampleForMonth = SAMPLE_EVENTS.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getMonth() === currentDate.getMonth() && 
                 eventDate.getFullYear() === currentDate.getFullYear();
        });
        setAllEvents(sampleForMonth);
      }
    };

    fetchAllEvents();
  }, [currentDate]);

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
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "short",
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getEventsForDay = (day: number) => {
    return allEvents.filter((event) => {
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
    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6 pb-4">
      {/* Mini calendar */}
      <div className="rounded-xl bg-white border border-whitesmoke-200 flex flex-col items-center p-4 gap-4">
        {/* Nav */}
        <div className="self-stretch flex items-center gap-3">
          <button
            onClick={onPrevMonth}
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
                <span className="flex-1">{monthName}</span>
                <Icon
                  icon="ic:round-keyboard-arrow-down"
                  className={`h-4 w-4 transition-transform ${
                    showMonthDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showMonthDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gainsboro rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                  {MONTH_SHORT.map((m, idx) => (
                    <button
                      key={m}
                      onClick={() => handleMonthSelect(idx)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 ${
                        idx === month ? "bg-lightcyan-100 font-bold" : ""
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
                <span className="flex-1">{yearStr}</span>
                <Icon
                  icon="ic:round-keyboard-arrow-down"
                  className={`h-4 w-4 transition-transform ${
                    showYearDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showYearDropdown && (
                <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-gainsboro rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                  {yearRange.map((y) => (
                    <button
                      key={y}
                      onClick={() => handleYearSelect(y)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 ${
                        y === year ? "bg-lightcyan-100 font-bold" : ""
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
            onClick={onNextMonth}
            className="rounded-full p-2 hover:bg-whitesmoke-100 transition-colors"
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
                  const isTodayDay =
                    isCurrentMonth && day === today.getDate() && day !== null;
                  return (
                    <button
                      key={di}
                      onClick={() => handleDateClick(day)}
                      disabled={day === null}
                      className={[
                        "rounded-md flex items-center justify-center p-2 aspect-square transition-colors",
                        day === null ? "cursor-default" : "cursor-pointer hover:bg-gray-100",
                        isTodayDay
                          ? "bg-lightcyan-100 text-teal-200 font-bold hover:bg-lightcyan-200"
                          : "",
                      ].join(" ")}
                    >
                      {day ?? ""}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming events */}
      <div className="flex flex-col gap-2 text-sm">
        <b className="font-semibold">Upcoming Events</b>
        {loading ? (
          <div className="text-xs text-dimgray">Loading events...</div>
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div
              key={event.referenceId}
              onClick={() => onEventClick?.(event)}
              className="rounded-2xl border border-whitesmoke-200 flex items-center p-4 gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Icon
                icon={getEventIcon(event.type)}
                className="h-6 w-6 shrink-0"
              />
              <div className="flex flex-col gap-1">
                <div className="text-xs font-medium">{event.title}</div>
                <div className="text-[11px] font-medium font-lora text-dimgray tracking-wide">
                  {formatEventDate(event.date)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xs text-dimgray">No upcoming events</div>
        )}
      </div>
    </div>
  );
};

export default MiniCalendar;
