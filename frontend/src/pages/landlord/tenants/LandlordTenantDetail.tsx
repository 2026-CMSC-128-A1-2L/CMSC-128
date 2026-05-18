import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import TenantAvatar from '../../../components/landlord/tenants/TenantAvatar';
import TenantInfoField from '../../../components/landlord/tenants/TenantInfoField';
import TenantProfileHeader from '../../../components/landlord/tenants/TenantProfileHeader';
import SubmittedDocumentCard from '../../../components/landlord/tenants/SubmittedDocumentCard';
import type { PaymentStatus, Tenant } from '../../../data/landlordTenants';
import { FacilityService } from '../../../service/FacilityService';
import { SkeletonBlock } from '../../../components/general/Skeleton';

const BILLING_STATUS_CLASS: Record<PaymentStatus, string> = {
  paid: 'text-[#096c5b]',
  pending: 'bg-linear-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent',
  overdue: 'bg-linear-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent',
  unpaid: 'text-[#666] dark:text-[#a4acba]',
  partially_paid: 'bg-linear-to-t from-[#ffc273] to-[#fa7900] bg-clip-text text-transparent',
};

const BILLING_STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  unpaid: 'Unpaid',
  partially_paid: 'Partially Paid',
};

const LandlordTenantDetail = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        setIsLoading(true);
        const tenants = await FacilityService.getTenants();
        const found = tenants.find((t: Tenant) => t.id === tenantId);
        if (found) {
          setTenant(found);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to fetch tenant details:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTenant();
  }, [tenantId]);

  if (notFound) {
    return <Navigate to="/landlord/tenants" replace />;
  }

  if (isLoading || !tenant) {
    return (
      <LandlordLayout
        activeSidebarItem="tenants"
        breadcrumbs={[{ label: 'My Tenants', to: '/landlord/tenants' }, { label: 'Tenant details' }]}
      >
        <div className="flex w-full flex-col gap-[24px] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[32px] dark:border-[#303331] dark:bg-[#141515]">
          <div className="flex flex-col gap-3">
            <SkeletonBlock className="h-7 w-56" />
            <SkeletonBlock className="h-4 w-72" />
          </div>
          <div className="grid w-full gap-x-[48px] gap-y-[24px] md:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <SkeletonBlock className="h-[200px] w-[200px] rounded-full" />
            {['tenant-info-a', 'tenant-info-b', 'tenant-info-c'].map((key) => (
              <div key={key} className="flex flex-col gap-4">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-5 w-40" />
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-5 w-48" />
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-5 w-36" />
              </div>
            ))}
          </div>
        </div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout
      activeSidebarItem="tenants"
      breadcrumbs={[
        { label: 'My Tenants', to: '/landlord/tenants' },
        { label: tenant.displayName },
      ]}
    >
      <div className="flex w-full flex-col gap-[12px] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[32px] dark:border-[#303331] dark:bg-[#141515]">
        <TenantProfileHeader displayName={tenant.displayName} email={tenant.email} />

        <section
          aria-label="Tenant information"
          className="grid w-full gap-x-[48px] gap-y-[24px] py-[4px] md:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start"
        >
          <TenantAvatar photoUrl={tenant.photoUrl} name={tenant.displayName} size={200} />

          <div className="flex flex-col gap-[16px] p-[10px]">
            <TenantInfoField label="Name">{tenant.fullName}</TenantInfoField>
            <TenantInfoField label="Contact number">{tenant.contactNumber}</TenantInfoField>
            <TenantInfoField label="Home Address">{tenant.homeAddress}</TenantInfoField>
          </div>

          <div className="flex flex-col gap-[16px] p-[10px]">
            <TenantInfoField label="Current Dorm">{tenant.dormName}</TenantInfoField>
            <TenantInfoField label="Base Rent Fee">{tenant.baseRentFee}</TenantInfoField>
            <TenantInfoField label="Contract Duration">{tenant.contractDuration}</TenantInfoField>
          </div>

          <div className="flex flex-col gap-[16px] p-[10px]">
            <TenantInfoField label="Monthly Due Date">{tenant.monthlyDueDate}</TenantInfoField>
            <TenantInfoField label="Mode of Payment">{tenant.modeOfPayment}</TenantInfoField>
            <TenantInfoField
              label="Billing Status"
              valueClassName={BILLING_STATUS_CLASS[tenant.billingStatus]}
            >
              {BILLING_STATUS_LABEL[tenant.billingStatus]}
            </TenantInfoField>
          </div>
        </section>

        <section
          aria-labelledby="submitted-documents-heading"
          className="flex flex-col gap-[16px] pt-[16px]"
        >
          <div className="flex items-center gap-[24px] px-[32px]">
            <h2
              id="submitted-documents-heading"
              className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-[#2f3136] dark:text-[#d7e0ef]"
            >
              Submitted Documents
            </h2>
            <span className="font-['Inter',sans-serif] text-[14px] font-medium whitespace-nowrap text-[#666] dark:text-[#a4acba]">
              ({tenant.studentCategory})
            </span>
          </div>

          {tenant.documents.length === 0 ? (
            <p className="px-[32px] font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
              This tenant has not submitted any documents yet.
            </p>
          ) : (
            <div className="flex flex-col gap-[12px] px-[32px]">
              {tenant.documents.map((document) => (
                <SubmittedDocumentCard key={document.id} document={document} showMoreMenu={false} />
              ))}
            </div>
          )}
        </section>
      </div>
    </LandlordLayout>
  );
};

export default LandlordTenantDetail;
