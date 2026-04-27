import { Navigate, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import TenantAvatar from '../../../components/landlord/tenants/TenantAvatar';
import TenantInfoField from '../../../components/landlord/tenants/TenantInfoField';
import TenantProfileHeader from '../../../components/landlord/tenants/TenantProfileHeader';
import SubmittedDocumentCard from '../../../components/landlord/tenants/SubmittedDocumentCard';
import { getTenantById, type PaymentStatus } from '../../../data/landlordTenants';

const BILLING_STATUS_CLASS: Record<PaymentStatus, string> = {
  paid: 'text-[#096c5b]',
  pending: 'bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent',
  overdue: 'bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent',
};

const BILLING_STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
};

const LandlordTenantDetail = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const tenant = tenantId ? getTenantById(tenantId) : undefined;

  if (!tenant) {
    return <Navigate to="/landlord/tenants" replace />;
  }

  return (
    <LandlordLayout
      activeSidebarItem="tenants"
      breadcrumbs={[
        { label: 'My Tenants', to: '/landlord/tenants' },
        { label: tenant.displayName },
      ]}
    >
      <div className="flex w-full flex-col gap-[12px] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[32px]">
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
              className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-[#2f3136]"
            >
              Submitted Documents
            </h2>
            <span className="font-['Inter',sans-serif] text-[14px] font-medium whitespace-nowrap text-[#666]">
              ({tenant.studentCategory})
            </span>
          </div>

          {tenant.documents.length === 0 ? (
            <p className="px-[32px] font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
              This tenant has not submitted any documents yet.
            </p>
          ) : (
            <div className="flex flex-col gap-[12px] px-[32px]">
              {tenant.documents.map((document) => (
                <SubmittedDocumentCard key={document.id} document={document} />
              ))}
            </div>
          )}
        </section>
      </div>
    </LandlordLayout>
  );
};

export default LandlordTenantDetail;
