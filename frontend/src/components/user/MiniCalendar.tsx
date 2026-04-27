import { type FunctionComponent, useCallback } from "react";
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
    <div className="h-full w-72 flex flex-col items-start pt-num-0 px-num-0 pb-4 box-border gap-6">
      <div className="rounded-xl bg-white border-whitesmoke-200 border-solid border flex flex-col items-center p-4 isolate">
        <div className="self-stretch flex items-center gap-3 z-10">
          <div
            className="rounded-full overflow-hidden flex items-center justify-center p-2 cursor-pointer hover:bg-whitesmoke-100"
            onClick={onIconButtonContainerClick}
          >
            <Icon icon="ic:round-chevron-left" className="h-5 w-5" />
          </div>
          <div className="flex-1 flex items-start isolate gap-2">
            <div className="flex-1 flex flex-col items-start">
              <div className="self-stretch rounded-md bg-white border-gainsboro border-solid border flex items-center p-2 gap-2 text-num-12">
                <div className="flex-1 relative leading-tight">Apr</div>
                <Icon icon="ic:round-keyboard-arrow-down" className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start">
              <div className="self-stretch rounded-md bg-white border-gainsboro border-solid border flex items-center p-2 gap-2 text-num-12">
                <div className="flex-1 relative leading-tight">2026</div>
                <Icon icon="ic:round-keyboard-arrow-down" className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div
            className="rounded-full overflow-hidden flex items-center justify-center p-2 cursor-pointer hover:bg-whitesmoke-100"
            onClick={onIconButtonContainerClick}
          >
            <Icon icon="ic:round-chevron-right" className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col items-center pt-4 px-num-0 pb-num-0 z-0 text-center text-num-11_59 text-gray font-inter">
          <div className="self-stretch flex items-center justify-center gap-0.5">
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">Su</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">Mo</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">Tu</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">We</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">Th</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">Fr</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative leading-num-19_31 text-xs">Sa</div>
            </div>
          </div>
          <div className="flex flex-col items-center isolate gap-0.5 text-num-12 text-black">
            <div className="flex items-center gap-0.5 z-40">
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border" />
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border" />
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border" />
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">1</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">2</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md bg-lightcyan-100 flex items-center justify-center p-3 box-border text-teal-200 font-inter">
                <b className="relative leading-tight shrink-0">3</b>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">4</div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 z-30">
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">5</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">6</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">7</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">8</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">9</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">10</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">11</div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 z-20">
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">12</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">13</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">14</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">15</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">16</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">17</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">18</div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 z-10">
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">19</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">20</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">21</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">22</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">23</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">24</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">25</div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 z-0">
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">26</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">27</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">28</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">29</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border">
                <div className="relative leading-tight shrink-0">30</div>
              </div>
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border" />
              <div className="h-num-38_6 w-num-38_6 rounded-md flex items-center justify-center p-3 box-border" />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start py-2 px-num-0 gap-2 text-center text-num-14">
        <b className="self-stretch relative font-semibold">Upcoming Events</b>
        <div className="self-stretch h-auto rounded-2xl border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex items-center p-4 gap-2 text-num-12 cursor-pointer hover:bg-gray-50" onClick={onEventClick}>
          <Icon icon="ic:round-circle" className="h-6 w-6" />
          <div className="flex flex-col items-start justify-center gap-1 shrink-0">
            <div className="relative font-medium">Ocular Visit</div>
            <div className="relative text-num-11_59 tracking-num-0_04 font-medium font-lora text-dimgray">
              April 7, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;
