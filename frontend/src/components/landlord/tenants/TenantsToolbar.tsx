import { useEffect, useId, useRef, useState, type FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import { type TenantListFilters, tenantFiltersActive } from '../../../utils/tenantListFilters';

type TenantsToolbarProps = {
  eyebrow?: string;
  title: string;
  count?: number | string;
  countClassName?: string;
  /** When set together with `onFilterChange`, shows the tenants filter panel (main My Tenants page). */
  filter?: TenantListFilters;
  onFilterChange?: (patch: Partial<TenantListFilters>) => void;
  onResetFilters?: () => void;
  /** Search validated tenants by display / full name (main list only). */
  nameSearchQuery?: string;
  onNameSearchChange?: (query: string) => void;
};

const STATUS_OPTIONS: Array<{ value: TenantListFilters['status']; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
];

const SORT_OPTIONS: Array<{ value: TenantListFilters['sort']; label: string }> = [
  { value: 'date-asc', label: 'Date — oldest first' },
  { value: 'date-desc', label: 'Date — newest first' },
  { value: 'amount-asc', label: 'Monthly rent — low to high' },
  { value: 'amount-desc', label: 'Monthly rent — high to low' },
];

const TenantsToolbar: FunctionComponent<TenantsToolbarProps> = ({
  eyebrow,
  title,
  count,
  countClassName = 'text-[#096c5b]',
  filter,
  onFilterChange,
  onResetFilters,
  nameSearchQuery = '',
  onNameSearchChange,
}) => {
  const showTenantFilters = filter !== undefined && onFilterChange !== undefined;
  const showNameSearch = showTenantFilters && onNameSearchChange !== undefined;

  const panelId = useId();
  const [panelOpen, setPanelOpen] = useState(false);
  const [nameSearchOpen, setNameSearchOpen] = useState(() => nameSearchQuery.trim().length > 0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const facilityInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!panelOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setPanelOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false);
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [panelOpen]);

  useEffect(() => {
    if (nameSearchQuery.trim().length > 0) setNameSearchOpen(true);
  }, [nameSearchQuery]);

  const focusNameInput = () => {
    requestAnimationFrame(() => nameInputRef.current?.focus());
  };

  const summaryLabel =
    showTenantFilters && filter && tenantFiltersActive(filter) ? 'Filters · active' : 'Tenants filter';

  const handleStatus = (value: TenantListFilters['status']) => {
    onFilterChange?.({ status: value });
  };

  return (
    <div className="flex w-full flex-col gap-[16px] sm:flex-row sm:items-start sm:gap-[20px]">
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        {eyebrow && (
          <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            {eyebrow}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-[12px]">
          <span className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-black">
            {title}
          </span>
          {count !== undefined && (
            <span
              className={[
                "font-['Inter',sans-serif] text-[24px] font-bold leading-[32px]",
                countClassName,
              ].join(' ')}
            >
              {count}
            </span>
          )}
          {showNameSearch && (
            <>
              <button
                type="button"
                onClick={() => {
                  setNameSearchOpen((open) => {
                    const next = !open;
                    if (next) focusNameInput();
                    return next;
                  });
                }}
                aria-label="Search tenants by name"
                aria-expanded={nameSearchOpen}
                className="flex h-[32px] w-[32px] shrink-0 cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
              >
                <Icon
                  icon="material-symbols:search-rounded"
                  className="h-[24px] w-[24px]"
                  aria-hidden="true"
                />
              </button>
              {nameSearchOpen && (
                <div className="flex min-w-[200px] max-w-[min(100%,320px)] flex-1 basis-full sm:basis-[280px]">
                  <input
                    ref={nameInputRef}
                    type="search"
                    value={nameSearchQuery}
                    onChange={(e) => onNameSearchChange?.(e.target.value)}
                    placeholder="Search by tenant name..."
                    aria-label="Filter tenants by name"
                    className="h-[40px] w-full rounded-[12px] border border-solid border-[#f0f0f0] bg-[#fafafa] px-[14px] font-['Inter',sans-serif] text-[14px] font-medium text-[#2f3136] outline-none transition-colors focus:border-[#096c5b]/40 focus:bg-white"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showTenantFilters && filter && onFilterChange && (
        <div className="relative shrink-0 sm:pr-[32px]" ref={wrapRef}>
          <div className="flex h-[60px] items-center justify-end gap-[10px] py-[10px]">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-black">
              Filter:
            </span>
            <button
              type="button"
              aria-expanded={panelOpen}
              aria-controls={panelId}
              aria-haspopup="dialog"
              onClick={() => setPanelOpen((o) => !o)}
              className="flex h-full min-h-[44px] cursor-pointer items-center justify-center gap-[10px] rounded-[16px] border border-solid border-[#f8fafc] bg-[#f8fafc] px-[12px] py-[8px] transition-colors duration-200 hover:bg-[#eef3f9]"
            >
              <span className="font-['Inter',sans-serif] text-[14px] font-medium leading-[24px] whitespace-nowrap text-[#666]">
                {summaryLabel}
              </span>
              <Icon
                icon="mdi-light:chevron-down"
                className={[
                  'h-[24px] w-[24px] text-[#2f3136] transition-transform',
                  panelOpen ? 'rotate-180' : '',
                ].join(' ')}
                aria-hidden="true"
              />
            </button>
          </div>

          {panelOpen && (
            <div
              id={panelId}
              role="dialog"
              aria-label="Tenants filter"
              className="absolute right-0 top-full z-40 mt-[4px] w-[min(100vw-32px,360px)] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-[8px]">
                  <span className="font-['Inter',sans-serif] text-[12px] font-bold uppercase tracking-wide text-[#666]">
                    Status
                  </span>
                  <div className="flex flex-wrap gap-[8px]">
                    {STATUS_OPTIONS.map((opt) => {
                      const active = filter.status === opt.value;
                      return (
                        <button
                          key={String(opt.value)}
                          type="button"
                          onClick={() => handleStatus(opt.value)}
                          className={[
                            'rounded-full px-[14px] py-[6px] font-["Inter",sans-serif] text-[13px] font-semibold transition-colors',
                            active
                              ? 'bg-[#096c5b] text-white dark:bg-[#12342e] dark:text-[#72cbb8]'
                              : 'bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb] dark:bg-[#242526] dark:text-[#a4acba] dark:hover:bg-[#2d302f]',
                          ].join(' ')}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <label
                    htmlFor={`${panelId}-sort`}
                    className="font-['Inter',sans-serif] text-[12px] font-bold uppercase tracking-wide text-[#666]"
                  >
                    Sort
                  </label>
                  <div className="relative">
                    <select
                      id={`${panelId}-sort`}
                      value={filter.sort}
                      onChange={(e) =>
                        onFilterChange({ sort: e.target.value as TenantListFilters['sort'] })
                      }
                      className="w-full appearance-none rounded-[12px] border border-solid border-[#f0f0f0] bg-white py-[10px] pr-[40px] pl-[14px] font-['Inter',sans-serif] text-[14px] font-medium text-[#2f3136] outline-none focus-visible:ring-2 focus-visible:ring-[#096c5b]/30"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <Icon
                      icon="mdi-light:chevron-down"
                      className="pointer-events-none absolute right-[10px] top-1/2 h-[22px] w-[22px] -translate-y-1/2 text-[#666]"
                      aria-hidden
                    />
                  </div>
                  <p className="font-['Inter',sans-serif] text-[11px] font-medium text-[#8a9099]">
                    Amount uses each tenant&apos;s monthly base rent.
                  </p>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <label
                    htmlFor={`${panelId}-facility`}
                    className="font-['Inter',sans-serif] text-[12px] font-bold uppercase tracking-wide text-[#666]"
                  >
                    Facility
                  </label>
                  <div className="flex items-center gap-[8px] rounded-[12px] border border-solid border-[#f0f0f0] bg-[#fafafa] px-[12px] py-[8px] transition-colors focus-within:border-[#096c5b]/40 focus-within:bg-white dark:border-[#303331] dark:bg-[#1f2022] dark:focus-within:border-[#72cbb8]/40 dark:focus-within:bg-[#101111]">
                    <Icon
                      icon="material-symbols:search-rounded"
                      className="h-[20px] w-[20px] shrink-0 text-[#64748b] dark:text-[#a4acba]"
                      aria-hidden
                    />
                    <input
                      ref={facilityInputRef}
                      id={`${panelId}-facility`}
                      type="search"
                      placeholder="Dorm or apartment name..."
                      value={filter.facilityQuery}
                      onChange={(e) => onFilterChange({ facilityQuery: e.target.value })}
                      className="min-w-0 flex-1 bg-transparent font-['Inter',sans-serif] text-[14px] font-medium text-[#2f3136] dark:text-[#d7e0ef] outline-none placeholder:text-[#9ca3af] dark:placeholder:text-[#6b7280]"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {tenantFiltersActive(filter) && onResetFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetFilters();
                    }}
                    className="self-start font-['Inter',sans-serif] text-[13px] font-semibold text-[#096c5b] underline-offset-2 hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TenantsToolbar;
