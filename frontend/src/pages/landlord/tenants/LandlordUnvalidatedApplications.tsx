import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import TenantsToolbar from '../../../components/landlord/tenants/TenantsToolbar';
import UnvalidatedTenantCard from '../../../components/landlord/tenants/UnvalidatedTenantCard';
import UnvalidatedCardActionsPopup from '../../../components/landlord/tenants/popups/UnvalidatedCardActionsPopup';
import type { PendingApplication } from '../../../data/landlordTenants';
import { ApplicationService } from '../../../service/ApplicationService';
import { useAuthStore } from '../../../store/useAuthStore';

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
  documents?: unknown[];
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const formatName = (user?: RawApplication['userId']) =>
  [user?.firstName, user?.middleName, user?.lastName].filter(Boolean).join(' ') || 'Applicant';

const mapApplication = (application: RawApplication): PendingApplication => {
  const displayName = formatName(application.userId);
  const submittedDate = application.createdAt ? new Date(application.createdAt) : undefined;

  return {
    id: application.id ?? application._id ?? '',
    fullName: displayName.toUpperCase(),
    displayName,
    email: application.userId?.email ?? application.userId?.emails?.[0] ?? 'No email provided',
    contactNumber: application.userId?.contact ?? 'Not provided',
    homeAddress: application.userId?.address ?? 'Not provided',
    photoUrl: application.userId?.profilePicture,
    dormName: application.facilityId?.name ?? 'Dorm application',
    unit: application.unitId?.roomNumber ?? application.listingId?.roomType ?? 'Pending unit',
    baseRentFee:
      typeof application.unitId?.price === 'number'
        ? application.unitId.price.toLocaleString()
        : 'TBA',
    contractDuration: application.leaseDuration ?? 'Not provided',
    monthlyDueDate: 'To be set',
    modeOfPayment: 'To be set',
    submittedOn: submittedDate ? submittedDate.toLocaleDateString() : 'Recently',
    reviewedByManager: application.status === 'finalized',
    studentCategory: 'Student',
    documents: [],
  };
};

const LandlordUnvalidatedApplications = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isLandlord = user?.userType === 'Landlord';
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [applications, setApplications] = useState<PendingApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadApplications = async () => {
      setIsLoading(true);

      try {
        const requests = [ApplicationService.getApplications({ limit: 50, status: 'pending' })];
        if (isLandlord) {
          requests.push(ApplicationService.getApplications({ limit: 50, status: 'finalized' }));
        }

        const responses = await Promise.all(requests);
        if (!cancelled) {
          setApplications(
            responses
              .flatMap((response) => getDataArray<RawApplication>(response))
              .map(mapApplication),
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadApplications();
    return () => {
      cancelled = true;
    };
  }, [isLandlord]);

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
            count={applications.length}
            countClassName="bg-linear-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent"
          />
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
        </section>

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[16px] border border-[#f0f0f0] bg-white font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            Loading applications...
          </div>
        ) : applications.length === 0 ? (
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
            {applications.map((application) => (
              <UnvalidatedTenantCard
                key={application.id}
                application={application}
                detailTo={`/landlord/tenants/unvalidated/${application.id}`}
                onMoreOptions={(app) => setOpenMenuId((prev) => (prev === app.id ? null : app.id))}
                actionMenu={
                  <UnvalidatedCardActionsPopup
                    isOpen={openMenuId === application.id}
                    onMessage={() => {
                      setOpenMenuId(null);
                      navigate('/direct-messages');
                    }}
                    onRequestInterview={() => setOpenMenuId(null)}
                    onRemoveRequest={() => setOpenMenuId(null)}
                  />
                }
              />
            ))}
          </section>
        )}
      </div>
    </LandlordLayout>
  );
};

export default LandlordUnvalidatedApplications;
