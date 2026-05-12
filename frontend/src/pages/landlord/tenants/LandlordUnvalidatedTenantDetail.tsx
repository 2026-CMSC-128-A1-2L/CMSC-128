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
import { getPendingApplicationById, type SubmittedDocument } from '../../../data/landlordTenants';

const LandlordUnvalidatedTenantDetail = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const application = tenantId ? getPendingApplicationById(tenantId) : undefined;
  const [openFileMenuId, setOpenFileMenuId] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<SubmittedDocument | null>(null);
  const [approveTarget, setApproveTarget] = useState<SubmittedDocument | null>(null);
  const [docReview, setDocReview] = useState<Record<string, DocumentReviewStatus>>({});

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
    navigate('/landlord/tenants/unvalidated');
  };

  const handleApproveApplication = () => {
    if (!allDocumentsApproved) return;
    navigate('/landlord/tenants');
  };

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

                {!allDocumentsApproved && (
                  <p className="px-[12px] text-center font-['Inter',sans-serif] text-[13px] font-medium text-[#64748b]">
                    Every document must be approved before you can accept this applicant.
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
                      disabled={!allDocumentsApproved}
                      className={[
                        "flex cursor-pointer items-center justify-center rounded-[16px] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold transition-colors duration-200",
                        allDocumentsApproved
                          ? 'bg-[#cbf6ed] text-[#096c5b] hover:bg-[#b4efe1]'
                          : 'cursor-not-allowed bg-[#e8ecf1] text-[#94a3b8]',
                      ].join(' ')}
                    >
                      Approve
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
