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
import { SkeletonBlock } from '../../../components/general/Skeleton';

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

type AssignmentMode = 'manual' | 'matching';

type MatchingOptionKey = 'autoMatching' | 'yearBatch' | 'degreeProgram' | 'emptyRoom' | 'random';

const matchingOptions: Array<{
  key: MatchingOptionKey;
  title: string;
  description: string;
}> = [
  {
    key: 'autoMatching',
    title: 'Auto Matching',
    description: 'Match this user with any common existing roommate already in your accommodations',
  },
  {
    key: 'yearBatch',
    title: 'Year Batch',
    description:
      'Match this user with an available roommate sharing a similar year and batch number',
  },
  {
    key: 'degreeProgram',
    title: 'Degree Program',
    description: 'Match this user with an available roommate sharing a similar degree program',
  },
  {
    key: 'emptyRoom',
    title: 'Empty Room/Unit',
    description: 'Assign this user to any available empty room',
  },
  {
    key: 'random',
    title: 'Random',
    description: 'Randomly assign this user to any available room',
  },
];

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
      (document.files ?? []).map((fileId, index) => ({
        id: `${document.docId ?? document.name}-${index}`,
        title: document.name ?? document.docId ?? 'Document',
        fileName: fileId,
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
  const [assignmentMode, setAssignmentMode] = useState<AssignmentMode>('manual');
  const [selectedMatchingOptions, setSelectedMatchingOptions] = useState<
    Record<MatchingOptionKey, boolean>
  >({
    autoMatching: true,
    yearBatch: false,
    degreeProgram: true,
    emptyRoom: true,
    random: true,
  });
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
  const isInitialScreening = rawApplication?.status === 'pending';
  const isFinalReview = rawApplication?.status === 'finalized';

  const allDocumentsApproved = useMemo(() => {
    if (!application) return true;
    if (rawApplication?.status === 'finalized' && application.documents.length === 0) return false;
    return application.documents.every((d) => docReview[d.id] === 'approved');
  }, [application, docReview, rawApplication?.status]);

  const fallbackUnitId = availableUnits[0]?._id ?? availableUnits[0]?.id ?? '';
  const unitIdForApproval =
    assignmentMode === 'manual'
      ? selectedUnitId
      : selectedUnitId ||
        fallbackUnitId ||
        rawApplication?.unitId?._id ||
        rawApplication?.unitId?.id ||
        '';
  const canApproveInitialScreening = Boolean(unitIdForApproval);

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
    if (rawApplication.status === 'pending' && !unitIdForApproval) return;

    void ApplicationService.approveApplication(tenantId, {
      unitId:
        unitIdForApproval || rawApplication.unitId?._id || rawApplication.unitId?.id || tenantId,
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
        <div className="flex w-full flex-col gap-[24px] rounded-[16px] border border-[#f0f0f0] bg-white p-[32px] dark:border-[#303331] dark:bg-[#141515]">
          <div className="flex flex-col gap-3">
            <SkeletonBlock className="h-7 w-64" />
            <SkeletonBlock className="h-4 w-80" />
          </div>
          <div className="grid w-full gap-x-[48px] gap-y-[24px] md:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <SkeletonBlock className="h-[200px] w-[200px] rounded-full" />
            {['application-info-a', 'application-info-b', 'application-info-c'].map((key) => (
              <div key={key} className="flex flex-col gap-4">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-5 w-40" />
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-5 w-48" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <SkeletonBlock className="h-32 rounded-xl" />
            <SkeletonBlock className="h-32 rounded-xl" />
            <SkeletonBlock className="h-32 rounded-xl" />
          </div>
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

            <div className="grid w-full min-w-0 grid-cols-1 gap-x-[28px] gap-y-[18px] sm:grid-cols-2">
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
                {isInitialScreening ? 'Initial Screening' : 'Submitted Documents'}
              </h2>
              <span className="font-['Inter',sans-serif] text-[14px] font-medium whitespace-nowrap text-[#666]">
                ({application.studentCategory})
              </span>
            </div>

            {isInitialScreening ? (
              <>
                <div className="flex min-h-[160px] flex-col justify-center gap-[16px] rounded-[16px] border border-solid border-[#f0f0f0] bg-[#fbfbfb] p-[24px] font-['Inter',sans-serif]">
                  <p className="text-[16px] font-bold text-[#2f3136]">
                    Review this applicant for initial screening.
                  </p>
                  <p className="max-w-[620px] text-[14px] font-medium leading-[22px] text-[#666]">
                    Approving initial screening will move this application to the student&apos;s
                    finalization step, where they can upload the required files for landlord review.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[18px] border border-solid border-[#f0f0f0] bg-white font-['Inter',sans-serif]">
                  <div className="bg-linear-to-br from-[#096c5b] to-[#16917c] px-[24px] py-[22px] text-white">
                    <h3 className="text-[24px] font-bold leading-[30px]">Add New Tenant</h3>
                    <p className="mt-[4px] text-[14px] font-bold leading-[20px] text-[#e8f7f5]">
                      Add your new tenant to a specific room/unit
                    </p>
                  </div>

                  <div className="flex flex-col gap-[22px] p-[24px]">
                    <div className="flex flex-col gap-[10px]">
                      <span className="text-[14px] font-bold text-[#666]">Email Address</span>
                      <div className="rounded-[12px] border border-[#f0f0f0] px-[16px] py-[12px] text-[14px] font-medium text-[#64748b]">
                        {application.email}
                      </div>
                      <p className="max-w-[620px] text-[16px] font-bold leading-[22px] text-[#082f2a]">
                        Upon finalization, our system will send an email to this tenant for
                        confirmation of their new accommodation.
                      </p>
                    </div>

                    <div className="flex flex-col gap-[14px]">
                      <div className="flex flex-col gap-[10px] sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[14px] font-bold text-[#666]">Unit Assignment</span>
                        <div className="grid grid-cols-2 rounded-[14px] bg-[#f1f5f9] p-[4px] text-[13px] font-bold">
                          <button
                            type="button"
                            onClick={() => setAssignmentMode('manual')}
                            className={[
                              'rounded-[10px] px-[14px] py-[8px] transition-colors',
                              assignmentMode === 'manual'
                                ? 'bg-white text-[#096c5b] shadow-[0_1px_4px_rgba(15,23,42,0.08)]'
                                : 'text-[#64748b] hover:text-[#2f3136]',
                            ].join(' ')}
                          >
                            Manual
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAssignmentMode('matching');
                              setSelectedUnitId((current) => current || fallbackUnitId);
                            }}
                            className={[
                              'rounded-[10px] px-[14px] py-[8px] transition-colors',
                              assignmentMode === 'matching'
                                ? 'bg-white text-[#096c5b] shadow-[0_1px_4px_rgba(15,23,42,0.08)]'
                                : 'text-[#64748b] hover:text-[#2f3136]',
                            ].join(' ')}
                          >
                            Matching
                          </button>
                        </div>
                      </div>

                      {assignmentMode === 'manual' ? (
                        <div className="flex flex-col gap-[8px] cursor-pointer">
                          <select
                            value={selectedUnitId}
                            onChange={(event) => setSelectedUnitId(event.target.value)}
                            className="min-h-[46px] rounded-[12px] border border-[#e2e8f0] px-[14px] py-[10px] text-[14px] font-bold text-[#2f3136] outline-none transition-colors focus:border-[#096c5b]"
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
                          <p className="text-[12px] font-medium leading-[18px] text-[#64748b]">
                            Choose the room/unit before approving this initial screening.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-[8px]">
                          {matchingOptions.map((option) => (
                            <label
                              key={option.key}
                              className="flex cursor-pointer items-center gap-[16px] rounded-[12px] px-[12px] py-[10px] transition-colors hover:bg-[#f8fafc]"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block text-[15px] font-bold leading-[20px] text-[#082f2a]">
                                  {option.title}
                                </span>
                                <span className="block max-w-[560px] text-[12px] font-medium leading-[17px] text-[#666]">
                                  {option.description}
                                </span>
                              </span>
                              <input
                                type="checkbox"
                                checked={selectedMatchingOptions[option.key]}
                                onChange={(event) =>
                                  setSelectedMatchingOptions((prev) => ({
                                    ...prev,
                                    [option.key]: event.target.checked,
                                  }))
                                }
                                className="h-[22px] w-[22px] accent-[#096c5b]"
                              />
                            </label>
                          ))}
                          <p className="text-[12px] font-medium leading-[18px] text-[#64748b]">
                            Matching approval will use the next available unit while keeping these
                            preferences visible for the assignment decision.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : !hasDocuments ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-[16px] border border-solid border-[#f0f0f0] bg-[#fbfbfb] p-[24px]">
                <p className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
                  Applicant has not submitted any documents yet.
                </p>
              </div>
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

                {isFinalReview && !allDocumentsApproved && (
                  <p className="px-[12px] text-center font-['Inter',sans-serif] text-[13px] font-medium text-[#64748b]">
                    Every document must be approved before final landlord approval.
                  </p>
                )}
              </>
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
                    isInitialScreening
                      ? !canApproveInitialScreening
                      : !isLandlord || !allDocumentsApproved
                  }
                  className={[
                    "flex cursor-pointer items-center justify-center rounded-[16px] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold transition-colors duration-200",
                    (
                      isInitialScreening
                        ? canApproveInitialScreening
                        : isLandlord && allDocumentsApproved
                    )
                      ? 'bg-[#cbf6ed] text-[#096c5b] hover:bg-[#b4efe1]'
                      : 'cursor-not-allowed bg-[#e8ecf1] text-[#94a3b8]',
                  ].join(' ')}
                >
                  {isInitialScreening ? 'Approve Initial Screening' : 'Final Approve'}
                </button>
              </div>
            </div>
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
