import type { FunctionComponent } from "react";
import { Icon } from "@iconify/react";
import type { CalendarEvent } from "../../../service/CalendarService";

export type DayEventsPopoutType = {
  className?: string;
  onClose?: () => void;
  date: Date;
  events: CalendarEvent[];
};

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

const getEventColor = (type: CalendarEvent["type"]) => {
  switch (type) {
    case "booking":
      return "#c00f0f";
    case "billing":
      return "#ff9800";
    case "move-in":
      return "#4caf50";
    case "move-out":
      return "#2196f3";
    default:
      return "#c00f0f";
  }
};

const getTypeLabel = (type: CalendarEvent["type"]) => {
  switch (type) {
    case "booking":
      return "Visit Booking";
    case "billing":
      return "Billing Due";
    case "move-in":
      return "Move In";
    case "move-out":
      return "Move Out";
    default:
      return "Event";
  }
};

const DayEventsPopout: FunctionComponent<DayEventsPopoutType> = ({
  className = "",
  onClose,
  date,
  events,
}) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`w-96 max-w-full max-h-full overflow-auto relative text-left text-num-12 text-black font-inter ${className}`}
    >
      <div className="relative bg-white rounded-lg p-6 shadow-lg">
        <Icon
          icon="ic:round-close"
          className="absolute top-3 right-3 w-8 h-8 cursor-pointer hover:opacity-70"
          onClick={onClose}
        />

        <div className="text-lg font-semibold mb-2">{formattedDate}</div>

        <div className="border-t border-whitesmoke-200 pt-4">
          {events.length === 0 ? (
            <div className="text-center py-4 text-dimgray">
              No events for this day
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {events.map((event) => (
                <div
                  key={event.referenceId}
                  className="flex items-start gap-3 pb-3 border-b border-whitesmoke-200 last:border-b-0"
                >
                  <Icon
                    icon={getEventIcon(event.type)}
                    className="h-5 w-5 shrink-0 mt-1"
                    color={getEventColor(event.type)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">
                      {getTypeLabel(event.type)}
                    </div>
                    <div className="text-xs text-dimgray mt-1">
                      {event.title}
                    </div>
                    <div className="text-[11px] text-gray mt-2">
                      {new Date(event.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayEventsPopout;
