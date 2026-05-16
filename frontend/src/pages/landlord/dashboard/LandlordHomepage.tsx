import { type FunctionComponent, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import NotifyTenantsPopup from '../../../components/landlord/NotifyTenantsPopup';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import sapphire1 from '../../../../assets/sapphire1.jpg';
import sapphire2 from '../../../../assets/sapphire2.jpg';
import sapphire3 from '../../../../assets/sapphire3.png';

import TutorialBubble from '../dashboard/LandlordHomepageTutorials';
import TutorialIcon from '../../../../assets/help-chat.svg';
import { managers } from '../../../data/landlordManagers';
import { pendingApplications, tenants } from '../../../data/landlordTenants';
const STATS = [
  {
    label: 'Monthly Income',
    value: 'Php 138,600',
    sub: 'Feb 2026',
    subColor: 'text-[#666]',
  },
  {
    label: 'Number of Tenants',
    value: '28',
    sub: '2 ongoing lease transfers',
    subGradient: true,
  },
  { label: 'Overdue Rent', value: '1', sub: 'Tenant', subColor: 'text-[#666]' },
];

import { BUILDINGS } from '../../../data/buildings';

const PENDING = [
  { name: 'Daphne Dayne', email: 'dcanape@up.edu.ph' },
  { name: 'Nathaniel Cunanan', email: 'ncunanan@up.edu.ph' },
  { name: 'Lance Chrysler De Jesus', email: 'lvdejesus1@up.edu.ph' },
];

const VISITS = [
  { name: 'Daphne Dayne', email: 'dcanape@up.edu.ph' },
  { name: 'Nathaniel Cunanan', email: 'ncunanan@up.edu.ph' },
];

const ACTIVITY = [
  {
    name: 'Haira Espinocilla',
    action: 'paid rent for month of Feb',
    time: '3d ago',
  },
  { name: 'Riz Doroja', action: 'paid rent for month of Feb', time: '1d ago' },
  {
    name: 'Dorm Manager #2',
    action: 'collected payments in One Sapphire',
    time: '2m ago',
  },
  {
    name: 'Dorm Manager #1',
    action: 'accepted ocular visits for April 9',
    time: '1m ago',
  },
];

const Avatar = ({ className = 'h-[40px] w-[40px]' }: { className?: string }) => (
  <span
    className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af] ${className}`}
  >
    <Icon icon="solar:user-bold" className="h-[60%] w-[60%]" aria-hidden="true" />
  </span>
);

const PersonRow = ({ name, email }: { name: string; email: string }) => (
  <div className="flex w-full items-center gap-[10px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[4px]">
    <Avatar />
    <div className="flex flex-col gap-[2px] overflow-hidden">
      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">{name}</b>
      <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">
        {email}
      </span>
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
    .replace(/>/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const optionMatchesQuery = (option: LandlordSearchOption, query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return false;

  const visibleText = normalizeSearchText(`${option.title} ${option.breadcrumb}`);
  const visibleWords = visibleText.split(' ').filter(Boolean);
  const queryWords = normalizedQuery.split(' ').filter(Boolean);

  if (normalizedQuery.length === 1) {
    return visibleWords.some((word) => word.startsWith(normalizedQuery));
  }

  return (
    visibleText.includes(normalizedQuery) ||
    queryWords.every((queryWord) => visibleWords.some((word) => word.startsWith(queryWord)))
  );
};

const LandlordHomepage: FunctionComponent = () => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
  const trimmedSearchQuery = searchQuery.trim();
  const trimmedDebouncedSearchQuery = debouncedSearchQuery.trim();
  const isSearchDebouncing = trimmedSearchQuery !== trimmedDebouncedSearchQuery;
  const searchOptions = useMemo<LandlordSearchOption[]>(() => {
    const staticOptions: LandlordSearchOption[] = [
      {
        title: 'Dashboard',
        breadcrumb: 'Dashboard',
        to: '/landlord-homepage',
        keywords: 'dashboard home statistics overview reminder activity',
        icon: 'solar:home-outline',
      },
      {
        title: 'Properties',
        breadcrumb: 'Properties',
        to: '/landlord/properties',
        keywords: 'properties buildings listings rooms units dorm apartments',
        icon: 'fluent:pen-16-regular',
      },
      {
        title: 'Finance',
        breadcrumb: 'Finance',
        to: '/landlord/finance',
        keywords: 'finance income collection occupancy billing payments rent',
        icon: 'solar:card-outline',
      },
      {
        title: 'My Tenants',
        breadcrumb: 'My Tenants',
        to: '/landlord/tenants',
        keywords: 'tenants renters residents applications billing',
        icon: 'tabler:user-search',
      },
      {
        title: 'Managers',
        breadcrumb: 'Managers',
        to: '/landlord/managers',
        keywords: 'managers staff assignments property manager',
        icon: 'hugeicons:id',
      },
      {
        title: 'Visits',
        breadcrumb: 'Visits',
        to: '/landlord/visits',
        keywords: 'visits ocular appointments schedule viewing',
        icon: 'solar:calendar-outline',
      },
      {
        title: 'Messages',
        breadcrumb: 'Messages',
        to: '/landlord/messages',
        keywords: 'messages chat inbox conversation',
        icon: 'ic:outline-mail',
      },
      {
        title: 'Settings',
        breadcrumb: 'Settings',
        to: '/landlord/settings',
        keywords: 'settings preferences account',
        icon: 'solar:settings-outline',
      },
      {
        title: 'Profile',
        breadcrumb: 'Profile',
        to: '/landlord/profile/switcher',
        keywords: 'profile account landlord personal information verification',
        icon: 'solar:user-circle-outline',
      },
      {
        title: 'Profile Verification',
        breadcrumb: 'Profile > Verification',
        to: '/landlord/profile/verification',
        keywords: 'profile verification account landlord documents',
        icon: 'solar:user-circle-outline',
      },
      {
        title: 'Add New Listing',
        breadcrumb: 'Properties > Add New Listing',
        to: '/landlord/properties/new',
        keywords: 'properties add new listing create listing',
        icon: 'fluent:pen-16-regular',
      },
      {
        title: 'Add a New Building',
        breadcrumb: 'Properties > Add a New Building',
        to: '/landlord/add-building',
        keywords: 'properties add building create building listing',
        icon: 'fluent:pen-16-regular',
      },
      {
        title: 'Pending Applications',
        breadcrumb: 'My Tenants > Pending Applications',
        to: '/landlord/tenants/unvalidated',
        keywords: 'tenants pending applications unvalidated applicants',
        icon: 'tabler:user-search',
      },
    ];

    const buildingOptions = BUILDINGS.flatMap((building) => [
      {
        title: building.name,
        breadcrumb: `Properties > ${building.name}`,
        to: building.url,
        keywords: `${building.name} ${building.address} ${building.buildingType} property building rooms units`,
        icon: 'fluent:pen-16-regular',
      },
      {
        title: building.name,
        breadcrumb: `Finance > ${building.name}`,
        to: `/landlord/finance/property/${building.id}`,
        keywords: `${building.name} ${building.address} ${building.buildingType} finance income rent billing collection occupancy`,
        icon: 'solar:card-outline',
      },
    ]);

    const tenantOptions = tenants.map((tenant) => ({
      title: tenant.displayName,
      breadcrumb: `My Tenants > ${tenant.displayName}`,
      to: `/landlord/tenants/${tenant.id}`,
      keywords: `${tenant.displayName} ${tenant.fullName} ${tenant.email} ${tenant.contactNumber} ${tenant.dormName} ${tenant.unit} tenant billing`,
      icon: 'tabler:user-search',
    }));

    const pendingApplicationOptions = pendingApplications.map((application) => ({
      title: application.displayName,
      breadcrumb: `My Tenants > Pending Applications > ${application.displayName}`,
      to: `/landlord/tenants/unvalidated/${application.id}`,
      keywords: `${application.displayName} ${application.fullName} ${application.email} ${application.contactNumber} ${application.dormName} ${application.unit} pending application unvalidated`,
      icon: 'tabler:user-search',
    }));

    const managerOptions = managers.map((manager) => ({
      title: manager.displayName,
      breadcrumb: `Managers > ${manager.displayName}`,
      to: `/landlord/managers/${manager.id}`,
      keywords: `${manager.displayName} ${manager.fullName} ${manager.email} ${manager.contactNumber} ${manager.property} manager`,
      icon: 'hugeicons:id',
    }));

    return [
      ...buildingOptions,
      ...tenantOptions,
      ...pendingApplicationOptions,
      ...managerOptions,
      ...staticOptions,
    ];
  }, []);
  const matchingSearchOptions = useMemo(() => {
    const query = trimmedDebouncedSearchQuery;
    if (!query) return [];

    return searchOptions
      .filter((option) => optionMatchesQuery(option, query))
  }, [searchOptions, trimmedDebouncedSearchQuery]);
  const displayedBuildings = BUILDINGS;
  const total = displayedBuildings.length;
  const [showNotify, setShowNotify] = useState(false);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    setCurrent(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + CARD_GAP),
      behavior: 'smooth',
    });
  };

  const [showHelp, setShowHelp] = useState(false);

  const openSearchOption = (option: LandlordSearchOption) => {
    setSearchQuery('');
    setIsSearchDropdownOpen(false);
    navigate(option.to);
  };

  return (
    <LandlordLayout activeSidebarItem="dashboard" breadcrumbs={[]}>
      <div className="flex w-full flex-col gap-[48px] lg:flex-row lg:items-start">
        {/* Main column */}
        <div className="flex flex-1 flex-col gap-[48px] min-w-0">
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
                onFocus={() => setIsSearchDropdownOpen(trimmedSearchQuery.length > 0)}
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
                    setSearchQuery('');
                    setIsSearchDropdownOpen(false);
                  }}
                  className="text-unselected hover:text-darkgreen dark:text-[#a4acba] dark:hover:text-[#72cbb8]"
                  aria-label="Clear search"
                >
                  <Icon icon="material-symbols:close-rounded" className="w-4 h-4" />
                </button>
              )}
            </div>

            {isSearchDropdownOpen && trimmedSearchQuery && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-[560px] overflow-y-auto rounded-num-12 border border-whitesmoke-200 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.14)] dark:border-[#303331] dark:bg-[#101111] dark:shadow-[0_18px_34px_rgba(0,0,0,0.42)]">
                {isSearchDebouncing ? (
                  <div className="flex items-center gap-3 px-4 py-4 text-sm font-semibold text-unselected dark:text-[#a4acba]">
                    <Icon icon="eos-icons:loading" className="h-5 w-5 text-teal-100" />
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
                        <Icon icon={option.icon} className="h-6 w-6" aria-hidden="true" />
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
              {STATS.map((s) => (
                <Link
                  to="/landlord/finance"
                  key={s.label}
                  className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] border border-[#f0f0f0] bg-white p-[12px] text-center"
                >
                  <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">{s.label}</b>
                  <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#096c5b]">
                    {s.value}
                  </b>
                  {s.subGradient ? (
                    <span
                      className="font-['Inter',sans-serif] text-[14px] font-medium"
                      style={{
                        background: 'linear-gradient(0deg,#ffc273,#fa7900)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {s.sub}
                    </span>
                  ) : (
                    <span
                      className={`font-['Inter',sans-serif] text-[14px] font-medium ${s.subColor}`}
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
                  className="flex items-center gap-[8px] rounded-full bg-[#f0f0f0] px-[12px] py-[4px] transition-opacity hover:opacity-80"
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
              <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />
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
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
                  aria-label="Previous property"
                >
                  <Icon icon="solar:arrow-left-bold" className="h-[16px] w-[16px] text-[#2f3136]" />
                </button>
                <button
                  onClick={() => scrollTo(current + 1)}
                  disabled={current === total - 1}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
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
              {displayedBuildings.map((b) => (
                <Link
                  key={b.name}
                  to={`/landlord/properties/${b.id}`} // Dynamic Route
                  className="flex shrink-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02]"
                  style={{ width: CARD_WIDTH }}
                >
                  <img src={b.img} alt={b.name} className="h-[120px] w-full object-cover" />
                  <div className="flex flex-col gap-[8px] p-[12px]">
                    <div className="flex items-center justify-between gap-[8px]">
                      <b className="truncate font-['Inter',sans-serif] text-[16px] tracking-[-0.01em] text-black">
                        {b.name}
                      </b>
                      <span className="flex shrink-0 items-center gap-[4px] rounded-[5px] border border-[#096c5b] px-[8px] py-[2px]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#096c5b]" />
                        <span className="font-['Poppins',sans-serif] text-[12px] text-[#096c5b]">
                          Active
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
                        {b.occupiedUnits}
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
                            background: 'linear-gradient(180deg,#5dc2a8 27.88%,#0c8873 84.13%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {b.income}
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
                            background: 'linear-gradient(180deg,#c29722,#f6b709)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {b.outstanding}
                        </b>
                      </div>
                      {/* Changed eye icon from Link to simple Icon since parent is now a Link */}
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
                title: 'Pending Applications',
                to: '/landlord/tenants/unvalidated',
                items: PENDING,
              },
              {
                title: 'Scheduled Visits',
                to: '/landlord/visits',
                items: VISITS,
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
                  {panel.items.map((item) => (
                    <PersonRow key={item.email} {...item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="flex w-full flex-col gap-[32px] lg:w-[280px] lg:shrink-0 lg:pt-[60px]">
          <div className="flex flex-col gap-[8px]">
            <Avatar className="h-[74px] w-[74px]" />
            <div className="flex items-center gap-[6px]">
              <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">
                Quevin James A. Custodio
              </b>
              <Icon
                icon="solar:verified-check-bold"
                className="h-[24px] w-[24px] shrink-0 text-[#096c5b]"
                aria-hidden="true"
              />
            </div>
            <span className="font-['Inter',sans-serif] text-[14px] text-[#666]">
              qcustodio@gmail.com
            </span>
          </div>
          <section className="flex flex-col gap-[12px]">
            <b className="font-['Inter',sans-serif] text-[14px] text-black">Activity</b>
            <div className="flex flex-col gap-[12px]">
              {ACTIVITY.map((a) => (
                <div
                  key={a.name + a.time}
                  className="flex items-center gap-[8px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[10px]"
                >
                  <Avatar className="h-[40px] w-[40px]" />
                  <div className="flex flex-1 flex-col gap-[4px] overflow-hidden">
                    <div className="flex items-center justify-between gap-[4px]">
                      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">
                        {a.name}
                      </b>
                      <span className="shrink-0 font-['Inter',sans-serif] text-[8px] font-medium text-[#8a9099]">
                        {a.time}
                      </span>
                    </div>
                    <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">
                      {a.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
      {/* ======= FLOATING ICON ========== */}
      <div
        className="help-button-animated z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
      <NotifyTenantsPopup isOpen={showNotify} onClose={() => setShowNotify(false)} />
    </LandlordLayout>
  );
};

export default LandlordHomepage;
