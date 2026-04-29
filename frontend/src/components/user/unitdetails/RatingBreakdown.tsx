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
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-0">
      <div className="w-[95px] flex flex-col items-center sm:items-start gap-1.5 shrink-0">
        <b className="h-[35px] flex items-center justify-center text-transparent bg-clip-text! [background:linear-gradient(180deg,#5dc2a8_27.88%,#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center justify-center shrink-0">
          {overallScore}
        </b>
        <div className="h-[15px] text-xs tracking-tight font-semibold flex items-center justify-center sm:justify-start">
          {totalReviews} reviews
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-2 sm:pr-5 text-xs text-dimgray">
        {rows.map(({ star, width, count }) => (
          <div key={star} className="w-full flex items-center gap-2">
            <div className="h-5 w-[30px] flex items-center shrink-0">
              <span className="text-xs font-semibold mr-1">{star}</span>
              <Icon icon="material-symbols:star-rounded" className="w-3 h-3" />
            </div>
            <div className="flex-1 h-1.5 relative">
              <div className="absolute inset-0 rounded-num-100 bg-whitesmoke-100" />
              {width !== '0%' && (
                <div
                  className="absolute inset-y-0 left-0 rounded-num-100 [background:linear-gradient(180deg,#5dc2a8_27.88%,#0c8873_84.13%)]"
                  style={{ width }}
                />
              )}
            </div>
            <div className="h-5 min-w-[20px] flex items-center justify-center font-semibold shrink-0">
              {count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBreakdown;
