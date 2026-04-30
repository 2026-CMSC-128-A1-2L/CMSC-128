import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

interface ReviewCardProps {
  initials: string;
  name: string;
  date: string;
  rating: string;
  text: string;
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({
  initials,
  name,
  date,
  rating,
  text,
}) => {
  return (
    <div className="w-full mx-auto relative shrink-0">
      
      {/* Background */}
      <div className="absolute inset-0 rounded-[15px] bg-white border border-whitesmoke-200 box-border" />

      <div className="relative top-[12px] w-full flex flex-col items-start gap-1.5 pb-3">
        
        {/* Header */}
        <div className="w-full flex items-start pl-4 pr-4 sm:pl-5 sm:pr-5 justify-between">
          
          <div className="flex items-start gap-2 shrink-0">
            {/* Avatar */}
            <div className="h-8 w-8 relative">
              <div className="absolute inset-0 rounded-full bg-gainsboro border border-silver box-border" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {initials}
              </div>
            </div>

            {/* Name + Date */}
            <div className="flex flex-col items-start text-left text-sm text-black font-inter">
              <div className="leading-6 font-medium">
                {name}
              </div>
              <div className="text-[10px] sm:text-[8px] text-darkslategray">
                {date}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end shrink-0 text-teal-200 font-inter">
            <Icon icon="material-symbols:star-rounded" className="w-[13px] h-[13px]" />
            <b className="tracking-tight text-sm sm:text-[12px]">
              {rating}
            </b>
          </div>
        </div>

        {/* Text */}
        <div className="w-full px-4 sm:px-5 py-2.5 box-border text-left text-black">
          <div className="w-full tracking-tight font-semibold text-sm sm:text-base">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;