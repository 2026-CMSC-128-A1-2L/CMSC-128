import { type FunctionComponent, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'react-router-dom';
import SideBar from '../../../components/user/SideBar';
import DormCard from '../../../components/user/DormCard';
import Banner from '../../../components/general/Banner';
import FilterTab from '../../../components/user/Filter/FilterTab';
import LoadingPage from '../../general/LoadingPage';
import { useFacilities, type DormCardData } from '../../../hooks/useFacilities';

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_WIDTH = 280;
const CARD_GAP = 24;

// ─── Carousel hook ────────────────────────────────────────────────────────────

const useCarousel = (total: number) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    setCurrent(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + CARD_GAP),
      behavior: 'smooth',
    });
  };

  return { trackRef, current, scrollTo, total };
};

// ─── View-all types ───────────────────────────────────────────────────────────

type ViewAllCategory = 'pasalo' | 'popular' | 'near' | 'mayLike' | null;

const CATEGORY_LABELS: Record<NonNullable<ViewAllCategory>, string> = {
  pasalo: 'Pasalo Units',
  popular: 'Popular Listings',
  near: 'Near Campus',
  mayLike: 'Listings You May Like',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const NavArrows = ({
  current,
  total,
  scrollTo,
}: {
  current: number;
  total: number;
  scrollTo: (i: number) => void;
}) => (
  <div className="flex items-center gap-[8px]">
    <button
      type="button"
      onClick={() => scrollTo(current - 1)}
      disabled={current === 0}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
      aria-label="Previous property"
    >
      <Icon icon="solar:arrow-left-bold" className="h-[16px] w-[16px] text-[#2f3136]" />
    </button>
    <button
      type="button"
      onClick={() => scrollTo(current + 1)}
      disabled={current === total - 1}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
      aria-label="Next property"
    >
      <Icon icon="solar:arrow-right-bold" className="h-[16px] w-[16px] text-[#096c5b]" />
    </button>
  </div>
);

const ViewAllLink = ({
  category,
  onViewAll,
}: {
  category: NonNullable<ViewAllCategory>;
  onViewAll: (category: ViewAllCategory) => void;
}) => (
  <button
    type="button"
    className="w-fit h-fit flex items-end justify-center gap-1 pt-4 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
    onClick={() => onViewAll(category)}
  >
    <div className="relative [text-decoration:underline] tracking-num-0.02 font-semibold">
      View All
    </div>
    <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3" />
  </button>
);

// ─── Carousel section ─────────────────────────────────────────────────────────

const CarouselSection = ({
  title,
  items,
  category,
  onViewAll,
  infoIcon,
}: {
  title: string;
  items: DormCardData[];
  category: ViewAllCategory;
  onViewAll: (c: ViewAllCategory) => void;
  infoIcon?: boolean;
}) => {
  const carousel = useCarousel(items.length);

  return (
    <div className="w-full min-w-0 flex flex-col items-start justify-center gap-6 dark:text-white">
      <div className="w-full h-fit flex items-center justify-between">
        <div className="h-full flex items-center gap-2">
          <div className="w-fit h-full flex items-start gap-2">
            <b className="w-fit relative flex items-start">{title}</b>
            {infoIcon && <Icon icon="material-symbols-light:info-outline" className="w-5 h-5" />}
          </div>
          {category && <ViewAllLink category={category} onViewAll={onViewAll} />}
        </div>
        <NavArrows current={carousel.current} total={carousel.total} scrollTo={carousel.scrollTo} />
      </div>
      <div
        ref={carousel.trackRef}
        className="w-full max-w-full flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((dorm) => (
          <div key={dorm.id} className="shrink-0">
            <DormCard key={dorm.id} {...dorm} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Empty / error states ─────────────────────────────────────────────────────

const EmptyState = ({ onBack, label }: { onBack: () => void; label: string }) => (
  <div className="w-full flex flex-col items-center justify-center py-20 gap-3 text-center">
    <Icon icon="mdi:home-search-outline" className="w-16 h-16 text-unselected" />
    <p className="text-[1rem] font-semibold text-dimgray">{label}</p>
    <button
      type="button"
      onClick={onBack}
      className="mt-2 px-5 py-2 rounded-full bg-[#e0f7f4] text-[#096c5b] text-[0.8rem] font-semibold hover:opacity-80 transition-opacity"
    >
      Back to home
    </button>
  </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="w-full flex flex-col items-center justify-center py-20 gap-3 text-center">
    <Icon icon="mdi:alert-circle-outline" className="w-16 h-16 text-red-400" />
    <p className="text-[1rem] font-semibold text-dimgray">Could not load listings</p>
    <p className="text-[0.875rem] text-unselected max-w-xs">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-2 px-5 py-2 rounded-full bg-[#e0f7f4] text-[#096c5b] text-[0.8rem] font-semibold hover:opacity-80 transition-opacity"
    >
      Try again
    </button>
  </div>
);

// ─── HomePage ─────────────────────────────────────────────────────────────────

const HomePage: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const [viewAllCategory, setViewAllCategory] = useState<ViewAllCategory>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: 0,
    maxPrice: 10000,
    pax: 'Any' as number | 'Any',
    propertyType: 'Dormitory',
    selectedEssentials: [] as string[],
    distance: 1,
  });

  // Real data from the backend
  const { facilities, isLoading, error, refetch } = useFacilities();

  // Apply filter criteria to backend data
  // TODO: extend with rating, distance, and tags once available in DormCardData
  const filterApplied = facilities.filter(
    (dorm) =>
      dorm.price.min >= filterCriteria.minPrice &&
      dorm.price.max <= filterCriteria.maxPrice,
  );

  // Apply search on top of the filtered results
  const isSearching = searchTerm.trim().length > 0;
  const filteredDorms = isSearching
    ? filterApplied.filter(
        (dorm) =>
          dorm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dorm.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : filterApplied;

  // Category slices — swap for real filtered endpoints later
  const pasaloDorms = filterApplied.slice(0, 10);
  const popularDorms = filterApplied.slice(0, 10);
  const nearDorms = filterApplied.slice(0, 10);
  const mayLikeDorms = filterApplied.slice(0, 10);

  const CATEGORY_DATA: Record<NonNullable<ViewAllCategory>, DormCardData[]> = {
    pasalo: pasaloDorms,
    popular: popularDorms,
    near: nearDorms,
    mayLike: mayLikeDorms,
  };

  const handleViewAll = (category: ViewAllCategory) => {
    setViewAllCategory(category);
    setSearchTerm('');
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      nextParams.set('search', value);
    } else {
      nextParams.delete('search');
    }
    setSearchParams(nextParams, { replace: true });
    if (value.trim().length > 0) setViewAllCategory(null);
  };

  useEffect(() => {
    const searchFromUrl = searchParams.get('search') ?? '';
    setSearchTerm(searchFromUrl);
    if (searchFromUrl.trim()) setViewAllCategory(null);
  }, [searchParams]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full flex items-start text-left text-[0.875rem] text-dimgray font-inter gap-8">
      <div className="sticky top-0 h-screen w-fit shrink-0">
        <SideBar />
      </div>

      {/* right frame */}
      <div className="w-full min-w-0 h-fit flex items-start pt-15 pr-20 pb-20">
        <div className="h-fit w-full min-w-0 flex flex-col items-start gap-80">
          <div className="w-full min-w-0 flex flex-col items-start">

            {/* search bar */}
            <div className="w-full h-full overflow-hidden flex items-center pb-6 box-border">
              <div className="w-full flex items-center transition-all duration-300 bg-[#f8f9fa] rounded-num-12 py-3 pl-3 pr-4 border border-transparent focus-within:bg-white focus-within:shadow-[0_8px_10px_rgb(0,0,0,0.06)] focus-within:transform focus-within:-translate-y-[1px]">
                <Icon icon="ic:outline-search" className="w-5 h-5 text-unselected shrink-0" />
                <input
                  type="text"
                  placeholder="Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)"
                  value={searchTerm}
                  maxLength={50}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-num-14 font-semibold text-darkgreen placeholder:text-unselected placeholder:font-normal"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => handleSearch('')}
                    className="text-unselected hover:text-darkgreen"
                  >
                    <Icon icon="material-symbols:close-rounded" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-6 text-[1.5rem] text-gray">

              {/* greeting / filter button */}
              <div className="w-full flex items-center justify-between box-border">
                <div className="w-full h-8 flex-1 flex flex-col items-start justify-center">
                  <b className="relative leading-8 text-teal">Mabuhay, iskolar!</b>
                </div>
                <div className="w-fit h-fit flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(true)}
                    className="h-10 w-10 rounded-full bg-whitesmoke-100 flex items-center justify-center cursor-pointer hover:bg-lightcyan/45 transition-colors"
                  >
                    <Icon icon="mage:filter" className="w-6 h-6" />
                  </button>

                  {isFilterOpen && (
                    <div className="fixed inset-0 z-100 flex justify-end">
                      <button
                        type="button"
                        className="absolute inset-0 bg-preview/45 backdrop"
                        onClick={() => setIsFilterOpen(false)}
                        aria-label="Close filters"
                      />
                      <div className="relative z-10 w-full max-w-[500px] h-full bg-white animate-in slide-in-from-right duration-500 overflow-y-auto">
                        <FilterTab
                          filterCriteria={filterCriteria}
                          setFilterCriteria={setFilterCriteria}
                          onClose={() => setIsFilterOpen(false)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full min-w-0 flex flex-col items-start gap-10">
                {error ? (
                  <ErrorState message={error} onRetry={refetch} />
                ) : isSearching ? (
                  /* Search results */
                  <div className="w-full flex flex-col items-start gap-6">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <b className="text-[1rem] text-darkgreen">
                          Results for <span className="text-teal">"{searchTerm}"</span>
                        </b>
                        <span className="text-[0.75rem] text-unselected font-normal">
                          — {filteredDorms.length} listing{filteredDorms.length !== 1 ? 's' : ''} found
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSearch('')}
                        className="text-[0.75rem] text-teal-100 underline font-semibold hover:opacity-70 transition-opacity whitespace-nowrap"
                      >
                        Clear search
                      </button>
                    </div>

                    {filteredDorms.length > 0 ? (
                      <div className="w-full flex flex-wrap gap-6 py-1">
                        {filteredDorms.map((dorm) => (
                          <DormCard key={dorm.id} {...dorm} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        onBack={() => handleSearch('')}
                        label={`No listings found for "${searchTerm}"`}
                      />
                    )}
                  </div>
                ) : viewAllCategory ? (
                  /* View all category */
                  <div className="w-full flex flex-col items-start gap-6">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setViewAllCategory(null)}
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-whitesmoke-100 hover:bg-lightcyan/45 transition-colors"
                        >
                          <Icon icon="solar:arrow-left-bold" className="w-4 h-4 text-darkgreen" />
                        </button>
                        <b className="text-[1rem] text-darkgreen">
                          {CATEGORY_LABELS[viewAllCategory]}
                        </b>
                        <span className="text-[0.75rem] text-unselected font-normal">
                          — {CATEGORY_DATA[viewAllCategory].length} listing
                          {CATEGORY_DATA[viewAllCategory].length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setViewAllCategory(null)}
                        className="text-[0.75rem] text-teal-100 underline font-semibold hover:opacity-70 transition-opacity whitespace-nowrap"
                      >
                        Back to home
                      </button>
                    </div>

                    {CATEGORY_DATA[viewAllCategory].length > 0 ? (
                      <div className="w-full flex flex-wrap gap-6 py-1">
                        {CATEGORY_DATA[viewAllCategory].map((dorm) => (
                          <DormCard key={dorm.id} {...dorm} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        onBack={() => setViewAllCategory(null)}
                        label={`No listings under ${CATEGORY_LABELS[viewAllCategory]}`}
                      />
                    )}
                  </div>
                ) : (
                  /* Default home view */
                  <>
                    <CarouselSection
                      title="Pasalo Units"
                      items={pasaloDorms}
                      category="pasalo"
                      onViewAll={handleViewAll}
                      infoIcon
                    />
                    <CarouselSection
                      title="Popular Listings"
                      items={popularDorms}
                      category="popular"
                      onViewAll={handleViewAll}
                    />
                    <CarouselSection
                      title="Near Campus"
                      items={nearDorms}
                      category="near"
                      onViewAll={handleViewAll}
                    />
                    <CarouselSection
                      title="Listings You May Like"
                      items={mayLikeDorms}
                      category="mayLike"
                      onViewAll={handleViewAll}
                    />

                    <Banner />

                    {/* All listings */}
                    <div className="w-full min-w-0 self-stretch flex flex-col items-start justify-center gap-6">
                      <div className="w-full h-10 flex items-center">
                        <b className="w-fit flex items-center">All Listings</b>
                      </div>
                      <div className="w-full flex flex-wrap gap-6">
                        {filterApplied.map((dorm) => (
                          <DormCard key={dorm.id} {...dorm} />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;