import { FunctionComponent, useCallback } from "react";

interface MainCalendarGridProps {
  onEventClick?: () => void;
}

const MainCalendarGrid: FunctionComponent<MainCalendarGridProps> = ({
  onEventClick,
}) => {
  return (
    <div className="w-full sm:w-96 md:w-full lg:w-[738px] rounded-lg sm:rounded-[14.11px] overflow-hidden shrink-0 flex flex-col items-start py-2 sm:py-[9.4px] px-num-0 box-border text-xs sm:text-sm md:text-base lg:text-[23.09px] h-[450px] sm:h-[600px] md:h-[756px] bg-white">
      <div className="self-stretch [filter:drop-shadow(0px_0.568566083908081px_0.57px_rgba(0,_0,_0,_0.12))] flex flex-col items-center justify-center">
        <div className="w-[726.5px] flex items-center py-[18.8px] px-[9.4px] box-border">
          <div className="relative tracking-[-0.01em] font-semibold">
            April 2026
          </div>
        </div>
        <div className="w-[726.5px] h-[23.5px] bg-aliceblue flex items-start justify-center text-num-9_1 text-dimgray">
          <div className="self-stretch w-num-104 rounded-tl-[4.55px] rounded-tr-num-0 rounded-b-num-0 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
            <div className="relative font-medium">SUN</div>
          </div>
          <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
            <div className="relative font-medium">MON</div>
          </div>
          <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num_6_8">
            <div className="relative font-medium">TUE</div>
          </div>
          <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
            <div className="relative font-medium">WED</div>
          </div>
          <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
            <div className="relative font-medium">THUR</div>
          </div>
          <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
            <div className="relative font-medium">FRI</div>
          </div>
          <div className="self-stretch w-num-104 rounded-tl-num-0 rounded-tr-[4.55px] rounded-b-num-0 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
            <div className="relative font-medium">SAT</div>
          </div>
        </div>
        <div className="w-full flex items-start justify-center flex-wrap content-start gap-0 text-[10px] sm:text-[12px] md:text-num-16_46]">
          {[29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2].map(
            (day, index) => (
              <div
                key={index}
                className={`h-num-108_7 w-num-104 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] ${
                  index < 3 || index > 30
                    ? "bg-whitesmoke-200 text-dimgray"
                    : day === 3
                    ? "bg-lightcyan-200 text-teal-100"
                    : "bg-white"
                }`}
              >
                <b className="relative">{day}</b>
                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7">
                  {day === 7 && (
                    <div
                      className="self-stretch rounded-[2.27px] [background:rgba(0,_133,_255,_0.1),_#fff] flex items-center justify-center py-num-4_7 px-[9.4px] opacity-[0.8] cursor-pointer hover:opacity-100"
                      onClick={onEventClick}
                    >
                      <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0 text-[11.76px]">
                        Ocular Visit
                      </b>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCalendarGrid;
