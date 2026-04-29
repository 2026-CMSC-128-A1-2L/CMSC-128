import { type FunctionComponent, useCallback } from "react";
import { Icon } from "@iconify/react";

interface MiniCalendarProps {
  onEventClick?: () => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKS = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, null, null],
];

const MiniCalendar: FunctionComponent<MiniCalendarProps> = ({
  onEventClick,
}) => {
  const onNav = useCallback(() => {}, []);

  return (
    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6 pb-4">
      {/* Mini calendar */}
      <div className="rounded-xl bg-white border border-whitesmoke-200 flex flex-col items-center p-4 gap-4">
        {/* Nav */}
        <div className="self-stretch flex items-center gap-3">
          <button
            onClick={onNav}
            className="rounded-full p-2 hover:bg-whitesmoke-100 transition-colors"
          >
            <Icon icon="ic:round-chevron-left" className="h-5 w-5" />
          </button>
          <div className="flex-1 flex gap-2">
            <div className="flex-1 rounded-md border border-gainsboro flex items-center p-2 gap-1 text-xs">
              <span className="flex-1">Apr</span>
              <Icon icon="ic:round-keyboard-arrow-down" className="h-4 w-4" />
            </div>
            <div className="flex-1 rounded-md border border-gainsboro flex items-center p-2 gap-1 text-xs">
              <span className="flex-1">2026</span>
              <Icon icon="ic:round-keyboard-arrow-down" className="h-4 w-4" />
            </div>
          </div>
          <button
            onClick={onNav}
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
            {WEEKS.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-0.5">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={[
                      "rounded-md flex items-center justify-center p-2 aspect-square",
                      day === 3
                        ? "bg-lightcyan-100 text-teal-200 font-bold"
                        : "",
                    ].join(" ")}
                  >
                    {day ?? ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming events */}
      <div className="flex flex-col gap-2 text-sm">
        <b className="font-semibold">Upcoming Events</b>
        <div
          onClick={onEventClick}
          className="rounded-2xl border border-whitesmoke-200 flex items-center p-4 gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Icon icon="ic:round-circle" className="h-6 w-6 shrink-0" />
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium">Ocular Visit</div>
            <div className="text-[11px] font-medium font-lora text-dimgray tracking-wide">
              April 7, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;
