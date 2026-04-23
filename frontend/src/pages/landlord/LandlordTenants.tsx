import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../components/landlord/LandlordLayout';
import TenantsToolbar from '../../components/landlord/tenants/TenantsToolbar';
import TenantCard from '../../components/landlord/tenants/TenantCard';
import RemoveTenantPopup from '../../components/landlord/tenants/popups/RemoveTenantPopup';
import {
  TENANT_COUNT,
  pendingApplications,
  tenants,
  type Tenant,
} from '../../data/landlordTenants';

const LandlordTenants = () => {
  const pendingCount = pendingApplications.length;
  const [removeTarget, setRemoveTarget] = useState<Tenant | null>(null);

  return (
    <LandlordLayout activeSidebarItem="tenants" breadcrumbs={[{ label: 'My Tenants' }]}>
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        <section className="flex w-full flex-col gap-[12px]">
          <TenantsToolbar
            eyebrow="My Tenants"
            title="Tenants"
            count={TENANT_COUNT}
            countClassName="text-[#096c5b]"
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
                className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                See all
              </Link>
            </div>
          )}
        </section>

        {tenants.length === 0 ? (
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
        ) : (
          <section
            aria-label="Tenants grid"
            className="grid w-full grid-cols-1 gap-x-[24px] gap-y-[32px] sm:grid-cols-2 xl:grid-cols-3"
          >
            {tenants.map((tenant) => (
              <TenantCard
                key={tenant.id}
                tenant={tenant}
                to={`/landlord/tenants/${tenant.id}`}
                onMoreOptions={setRemoveTarget}
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
    </LandlordLayout>
  );
};

export default LandlordTenants;
