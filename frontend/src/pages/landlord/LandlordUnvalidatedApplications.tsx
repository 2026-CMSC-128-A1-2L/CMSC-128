import { Icon } from '@iconify/react';
import LandlordLayout from '../../components/landlord/LandlordLayout';
import TenantsToolbar from '../../components/landlord/tenants/TenantsToolbar';
import UnvalidatedTenantCard from '../../components/landlord/tenants/UnvalidatedTenantCard';
import { pendingApplications } from '../../data/landlordTenants';

const LandlordUnvalidatedApplications = () => {
  return (
    <LandlordLayout
      activeSidebarItem="tenants"
      breadcrumbs={[
        { label: 'My Tenants', to: '/landlord/tenants' },
        { label: 'Unvalidated Applications' },
      ]}
    >
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        <section className="flex w-full flex-col gap-[12px]">
          <TenantsToolbar
            title="Unvalidated Applications"
            count={pendingApplications.length}
            countClassName="bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent"
          />
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
        </section>

        {pendingApplications.length === 0 ? (
          <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-[16px] rounded-[16px] border border-dashed border-[#f0f0f0] bg-white p-[32px] text-center">
            <Icon
              icon="fluent:checkmark-circle-20-regular"
              className="h-[48px] w-[48px] text-[#096c5b]"
              aria-hidden="true"
            />
            <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#2f3136]">
              All caught up!
            </p>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#666]">
              There are no pending applications to review.
            </p>
          </div>
        ) : (
          <section
            aria-label="Unvalidated applications grid"
            className="grid w-full grid-cols-1 gap-x-[24px] gap-y-[32px] sm:grid-cols-2 xl:grid-cols-3"
          >
            {pendingApplications.map((application) => (
              <UnvalidatedTenantCard
                key={application.id}
                application={application}
                detailTo={`/landlord/tenants/unvalidated/${application.id}`}
              />
            ))}
          </section>
        )}
      </div>
    </LandlordLayout>
  );
};

export default LandlordUnvalidatedApplications;
