import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FunctionComponent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import FallbackImage from '../general/FallbackImage';

// Shared formatter — created once at module level, not per render
const currencyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
});

const priceRange = (min: number, max: number): string => {
  if (min === 0 && max === 0) return 'Price TBA';
  if (min === max) return `${currencyFormatter.format(min)}/month`;
  return `${currencyFormatter.format(min)} – ${currencyFormatter.format(max)}/month`;
};

type DormCardProps = {
  id: string; // facility ID — used for navigation
  name: string;
  rating: string;
  price: { min: number; max: number };
  location: string;
  image: string;
  isPasalo?: boolean;
  transferId?: string;
  pasaloUnitId?: string;
  pasaloListingId?: string;
  pasaloMoveInDate?: string;
  pasaloLeaseDuration?: '6-months' | '12-months';
  sourceLabel?: string;
  sourceUrl?: string;
  room_types: {
    id?: string;
    pax: string;
    price: number;
    unitCount?: number;
    availableUnitCount?: number;
  }[];
};

const DormCard: FunctionComponent<DormCardProps> = ({
  id,
  name,
  rating,
  price,
  location,
  image,
  isPasalo,
  transferId,
  pasaloUnitId,
  pasaloListingId,
  pasaloMoveInDate,
  pasaloLeaseDuration,
  sourceLabel,
  sourceUrl,
  room_types,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ left: 0, top: 0, width: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const visibleRoomTypes = room_types.slice(0, 3);

  const updatePanelPosition = useCallback(() => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPanelPosition({
      left: rect.left,
      top: rect.top,
      width: rect.width,
    });
  }, []);

  const navigateToDetails = (selectedRoomType?: string) => {
    const transferQuery =
      isPasalo && transferId ? `?transferId=${encodeURIComponent(transferId)}` : '';
    navigate(`/facilities/${id}${transferQuery}`, {
      state: {
        dorm: {
          id,
          name,
          rating,
          price,
          location,
          image,
          isPasalo,
          transferId,
          pasaloUnitId,
          pasaloListingId,
          pasaloMoveInDate,
          pasaloLeaseDuration,
          room_types,
        },
        selectedRoomType,
        isPasalo,
        transferId,
        pasaloUnitId,
        pasaloListingId,
        pasaloMoveInDate,
        pasaloLeaseDuration,
        sourceLabel,
        sourceUrl,
      },
    });
  };

  const handleCardClick = (event?: MouseEvent<HTMLDivElement>) => {
    const target = event?.target;
    if (
      target instanceof HTMLElement &&
      target.closest('[data-card-interactive="true"], [data-expanded-panel="true"]')
    ) {
      return;
    }

    navigateToDetails();
  };

  const handleToggleExpand = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isExpanded) updatePanelPosition();
    setIsExpanded((expanded) => !expanded);
  };

  const handleRoomClick = (event: MouseEvent<HTMLButtonElement>, isFull: boolean) => {
    event.stopPropagation();
    if (!isFull) {
      const roomType = event.currentTarget.dataset.roomType;
      navigateToDetails(roomType);
    }
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  useLayoutEffect(() => {
    if (!isExpanded) return;

    updatePanelPosition();
    window.addEventListener('resize', updatePanelPosition);
    window.addEventListener('scroll', updatePanelPosition, true);

    return () => {
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
    };
  }, [isExpanded, updatePanelPosition]);

  const renderListings = () => (
    <div data-expanded-panel="true" className="mt-4 w-full animate-fade-in font-lora text-num-12">
      <div className="mb-2 font-semibold text-dimgray dark:text-[#a4acba]">Available Listings:</div>
      {room_types.length > 0 ? (
        <div className="w-full flex flex-col gap-1">
          {visibleRoomTypes.map((room) => {
            const isFull =
              typeof room.availableUnitCount === 'number' &&
              room.availableUnitCount <= 0 &&
              (room.unitCount ?? 0) > 0;

            return (
              <button
                key={room.id || `${room.pax}-${room.price}`}
                type="button"
                data-card-interactive="true"
                data-room-type={room.pax}
                disabled={isFull}
                onClick={(event) => handleRoomClick(event, isFull)}
                className={`grid grid-cols-[1fr_auto] gap-3 rounded-md px-2 py-1 text-left text-num-12 transition-colors ${
                  isFull
                    ? 'cursor-not-allowed text-silver dark:text-[#69717b]'
                    : 'text-black hover:bg-lightcyan dark:text-[#d7e0ef] dark:hover:bg-[#1f3a34]'
                }`}
              >
                <span className="truncate font-bold">{room.pax}</span>
                <span
                  className={`truncate font-semibold ${
                    isFull ? 'text-silver dark:text-[#69717b]' : 'text-dimgray dark:text-[#a4acba]'
                  }`}
                >
                  {isFull ? 'Full' : `${currencyFormatter.format(room.price)}/month`}
                </span>
              </button>
            );
          })}
          {room_types.length > visibleRoomTypes.length && (
            <button
              type="button"
              data-card-interactive="true"
              onClick={(event) => {
                event.stopPropagation();
                navigateToDetails();
              }}
              className="mx-auto mt-2 w-fit text-num-12 font-bold text-teal underline transition-opacity hover:opacity-70 dark:text-[#72cbb8]"
            >
              View more...
            </button>
          )}
        </div>
      ) : (
        <p className="text-num-12 text-unselected dark:text-[#a4acba]">
          No listings available yet.
        </p>
      )}
    </div>
  );

  const renderCardSurface = (expanded: boolean, floating = false) => (
    <div
      className={`flex w-full flex-col items-start overflow-hidden rounded-[15.31px] border border-solid border-whitesmoke bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-[#303331] dark:bg-[#101111] dark:shadow-none dark:hover:border-[#45665e] ${
        floating ? 'shadow-lg' : 'h-full'
      }`}
    >
      <FallbackImage media={image} alt={name} className="w-66 h-30 object-cover" />

      <div className="w-full flex flex-col py-2 px-3 gap-2">
        <div className="w-full flex flex-col items-start gap-0">
          <div className="w-full h-fit flex items-start gap-1">
            <b
              className={`min-w-0 flex-1 text-num-16 ${
                expanded ? 'break-words leading-tight' : 'truncate'
              }`}
            >
              {name}
            </b>
            <div className="w-fit h-fit flex shrink-0 items-center gap-1 text-[0.718rem] font-lora text-darkslategray-200 dark:text-white">
              <Icon
                icon="material-symbols:star-rounded"
                className="w-5 h-5 text-[#f5b642] dark:text-white"
              />
              <div className="relative font-semibold">{rating}</div>
            </div>
          </div>
          <b className="relative text-num-14 text-teal dark:text-[#72cbb8]">
            {priceRange(price.min, price.max)}
          </b>
        </div>

        <div className="w-full h-fit flex flex-col gap-1">
          <div
            className={`w-full min-w-0 relative flex gap-1 text-left text-dimgray font-lora dark:text-[#a4acba] ${
              expanded ? 'items-start' : 'items-center'
            }`}
          >
            <Icon
              icon="material-symbols-light:location-on"
              className={`h-3 w-3 shrink-0 ${expanded ? 'mt-0.5' : ''}`}
            />
            <div
              className={`min-w-0 flex-1 text-num-10 font-semibold ${
                expanded ? 'whitespace-normal break-words leading-snug' : 'truncate'
              }`}
              title={location}
            >
              {location}
            </div>
          </div>

          {expanded && renderListings()}

          <div className="w-full h-fit flex justify-center items-end">
            <button
              type="button"
              data-card-interactive="true"
              onClick={handleToggleExpand}
              className="hover:scale-125 transition-transform flex items-center justify-center p-1 cursor-pointer"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              <Icon
                icon={expanded ? 'bi:chevron-compact-up' : 'bi:chevron-compact-down'}
                className="w-6 h-6 text-teal dark:text-[#72cbb8]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const expandedPanel =
    isExpanded && typeof document !== 'undefined'
      ? createPortal(
          /* biome-ignore lint/a11y/useSemanticElements: The floating card contains its own expand button, so using a native button would create nested interactive elements. */
          <div
            className="fixed z-[1000] text-left text-black font-inter dark:text-white cursor-pointer"
            style={{
              left: panelPosition.left,
              top: panelPosition.top,
              width: panelPosition.width,
            }}
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
            role="button"
            tabIndex={0}
          >
            {renderCardSurface(true, true)}
          </div>,
          document.body,
        )
      : null;

  return (
    /* biome-ignore lint/a11y/useSemanticElements: The card contains its own expand button, so using a native button would create nested interactive elements. */
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      className={`relative h-56 w-66 overflow-visible text-left text-black font-inter transition-all duration-300 dark:text-white cursor-pointer ${
        isExpanded ? 'z-40' : 'z-0'
      }`}
    >
      {renderCardSurface(false)}
      {expandedPanel}
    </div>
  );
};

export default DormCard;
