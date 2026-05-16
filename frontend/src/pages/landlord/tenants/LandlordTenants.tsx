import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import LandlordManagerActionsPopover, {
  type ManagerAction,
} from '../../../components/landlord/LandlordManagerActionsPopover';
import ReportManager from '../../../components/landlord/LandlordManagerReportController';
import TenantsToolbar from '../../../components/landlord/tenants/TenantsToolbar';
import TenantCard from '../../../components/landlord/tenants/TenantCard';
import RemoveTenantPopup from '../../../components/landlord/tenants/popups/RemoveTenantPopup';
import {
  defaultTenantListFilters,
  filterAndSortTenants,
  filterTenantsByName,
  tenantFiltersActive,
} from '../../../utils/tenantListFilters';
import { pendingApplications, type Tenant } from '../../../data/landlordTenants';
import { FacilityService } from '../../../service/FacilityService';

const LandlordTenants = () => {
  const navigate = useNavigate();
  const pendingCount = pendingApplications.length;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [reportTarget, setReportTarget] = useState<Tenant | null>(null);
  const [removeTarget, setRemoveTarget] = useState<Tenant | null>(null);
  const [filters, setFilters] = useState(defaultTenantListFilters);
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setIsLoading(true);
        const data = await FacilityService.getTenants();
        setTenants(data);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const handleTenantAction = (tenant: Tenant, action: ManagerAction) => {
    setOpenMenuId(null);
    if (action === 'message') {
      navigate('/landlord/messages');
      return;
    }
    if (action === 'report') {
      setReportTarget(tenant);
      return;
    }
    if (action === 'remove') {
      setRemoveTarget(tenant);
    }
  };

  const filteredTenants = useMemo(() => {
    const sorted = filterAndSortTenants(tenants, filters);
    return filterTenantsByName(sorted, nameSearchQuery);
  }, [tenants, filters, nameSearchQuery]);

  const patchFilters = (patch: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const resetAllListFilters = () => {
    setFilters(defaultTenantListFilters);
    setNameSearchQuery('');
  };

  const hasActiveListFilters = tenantFiltersActive(filters) || nameSearchQuery.trim().length > 0;

  return (
    <LandlordLayout activeSidebarItem="tenants" breadcrumbs={[{ label: 'My Tenants' }]}>
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        <section className="flex w-full flex-col gap-[12px]">
          <TenantsToolbar
            eyebrow="My Tenants"
            title="Tenants"
            count={filteredTenants.length}
            countClassName="text-[#096c5b]"
            filter={filters}
            onFilterChange={patchFilters}
            onResetFilters={resetAllListFilters}
            nameSearchQuery={nameSearchQuery}
            onNameSearchChange={setNameSearchQuery}
          />
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />

          {pendingCount > 0 && (
            <div className="flex w-full items-center gap-[8px] px-[4px] py-[10px]">
              <Icon
                icon="famicons:alert-outline"
                className="h-[20px] w-[20px] text-[#c29722]"
                aria-hidden="true"
              />
              <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-black">
                You have pending applications.
              </span>
              <Link
                to="/landlord/tenants/unvalidated"
                className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap bg-linear-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                See all
              </Link>
            </div>
          )}
        </section>

        {isLoading ? (
          <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-[16px] rounded-[16px] border border-dashed border-[#f0f0f0] bg-white p-[32px] text-center">
            <Icon
              icon="eos-icons:loading"
              className="h-[48px] w-[48px] text-[#096c5b]"
              aria-hidden="true"
            />
            <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#2f3136]">
              Loading tenants...
            </p>
          </div>
        ) : tenants.length === 0 ? (
          <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-[16px] rounded-[16px] border border-dashed border-[#f0f0f0] bg-white p-[32px] text-center">
            <Icon
              icon="solar:users-group-two-rounded-bold-duotone"
              className="h-[48px] w-[48px] text-[#096c5b]"
              aria-hidden="true"
            />
            <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#2f3136]">
              You have no tenants yet
            </p>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#666]">
              Validated tenants will appear here.
            </p>
          </div>
        ) : filteredTenants.length === 0 ? (
          <div className="flex min-h-[280px] w-full flex-col items-center justify-center gap-[16px] rounded-[16px] border border-dashed border-[#f0f0f0] bg-white p-[32px] text-center">
            <Icon
              icon="material-symbols:filter-alt-off"
              className="h-[40px] w-[40px] text-[#64748b]"
              aria-hidden="true"
            />
            <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#2f3136]">
              No tenants match your filters
            </p>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#666]">
              Try a different status, sort, facility search, or tenant name search.
            </p>
            {hasActiveListFilters && (
              <button
                type="button"
                onClick={resetAllListFilters}
                className="rounded-[12px] bg-[#cbf6ed] px-[24px] py-[10px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <section
            aria-label="Tenants grid"
            className="grid w-full grid-cols-1 gap-x-[24px] gap-y-[32px] sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredTenants.map((tenant) => (
              <TenantCard
                key={tenant.id}
                tenant={tenant}
                to={`/landlord/tenants/${tenant.id}`}
                menuOpen={openMenuId === tenant.id}
                onKebabClick={(t) => setOpenMenuId((prev) => (prev === t.id ? null : t.id))}
                actionMenu={
                  <LandlordManagerActionsPopover
                    open={openMenuId === tenant.id}
                    onClose={() => setOpenMenuId(null)}
                    onAction={(action) => handleTenantAction(tenant, action)}
                    subjectName={tenant.displayName}
                  />
                }
              />
            ))}
          </section>
        )}
      </div>
      <RemoveTenantPopup
        targetName={removeTarget?.displayName ?? null}
        isOpen={Boolean(removeTarget)}
        onClose={() => setRemoveTarget(null)}
      />
      <ReportManager
        isOpen={Boolean(reportTarget)}
        onClose={() => setReportTarget(null)}
        manager={
          reportTarget ? { displayName: reportTarget.displayName, email: reportTarget.email } : null
        }
        type="tenant"
      />
    </LandlordLayout>
  );
};

export default LandlordTenants;
