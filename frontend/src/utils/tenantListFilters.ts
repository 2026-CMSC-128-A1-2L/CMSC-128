import type { PaymentStatus, Tenant } from '../data/landlordTenants';

export type TenantListFilters = {
  status: 'all' | PaymentStatus;
  sort: 'date-asc' | 'date-desc' | 'amount-asc' | 'amount-desc';
  facilityQuery: string;
};

export const defaultTenantListFilters: TenantListFilters = {
  status: 'all',
  sort: 'date-desc',
  facilityQuery: '',
};

/** Parse first segment of `contractDuration` e.g. `04/26 - 4/27` → contract start (month). */
export function getContractStartTimestamp(tenant: Tenant): number {
  const first = tenant.contractDuration.split('-')[0]?.trim() ?? '';
  const [mm, yy] = first.split('/').map((x) => parseInt(x.trim(), 10));
  if (!Number.isFinite(mm) || !Number.isFinite(yy)) return 0;
  const year = yy < 100 ? 2000 + yy : yy;
  return new Date(year, mm - 1, 1).getTime();
}

export function parseBaseRentAmount(baseRentFee: string): number {
  const n = parseFloat(baseRentFee.replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function filterAndSortTenants(list: Tenant[], filters: TenantListFilters): Tenant[] {
  const q = filters.facilityQuery.trim().toLowerCase();

  let out = list.filter((t) => {
    if (filters.status !== 'all' && t.billingStatus !== filters.status) return false;
    if (q) {
      const hay = `${t.dormName} ${t.unit}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const byDate = (a: Tenant, b: Tenant) =>
    getContractStartTimestamp(a) - getContractStartTimestamp(b);
  const byAmount = (a: Tenant, b: Tenant) =>
    parseBaseRentAmount(a.baseRentFee) - parseBaseRentAmount(b.baseRentFee);

  switch (filters.sort) {
    case 'date-asc':
      out = [...out].sort(byDate);
      break;
    case 'date-desc':
      out = [...out].sort((a, b) => byDate(b, a));
      break;
    case 'amount-asc':
      out = [...out].sort(byAmount);
      break;
    case 'amount-desc':
      out = [...out].sort((a, b) => byAmount(b, a));
      break;
    default:
      break;
  }

  return out;
}

export function tenantFiltersActive(filters: TenantListFilters): boolean {
  return filters.status !== 'all' || filters.facilityQuery.trim().length > 0;
}
