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
  room_types: { pax: string; price: number; unitCount?: number; availableUnitCount?: number }[];
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
  const [panelPosition, setPanelPosition] = useState({ left: 0, top: 0, width: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const updatePanelPosition = useCallback(() => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPanelPosition({
      left: rect.left,
      top: rect.bottom + 8,
      width: rect.width,
    });
  }, []);

  const navigateToDetails = (selectedRoomType?: string) => {
    navigate(`/facilities/${id}`, {
      state: {
        dorm: {
          id,
          name,
          rating,
          price,
          location,
          image,
          room_types,
        },
        selectedRoomType,
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

  const expandedPanel =
    isExpanded && typeof document !== 'undefined'
      ? createPortal(
          <div
            data-expanded-panel="true"
            className="fixed z-[1000] animate-fade-in rounded-[15.31px] border border-whitesmoke-200 bg-white px-4 py-3 text-left font-inter text-black shadow-[0_12px_28px_rgba(0,0,0,0.16)] dark:border-[#303331] dark:bg-[#141515] dark:text-white"
            style={{
              left: panelPosition.left,
              top: panelPosition.top,
              width: panelPosition.width,
            }}
          >
            <div className="mb-2 text-num-12 h-fit font-semibold text-dimgray font-lora dark:text-[#a4acba]">
              Available Listings:
            </div>
            {room_types.length > 0 ? (
              <div className="w-full flex flex-col gap-1">
                {room_types.map((room) => {
                  const isFull =
                    typeof room.availableUnitCount === 'number' &&
                    room.availableUnitCount <= 0 &&
                    (room.unitCount ?? 0) > 0;

                  return (
                    <button
                      key={`${room.pax}-${room.price}`}
                      type="button"
                      data-card-interactive="true"
                      data-room-type={room.pax}
                      disabled={isFull}
                      onClick={(event) => handleRoomClick(event, isFull)}
                      className={`flex justify-between rounded-md px-2 py-1 text-left text-num-12 font-inter transition-colors ${
                        isFull
                          ? 'cursor-not-allowed bg-whitesmoke-100 text-silver dark:bg-[#202221] dark:text-[#69717b]'
                          : 'text-black hover:bg-lightcyan dark:text-[#d7e0ef] dark:hover:bg-[#1f3a34]'
                      }`}
                    >
                      <span className="font-bold">{room.pax}</span>
                      <span className={isFull ? 'text-silver dark:text-[#69717b]' : 'text-dimgray dark:text-[#a4acba]'}>
                        {isFull ? 'Full' : `${currencyFormatter.format(room.price)}/month`}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-num-12 text-unselected dark:text-[#a4acba]">No listings available yet.</p>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {/* biome-ignore lint/a11y/useSemanticElements: The card contains its own expand button, so using a native button would create nested interactive elements. */}
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
        <div className="relative z-10 flex h-full w-full flex-col items-start overflow-hidden rounded-[15.31px] border border-solid border-whitesmoke bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-[#303331] dark:bg-[#101111] dark:shadow-none dark:hover:border-[#45665e]">
          <img className="w-66 h-30 object-cover" src={image} alt={name} />

          <div className="w-full flex flex-col py-2 px-3 gap-2">
            <div className="w-full flex flex-col items-start gap-0">
              <div className="w-full h-fit flex items-start gap-1">
                <b className="w-full relative flex items-center text-num-16">{name}</b>
                <div className="w-fit h-fit flex items-center gap-1 text-[0.718rem] font-lora text-darkslategray-200 dark:text-white">
                  <Icon icon="material-symbols:star-rounded" className="w-5 h-5 text-[#f5b642] dark:text-white" />
                  <div className="relative font-semibold">{rating}</div>
                </div>
              </div>
              <b className="relative text-num-14 text-teal dark:text-[#72cbb8]">{priceRange(price.min, price.max)}</b>
            </div>

            <div className="w-full h-fit flex flex-col gap-1">
              <div className="w-full relative flex items-center gap-1 text-left text-dimgray font-lora dark:text-[#a4acba]">
                <Icon icon="material-symbols-light:location-on" className="w-3 h-3" />
                <div className="flex-1 relative text-num-10 font-semibold">{location}</div>
              </div>

              <div className="w-full h-fit flex justify-center items-end">
                <button
                  type="button"
                  data-card-interactive="true"
                  onClick={handleToggleExpand}
                  className="hover:scale-125 transition-transform flex items-center justify-center p-1"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <Icon
                    icon={isExpanded ? 'bi:chevron-compact-up' : 'bi:chevron-compact-down'}
                    className="w-6 h-6 text-teal dark:text-[#72cbb8]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {expandedPanel}
    </>
  );
};

export default DormCard;
