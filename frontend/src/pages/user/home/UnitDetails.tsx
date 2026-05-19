import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type FunctionComponent,
  type MouseEvent,
} from "react";
import SideBar from "../../../components/user/SideBar";
import Footer from "../../../components/general/Footer";
import PageBackground from "../../../components/general/PageBackground";
import SignInPopUp from "../../../components/general/SignInPopUp";
import { Icon } from "@iconify/react";
import axios from "axios";
import PropertyTabs from "../../../components/user/unitdetails/PropertyTabs";
import ImageCarousel from "../../../components/user/unitdetails/ImageCarousel";
import BreadcrumbHeader from "../../../components/general/Breadcrumb";

import AboutDetails from "../../../components/user/unitdetails/AboutDetails";
import AmenetiesDetails from "../../../components/user/unitdetails/AmenetiesDetails";
import RulesDetails from "../../../components/user/unitdetails/RulesDetails";
import LocationDetails from "../../../components/user/unitdetails/LocationDetails";
import ReviewDetails from "../../../components/user/unitdetails/ReviewDetails";
import PropertyTab from "../../../components/user/unitdetails/PropertyTab";
import DormCard from "../../../components/user/DormCard";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LoadingPage from "../../general/LoadingPage";
import { useFacilities, type DormCardData } from "../../../hooks/useFacilities";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useFacilityDetails } from "../../../hooks/useFacilityDetails";
import { useBookmarks } from "../../../hooks/useBookmarks";
import { BookmarkService } from "../../../service/BookmarkService";
import { ApplicationService } from "../../../service/ApplicationService";
import { RentalService } from "../../../service/RentalService";
import { TransferService } from "../../../service/TransferService";
import CalendarPopout from "../../../components/user/user-calendar/CalendarPopout";
import PortalPopup from "../../../components/general/PortalPopup";
import NotificationToast from "../../../components/general/NotificationToast";
import { useAuthStore } from "../../../store/useAuthStore";

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

const roomButtonLabel = (label: string) =>
  label.replace(/\s*\([^)]*\)\s*$/, "");
const objectIdPattern = /^[a-f\d]{24}$/i;

const leaseDurations = ["1 sem", "2 sem", "1 year"];
const leaseDurationValues: Record<string, "6-months" | "12-months"> = {
  "1 sem": "6-months",
  "2 sem": "12-months",
  "1 year": "12-months",
};
const leaseDurationLabels: Record<"6-months" | "12-months", string> = {
  "6-months": "1 sem",
  "12-months": "1 year",
};
const amenityTagIcons: Record<string, string> = {
  hasWifi: "material-symbols:wifi",
  hasAircon: "material-symbols:snowflake",
  hasCctv: "boxicons:cctv",
  hasLaundry: "streamline:hotel-laundry",
  securityGuard: "carbon:police",
  hasStudyDesk: "boxicons:desk",
  hasRefrigerator: "mdi:refrigerator-outline",
  hasKitchen: "emojione-monotone:kitchen-knife",
};
const amenityTagNames = Object.keys(amenityTagIcons);
const ruleTagNames = [
  "visitorPolicy",
  "smokingPolicy",
  "petsPolicy",
  "curfew",
  "paymentPolicy",
];
const aboutTagNames = [
  "layout",
  "floorAreaSqm",
  "floorLevel",
  "bathroom",
  "furnishing",
  "genderPolicy",
  "leaseTerm",
  "moveInPolicy",
];

const formatTagValue = (value: string | number | boolean) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString();
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
};

type UnitDetailsLocationState = {
  dorm?: DormCardData;
  selectedRoomType?: string;
  isPasalo?: boolean;
  transferId?: string;
  pasaloUnitId?: string;
  pasaloListingId?: string;
  pasaloMoveInDate?: string;
  pasaloLeaseDuration?: "6-months" | "12-months";
  sourceLabel?: string;
  sourceUrl?: string;
};

type ApplicationWarning = {
  id: number;
  message?: string;
  type?: "warning" | "success";
};

const getDataArray = (response: unknown): unknown[] => {
  if (Array.isArray(response)) return response;
  if (response && typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data;
    if (Array.isArray(data)) return data;
  }
  return [];
};

const hasCurrentRental = (rentals: unknown[]) =>
  rentals.some((rental) => {
    if (!rental || typeof rental !== "object") return false;
    const status = String((rental as { status?: unknown }).status ?? "");
    return status === "active" || status === "inactive";
  });

