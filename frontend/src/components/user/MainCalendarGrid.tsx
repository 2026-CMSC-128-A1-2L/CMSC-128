import type { FunctionComponent } from "react";

interface MainCalendarGridProps {
  onEventClick?: () => void;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
const DATES = [29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2];

const MainCalendarGrid: FunctionComponent<MainCalendarGridProps> = ({ onEventClick }) => (
  <div className="w-full rounded-[14px] overflow-hidden flex flex-col bg-white">
    {/* Month header */}
    <div className="px-3 py-4 text-base font-semibold tracking-tight text-center">April 2026</div>

    {/* Day labels */}
    <div className="grid grid-cols-7 bg-blue-50 text-dimgray text-[9px] font-medium">
      {DAYS.map(d => (
        <div key={d} className="border border-whitesmoke-200 p-1.5">{d}</div>
      ))}
    </div>

    {/* Date cells */}
    <div className="grid grid-cols-7 flex-1">
      {DATES.map((day, i) => {
        const inactive = i < 3 || i > 30;
        const today = day === 3 && !inactive;
        return (
          <div
            key={i}
            className={[
              "border border-whitesmoke-200 flex flex-col items-start p-1 gap-1 min-h-[60px] sm:min-h-[80px] md:min-h-[100px]",
              inactive ? "bg-whitesmoke-200 text-dimgray" : today ? "bg-lightcyan-200 text-teal-100" : "bg-white",
            ].join(" ")}
          >
            <b className="text-[10px] sm:text-xs">{day}</b>
            {day === 7 && !inactive && (
              <button
                onClick={onEventClick}
                className="w-full rounded-sm bg-blue-50 py-0.5 px-1 opacity-80 hover:opacity-100 transition-opacity text-left"
              >
                <b className="text-[9px] sm:text-[11px] bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent">
                  Ocular Visit
                </b>
              </button>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default MainCalendarGrid;