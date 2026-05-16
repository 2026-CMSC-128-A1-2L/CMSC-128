import {
  type FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../../../components/user/SideBar";
import DormCard from "../../../components/user/DormCard";
import Banner from "../../../components/general/Banner";
import PageBackground from "../../../components/general/PageBackground";
import FilterTab from "../../../components/user/Filter/FilterTab";
import LoadingPage from "../../general/LoadingPage";
import { useFacilities, type DormCardData } from "../../../hooks/useFacilities";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import TutorialIcon from "../../../../assets/help-chat.svg";

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_WIDTH = 280;
const CARD_GAP = 24;

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
});

const priceRange = (min: number, max: number): string => {
  if (min === 0 && max === 0) return "Price TBA";
  if (min === max) return `${currencyFormatter.format(min)}/month`;
  return `${currencyFormatter.format(min)} - ${currencyFormatter.format(max)}/month`;
};

// ─── Carousel hook ────────────────────────────────────────────────────────────

const useCarousel = (total: number) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    setCurrent(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  };

  return { trackRef, current, scrollTo, total };
};

// ─── View-all types ───────────────────────────────────────────────────────────

type ViewAllCategory = "pasalo" | "popular" | "near" | "mayLike" | null;

const CATEGORY_LABELS: Record<NonNullable<ViewAllCategory>, string> = {
  pasalo: "Pasalo Units",
  popular: "Popular Listings",
  near: "Near Campus",
  mayLike: "Listings You May Like",
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
      className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30 cursor-pointer"
      aria-label="Previous property"
    >
      <Icon
        icon="solar:arrow-left-bold"
        className="h-[16px] w-[16px] text-[#2f3136]"
      />
    </button>
    <button
      type="button"
      onClick={() => scrollTo(current + 1)}
      disabled={current === total - 1}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30 cursor-pointer"
      aria-label="Next property"
    >
      <Icon
        icon="solar:arrow-right-bold"
        className="h-[16px] w-[16px] text-[#096c5b]"
      />
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
            {infoIcon && (
              <Icon
                icon="material-symbols-light:info-outline"
                className="w-5 h-5"
              />
            )}
          </div>
          {category && (
            <ViewAllLink category={category} onViewAll={onViewAll} />
          )}
        </div>
        <NavArrows
          current={carousel.current}
          total={carousel.total}
          scrollTo={carousel.scrollTo}
        />
      </div>
      <div
        ref={carousel.trackRef}
        className="w-full max-w-full flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((dorm) => (
          <div key={dorm.id} className="shrink-0">
            <DormCard
              key={dorm.id}
              {...dorm}
              sourceLabel={category ? CATEGORY_LABELS[category] : undefined}
              sourceUrl="/home"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Empty / error states ─────────────────────────────────────────────────────

const EmptyState = ({
  onBack,
  label,
}: {
  onBack: () => void;
  label: string;
}) => (
  <div className="w-full flex flex-col items-center justify-center py-20 gap-3 text-center">
    <Icon
      icon="mdi:home-search-outline"
      className="w-16 h-16 text-unselected"
    />
    <p className="text-[1rem] font-semibold text-dimgray">{label}</p>
    <button
      type="button"
      onClick={onBack}
      className="mt-2 px-5 py-2 rounded-full bg-[#e0f7f4] text-[#096c5b] text-[0.8rem] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
    >
      Back to home
    </button>
  </div>
);

const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="w-full flex flex-col items-center justify-center py-20 gap-3 text-center">
    <Icon icon="mdi:alert-circle-outline" className="w-16 h-16 text-red-400" />
    <p className="text-[1rem] font-semibold text-dimgray">
      Could not load listings
    </p>
    <p className="text-[0.875rem] text-unselected max-w-xs">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-2 px-5 py-2 rounded-full bg-[#e0f7f4] text-[#096c5b] text-[0.8rem] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
    >
      Try again
    </button>
  </div>
);

const ApplicationGuideModal = ({ onClose }: { onClose: () => void }) => {
  const steps = [
    {
      title: "Pick a dorm",
      description: (
        <>
          Select your preferred residence from the Listings dashboard. You can
          filter by <b>Budget-Friendly Picks</b> or browse{" "}
          <b>Popular Listings</b> to find the unit that best fit your needs.
        </>
      ),
    },
    {
      title: "Fill up your details",
      description:
        "Once you select a dorm, a detailed summary of your choice will be displayed. Fill out the necessary information before submitting your application to the landlord.",
    },
    {
      title: "Wait for confirmation",
      description:
        "Once confirmed, the landlord will reach out to you via system notifications. Be sure to check your DMs regularly for updates.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/35 px-5 py-8">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label="Close application guide"
      />
      <section
        className="relative z-10 flex h-[531px] w-[554px] max-h-[calc(100vh-32px)] max-w-[calc(100vw-32px)] flex-col overflow-y-auto rounded-[18px] bg-white px-[40px] pb-[40px] pt-[34px] text-[#1f6f60] shadow-[0_2px_14px_rgba(0,0,0,0.24)]"
        aria-modal="true"
        role="dialog"
        aria-labelledby="application-guide-title"
      >
        <div className="text-center">
          <h2
            id="application-guide-title"
            className="font-inter text-[24px] font-bold leading-tight text-[#164f43]"
          >
            Application Guide
          </h2>
          <p className="mt-[6px] font-lora text-[13px] font-semibold leading-snug text-[#164f43]">
            Everything you need to know about applying for your stay at UPLB!
          </p>
        </div>

        <div className="mt-[30px] grid grid-cols-[50px_1fr] gap-x-[24px] gap-y-[41px]">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <div key={step.title} className="contents">
                <div className="relative flex justify-center">
                  {!isLast && (
                    <span className="absolute top-[34px] h-[calc(100%+41px)] w-[2px] rounded-full bg-[#237866]" />
                  )}
                  <span className="relative z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#237866] font-lora text-[17px] font-semibold text-white">
                    {index + 1}
                  </span>
                </div>
                <div className="max-w-[402px] pb-0">
                  <h3 className="font-inter text-[16px] font-bold leading-tight text-[#237866]">
                    {step.title}
                  </h3>
                  <p className="mt-[7px] font-lora text-[13px] font-semibold leading-[1.18] text-[#1f6f60]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mx-auto mt-auto h-[36px] w-full max-w-[318px] rounded-[5px] bg-[#4c8c7e] font-lora text-[15px] font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#237866] active:translate-y-0 cursor-pointer"
        >
          Got it, thanks!
        </button>
      </section>
    </div>
  );
};

// ─── HomePage ─────────────────────────────────────────────────────────────────

const HomePage: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? "",
  );
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  const [viewAllCategory, setViewAllCategory] = useState<ViewAllCategory>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: 0,
    maxPrice: 10000,
    pax: "Any" as number | "Any",
    propertyType: "Dormitory",
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

  const trimmedSearchTerm = searchTerm.trim();
  const trimmedDebouncedSearchTerm = debouncedSearchTerm.trim();
  const isSearchDebouncing = trimmedSearchTerm !== trimmedDebouncedSearchTerm;
  const matchingSearchResults = trimmedDebouncedSearchTerm
    ? facilities
        .filter((dorm) => {
          const roomTypes = dorm.room_types.map((room) => room.pax).join(" ");
          return `${dorm.name} ${dorm.location} ${roomTypes}`
            .toLowerCase()
            .includes(trimmedDebouncedSearchTerm.toLowerCase());
        })
        .slice(0, 6)
    : [];

  // Category slices — swap for real filtered endpoints later
  const pasaloDorms = filterApplied.slice(0, 10);
  const popularDorms = [...filterApplied]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 10);
  const nearDorms = filterApplied.slice(0, 10);
  const mayLikeDorms = useMemo(
    () => [...filterApplied].sort(() => Math.random() - 0.5).slice(0, 10),
    [filterApplied],
  );

  const CATEGORY_DATA: Record<NonNullable<ViewAllCategory>, DormCardData[]> = {
    pasalo: pasaloDorms,
    popular: popularDorms,
    near: nearDorms,
    mayLike: mayLikeDorms,
  };

  const handleViewAll = (category: ViewAllCategory) => {
    setViewAllCategory(category);
    setSearchTerm("");
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setIsSearchDropdownOpen(value.trim().length > 0);
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }
    setSearchParams(nextParams, { replace: true });
    if (value.trim().length > 0) setViewAllCategory(null);
  };

  const openSearchResult = (dorm: DormCardData) => {
    const query = searchTerm.trim();
    setIsSearchDropdownOpen(false);
    navigate(`/facilities/${dorm.id}`, {
      state: {
        dorm,
        sourceLabel: "Search Results",
        sourceUrl: query
          ? `/home?search=${encodeURIComponent(query)}`
          : "/home",
      },
    });
  };

  useEffect(() => {
    const searchFromUrl = searchParams.get("search") ?? "";
    setSearchTerm(searchFromUrl);
    if (searchFromUrl.trim()) setViewAllCategory(null);
  }, [searchParams]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="user-home-shell relative w-full flex items-start text-left text-[0.875rem] text-dimgray font-inter gap-8 bg-transparent">
      <PageBackground />
      <div className="sticky top-0 h-screen w-fit shrink-0 z-20">
        <SideBar />
      </div>

      {/* right frame */}
      <div className="relative z-10 w-full min-w-0 h-fit flex items-start pt-15 pr-20 pb-20">
        <div className="h-fit w-full min-w-0 flex flex-col items-start gap-80">
          <div className="w-full min-w-0 flex flex-col items-start">
            {/* search bar */}
            <div className="relative w-full h-full flex items-center pb-6 box-border">
              <div className="w-full flex items-center transition-all duration-300 bg-[#f8f9fa] rounded-num-12 py-3 pl-3 pr-4 border border-transparent focus-within:bg-white focus-within:shadow-[0_8px_10px_rgb(0,0,0,0.06)] focus-within:transform focus-within:-translate-y-[1px] gap-2">
                <Icon
                  icon="ic:outline-search"
                  className="w-5 h-5 text-unselected shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)"
                  value={searchTerm}
                  maxLength={50}
                  onFocus={() =>
                    setIsSearchDropdownOpen(searchTerm.trim().length > 0)
                  }
                  onBlur={() => {
                    window.setTimeout(
                      () => setIsSearchDropdownOpen(false),
                      120,
                    );
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-num-14 font-semibold text-darkgreen placeholder:text-unselected placeholder:font-normal"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      handleSearch("");
                      setIsSearchDropdownOpen(false);
                    }}
                    className="text-unselected hover:text-darkgreen cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:close-rounded"
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </div>
              {isSearchDropdownOpen && trimmedSearchTerm && (
                <div className="absolute left-0 right-0 top-[calc(100%-1rem)] z-40 overflow-hidden rounded-num-12 border border-whitesmoke-200 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.14)]">
                  {isSearchDebouncing ? (
                    <div className="flex items-center gap-3 px-4 py-4 text-sm font-semibold text-unselected">
                      <Icon
                        icon="eos-icons:loading"
                        className="h-5 w-5 text-teal-100"
                      />
                      Searching listings...
                    </div>
                  ) : matchingSearchResults.length > 0 ? (
                    matchingSearchResults.map((dorm) => (
                      <button
                        key={dorm.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => openSearchResult(dorm)}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-whitesmoke-100"
                      >
                        <img
                          src={dorm.image}
                          alt=""
                          className="h-12 w-16 shrink-0 rounded-md object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-num-14 font-bold text-darkgreen">
                            {dorm.name}
                          </span>
                          <span className="block truncate text-[0.75rem] font-semibold text-teal-100">
                            {priceRange(dorm.price.min, dorm.price.max)}
                          </span>
                          <span className="block truncate text-[0.72rem] font-semibold text-unselected">
                            {dorm.location}
                          </span>
                        </span>
                        <Icon
                          icon="solar:arrow-right-bold"
                          className="h-4 w-4 shrink-0 text-teal-100"
                        />
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-sm font-semibold text-unselected">
                      No matching listings found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-full flex flex-col items-start gap-6 text-[1.5rem] text-gray">
              {/* greeting / filter button */}
              <div className="w-full flex items-center justify-between box-border">
                <div className="w-full h-8 flex-1 flex flex-col items-start justify-center">
                  <b className="relative leading-8 text-teal">
                    Mabuhay, iskolar!
                  </b>
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
                        className="absolute inset-0 bg-preview/45 backdrop cursor-pointer"
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
                ) : viewAllCategory ? (
                  /* View all category */
                  <div className="w-full flex flex-col items-start gap-6">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setViewAllCategory(null)}
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-whitesmoke-100 hover:bg-lightcyan/45 transition-colors cursor-pointer"
                        >
                          <Icon
                            icon="solar:arrow-left-bold"
                            className="w-4 h-4 text-darkgreen"
                          />
                        </button>
                        <b className="text-[1rem] text-darkgreen">
                          {CATEGORY_LABELS[viewAllCategory]}
                        </b>
                        <span className="text-[0.75rem] text-unselected font-normal">
                          — {CATEGORY_DATA[viewAllCategory].length} listing
                          {CATEGORY_DATA[viewAllCategory].length !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setViewAllCategory(null)}
                        className="text-[0.75rem] text-teal-100 underline font-semibold hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer"
                      >
                        Back to home
                      </button>
                    </div>

                    {CATEGORY_DATA[viewAllCategory].length > 0 ? (
                      <div className="w-full flex flex-wrap gap-6 py-1">
                        {CATEGORY_DATA[viewAllCategory].map((dorm) => (
                          <DormCard
                            key={dorm.id}
                            {...dorm}
                            sourceLabel={CATEGORY_LABELS[viewAllCategory]}
                            sourceUrl="/home"
                          />
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
                          <DormCard
                            key={dorm.id}
                            {...dorm}
                            sourceLabel="All Listings"
                            sourceUrl="/home"
                          />
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

      <button
        type="button"
        className="help-button-animated z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(true)}
        aria-label="Open application guide"
      >
        <img
          src={TutorialIcon}
          alt="Help"
          className="w-16 h-16 drop-shadow-lg"
        />
      </button>

      {showHelp && <ApplicationGuideModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default HomePage;