const UnitDetails: FunctionComponent = () => {
  const user = useAuthStore((state) => state.user);
  const { facilityId } = useParams<{ facilityId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const routeState = location.state as UnitDetailsLocationState | null;
  const selectedDorm = routeState?.dorm;
  const selectedRoomType = routeState?.selectedRoomType;
  const breadcrumbSourceLabel = routeState?.sourceLabel ?? "Facilities";
  const breadcrumbSourceUrl = routeState?.sourceUrl ?? "/home";
  const { facility, isLoading, error, refetch } = useFacilityDetails(
    facilityId,
    selectedDorm,
  );
  const { facilities: recommendedDorms } = useFacilities();
  const {
    bookmarks,
    refetch: refetchBookmarks,
    removeBookmark,
  } = useBookmarks({ sortBy: "date", order: "desc" });
  const [selectedListingId, setSelectedListingId] = useState("");
  const [leaseDuration, setLeaseDuration] = useState("");
  const [isLeaseMenuOpen, setIsLeaseMenuOpen] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [messageToLandlord, setMessageToLandlord] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  const [isBookmarkSaving, setIsBookmarkSaving] = useState(false);
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [hasCurrentDorm, setHasCurrentDorm] = useState(false);
  const [isCheckingCurrentDorm, setIsCheckingCurrentDorm] = useState(false);
  const [applicationWarnings, setApplicationWarnings] = useState<
    ApplicationWarning[]
  >([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isVisitPopoutOpen, setVisitPopoutOpen] = useState(false);
  const [pasaloDetails, setPasaloDetails] = useState<{
    transferId: string;
    unitId?: string;
    listingId?: string;
    moveInDate?: string;
    leaseDuration?: "6-months" | "12-months";
  } | null>(null);
  const availableListings = useMemo(() => facility?.listings ?? [], [facility]);
  const transferId =
    routeState?.transferId ??
    selectedDorm?.transferId ??
    searchParams.get("transferId") ??
    "";
  const isPasaloApplication = Boolean(
    routeState?.isPasalo || selectedDorm?.isPasalo || transferId,
  );

  useEffect(() => {
    if (
      !availableListings.some((listing) => listing.id === selectedListingId)
    ) {
      const matchingListing = availableListings.find(
        (listing) =>
          selectedRoomType != null &&
          roomButtonLabel(listing.label).toLowerCase() ===
          roomButtonLabel(selectedRoomType).toLowerCase(),
      );

      setSelectedListingId((matchingListing ?? availableListings[0])?.id ?? "");
    }
  }, [selectedListingId, availableListings, selectedRoomType]);

  useEffect(() => {
    if (!isPasaloApplication || !transferId) {
      setPasaloDetails(null);
      return;
    }

    const stateDetails = {
      transferId,
      unitId: routeState?.pasaloUnitId ?? selectedDorm?.pasaloUnitId,
      listingId: routeState?.pasaloListingId ?? selectedDorm?.pasaloListingId,
      moveInDate: routeState?.pasaloMoveInDate ?? selectedDorm?.pasaloMoveInDate,
      leaseDuration: routeState?.pasaloLeaseDuration ?? selectedDorm?.pasaloLeaseDuration,
    };

    setPasaloDetails(stateDetails);

    let cancelled = false;
    TransferService.getPasaloTransfer(transferId)
      .then((response) => {
        if (cancelled) return;
        const transfer = response.data ?? response;
        const unit = transfer.unitId;
        setPasaloDetails({
          transferId,
          unitId: unit?._id ?? unit?.id ?? stateDetails.unitId,
          listingId: unit?.listingId?._id ?? unit?.listingId?.id ?? stateDetails.listingId,
          moveInDate: transfer.pasaloMoveInDate ?? stateDetails.moveInDate,
          leaseDuration: transfer.pasaloLeaseDuration ?? stateDetails.leaseDuration,
        });
      })
      .catch(() => {
        if (!cancelled) setPasaloDetails(stateDetails);
      });

    return () => {
      cancelled = true;
    };
  }, [isPasaloApplication, routeState, selectedDorm, transferId]);

  useEffect(() => {
    if (!pasaloDetails) return;

    if (pasaloDetails.listingId) {
      setSelectedListingId(pasaloDetails.listingId);
    }
    if (pasaloDetails.leaseDuration) {
      setLeaseDuration(leaseDurationLabels[pasaloDetails.leaseDuration]);
      setIsLeaseMenuOpen(false);
    }
    if (pasaloDetails.moveInDate) {
      setMoveInDate(pasaloDetails.moveInDate);
    }
  }, [pasaloDetails]);

  useEffect(() => {
    if (!user) {
      setHasCurrentDorm(false);
      setIsCheckingCurrentDorm(false);
      return;
    }

    let cancelled = false;
    setIsCheckingCurrentDorm(true);

    RentalService.getMyRentals()
      .then((response) => {
        if (cancelled) return;
        setHasCurrentDorm(hasCurrentRental(getDataArray(response)));
      })
      .catch(() => {
        if (!cancelled) setHasCurrentDorm(false);
      })
      .finally(() => {
        if (!cancelled) setIsCheckingCurrentDorm(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const showLoggedOutApplicationWarning = () => {
    const id = Date.now() + Math.random();
    setApplicationWarnings((warnings) => [...warnings, { id }]);
    window.setTimeout(() => {
      setApplicationWarnings((warnings) =>
        warnings.filter((warning) => warning.id !== id),
      );
    }, 3000);
  };

  const showSuccessToast = (message: string) => {
    const id = Date.now() + Math.random();
    setApplicationWarnings((warnings) => [
      ...warnings,
      { id, message, type: "success" },
    ]);
    window.setTimeout(() => {
      setApplicationWarnings((warnings) =>
        warnings.filter((warning) => warning.id !== id),
      );
    }, 3000);
  };

  const runAuthenticatedAction = (action: () => void) => {
    if (!user) {
      showLoggedOutApplicationWarning();
      return;
    }

    action();
  };

  const handleAuthenticatedLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (user) return;

    event.preventDefault();
    showLoggedOutApplicationWarning();
  };

  const applicationWarningToasts = applicationWarnings.map((warning, index) => (
    <NotificationToast
      key={warning.id}
      show={true}
      message={warning.message ?? "Please sign in to continue."}
      type={warning.type ?? "warning"}
      position="top-right"
      stackIndex={index}
      onClose={() =>
        setApplicationWarnings((warnings) =>
          warnings.filter((item) => item.id !== warning.id),
        )
      }
    />
  ));

  if (isLoading && !facility) return <LoadingPage />;

  if (error && !facility) {
    return (
      <div className="flex min-h-screen font-lora text-darkslategray-100">
        {applicationWarningToasts}
        <div className="sticky top-0 h-screen shrink-0 z-10">
          <SideBar />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <Icon
            icon="mdi:alert-circle-outline"
            className="h-16 w-16 text-red-400"
          />
          <b className="text-xl text-darkgreen">Could not load this facility</b>
          <p className="max-w-md text-sm text-dimgray">{error}</p>
          <button
            type="button"
            onClick={() => runAuthenticatedAction(refetch)}
            className="rounded-lg bg-darkslategray-200 px-5 py-2 text-sm font-semibold text-white cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!facility) return null;

  const trimmedSearchTerm = searchTerm.trim();
  const trimmedDebouncedSearchTerm = debouncedSearchTerm.trim();
  const isSearchDebouncing = trimmedSearchTerm !== trimmedDebouncedSearchTerm;
  const matchingSearchResults = trimmedDebouncedSearchTerm
    ? recommendedDorms
      .filter((dorm) => {
        const roomTypes = dorm.room_types.map((room) => room.pax).join(" ");
        return `${dorm.name} ${dorm.location} ${roomTypes}`
          .toLowerCase()
          .includes(trimmedDebouncedSearchTerm.toLowerCase());
      })
      .slice(0, 6)
    : [];

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/home?search=${encodeURIComponent(query)}` : "/home");
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

  const selectedListing =
    availableListings.find((listing) => listing.id === selectedListingId) ??
    availableListings[0];
  const applicationListings =
    isPasaloApplication && selectedListing ? [selectedListing] : availableListings;
  const isSelectedListingBookmarked = bookmarks.some(
    (bookmark) => bookmark.listingId === selectedListing?.id,
  );
  const primaryRent = selectedListing?.price ?? 0;
  const selectedPriceLabel =
    primaryRent > 0 ? currencyFormatter.format(primaryRent) : "Price TBA";
  const tagDefinitionsByName = new Map(
    facility.tagDefinitions.map((tag) => [tag.name, tag]),
  );
  const selectedListingTags = Object.entries(selectedListing?.tags ?? {})
    .filter(([key]) => key !== "seedSource" && key !== "roomLabel")
    .map(([name, value]) => ({
      name,
      value,
      label: tagDefinitionsByName.get(name)?.displayName ?? name,
    }));
  const selectedListingTagMap = new Map(
    selectedListingTags.map((tag) => [tag.name, tag]),
  );
  const estimatedUtilities =
    primaryRent > 0 ? Math.round(primaryRent * 0.15) : 0;
  const securityDeposit = primaryRent > 0 ? primaryRent * 2 : 0;
  const moveInCost = primaryRent + estimatedUtilities + securityDeposit;
  const landlordSince =
    facility.landlord?.createdAt != null
      ? new Date(facility.landlord.createdAt).getFullYear().toString()
      : "N/A";
  const landlordMessagePath = facility.landlord?.id
    ? `/direct-messages/${facility.landlord.id}`
    : "/direct-messages";
  const detailTags = [
    facility.allowVisit ? "Visits Allowed" : "Visits Unavailable",
    facility.allowTransfer ? "Transfers Allowed" : "Transfers Unavailable",
    `${availableListings.length} Room Type${availableListings.length === 1 ? "" : "s"}`,
    facility.price.min > 0
      ? `From ${currencyFormatter.format(facility.price.min)}`
      : "Price TBA",
  ];
  const aboutDetails = [
    {
      label: "ROOM TYPE",
      value: selectedListing ? roomButtonLabel(selectedListing.label) : "TBA",
    },
    {
      label: "UNITS AVAILABLE",
      value: selectedListing
        ? `${selectedListing.availableUnitCount} of ${selectedListing.unitCount}`
        : "TBA",
    },
    ...aboutTagNames
      .map((name) => selectedListingTagMap.get(name))
      .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag))
      .map((tag) => ({
        label: tag.label.toUpperCase(),
        value: formatTagValue(tag.value),
      })),
  ];
  const included = ["hasWifi", "hasKitchen", "hasLaundry", "hasAircon"].map(
    (name) => ({
      label: tagDefinitionsByName.get(name)?.displayName ?? name,
      active: selectedListingTagMap.get(name)?.value === true,
    }),
  );
  const amenities = amenityTagNames.map((name) => ({
    icon: amenityTagIcons[name],
    label: tagDefinitionsByName.get(name)?.displayName ?? name,
    active: selectedListingTagMap.get(name)?.value === true,
  }));
  const rules = ruleTagNames
    .map((name) => selectedListingTagMap.get(name))
    .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag))
    .map((tag) => ({
      text: `${tag.label}: ${formatTagValue(tag.value)}`,
      ok: !["smokingPolicy", "petsPolicy"].includes(tag.name),
    }));
  const reviewRatings = facility.reviews
    .map((review) => review.rating)
    .filter((rating) => rating > 0);
  const overallScore =
    reviewRatings.length > 0
      ? Number(
        (
          reviewRatings.reduce((sum, rating) => sum + rating, 0) /
          reviewRatings.length
        ).toFixed(1),
      )
      : 0;
  const ratingRows = [5, 4, 3, 2, 1].map((star) => {
    const count = reviewRatings.filter(
      (rating) => Math.round(rating) === star,
    ).length;
    const width =
      reviewRatings.length > 0
        ? `${(count / reviewRatings.length) * 100}%`
        : "0%";
    return { star, width, count };
  });
  const reviews = facility.reviews.map((review) => {
    const [firstName = "", lastName = ""] = review.reviewerName.split(" ");
    const initials = `${firstName[0] ?? "S"}${lastName[0] ?? ""}`.toUpperCase();
    const date = review.createdAt
      ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(review.createdAt))
      : "Recently";

    return {
      id: review.id,
      initials,
      name: review.reviewerName,
      date,
      rating: `${review.rating.toFixed(1)} / 5.0`,
      text: review.description || "No written review was provided.",
      mediaUrls: review.mediaUrls,
    };
  });

  const handleBookmarkToggle = async () => {
    if (!user) {
      setBookmarkError(null);
      showLoggedOutApplicationWarning();
      return;
    }

    if (!selectedListing) return;

    setIsBookmarkSaving(true);
    setBookmarkError(null);

    try {
      if (isSelectedListingBookmarked) {
        await removeBookmark(selectedListing.id);
        showSuccessToast("Removed from bookmarks");
      } else {
        await BookmarkService.addBookmark(selectedListing.id);
        showSuccessToast("Added to bookmarks");
        refetchBookmarks();
      }
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      if (status === 401) {
        setShowSignIn(true);
        return;
      }

      setBookmarkError(
        status === 403
          ? "Bookmarks are only available for verified student accounts."
          : err instanceof Error
            ? err.message
            : "Failed to update bookmark.",
      );
    } finally {
      setIsBookmarkSaving(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!user) {
      setApplicationError(null);
      showLoggedOutApplicationWarning();
      return;
    }

    if (!selectedListing) {
      setApplicationError("Please choose an available room before submitting.");
      return;
    }

    if (hasCurrentDorm) {
      setApplicationError(
        "You already have a current dorm, so you cannot send another application.",
      );
      return;
    }

    if (!objectIdPattern.test(selectedListing.id)) {
      setApplicationError(
        "Room details are still loading. Please try again in a moment.",
      );
      return;
    }

    if (!leaseDuration || !moveInDate) {
      setApplicationError(
        "Please choose your lease duration and preferred move-in date.",
      );
      return;
    }

    setIsSubmittingApplication(true);
    setApplicationError(null);

    try {
      const moveIn = new Date(`${moveInDate}T00:00:00.000Z`);
      await ApplicationService.createApplication({
        listingId: selectedListing.id,
        transferId: pasaloDetails?.transferId,
        leaseDuration: leaseDurationValues[leaseDuration],
        moveInDate: moveIn,
        message: messageToLandlord.trim() || null,
      });
      navigate("/applications");
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      if (status === 401) {
        showLoggedOutApplicationWarning();
        return;
      }

      const apiMessage = axios.isAxiosError(err)
        ? (err.response?.data as { error?: { message?: string } })?.error
          ?.message
        : undefined;
      setApplicationError(apiMessage ?? "Failed to submit your application.");
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const handleOpenVisitPopout = () => {
    if (!facility.allowVisit) return;
    if (!user) {
      showLoggedOutApplicationWarning();
      return;
    }

    setVisitPopoutOpen(true);
  };

  const applicationSubmitLabel = hasCurrentDorm
    ? "Already Has Dorm"
    : isCheckingCurrentDorm
      ? "Checking..."
      : isSubmittingApplication
        ? "Submitting..."
        : "Submit Application";
  return (
    <div className="user-unit-details-shell relative flex min-h-screen bg-transparent font-inter text-darkslategray-100 dark:text-[#edf6f4]">
      <PageBackground />
      {showSignIn && <SignInPopUp onClose={() => setShowSignIn(false)} />}
      {applicationWarningToasts}
      {isVisitPopoutOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.75)"
          placement="Centered"
          onOutsideClick={() => setVisitPopoutOpen(false)}
        >
          <CalendarPopout
            facilityId={facility.id}
            facilityName={facility.name}
            facilityAddress={facility.location}
            onClose={() => setVisitPopoutOpen(false)}
            onBooked={showSuccessToast}
          />
        </PortalPopup>
      )}

      {/* Sidebar */}
      <div className="sticky top-0 h-screen shrink-0 z-20 font-inter">
        <SideBar />
      </div>

      {/* Main */}
      <div className="relative z-10 flex flex-1 flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 flex flex-col px-4 sm:px-8 lg:px-20 pt-8 lg:pt-16 pb-0 gap-6">

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-1.5 text-sm font-semibold flex-wrap"
            data-scroll-to="searchBarContainer"
          >
            <BreadcrumbHeader
              routes={[
                { name: "Home", url: "/home" },
                { name: breadcrumbSourceLabel, url: breadcrumbSourceUrl },
                { name: facility.name },
              ]}
            />
          </div>

          {/* Search */}
          <form
            onSubmit={submitSearch}
            className="relative w-full h-full flex items-center pb-6 box-border"
          >
            <div className="w-full flex items-center transition-all duration-300 bg-[#f8f9fa] rounded-num-12 py-3 pl-3 pr-4 border border-transparent focus-within:bg-white focus-within:shadow-[0_8px_10px_rgb(0,0,0,0.06)] focus-within:transform focus-within:-translate-y-[1px] gap-2">
              <Icon
                icon="ic:outline-search"
                className="w-5 h-5 text-unselected shrink-0"
              />
              <input
                type="text"
                value={searchTerm}
                maxLength={50}
                onFocus={() => setIsSearchDropdownOpen(true)}
                onBlur={() => {
                  window.setTimeout(() => setIsSearchDropdownOpen(false), 120);
                }}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                placeholder="Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)"
                className="w-full bg-transparent border-none outline-none text-num-14 font-semibold text-darkgreen placeholder:text-unselected placeholder:font-normal"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    runAuthenticatedAction(() => {
                      setSearchTerm("");
                      setIsSearchDropdownOpen(false);
                    })
                  }
                  className="text-unselected hover:text-darkgreen cursor-pointer"
                  aria-label="Clear search"
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
                      onClick={() =>
                        runAuthenticatedAction(() => openSearchResult(dorm))
                      }
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
          </form>

          {/* ── UNIFIED LAYOUT: single xl:flex-row wrapper ── */}
          <div className="flex flex-col xl:flex-row gap-6 font-inter text-black xl:items-start">

            {/* ── LEFT COLUMN: image + info + tabs ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">

              <ImageCarousel images={facility.gallery} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <b className="text-2xl leading-8">{facility.name}</b>
                  <b className="text-xl leading-8 opacity-30">
                    - {availableListings.length} room type
                    {availableListings.length === 1 ? "" : "s"}
                  </b>
                </div>
                <div className="flex items-center gap-3 text-xs text-teal-200 font-poppins">
                  <button
                    type="button"
                    onClick={handleOpenVisitPopout}
                    disabled={!facility.allowVisit}
                    className="rounded border border-teal-200 py-2 px-6 transition-colors disabled:cursor-not-allowed disabled:opacity-60 hover:bg-lightcyan cursor-pointer"
                  >
                    {facility.allowVisit ? "VISIT" : "NO VISIT"}
                  </button>
                  <button
                    type="button"
                    onClick={handleBookmarkToggle}
                    disabled={!selectedListing || isBookmarkSaving}
                    className={`rounded border border-teal-200 py-2 px-6 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${isSelectedListingBookmarked
                      ? "bg-lightcyan text-darkslategray-200"
                      : "hover:bg-lightcyan"
                      } cursor-pointer`}
                  >
                    {isBookmarkSaving
                      ? "SAVING"
                      : isSelectedListingBookmarked
                        ? "SAVED"
                        : "SAVE"}
                  </button>
                </div>
              </div>

              {bookmarkError && (
                <div className="px-2 text-xs font-semibold text-red-500 cursor-pointer">
                  {bookmarkError}
                </div>
              )}

              <div className="text-xs tracking-wide font-semibold px-2">
                {facility.location}
              </div>

              {/* Price */}
              <div className="relative rounded-lg bg-darkslategray-200 shadow-md px-4 py-3 text-white max-w-max">
                <b className="text-2xl leading-8">{selectedPriceLabel}</b>
                <span className="text-lg text-teal-100"> / month</span>
              </div>

              {/* Tabs */}
              <div className="flex flex-col gap-6 text-sm font-lora text-darkslategray-200">
                <PropertyTabs>
                  <PropertyTab
                    text="ABOUT"
                    element={
                      <AboutDetails
                        description={[
                          facility.description,
                          selectedListing?.description,
                        ]
                          .filter(Boolean)
                          .join("\n\n")}
                        details={aboutDetails}
                        included={included}
                      />
                    }
                  />
                  <PropertyTab
                    text="AMENITIES"
                    element={<AmenetiesDetails amenities={amenities} />}
                  />
                  <PropertyTab
                    text="RULES"
                    element={<RulesDetails rules={rules} />}
                  />
                  <PropertyTab
                    text="LOCATION"
                    element={
                      <LocationDetails
                        latitude={facility.coordinates?.lat}
                        longitude={facility.coordinates?.long}
                        name={facility.name}
                        address={facility.location}
                      />
                    }
                  />
                  <PropertyTab
                    text="REVIEWS"
                    element={
                      <ReviewDetails
                        overallScore={overallScore}
                        totalReviews={reviews.length}
                        rows={ratingRows}
                        reviews={reviews}
                      />
                    }
                  />
                </PropertyTabs>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Apply card + Landlord card + Similar ── */}
            <div className="w-full xl:w-[280px] shrink-0 flex flex-col gap-5 font-inter text-black">

              {/* Apply card */}
              <div className="bg-white border border-whitesmoke-300 rounded-xl flex flex-col items-center p-5 gap-5 text-sm font-inter">
                <div className="w-full flex items-center justify-between text-xl">
                  <div className="flex items-center gap-2">
                    <Icon icon="ri:grid-fill" className="h-5 w-5" />
                    <b>Apply</b>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      runAuthenticatedAction(() => {
                        setSelectedListingId(
                          pasaloDetails?.listingId ?? availableListings[0]?.id ?? "",
                        );
                        setLeaseDuration(
                          pasaloDetails?.leaseDuration
                            ? leaseDurationLabels[pasaloDetails.leaseDuration]
                            : "",
                        );
                        setIsLeaseMenuOpen(false);
                        setMoveInDate(pasaloDetails?.moveInDate ?? "");
                        setMessageToLandlord("");
                      })
                    }
                    className="shadow rounded-md bg-whitesmoke-100 py-1 px-3 text-xs text-gray font-lora cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                <div className="w-full flex flex-col gap-4 text-gray font-lora text-xs">
                  {isPasaloApplication && (
                    <div className="rounded-lg border border-[#cbf6ed] bg-[#f1fffb] px-3 py-2 text-[11px] font-semibold leading-4 text-[#096c5b]">
                      This is a Pasalo listing. Room type, lease duration, and move-in date are
                      matched to the approved transfer request.
                    </div>
                  )}
                  {hasCurrentDorm && (
                    <div className="rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-[11px] font-semibold leading-4 text-[#9b1c1c]">
                      You already have a current dorm. New applications are disabled.
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <div className="font-medium">Rooms Available</div>
                    <div className="grid grid-cols-1 gap-2 text-black sm:grid-cols-2 xl:grid-cols-1">
                      {applicationListings.length > 0 ? (
                        applicationListings.map((listing) => {
                          const isSelected = selectedListing?.id === listing.id;
                          return (
                            <button
                              key={listing.id}
                              type="button"
                              disabled={isPasaloApplication}
                              onClick={() =>
                                runAuthenticatedAction(() =>
                                  setSelectedListingId(listing.id),
                                )
                              }
                              className={`rounded-lg border py-2 px-3 text-center font-semibold text-xs shadow transition-colors ${isSelected
                                ? "border-darkslategray-200 bg-darkslategray-200 text-white"
                                : "border-transparent bg-white text-black hover:bg-lightcyan"
                                } ${isPasaloApplication ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                            >
                              {roomButtonLabel(listing.label)}
                            </button>
                          );
                        })
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="rounded-lg bg-white py-2 px-3 text-center font-semibold text-xs shadow text-silver cursor-pointer"
                        >
                          TBA
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium" htmlFor="lease-duration-select">
                      Lease Duration
                    </label>
                    <div className="relative" id="lease-duration-select">
                      <button
                        type="button"
                        disabled={isPasaloApplication}
                        onClick={() =>
                          runAuthenticatedAction(() =>
                            setIsLeaseMenuOpen((isOpen) => !isOpen),
                          )
                        }
                        className={`shadow rounded-lg border w-full flex items-center justify-between py-2.5 px-3 gap-2 text-left transition-all ${isLeaseMenuOpen
                          ? "border-teal-200 bg-lightcyan/40 ring-2 ring-lightcyan"
                          : "border-transparent bg-white hover:bg-lightcyan/20"
                          } ${isPasaloApplication ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                      >
                        <span
                          className={`font-semibold text-xs ${leaseDuration ? "text-black" : "text-silver"
                            }`}
                        >
                          {leaseDuration || "Choose lease duration"}
                        </span>
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-whitesmoke-100 text-teal-200 cursor-pointer">
                          <Icon
                            icon="mdi:chevron-down"
                            className={`h-4 w-4 transition-transform ${isLeaseMenuOpen ? "rotate-180" : ""
                              }`}
                          />
                        </span>
                      </button>

                      {isLeaseMenuOpen && (
                        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-lightcyan bg-white p-1 shadow-[0_12px_24px_rgba(0,0,0,0.14)]">
                          {leaseDurations.map((duration) => {
                            const isSelected = leaseDuration === duration;
                            return (
                              <button
                                key={duration}
                                type="button"
                                onClick={() =>
                                  runAuthenticatedAction(() => {
                                    setLeaseDuration(duration);
                                    setIsLeaseMenuOpen(false);
                                  })
                                }
                                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors ${isSelected
                                  ? "bg-darkslategray-200 text-white"
                                  : "text-gray hover:bg-lightcyan"
                                  } cursor-pointer`}
                              >
                                <span>{duration}</span>
                                {isSelected && (
                                  <Icon
                                    icon="material-symbols:check-rounded"
                                    className="h-4 w-4 cursor-pointer"
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium" htmlFor="move-in-date">
                      Preferred Move-in Date
                    </label>
                    <div className="shadow rounded-lg bg-white flex items-center py-2 px-3 gap-2 text-silver">
                      <input
                        id="move-in-date"
                        type="date"
                        value={moveInDate}
                        disabled={isPasaloApplication}
                        onChange={(event) => setMoveInDate(event.target.value)}
                        className={`flex-1 bg-transparent outline-none font-semibold text-xs ${moveInDate ? "text-black" : "text-silver"
                          } ${isPasaloApplication ? "cursor-not-allowed" : ""}`}
                      />
                      <Icon icon="mdi:calendar" className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-medium" htmlFor="landlord-message">
                      Message to Landlord{" "}
                      <span className="text-silver">(optional)</span>
                    </label>
                    <textarea
                      id="landlord-message"
                      value={messageToLandlord}
                      onChange={(event) => setMessageToLandlord(event.target.value)}
                      placeholder="Introduce yourself or ask a question.."
                      className="shadow rounded-lg bg-white py-2 px-3 h-20 resize-none text-black placeholder:text-silver font-semibold text-xs outline-none"
                    />
                  </div>

                  {/* Cost summary */}
                  <div className="shadow rounded-lg bg-whitesmoke-200 flex flex-col p-3 gap-1 text-dimgray font-poppins text-xs">
                    {[
                      [
                        "Monthly Rent",
                        primaryRent > 0 ? currencyFormatter.format(primaryRent) : "TBA",
                      ],
                      [
                        "Est. Utilities",
                        estimatedUtilities > 0 ? currencyFormatter.format(estimatedUtilities) : "TBA",
                      ],
                      [
                        "Security Deposit",
                        securityDeposit > 0 ? currencyFormatter.format(securityDeposit) : "TBA",
                      ],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between">
                        <span>{l}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                    <div className="h-px bg-gray-200 my-1" />
                    <div className="flex justify-between font-bold text-gray">
                      <span>Est. Move-in Cost</span>
                      <span>
                        {moveInCost > 0 ? currencyFormatter.format(moveInCost) : "TBA"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2 font-poppins text-white">
                  {applicationError && (
                    <p className="text-xs font-semibold text-red-500 font-lora text-center">
                      {applicationError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleSubmitApplication}
                    disabled={isSubmittingApplication || isCheckingCurrentDorm || hasCurrentDorm}
                    className="w-full rounded-lg bg-darkslategray-200 flex items-center justify-center gap-2 py-3 px-4 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                  >
                    <span className="font-medium text-sm">{applicationSubmitLabel}</span>
                    <Icon icon="formkit:arrowright" className="h-5 w-5" />
                  </button>
                  <p className="text-xs text-dimgray font-lora text-center">
                    Landlord will respond within 24–48 hrs.
                    <br />
                    Your info is kept private until approved.
                  </p>
                </div>
              </div>

              {/* Landlord card */}
              <div className="rounded-lg shadow bg-white flex flex-col p-4 gap-4">
                <div className="flex items-center gap-2 text-xl">
                  <Icon
                    icon="material-symbols:wifi-home-outline-rounded"
                    className="h-6 w-6"
                  />
                  <b className="text-sm">LANDLORD</b>
                </div>
                <div className="flex items-center gap-3">
                  {facility.landlord?.profilePicture ? (
                    <img
                      className="h-12 w-12 rounded-full object-cover shadow"
                      src={facility.landlord.profilePicture}
                      alt={facility.landlord.name}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-lightcyan shadow flex items-center justify-center text-sm font-bold text-teal-200">
                      {facility.landlord?.name?.slice(0, 1) ?? "L"}
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 font-lora text-xs">
                    <div className="font-medium">
                      {facility.landlord?.name ?? "Landlord"}
                    </div>
                    <div className="text-[10px] font-semibold text-darkslategray-100">
                      member since {landlordSince}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 text-teal-100 text-sm">
                  {[
                    [
                      String(facility.landlord?.numUnits ?? availableListings.length),
                      "Active Units",
                    ],
                    [landlordSince, "Since"],
                  ].map(([val, lbl]) => (
                    <div
                      key={lbl}
                      className="flex-1 border border-teal-100 rounded-lg flex flex-col items-center py-2"
                    >
                      <b className="font-semibold">{val}</b>
                      <div className="text-[10px] font-semibold font-lora text-darkslategray-100">
                        {lbl}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 text-white font-poppins text-sm">
                  <Link
                    to={landlordMessagePath}
                    onClick={handleAuthenticatedLinkClick}
                    className="rounded-lg bg-darkslategray-200 flex items-center justify-center gap-2 py-2 shadow"
                  >
                    <Icon icon="material-symbols:mail-outline" className="h-5 w-5" />
                    <span className="font-medium">Send Message</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => runAuthenticatedAction(() => undefined)}
                    className="rounded-lg bg-darkslategray-200 flex items-center justify-center gap-2 py-2 shadow cursor-pointer"
                  >
                    <Icon icon="ic:outline-person" className="h-5 w-5" />
                    <span className="font-medium">View Profile</span>
                  </button>
                </div>
              </div>

              {/* You may also like */}
              <div className="flex flex-wrap gap-6 justify-center w-full py-1">
                {recommendedDorms
                  .filter((dorm) => dorm.id !== facility.id)
                  .slice(0, 2)
                  .map((dorm) => (
                    <DormCard
                      key={dorm.id}
                      id={dorm.id}
                      name={dorm.name}
                      rating={dorm.rating}
                      price={dorm.price}
                      location={dorm.location}
                      image={dorm.image}
                      room_types={dorm.room_types}
                    />
                  ))}
              </div>

            </div>
            {/* ── END RIGHT COLUMN ── */}

          </div>
          {/* ── END UNIFIED LAYOUT ── */}

        </div>

        {/* Footer */}
        <footer className="mt-8">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default UnitDetails;
