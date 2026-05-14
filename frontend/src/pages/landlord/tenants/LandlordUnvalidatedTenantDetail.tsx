import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import TenantAvatar from '../../../components/landlord/tenants/TenantAvatar';
import TenantInfoField from '../../../components/landlord/tenants/TenantInfoField';
import TenantProfileHeader from '../../../components/landlord/tenants/TenantProfileHeader';
import SubmittedDocumentCard, {
  type DocumentReviewStatus,
} from '../../../components/landlord/tenants/SubmittedDocumentCard';
import ApproveDocumentPopup from '../../../components/landlord/tenants/popups/ApproveDocumentPopup';
import FileActionPopup from '../../../components/landlord/tenants/popups/FileActionPopup';
import RejectDocumentPopup from '../../../components/landlord/tenants/popups/RejectDocumentPopup';
import type { PendingApplication, SubmittedDocument } from '../../../data/landlordTenants';
import { ApplicationService } from '../../../service/ApplicationService';
import { UnitService } from '../../../service/UnitService';
import { useAuthStore } from '../../../store/useAuthStore';

type RawDocument = {
  docId?: string;
  name?: string;
  files?: string[];
  status?: string;
};

type RawApplication = {
  _id?: string;
  id?: string;
  status?: 'pending' | 'rejected' | 'waitlisted' | 'approved' | 'finalized';
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
  listingId?: string | { _id?: string; id?: string; roomType?: string };
  unitId?: { _id?: string; id?: string; roomNumber?: string; price?: number };
  leaseDuration?: string;
  documents?: RawDocument[];
};

