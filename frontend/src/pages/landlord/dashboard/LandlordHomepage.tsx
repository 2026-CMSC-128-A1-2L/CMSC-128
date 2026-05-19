import { type FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import NotifyTenantsPopup from "../../../components/landlord/NotifyTenantsPopup";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import TutorialBubble from "../dashboard/LandlordHomepageTutorials";
import TutorialIcon from "../../../../assets/help-chat.svg";
import { managers } from "../../../data/landlordManagers";
import type { PendingApplication, Tenant } from "../../../data/landlordTenants";
import { ApplicationService } from "../../../service/ApplicationService";
import { api } from "../../../service/axiosInstance";
import { FacilityService } from "../../../service/FacilityService";
import { useAuthStore } from "../../../store/useAuthStore";
const Avatar = ({
  className = "h-[40px] w-[40px]",
}: {
  className?: string;
}) => (
  <span
    className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af] ${className}`}
  >
    <Icon
      icon="solar:user-bold"
      className="h-[60%] w-[60%]"
      aria-hidden="true"
    />
  </span>
);

const PersonRow = ({
  name,
  email,
  meta,
}: {
  name: string;
  email: string;
  meta?: string;
}) => (
  <div className="flex w-full items-center gap-[10px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[8px]">
    <Avatar />
    <div className="flex min-w-0 flex-col gap-[2px] overflow-hidden">
      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">
        {name}
      </b>
      <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">
        {email}
      </span>
      {meta && (
        <span className="truncate font-['Inter',sans-serif] text-[11px] font-semibold text-[#096c5b]">
          {meta}
        </span>
      )}
    </div>
  </div>
);

const CARD_WIDTH = 280;
const CARD_GAP = 16;

type LandlordSearchOption = {
  title: string;
  breadcrumb: string;
  to: string;
  keywords: string;
  icon: string;
};

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/>/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const optionMatchesQuery = (option: LandlordSearchOption, query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return false;

  const visibleText = normalizeSearchText(
    `${option.title} ${option.breadcrumb}`,
  );
  const visibleWords = visibleText.split(" ").filter(Boolean);
  const queryWords = normalizedQuery.split(" ").filter(Boolean);

  if (normalizedQuery.length === 1) {
    return visibleWords.some((word) => word.startsWith(normalizedQuery));
  }

  return (
    visibleText.includes(normalizedQuery) ||
    queryWords.every((queryWord) =>
      visibleWords.some((word) => word.startsWith(queryWord)),
    )
  );
};

const getImage = (facility: any): string =>
  getPrimaryMediaUrl(facility.image ?? facility.media?.[0]) ||
  'https://placehold.co/280x120?text=No+image';

const getOccupiedUnits = (facility: any): number => {
  const total = (facility.listings ?? []).reduce(
    (sum: number, l: any) => sum + (l.unitCount ?? 0), 0,
  );
  const avail = (facility.listings ?? []).reduce(
    (sum: number, l: any) => sum + (l.availableUnitCount ?? 0), 0,
  );
  return total - avail;
};

type RawApplication = {
  _id?: string;
  id?: string;
  status?: string;
  createdAt?: string;
  userId?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: string[];
    email?: string;
    contact?: string;
    address?: string;
    profilePicture?: string;
  };
  facilityId?: { name?: string };
  listingId?: { roomType?: string };
  unitId?: { roomNumber?: string; price?: number };
  leaseDuration?: string;
};

type VisitRequest = {
  id: string;
  name: string;
  email: string;
  meta: string;
};

type RawBooking = {
  _id?: string;
  id?: string;
  status?: string;
  startDate?: string;
  userId?: {
    firstName?: string;
    lastName?: string;
    emails?: string[];
    email?: string;
  };
  facilityId?: { name?: string };
  listingId?: { facilityId?: { name?: string } };
};

type DashboardStats = {
  monthlyIncome: number;
  tenantCount: number;
  overdueCount: number;
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const formatApplicantName = (user?: RawApplication["userId"]) =>
  [user?.firstName, user?.middleName, user?.lastName].filter(Boolean).join(" ") || "Applicant";

const mapApplication = (application: RawApplication): PendingApplication => {
  const displayName = formatApplicantName(application.userId);
  const submittedDate = application.createdAt ? new Date(application.createdAt) : undefined;

  return {
    id: application.id ?? application._id ?? "",
    fullName: displayName.toUpperCase(),
    displayName,
    email: application.userId?.email ?? application.userId?.emails?.[0] ?? "No email provided",
    contactNumber: application.userId?.contact ?? "Not provided",
    homeAddress: application.userId?.address ?? "Not provided",
    photoUrl: application.userId?.profilePicture,
    dormName: application.facilityId?.name ?? "Dorm application",
    unit: application.unitId?.roomNumber ?? application.listingId?.roomType ?? "Pending unit",
    baseRentFee:
      typeof application.unitId?.price === "number"
        ? application.unitId.price.toLocaleString()
        : "TBA",
    contractDuration: application.leaseDuration ?? "Not provided",
    monthlyDueDate: "To be set",
    modeOfPayment: "To be set",
    submittedOn: submittedDate ? submittedDate.toLocaleDateString() : "Recently",
    reviewedByManager: application.status === "finalized",
    studentCategory: "Student",
    documents: [],
  };
};

const mapVisitRequest = (booking: RawBooking): VisitRequest => {
  const startDate = booking.startDate ? new Date(booking.startDate) : null;
  const visitorName = booking.userId?.firstName
    ? `${booking.userId.firstName} ${booking.userId.lastName ?? ""}`.trim()
    : "Student";
  const email = booking.userId?.email ?? booking.userId?.emails?.[0] ?? "No email provided";
  const propertyName =
    booking.facilityId?.name ?? booking.listingId?.facilityId?.name ?? "Visit request";
  const dateTime = startDate
    ? `${startDate.toLocaleDateString()} - ${startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "Pending schedule";

  return {
    id: booking.id ?? booking._id ?? "",
    name: visitorName,
    email,
    meta: `${propertyName} - ${dateTime}`,
  };
};

const formatPeso = (amount: number) =>
  `Php ${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const LandlordHomepage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isLandlord = user?.userType === "Landlord";
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [tenantRecords, setTenantRecords] = useState<Tenant[]>([]);
  const [dashboardApplications, setDashboardApplications] = useState<PendingApplication[]>([]);
  const [visitRequests, setVisitRequests] = useState<VisitRequest[]>([]);
  const [isApplicationsLoading, setApplicationsLoading] = useState(true);
  const [isVisitsLoading, setVisitsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    monthlyIncome: 0,
    tenantCount: 0,
    overdueCount: 0,
  });
  const [isStatsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    Promise.allSettled([
      FacilityService.getLandlordFacilities(),
      FacilityService.getTenants(),
      FacilityService.getMonthlyIncome(),
      FacilityService.getOverdueTenants(),
    ])
      .then(([facilityResult, tenantResult, monthlyIncomeResult, overdueResult]) => {
        if (cancelled) return;
        if (facilityResult.status === "fulfilled") {
          setFacilities(facilityResult.value.data);
        }
        if (tenantResult.status === "fulfilled" && Array.isArray(tenantResult.value)) {
          setTenantRecords(tenantResult.value);
        }
        setStats({
          monthlyIncome:
            monthlyIncomeResult.status === "fulfilled" ? monthlyIncomeResult.value.data.total : 0,
          tenantCount:
            monthlyIncomeResult.status === "fulfilled"
              ? monthlyIncomeResult.value.data.totalTenants
              : tenantResult.status === "fulfilled" && Array.isArray(tenantResult.value)
                ? tenantResult.value.length
                : 0,
          overdueCount: overdueResult.status === "fulfilled" ? overdueResult.value.data.overdueCount : 0,
        });
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadApplications = async () => {
      setApplicationsLoading(true);

      try {
        const requests = [ApplicationService.getApplications({ limit: 50, status: "pending" })];
        if (isLandlord) {
          requests.push(ApplicationService.getApplications({ limit: 50, status: "finalized" }));
        }

        const responses = await Promise.all(requests);
        if (!cancelled) {
          setDashboardApplications(
            responses
              .flatMap((response) => getDataArray<RawApplication>(response))
              .map(mapApplication),
          );
        }
      } catch (error) {
        console.error("Failed to fetch dashboard applications:", error);
      } finally {
        if (!cancelled) setApplicationsLoading(false);
      }
    };

    void loadApplications();
    return () => {
      cancelled = true;
    };
  }, [isLandlord]);

  useEffect(() => {
    let cancelled = false;

    const loadVisitRequests = async () => {
      setVisitsLoading(true);

      try {
        const response = await api.get("/api/bookings");
        if (!cancelled) {
          setVisitRequests(
            getDataArray<RawBooking>(response.data)
              .filter((booking) => booking.status === "pending")
              .map(mapVisitRequest),
          );
        }
      } catch (error) {
        console.error("Failed to fetch dashboard visit requests:", error);
      } finally {
        if (!cancelled) setVisitsLoading(false);
      }
    };

    void loadVisitRequests();
    return () => {
      cancelled = true;
    };
  }, []);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
  const trimmedSearchQuery = searchQuery.trim();
  const trimmedDebouncedSearchQuery = debouncedSearchQuery.trim();
  const isSearchDebouncing = trimmedSearchQuery !== trimmedDebouncedSearchQuery;
  const searchOptions = useMemo<LandlordSearchOption[]>(() => {
    const staticOptions: LandlordSearchOption[] = [
      {
        title: "Dashboard",
        breadcrumb: "Dashboard",
        to: "/landlord-homepage",
        keywords: "dashboard home statistics overview reminder activity",
        icon: "solar:home-outline",
      },
      {
        title: "Properties",
        breadcrumb: "Properties",
        to: "/landlord/properties",
        keywords: "properties buildings listings rooms units dorm apartments",
        icon: "fluent:pen-16-regular",
      },
      {
        title: "Finance",
        breadcrumb: "Finance",
        to: "/landlord/finance",
        keywords: "finance income collection occupancy billing payments rent",
        icon: "solar:card-outline",
      },
      {
        title: "My Tenants",
        breadcrumb: "My Tenants",
        to: "/landlord/tenants",
        keywords: "tenants renters residents applications billing",
        icon: "tabler:user-search",
      },
      {
        title: "Managers",
        breadcrumb: "Managers",
        to: "/landlord/managers",
        keywords: "managers staff assignments property manager",
        icon: "hugeicons:id",
      },
      {
        title: "Visits",
        breadcrumb: "Visits",
        to: "/landlord/visits",
        keywords: "visits ocular appointments schedule viewing",
        icon: "solar:calendar-outline",
      },
      {
        title: "Messages",
        breadcrumb: "Messages",
        to: "/landlord/messages",
        keywords: "messages chat inbox conversation",
        icon: "ic:outline-mail",
      },
      {
        title: "Settings",
        breadcrumb: "Settings",
        to: "/landlord/settings",
        keywords: "settings preferences account",
        icon: "solar:settings-outline",
      },
      {
        title: "Profile",
        breadcrumb: "Profile",
        to: "/landlord/profile/switcher",
        keywords: "profile account landlord personal information verification",
        icon: "solar:user-circle-outline",
      },
      {
        title: "Profile Verification",
        breadcrumb: "Profile > Verification",
        to: "/landlord/profile/verification",
        keywords: "profile verification account landlord documents",
        icon: "solar:user-circle-outline",
      },
      {
        title: "Add New Listing",
        breadcrumb: "Properties > Add New Listing",
        to: "/landlord/properties/new",
        keywords: "properties add new listing create listing",
        icon: "fluent:pen-16-regular",
      },
      {
        title: "Add a New Building",
        breadcrumb: "Properties > Add a New Building",
        to: "/landlord/add-building",
        keywords: "properties add building create building listing",
        icon: "fluent:pen-16-regular",
      },
      {
        title: "Pending Applications",
        breadcrumb: "My Tenants > Pending Applications",
        to: "/landlord/tenants/unvalidated",
        keywords: "tenants pending applications unvalidated applicants",
        icon: "tabler:user-search",
      },
    ];

    const buildingOptions = facilities.flatMap((facility) => [
      {
        title: facility.name,
        breadcrumb: `Properties > ${facility.name}`,
        to: `/landlord/properties/${facility.id}`,
        keywords: `${facility.name} ${facility.location?.text ?? ''} ${facility.type ?? ''} property building rooms units`,
        icon: "fluent:pen-16-regular",
      },
      {
        title: facility.name,
        breadcrumb: `Finance > ${facility.name}`,
        to: `/landlord/finance/property/${facility.id}`,
        keywords: `${facility.name} ${facility.location?.text ?? ''} ${facility.type ?? ''} finance income rent billing collection occupancy`,
        icon: "solar:card-outline",
      },
    ]);

    const tenantOptions = tenantRecords.map((tenant) => ({
      title: tenant.displayName,
      breadcrumb: `My Tenants > ${tenant.displayName}`,
      to: `/landlord/tenants/${tenant.id}`,
      keywords: `${tenant.displayName} ${tenant.fullName} ${tenant.email} ${tenant.contactNumber} ${tenant.dormName} ${tenant.unit} tenant billing`,
      icon: "tabler:user-search",
    }));

    const pendingApplicationOptions = dashboardApplications.map(
      (application) => ({
        title: application.displayName,
        breadcrumb: `My Tenants > Pending Applications > ${application.displayName}`,
        to: `/landlord/tenants/unvalidated/${application.id}`,
        keywords: `${application.displayName} ${application.fullName} ${application.email} ${application.contactNumber} ${application.dormName} ${application.unit} pending application unvalidated`,
        icon: "tabler:user-search",
      }),
    );

    const managerOptions = managers.map((manager) => ({
      title: manager.displayName,
      breadcrumb: `Managers > ${manager.displayName}`,
      to: `/landlord/managers/${manager.id}`,
      keywords: `${manager.displayName} ${manager.fullName} ${manager.email} ${manager.contactNumber} ${manager.property} manager`,
      icon: "hugeicons:id",
    }));

    return [
      ...buildingOptions,
      ...tenantOptions,
      ...pendingApplicationOptions,
      ...managerOptions,
      ...staticOptions,
    ];
  }, [dashboardApplications, facilities, tenantRecords]);
  const matchingSearchOptions = useMemo(() => {
    const query = trimmedDebouncedSearchQuery;
    if (!query) return [];

    return searchOptions.filter((option) => optionMatchesQuery(option, query));
  }, [searchOptions, trimmedDebouncedSearchQuery]);
  const displayedBuildings = facilities;
  const total = displayedBuildings.length;
  const [showNotify, setShowNotify] = useState(false);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    setCurrent(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  };

  const [showHelp, setShowHelp] = useState(false);

  const openSearchOption = (option: LandlordSearchOption) => {
    setSearchQuery("");
    setIsSearchDropdownOpen(false);
    navigate(option.to);
  };

  const currentMonthLabel = MONTH_LABELS[new Date().getMonth()];
  const statsCards = [
    {
      label: "Monthly Income",
      value: isStatsLoading ? "—" : formatPeso(stats.monthlyIncome),
      sub: currentMonthLabel,
      subColor: "text-[#666]",
      to: "/landlord/finance",
    },
    {
      label: "Number of Tenants",
      value: isStatsLoading ? "—" : stats.tenantCount.toString(),
      sub: stats.tenantCount === 1 ? "Active tenant" : "Active tenants",
      subGradient: true,
      to: "/landlord/tenants",
    },
    {
      label: "Overdue Rent",
      value: isStatsLoading ? "—" : stats.overdueCount.toString(),
      sub: stats.overdueCount === 1 ? "Tenant" : "Tenants",
      subColor: "text-[#666]",
      to: "/landlord/finance",
    },
  ];

  return (
    <LandlordLayout activeSidebarItem="dashboard" breadcrumbs={[]}>
      <div className="mb-20 flex w-full flex-col gap-[48px]">
        {/* Main column */}
        <div className="flex w-full min-w-0 flex-col gap-[48px]">
          {/* Search */}
          <div className="relative w-full h-full flex items-center">
            <div className="w-full flex items-center transition-all duration-300 bg-[#f8f9fa] rounded-num-12 py-3 pl-3 pr-4 border border-transparent focus-within:bg-white focus-within:shadow-[0_8px_10px_rgb(0,0,0,0.06)] focus-within:transform focus-within:-translate-y-[1px] gap-2 dark:bg-[#1f2022] dark:focus-within:bg-[#202123]">
              <Icon
                icon="ic:outline-search"
                className="w-5 h-5 text-unselected shrink-0 dark:text-[#a4acba]"
                aria-hidden="true"
              />

              <input
                type="text"
                placeholder="Search properties, finance, tenants, visits..."
                value={searchQuery}
                maxLength={50}
                onFocus={() =>
                  setIsSearchDropdownOpen(trimmedSearchQuery.length > 0)
                }
                onBlur={() => {
                  window.setTimeout(() => setIsSearchDropdownOpen(false), 120);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(e.target.value.trim().length > 0);
                }}
                className="w-full bg-transparent border-none outline-none text-num-14 font-semibold text-darkgreen placeholder:text-unselected placeholder:font-normal dark:text-[#edf6f4] dark:placeholder:text-[#8f98a8]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchDropdownOpen(false);
                  }}
                  className="text-unselected hover:text-darkgreen dark:text-[#a4acba] dark:hover:text-[#72cbb8]"
                  aria-label="Clear search"
                >
                  <Icon
                    icon="material-symbols:close-rounded"
                    className="w-4 h-4"
                  />
                </button>
              )}
            </div>

            {isSearchDropdownOpen && trimmedSearchQuery && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-[560px] overflow-y-auto rounded-num-12 border border-whitesmoke-200 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.14)] dark:border-[#303331] dark:bg-[#101111] dark:shadow-[0_18px_34px_rgba(0,0,0,0.42)]">
                {isSearchDebouncing ? (
                  <div className="flex items-center gap-3 px-4 py-4 text-sm font-semibold text-unselected dark:text-[#a4acba]">
                    <Icon
                      icon="eos-icons:loading"
                      className="h-5 w-5 text-teal-100"
                    />
                    Searching screens...
                  </div>
                ) : matchingSearchOptions.length > 0 ? (
                  matchingSearchOptions.map((option) => (
                    <button
                      key={`${option.breadcrumb}-${option.to}`}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => openSearchOption(option)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-whitesmoke-100 dark:hover:bg-[#202123]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-lightcyan/45 text-teal dark:bg-[#17483f] dark:text-[#72cbb8]">
                        <Icon
                          icon={option.icon}
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-num-14 font-bold text-darkgreen dark:text-[#edf6f4]">
                          {option.title}
                        </span>
                        <span className="block truncate text-[0.75rem] font-semibold text-teal-100 dark:text-[#72cbb8]">
                          {option.breadcrumb}
                        </span>
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4 text-sm font-semibold text-unselected dark:text-[#a4acba]">
                    No matching screens found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Statistics */}
          <section className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">
                Statistics
              </h2>
              <Link
                to="/landlord/finance"
                className="flex items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#096c5b] underline transition-opacity hover:opacity-70"
              >
                View More
                <Icon
                  icon="radix-icons:arrow-top-right"
                  className="h-[16px] w-[16px]"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-4">
              {statsCards.map((s) => (
                <Link
                  to={s.to}
                  key={s.label}
                  className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] border border-[#f0f0f0] bg-white p-[12px] text-center"
                >
                  <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">
                    {s.label}
                  </b>
                  <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#096c5b]">
                    {s.value}
                  </b>
                  {s.subGradient ? (
                    <span
                      className="font-['Inter',sans-serif] text-[14px] font-medium"
                      style={{
                        background: "linear-gradient(0deg,#ffc273,#fa7900)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.sub}
                    </span>
                  ) : (
                    <span
                      className={`font-['Inter',sans-serif] text-[14px] font-medium ${s.subColor} cursor-pointer`}
                    >
                      {s.sub}
                    </span>
                  )}
                </Link>
              ))}
              <div className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] bg-[#096c5b] p-[12px] text-center">
                <Icon
                  icon="basil:notification-on-outline"
                  className="h-[48px] w-[48px] text-[#f0f0f0]"
                  aria-hidden="true"
                />
                <b className="font-['Inter',sans-serif] text-[18px] tracking-[-0.01em] text-[#f0f0f0]">
                  Pay Reminder
                </b>
                <button
                  type="button"
                  onClick={() => setShowNotify(true)}
                  className="flex items-center gap-[8px] rounded-full bg-[#f0f0f0] px-[12px] py-[4px] transition-opacity hover:opacity-80 cursor-pointer"
                >
                  <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#096c5b]">
                    Notify your tenants
                  </span>
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#096c5b]">
                    <Icon
                      icon="heroicons:paper-airplane"
                      className="h-[14px] w-[14px] text-white"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
              <TutorialBubble
                show={showHelp}
                onClose={() => setShowHelp(false)}
              />
            </div>
          </section>

          {/* Properties carousel */}
          <section className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">
                  Your Current Properties
                </h2>
                <Link
                  to="/landlord/properties"
                  className="flex items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#096c5b] underline transition-opacity hover:opacity-70"
                >
                  View All
                  <Icon
                    icon="radix-icons:arrow-top-right"
                    className="h-[16px] w-[16px]"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              {/* Arrows */}
              <div className="flex items-center gap-[8px]">
                <button
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
            </div>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              className="flex gap-[16px] overflow-x-auto scroll-smooth pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {displayedBuildings.map((facility) => (
                <Link
                  key={facility.id}
                  to={`/landlord/properties/${facility.id}`}
                  state={{ facilityStatus: facility.status, facilityCapacity: facility.capacity }}
                  className="flex shrink-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02]"
                  style={{ width: CARD_WIDTH }}
                >
                  <img
                    src={getImage(facility)}
                    alt={facility.name}
                    className="h-[120px] w-full object-cover"
                  />
                  <div className="flex flex-col gap-[8px] p-[12px]">
                    <div className="flex items-center justify-between gap-[8px]">
                      <b className="truncate font-['Inter',sans-serif] text-[16px] tracking-[-0.01em] text-black">
                        {facility.name}
                      </b>
                      <span className="flex shrink-0 items-center gap-[4px] rounded-[5px] border border-[#096c5b] px-[8px] py-[2px]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#096c5b]" />
                        <span className="font-['Poppins',sans-serif] text-[12px] text-[#096c5b]">
                          {facility.status === 'approved' ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <Icon
                        icon="solar:home-bold"
                        className="h-[14px] w-[16px] text-[#666]"
                        aria-hidden="true"
                      />
                      <b className="font-['Poppins',sans-serif] text-[14px] tracking-[-0.01em] text-[#666]">
                        {getOccupiedUnits(facility)}
                      </b>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[6px]">
                        <Icon
                          icon="solar:graph-up-bold"
                          className="h-[14px] w-[16px] text-[#096c5b]"
                          aria-hidden="true"
                        />
                        <b
                          className="font-['Poppins',sans-serif] text-[13px] tracking-[-0.01em]"
                          style={{
                            background:
                              "linear-gradient(180deg,#5dc2a8 27.88%,#0c8873 84.13%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          —
                        </b>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <Icon
                          icon="solar:bill-list-bold"
                          className="h-[14px] w-[16px] text-[#c29722]"
                          aria-hidden="true"
                        />
                        <b
                          className="font-['Poppins',sans-serif] text-[13px] tracking-[-0.01em]"
                          style={{
                            background:
                              "linear-gradient(180deg,#c29722,#f6b709)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          —
                        </b>
                      </div>
                      <div className="transition-opacity hover:opacity-70">
                        <Icon
                          icon="solar:eye-bold"
                          className="h-[24px] w-[24px] text-[#096c5b]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Pending + Visits */}
          <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
            {[
              {
                title: "Pending Applications",
                to: "/landlord/tenants/unvalidated",
                items: dashboardApplications.map((application) => ({
                  id: application.id,
                  name: application.displayName,
                  email: application.email,
                  meta: `${application.dormName} - ${application.unit}`,
                  to: `/landlord/tenants/unvalidated/${application.id}`,
                })),
                isLoading: isApplicationsLoading,
                emptyMessage: "No pending applications",
              },
              {
                title: "Visit Requests",
                to: "/landlord/visits",
                items: visitRequests.map((visit) => ({
                  id: visit.id,
                  name: visit.name,
                  email: visit.email,
                  meta: visit.meta,
                  to: "/landlord/visits",
                })),
                isLoading: isVisitsLoading,
                emptyMessage: "No visit requests",
              },
            ].map((panel) => (
              <section
                key={panel.title}
                className="flex flex-col gap-[12px] rounded-[12px] border border-[#f0f0f0] p-[24px]"
              >
                <Link
                  to={panel.to}
                  className="flex items-center gap-[8px] font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b] transition-opacity hover:opacity-70"
                >
                  {panel.title}
                  <Icon
                    icon="radix-icons:arrow-top-right"
                    className="h-[20px] w-[20px]"
                    aria-hidden="true"
                  />
                </Link>
                <div className="h-[2px] w-full rounded-full bg-[#f0f0f0]" />
                <div className="flex flex-col gap-[12px]">
                  {panel.isLoading ? (
                    <div className="flex min-h-[128px] items-center justify-center rounded-[8px] border border-dashed border-[#f0f0f0] font-['Inter',sans-serif] text-[13px] font-bold text-[#8a9099]">
                      Loading...
                    </div>
                  ) : panel.items.length === 0 ? (
                    <div className="flex min-h-[128px] items-center justify-center rounded-[8px] border border-dashed border-[#f0f0f0] px-[12px] text-center font-['Inter',sans-serif] text-[13px] font-bold text-[#8a9099]">
                      {panel.emptyMessage}
                    </div>
                  ) : (
                    panel.items.slice(0, 4).map((item) => (
                      <Link
                        key={item.id || item.email}
                        to={item.to}
                        className="block transition-opacity hover:opacity-80"
                      >
                        <PersonRow name={item.name} email={item.email} meta={item.meta} />
                      </Link>
                    ))
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      {/* ======= FLOATING ICON ========== */}
      <div
        className="help-button-animated z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img
          src={TutorialIcon}
          alt="Help"
          className="w-16 h-16 drop-shadow-lg"
        />
      </div>
      <NotifyTenantsPopup
        isOpen={showNotify}
        onClose={() => setShowNotify(false)}
      />
    </LandlordLayout>
  );
};

export default LandlordHomepage;
