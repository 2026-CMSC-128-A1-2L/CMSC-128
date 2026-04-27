import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

interface RatingBreakdownProps {
  overallScore: number;
  totalReviews: number;
  rows: { star: number; width: string; count: number }[];
}

const RatingBreakdown: FunctionComponent<RatingBreakdownProps> = ({
  overallScore,
  totalReviews,
  rows,
}) => {
  return (
    <div className="self-stretch flex items-center justify-between gap-0">
      <div className="w-[95.3px] flex flex-col items-start gap-1.5 shrink-0">
        <b className="self-stretch h-[35px] relative flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center justify-center shrink-0">
          {overallScore}
        </b>
        <div className="self-stretch flex items-center"></div>
        <div className="self-stretch h-[15px] relative text-num-12 tracking-num-0_02 font-semibold flex items-center justify-center shrink-0">
          {totalReviews} reviews
        </div>
      </div>

      <div className="w-[670px] flex flex-col items-start gap-2 shrink-0 text-num-12 text-dimgray">
        {rows.map(({ star, width, count }) => (
          <div key={star} className="self-stretch flex items-center gap-[7px]">
            <div className="h-5 w-[23px] relative flex items-center justify-start shrink-0">
              <span className="text-xs font-semibold tracking-num-0_02 mr-0.5">{star}</span>
              <Icon icon="material-symbols:star-rounded" className="w-3 h-3" />
            </div>
            <div className="h-1.5 w-[598.7px] relative">
              <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-num-100 bg-whitesmoke-100" />
              {width !== '0%' && (
                <div
                  className="absolute h-full top-0 bottom-0 left-0 rounded-num-100 [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)]"
                  style={{ width }}
                />
              )}
            </div>
            <div className="h-5 w-5 relative tracking-num-0_02 font-semibold flex items-center justify-center shrink-0">
              {count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBreakdown;