type RawUnit = {
  _id?: string;
  id?: string;
  roomNumber?: string;
  isAvailable?: boolean;
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const getListingId = (application: RawApplication) => {
  if (typeof application.listingId === 'string') return application.listingId;
  return application.listingId?._id ?? application.listingId?.id ?? '';
};

const formatName = (user?: RawApplication['userId']) =>
  [user?.firstName, user?.middleName, user?.lastName].filter(Boolean).join(' ') || 'Applicant';

const mapApplication = (application: RawApplication): PendingApplication => {
  const displayName = formatName(application.userId);
  const documents: SubmittedDocument[] =
    application.documents?.flatMap((document) =>
      (document.files?.length ? document.files : ['']).map((fileId, index) => ({
        id: `${document.docId ?? document.name}-${index}`,
        title: document.name ?? document.docId ?? 'Document',
        fileName: fileId || 'No file uploaded',
        submittedAt: 'Submitted',
        kind:
          fileId.toLowerCase().endsWith('.png') || fileId.toLowerCase().endsWith('.jpg')
            ? 'image'
            : 'pdf',
      })),
    ) ?? [];

  return {
    id: application.id ?? application._id ?? '',
    fullName: displayName.toUpperCase(),
    displayName,
    email: application.userId?.email ?? application.userId?.emails?.[0] ?? 'No email provided',
    contactNumber: application.userId?.contact ?? 'Not provided',
    homeAddress: application.userId?.address ?? 'Not provided',
    photoUrl: application.userId?.profilePicture,
    dormName: application.facilityId?.name ?? 'Dorm application',
    unit:
      application.unitId?.roomNumber ??
      (typeof application.listingId === 'object'
        ? application.listingId.roomType
        : 'Pending unit') ??
      'Pending unit',
    baseRentFee:
      typeof application.unitId?.price === 'number'
        ? application.unitId.price.toLocaleString()
        : 'TBA',
    contractDuration: application.leaseDuration ?? 'Not provided',
    monthlyDueDate: 'To be set',
    modeOfPayment: 'To be set',
    submittedOn: 'Recently',
    reviewedByManager: application.status === 'finalized',
    studentCategory: application.status === 'pending' ? 'Initial Screening' : 'Final Approval',
    documents,
  };
};

const LandlordUnvalidatedTenantDetail = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isLandlord = user?.userType === 'Landlord';
  const [rawApplication, setRawApplication] = useState<RawApplication | null>(null);
  const [application, setApplication] = useState<PendingApplication | null>(null);
  const [availableUnits, setAvailableUnits] = useState<RawUnit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [openFileMenuId, setOpenFileMenuId] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<SubmittedDocument | null>(null);
  const [approveTarget, setApproveTarget] = useState<SubmittedDocument | null>(null);
  const [docReview, setDocReview] = useState<Record<string, DocumentReviewStatus>>({});

  useEffect(() => {
    if (!tenantId) return;
    let cancelled = false;

    const loadApplication = async () => {
      setIsLoading(true);
      try {
        const response = await ApplicationService.getApplication(tenantId);
        const loadedApplication = (response.data ?? response) as RawApplication;
        if (cancelled) return;

        if (loadedApplication.status === 'finalized' && !isLandlord) {
          navigate('/landlord/tenants/unvalidated', { replace: true });
          return;
        }

        setRawApplication(loadedApplication);
        setApplication(mapApplication(loadedApplication));

        const listingId = getListingId(loadedApplication);
        if (listingId && loadedApplication.status === 'pending') {
          const unitsResponse = await UnitService.getUnitsByListing(listingId);
          if (cancelled) return;
          const units = getDataArray<RawUnit>(unitsResponse).filter(
            (unit) => unit.isAvailable !== false,
          );
          setAvailableUnits(units);
          setSelectedUnitId(units[0]?._id ?? units[0]?.id ?? '');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadApplication();
    return () => {
      cancelled = true;
    };
  }, [tenantId, isLandlord, navigate]);

  useEffect(() => {
    if (!application) return;
    const next: Record<string, DocumentReviewStatus> = {};
    application.documents.forEach((d) => {
      next[d.id] = 'pending';
    });
    setDocReview(next);
    setOpenFileMenuId(null);
    setRejectTarget(null);
    setApproveTarget(null);
  }, [application]);

  const hasDocuments = Boolean(application && application.documents.length > 0);

  const allDocumentsApproved = useMemo(() => {
    if (!application) return true;
    if (application.documents.length === 0) return true;
    return application.documents.every((d) => docReview[d.id] === 'approved');
  }, [application, docReview]);

  const handleRejectApplication = () => {
    if (!tenantId) return;
    void ApplicationService.rejectApplication(tenantId).finally(() =>
      navigate('/landlord/tenants/unvalidated'),
    );
  };

  const handleApproveApplication = () => {
    if (!tenantId || !rawApplication) return;
    if (rawApplication.status === 'finalized' && !isLandlord) return;
    if (rawApplication.status === 'finalized' && !allDocumentsApproved) return;
    if (rawApplication.status === 'pending' && !selectedUnitId) return;

    void ApplicationService.approveApplication(tenantId, {
      unitId: selectedUnitId || rawApplication.unitId?._id || rawApplication.unitId?.id || tenantId,
    }).finally(() => navigate('/landlord/tenants/unvalidated'));
  };

  if (isLoading) {
    return (
      <LandlordLayout
        activeSidebarItem="tenants"
        breadcrumbs={[
          { label: 'My Tenants', to: '/landlord/tenants' },
          { label: 'Unvalidated Applications', to: '/landlord/tenants/unvalidated' },
        ]}
      >
        <div className="rounded-[16px] border border-[#f0f0f0] bg-white p-[32px] text-center font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
          Loading application...
        </div>
      </LandlordLayout>
    );
  }

  if (!application) {
    return <Navigate to="/landlord/tenants/unvalidated" replace />;
  }

  return (
    <LandlordLayout
      activeSidebarItem="tenants"
      breadcrumbs={[
        { label: 'My Tenants', to: '/landlord/tenants' },
        {
          label: 'Unvalidated Applications',
          to: '/landlord/tenants/unvalidated',
        },
        { label: application.displayName },
      ]}
    >
      <div className="flex w-full flex-col gap-[24px] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[32px]">
        <TenantProfileHeader displayName={application.displayName} email={application.email} />

        <div className="grid w-full gap-[32px] md:grid-cols-[320px_minmax(0,1fr)] md:items-start">
          <section
            aria-label="Applicant profile"
            className="flex w-full flex-col items-center gap-[24px] py-[12px]"
          >
            <TenantAvatar
              photoUrl={application.photoUrl}
              name={application.displayName}
              size={200}
            />

            <div className="grid w-full grid-cols-2 gap-x-[32px] gap-y-[16px]">
              <TenantInfoField label="Full Name">{application.fullName}</TenantInfoField>
              <TenantInfoField label="Home Address">{application.homeAddress}</TenantInfoField>
              <TenantInfoField label="Contact number">{application.contactNumber}</TenantInfoField>
              <TenantInfoField label="Pending Dorm">{application.dormName}</TenantInfoField>
              <TenantInfoField label="Contract Duration">
                {application.contractDuration}
              </TenantInfoField>
              <TenantInfoField label="Base Rent Fee">{application.baseRentFee}</TenantInfoField>
              <TenantInfoField label="Monthly Due Date">
                {application.monthlyDueDate}
              </TenantInfoField>
              <TenantInfoField label="Mode of Payment">{application.modeOfPayment}</TenantInfoField>
              {rawApplication?.status === 'pending' && (
                <div className="col-span-2 flex flex-col gap-[6px] text-left font-['Inter',sans-serif]">
                  <span className="text-[12px] font-bold text-[#666]">Assign Unit</span>
                  <select
                    value={selectedUnitId}
                    onChange={(event) => setSelectedUnitId(event.target.value)}
                    className="rounded-[12px] border border-[#f0f0f0] px-[12px] py-[10px] text-[14px] font-bold text-[#2f3136]"
                  >
                    {availableUnits.length === 0 ? (
                      <option value="">No available units</option>
                    ) : (
                      availableUnits.map((unit) => (
                        <option key={unit._id ?? unit.id} value={unit._id ?? unit.id}>
                          {unit.roomNumber ?? 'Available unit'}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}
            </div>
          </section>

          <section
            aria-labelledby="submitted-documents-heading"
            className="flex w-full flex-col gap-[12px] px-[16px] py-[12px]"
          >
            <div className="flex h-[32px] items-center gap-[24px]">
              <h2
                id="submitted-documents-heading"
                className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-[#2f3136]"
              >
                Submitted Documents
              </h2>
              <span className="font-['Inter',sans-serif] text-[14px] font-medium whitespace-nowrap text-[#666]">
                ({application.studentCategory})
              </span>
            </div>

            {!hasDocuments ? (
              <p className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
                Applicant has not submitted any documents yet.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-[12px]">
                  {application.documents.map((document) => (
                    <SubmittedDocumentCard
                      key={document.id}
                      document={document}
                      reviewStatus={docReview[document.id] ?? 'pending'}
                      onMoreOptions={(doc) =>
                        setOpenFileMenuId((prev) => (prev === doc.id ? null : doc.id))
                      }
                      actionMenu={
                        <FileActionPopup
                          isOpen={openFileMenuId === document.id}
                          onApprove={() => {
                            setOpenFileMenuId(null);
                            setApproveTarget(document);
                          }}
                          onReject={() => {
                            setOpenFileMenuId(null);
                            setRejectTarget(document);
                          }}
                        />
                      }
                    />
                  ))}
                </div>

                {rawApplication?.status === 'finalized' && !allDocumentsApproved && (
                  <p className="px-[12px] text-center font-['Inter',sans-serif] text-[13px] font-medium text-[#64748b]">
                    Every document must be approved before final landlord approval.
                  </p>
                )}

                <div className="flex w-full flex-col items-center justify-center gap-[10px] px-[12px] pt-[8px]">
                  <div className="flex items-center justify-center gap-[10px]">
                    <button
                      type="button"
                      onClick={handleRejectApplication}
                      className="flex cursor-pointer items-center justify-center rounded-[16px] bg-[#f1f5f9] px-[16px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold transition-colors duration-200 hover:bg-[#e5edf4]"
                    >
                      <span className="bg-linear-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent">
                        Reject
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleApproveApplication}
                      disabled={
                        rawApplication?.status === 'pending'
                          ? !selectedUnitId
                          : !isLandlord || !allDocumentsApproved
                      }
                      className={[
                        "flex cursor-pointer items-center justify-center rounded-[16px] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold transition-colors duration-200",
                        (
                          rawApplication?.status === 'pending'
                            ? Boolean(selectedUnitId)
                            : isLandlord && allDocumentsApproved
                        )
                          ? 'bg-[#cbf6ed] text-[#096c5b] hover:bg-[#b4efe1]'
                          : 'cursor-not-allowed bg-[#e8ecf1] text-[#94a3b8]',
                      ].join(' ')}
                    >
                      {rawApplication?.status === 'pending'
                        ? 'Approve Initial Screening'
                        : 'Final Approve'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      <ApproveDocumentPopup
        document={approveTarget}
        isOpen={Boolean(approveTarget)}
        onClose={() => setApproveTarget(null)}
        onConfirm={() => {
          if (approveTarget) {
            setDocReview((prev) => ({ ...prev, [approveTarget.id]: 'approved' }));
          }
        }}
      />

      <RejectDocumentPopup
        document={rejectTarget}
        isOpen={Boolean(rejectTarget)}
        onClose={() => setRejectTarget(null)}
        onConfirm={() => {
          if (rejectTarget) {
            setDocReview((prev) => ({ ...prev, [rejectTarget.id]: 'rejected' }));
          }
        }}
      />
    </LandlordLayout>
  );
};

export default LandlordUnvalidatedTenantDetail;
