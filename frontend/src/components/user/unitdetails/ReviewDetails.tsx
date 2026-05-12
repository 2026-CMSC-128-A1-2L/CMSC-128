import { useState, type FunctionComponent } from 'react';
import ReviewCard from './ReviewCard';
import RatingBreakdown from './RatingBreakdown';

type ReviewDetailsProps = {
  overallScore: number;
  totalReviews: number;
  rows: { star: number; width: string; count: number }[];
  reviews: {
    id: string;
    initials: string;
    name: string;
    date: string;
    rating: string;
    text: string;
  }[];
};

const ReviewDetails: FunctionComponent<ReviewDetailsProps> = ({
  overallScore,
  totalReviews,
  rows,
  reviews,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  const hasMoreReviews = reviews.length > visibleReviews.length;
  const buttonLabel = showAllReviews
    ? 'Show fewer reviews'
    : `View all ${totalReviews} review${totalReviews === 1 ? '' : 's'}`;

  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] text-center text-num-18 text-gray font-inter">
      <div className="self-stretch flex flex-col items-center gap-[26px] text-black">
        <div className="self-stretch flex flex-col items-start text-left">
          <div className="self-stretch h-[52px] flex items-center py-2.5 px-num-20 box-border">
            <b className="relative tracking-num--0_01">Reviews</b>
          </div>
          <div className="self-stretch flex flex-col items-start py-2 px-4 sm:px-10 text-center text-[48px] text-darkslategray font-lora">
            <RatingBreakdown overallScore={overallScore} totalReviews={totalReviews} rows={rows} />
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-8 px-4 text-num-12 text-silver font-lora">
          {visibleReviews.length > 0 ? (
            visibleReviews.map((review) => <ReviewCard key={review.id} {...review} />)
          ) : (
            <div className="w-full rounded-xl border border-whitesmoke bg-white px-5 py-4 text-left text-sm font-semibold text-silver">
              No approved reviews yet.
            </div>
          )}
        </div>

        {reviews.length > 2 && (
          <div className="self-stretch flex flex-col items-start py-2 px-4 sm:px-16 text-[14px]">
            <button
              type="button"
              onClick={() => setShowAllReviews((isShowing) => !isShowing)}
              className="relative h-max w-full rounded-[10px] bg-white py-2 font-semibold text-darkslategray shadow-[0px_0px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-lightcyan"
            >
              {hasMoreReviews
                ? `${buttonLabel} (${reviews.length - visibleReviews.length} more)`
                : buttonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetails;
