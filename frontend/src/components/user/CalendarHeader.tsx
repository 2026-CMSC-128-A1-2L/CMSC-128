import { FunctionComponent } from "react";

interface CalendarHeaderProps {
  title?: string;
}

const CalendarHeader: FunctionComponent<CalendarHeaderProps> = ({
  title = "Calendar",
}) => {
  return (
    <div className="w-full flex flex-col items-start pt-8 pb-0 pl-8 pr-5">
      <div className="w-full flex flex-col items-start gap-3">
        <div className="w-full flex flex-col items-center gap-8 text-[24px] text-black font-inter">
          <div className="self-stretch flex flex-col items-start justify-center gap-2 sm:gap-3">
            <div className="self-stretch flex items-center justify-between gap-2 sm:gap-4 md:gap-5">
              <div className="h-6 sm:h-8 flex-1 sm:flex-none flex flex-col items-start sm:items-center justify-end">
                <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                  <b className="relative leading-8 text-sm sm:text-base md:text-lg shrink-0">
                    {title}
                  </b>
                  <div className="h-10 sm:h-12 w-48 sm:w-[300px] rounded-2xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-2 px-3 box-border" />
                </div>
              </div>
              <div className="h-10 sm:h-12 w-16 sm:w-20 overflow-hidden shrink-0 flex items-end justify-end">
                <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-[100px] bg-whitesmoke-100 overflow-hidden shrink-0 hidden items-center justify-end py-2 px-3 box-border" />
              </div>
            </div>
            <div className="self-stretch h-0.01 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-4 pb-num-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
