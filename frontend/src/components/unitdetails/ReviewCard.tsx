import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

interface ReviewCardProps {
  initials: string;
  name: string;
  date: string;
  rating: string;
  text: string;
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ initials, name, date, rating, text }) => {
  return (
    <div className="w-[794px] relative shrink-0">
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-[15px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border" />
      <div className="relative top-[12px] w-[793px] flex flex-col items-start gap-1.5 pb-3">
        <div className="self-stretch flex items-start py-num-0 pl-num-20 pr-20 justify-between">
          <div className="flex items-start gap-2 shrink-0">
            <div className="h-8 w-8 relative">
              <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-[50%] bg-gainsboro border-silver border-solid border-[1px] box-border" />
              <div className="absolute h-[37.5%] w-[78.13%] top-[31.25%] left-[9.38%] tracking-num-0_02 font-semibold flex items-center justify-center">
                {initials}
              </div>
            </div>
            <div className="w-[215px] flex flex-col items-start text-left text-[14px] text-black font-inter">
              <div className="self-stretch h-3.5 relative leading-6 font-medium flex items-center shrink-0">{name}</div>
              <div className="self-stretch h-3.5 relative text-[8px] text-darkslategray flex items-center shrink-0">{date}</div>
            </div>
          </div>
          <div className="w-[82px] flex flex-col items-end shrink-0 text-left text-num-18 text-teal-200 font-inter">
            <Icon icon="material-symbols:star-rounded" className="w-[13px] h-[13px]" />
            <b className="self-stretch h-3.5 relative tracking-num--0_01 flex items-center shrink-0">{rating}</b>
          </div>
        </div>
        <div className="w-[766px] flex items-start py-2.5 px-num-20 box-border text-left text-black">
          <div className="w-[763px] relative tracking-num-0_02 font-semibold inline-block shrink-0">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
