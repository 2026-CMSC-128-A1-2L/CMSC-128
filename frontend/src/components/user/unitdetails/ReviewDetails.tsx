import type { FunctionComponent } from 'react';
import ReviewCard from './ReviewCard';
import RatingBreakdown from './RatingBreakdown';

const ratingRows = [
  { star: 5, width: '72.16%', count: 9 },
  { star: 4, width: '18.22%', count: 2 },
  { star: 3, width: '9.04%', count: 1 },
  { star: 2, width: '0%', count: 0 },
  { star: 1, width: '0%', count: 0 },
];

const reviews = [
  {
    initials: 'DC',
    name: 'Daphne Canape',
    date: 'February 2026',
    rating: '4.3 / 5.0',
    text: 'Very clean room and the landlord is super responsive. Wi-Fi is fast and the location is perfect for UPLB students. Highly recommend!',
  },
  {
    initials: 'QC',
    name: 'Quevin Custodio',
    date: 'January 2026',
    rating: '4.3 / 5.0',
    text: 'Good value for money. The shared bathroom is kept clean. Would definitely recommend for incoming freshmen looking for affordable housing near campus.',
  },
];

const ReviewDetails: FunctionComponent = () => {
  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] text-center text-num-18 text-gray font-inter">
      <div className="self-stretch flex flex-col items-center gap-[26px] text-black">
        <div className="self-stretch flex flex-col items-start text-left">
          <div className="self-stretch h-[52px] flex items-center py-2.5 px-num-20 box-border">
            <b className="relative tracking-num--0_01">Reviews</b>
          </div>
          <div className="self-stretch flex flex-col items-start py-2 px-4 sm:px-10 text-center text-[48px] text-darkslategray font-lora">
            <RatingBreakdown overallScore={4.7} totalReviews={12} rows={ratingRows} />
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-8 px-4 text-num-12 text-silver font-lora">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>

        <div className="self-stretch flex flex-col items-start py-2 px-16 text-[14px]">
          <div className="self-stretch relative">
            <div className="relative h-max w-full py-2 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white">
              <div className="w-full flex items-center justify-center">
                View all 12 reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
