import { useState, type FunctionComponent, type MouseEvent } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { BookmarkService } from '../../service/BookmarkService';

type DormCardProps = {
  id: string | number;
  name: string;
  rating: string;
  price: {
    min: number;
    max: number;
  };
  location: string;
  image: string;
  room_types: { pax: string; price: number }[];
};

const priceRange = (min: number, max: number) => {
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  });

  if (min === max) return `${formatter.format(min)}/month`;
  return `${formatter.format(min)} - ${formatter.format(max)}/month`;
};

const DormCard: FunctionComponent<DormCardProps> = ({
  id,
  name,
  rating,
  price,
  location,
  image,
  room_types,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationOpacity, setNotificationOpacity] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('Added to Bookmarks');
  const navigate = useNavigate();

  const handleBookmarkClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Bookmark clicked for:', id, 'Currently bookmarked:', isBookmarked);
    
    try {
      if (isBookmarked) {
        // Remove bookmark
        await BookmarkService.deleteBookmark(String(id));
        setIsBookmarked(false);
        setNotificationMessage('Removed from Bookmarks');
      } else {
        // Add bookmark
        await BookmarkService.addBookmark(String(id));
        setIsBookmarked(true);
        setNotificationMessage('Added to Bookmarks');
      }
      setShowNotification(true);
      setNotificationOpacity(true);
      setTimeout(() => setNotificationOpacity(false), 3200);
      setTimeout(() => setShowNotification(false), 3900);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      // Still show notification on error
      setIsBookmarked(!isBookmarked);
      setNotificationMessage(isBookmarked ? 'Removed from Bookmarks' : 'Added to Bookmarks');
      setShowNotification(true);
      setNotificationOpacity(true);
      setTimeout(() => setNotificationOpacity(false), 3200);
      setTimeout(() => setShowNotification(false), 3900);
    }
  };

  const currencyFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  });

  // TODO: change route to specific unit
  const handleCardClick = () => {
    navigate('/unit');
  };

  // TPrevent navigation when dropdown is clicked
  const handleToggleExpand = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-8 left-8 px-6 py-3 z-50 flex items-center gap-2 transition-opacity duration-700 ease-in-out" style={{ backgroundColor: '#e0f7fa', borderRadius: '16px', opacity: notificationOpacity ? 1 : 0 }}>
          <svg className="w-5 h-5 flex-shrink-0" fill="#00897b" viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: '#00695c' }}>{notificationMessage}</span>
        </div>
      )}
      <div
        onClick={handleCardClick}
        className={`relative border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start text-left text-black font-inter transition-all duration-300 dark:text-white cursor-pointer hover:shadow-lg
          ${isExpanded ? 'w-66 h-fit rounded-num-16 shadow-sm' : 'w-66 h-56 rounded-[15.31px]'}`}
      >
        <div className="relative w-66 h-30">
          <img className="w-full h-full object-cover" src={image} alt={name} />
          <button
            onClick={handleBookmarkClick}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-green-100 transition-colors shadow-lg"
            aria-label="Bookmark this dorm"
            type="button"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill={isBookmarked ? '#096c5b' : 'none'}
              stroke={isBookmarked ? '#096c5b' : '#374151'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <div className="w-full flex flex-col py-2 px-3 gap-2">
          <div className="w-full flex flex-col items-start gap-0">
            <div className="w-full h-fit flex items-start gap-1">
              <b className="w-full relative flex items-center text-num-16">{name}</b>
              <div className="w-fit h-fit flex items-center gap-1 text-[0.718rem] font-lora">
                <Icon icon="material-symbols-light:star" className="w-5 h-5 text-black" />
                <div className="relative font-semibold">{rating}</div>
              </div>
            </div>
            <b className="relative text-num-14 text-teal">{priceRange(price.min, price.max)}</b>
          </div>

          <div className="w-full h-fit flex flex-col gap-1">
            <div className="w-full relative flex items-center gap-1 text-left text-dimgray font-lora">
              <Icon icon="material-symbols-light:location-on" className="w-3 h-3" />
              <div className="flex-1 relative text-num-10 font-semibold">{location}</div>
            </div>

            {isExpanded && (
              <div className="mt-2 w-full h-33 animate-fade-in flex flex-col space-y-2 border-t border-whitesmoke-200 pt-2 pb-4 px-2">
                <div className="text-num-12 h-fit font-semibold text-dimgray font-lora">
                  Available Listings:
                </div>
                <div className="w-full h-full flex flex-col gap-1">
                  {room_types.map((room, index) => (
                    <div key={index} className="flex justify-between text-num-12 font-inter">
                      <span className="font-bold">{room.pax}</span>
                      <span className="text-dimgray">
                        {currencyFormatter.format(room.price)}/month
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full h-fit flex justify-center items-end">
              <button
                onClick={handleToggleExpand}
                className="hover:scale-125 transition-transform flex items-center justify-center p-1"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                <Icon
                  icon={isExpanded ? 'bi:chevron-compact-up' : 'bi:chevron-compact-down'}
                  className="w-6 h-6 text-teal"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DormCard;