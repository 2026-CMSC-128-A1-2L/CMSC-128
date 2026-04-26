import { FunctionComponent, useCallback } from "react";
import { Icon } from "@iconify/react";

interface MiniCalendarProps {
  onEventClick?: () => void;
}

const MiniCalendar: FunctionComponent<MiniCalendarProps> = ({
  onEventClick,
}) => {
  const onIconButtonContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="h-[450px] sm:h-[600px] md:h-[756px] w-64 sm:w-72 md:w-[309px] flex flex-col items-start pt-num-0 px-num-0 pb-[9.7px] box-border gap-[15px] sm:gap-[20px] md:gap-[23.3px]">
      <div className="rounded-xl sm:rounded-[15.45px] bg-white border-whitesmoke-200 border-solid border-[1px] flex flex-col items-center p-2 sm:p-num-15_4 isolate">
        <div className="self-stretch flex items-center gap-2 sm:gap-3 md:gap-[15.4px] z-[1]">
          <div
            className="rounded-full overflow-hidden flex items-center justify-center p-1.5 sm:p-[7.7px] cursor-pointer"
            onClick={onIconButtonContainerClick}
          >
            <Icon icon="ic:round-chevron-left" className="h-4 sm:h-5 md:h-[19.3px] w-4 sm:w-5 md:w-[19.3px]" />
          </div>
          <div className="flex-1 flex items-start isolate gap-1.5 sm:gap-2 md:gap-[7.7px]">
            <div className="flex-1 flex flex-col items-start z-[1]">
              <div className="self-stretch rounded-md sm:rounded-num-7_72 bg-white border-gainsboro border-solid border-[1px] flex items-center p-1 sm:p-[5.8px] gap-1.5 sm:gap-[7.7px] text-xs sm:text-sm">
                <div className="flex-1 relative leading-[100%]">Apr</div>
                <Icon icon="ic:round-keyboard-arrow-down" className="h-3 sm:h-4 md:h-[15.5px] w-3 sm:w-4 md:w-[15.5px]" />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start z-[0]">
              <div className="self-stretch rounded-md sm:rounded-num-7_72 bg-white border-gainsboro border-solid border-[1px] flex items-center p-1 sm:p-[5.8px] gap-1.5 sm:gap-[7.7px] text-xs sm:text-sm">
                <div className="flex-1 relative leading-[100%]">2026</div>
                <Icon icon="ic:round-keyboard-arrow-down" className="h-3 sm:h-4 md:h-[15.5px] w-3 sm:w-4 md:w-[15.5px]" />
              </div>
            </div>
          </div>
          <div
            className="rounded-full overflow-hidden flex items-center justify-center p-1.5 sm:p-[7.7px] cursor-pointer"
            onClick={onIconButtonContainerClick}
          >
            <Icon icon="ic:round-chevron-right" className="h-4 sm:h-5 md:h-[19.3px] w-10 sm:w-12 md:w-[50.3px]" />
          </div>
        </div>
        <div className="flex flex-col items-center pt-num-15_4 px-num-0 pb-num-0 z-[0] text-center text-num-11_59 text-gray font-geist">
          <div className="self-stretch flex items-center justify-center gap-px">
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">Su</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">Mo</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">Tu</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">We</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">Th</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">Fr</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31">Sa</div>
            </div>
          </div>
          <div className="flex flex-col items-center isolate gap-px text-num-15_45 text-black">
            <div className="flex items-center gap-px z-[4]">
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[23.32px] shrink-0">1</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[23.32px] shrink-0">2</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 bg-lightcyan-100 flex items-center justify-center p-num-15_4 box-border text-teal-200 font-inter">
                <b className="relative leading-[140%] shrink-0">3</b>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[23.32px] shrink-0">4</div>
              </div>
            </div>
            <div className="flex items-center gap-px z-[3]">
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">5</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">6</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">7</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">8</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">9</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">10</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">11</div>
              </div>
            </div>
            <div className="flex items-center gap-px z-[2]">
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">12</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">13</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">14</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">15</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">16</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">17</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">18</div>
              </div>
            </div>
            <div className="flex items-center gap-px z-[1]">
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">19</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">20</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">21</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">22</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">23</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">24</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">25</div>
              </div>
            </div>
            <div className="flex items-center gap-px z-[0]">
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">26</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">27</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">28</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">29</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                <div className="relative leading-[140%] shrink-0">30</div>
              </div>
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
              <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start py-[9.7px] px-num-0 gap-[9.7px] text-center text-[13.52px]">
        <b className="self-stretch relative">Upcoming Events</b>
        <div className="self-stretch h-[46.3px] rounded-[15.45px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-center p-num-15_4 gap-[9.7px] text-[13.99px] cursor-pointer hover:bg-gray-50" onClick={onEventClick}>
          <Icon icon="ic:round-circle" className="h-[23.2px] w-[23.2px]" />
          <div className="flex flex-col items-start justify-center gap-[3.9px] shrink-0">
            <div className="relative font-medium">Ocular Visit</div>
            <div className="relative text-num-11_59 tracking-[0.04em] font-medium font-lora text-dimgray">
              April 7, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;
