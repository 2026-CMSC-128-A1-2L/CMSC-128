import { type FunctionComponent, useState, useCallback } from "react";
import Footer from "../../../components/general/Footer";
import SideBar from "../../../components/user/SideBar";
import MiniCalendar from "../../../components/user/user-calendar/MiniCalendar";
import EventPopout from "../../../components/user/EventPopout";
import DayEventsPopout from "../../../components/user/user-calendar/DayEventsPopout";
import PortalPopup from "../../../components/general/PortalPopup";
import MainCalendarGrid from "../../../components/user/user-calendar/MainCalendarGrid";
import type { CalendarEvent } from "../../../service/CalendarService";

const MyCalendar: FunctionComponent = () => {
  const [isEventPopoutOpen, setEventPopoutOpen] = useState(false);
  const [isDayPopoutOpen, setDayPopoutOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const openEventPopout = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventPopoutOpen(true);
  }, []);

  const closeEventPopout = useCallback(() => {
    setEventPopoutOpen(false);
    setSelectedEvent(null);
  }, []);

  const openDayPopout = useCallback(
    (date: Date, events: CalendarEvent[]) => {
      setSelectedDate(date);
      setSelectedDayEvents(events);
      setDayPopoutOpen(true);
    },
    []
  );

  const closeDayPopout = useCallback(() => {
    setDayPopoutOpen(false);
    setSelectedDate(null);
    setSelectedDayEvents([]);
  }, []);

  // Only open day popout if there are events
  const handleDayPopout = useCallback(
    (date: Date, events: CalendarEvent[]) => {
      if (events.length > 0) {
        openDayPopout(date, events);
      }
    },
    [openDayPopout]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  return (
    <>
      <div className="flex min-h-screen font-inter text-black">
        <div className="sticky top-0 h-screen shrink-0 z-10">
          <SideBar />
        </div>
        <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
          <div className="flex-1 flex flex-col px-4 sm:px-8 pt-16 pr-4 sm:pr-20">
            <div className="flex flex-col gap-4 sm:gap-8 flex-1">
              {/* Header Section */}
              <div className="flex flex-col gap-3">
                <b className="text-xl sm:text-2xl leading-8 text-black">My Calendar</b>
                <div className="h-0.5 bg-whitesmoke-200" />
              </div>

              {/* Main Content - Two Column Layout */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* LEFT SIDEBAR */}
                <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
                  <div className="rounded-2xl bg-white border border-whitesmoke-200 p-6">
                    <MiniCalendar
                      currentDate={currentDate}
                      onPrevMonth={handlePrevMonth}
                      onNextMonth={handleNextMonth}
                      onDateChange={handleDateChange}
                      onDateClick={handleDayPopout}
                      onEventClick={openEventPopout}
                    />
                  </div>
                </div>

                {/* RIGHT MAIN CONTENT */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                  <div className="rounded-2xl bg-white border border-whitesmoke-200 flex flex-col p-6">
                    <MainCalendarGrid
                      currentDate={currentDate}
                      onPrevMonth={handlePrevMonth}
                      onNextMonth={handleNextMonth}
                      onEventClick={openEventPopout}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {isEventPopoutOpen && selectedEvent && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.25)"
          placement="Centered"
          onOutsideClick={closeEventPopout}
        >
          <EventPopout event={selectedEvent} onClose={closeEventPopout} />
        </PortalPopup>
      )}
      {isDayPopoutOpen && selectedDate && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.25)"
          placement="Centered"
          onOutsideClick={closeDayPopout}
        >
          <DayEventsPopout
            date={selectedDate}
            events={selectedDayEvents}
            onClose={closeDayPopout}
          />
        </PortalPopup>
      )}
    </>
  );
};

export default MyCalendar;
