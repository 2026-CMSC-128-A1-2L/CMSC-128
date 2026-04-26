import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import TenantAvatar from "../../../components/landlord/tenants/TenantAvatar";
import TenantInfoField from "../../../components/landlord/tenants/TenantInfoField";
import TenantProfileHeader from "../../../components/landlord/tenants/TenantProfileHeader";
import SubmittedDocumentCard from "../../../components/landlord/tenants/SubmittedDocumentCard";
import FileActionPopup from "../../../components/landlord/tenants/popups/FileActionPopup";
import RejectDocumentPopup from "../../../components/landlord/tenants/popups/RejectDocumentPopup";
import {
  getPendingApplicationById,
  type SubmittedDocument,
} from "../../../data/landlordTenants";

const LandlordUnvalidatedTenantDetail = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const application = tenantId
    ? getPendingApplicationById(tenantId)
    : undefined;
  const [openFileMenuId, setOpenFileMenuId] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<SubmittedDocument | null>(
    null,
  );

  if (!application) {
    return <Navigate to="/landlord/tenants/unvalidated" replace />;
  }

  const hasDocuments = application.documents.length > 0;

  const handleReject = () => {
    navigate("/landlord/tenants/unvalidated");
  };

  const handleApprove = () => {
    navigate("/landlord/tenants");
  };

  return (
    <LandlordLayout
      activeSidebarItem="tenants"
      breadcrumbs={[
        { label: "My Tenants", to: "/landlord/tenants" },
        {
          label: "Unvalidated Applications",
          to: "/landlord/tenants/unvalidated",
        },
        { label: application.displayName },
      ]}
    >
      <div className="flex w-full flex-col gap-[24px] rounded-[16px] border border-solid border-[#f0f0f0] bg-white p-[32px]">
        <TenantProfileHeader
          displayName={application.displayName}
          email={application.email}
        />

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
              <TenantInfoField label="Full Name">
                {application.fullName}
              </TenantInfoField>
              <TenantInfoField label="Home Address">
                {application.homeAddress}
              </TenantInfoField>
              <TenantInfoField label="Contact number">
                {application.contactNumber}
              </TenantInfoField>
              <TenantInfoField label="Pending Dorm">
                {application.dormName}
              </TenantInfoField>
              <TenantInfoField label="Contract Duration">
                {application.contractDuration}
              </TenantInfoField>
              <TenantInfoField label="Base Rent Fee">
                {application.baseRentFee}
              </TenantInfoField>
              <TenantInfoField label="Monthly Due Date">
                {application.monthlyDueDate}
              </TenantInfoField>
              <TenantInfoField label="Mode of Payment">
                {application.modeOfPayment}
              </TenantInfoField>
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
                      onMoreOptions={() =>
                        setOpenFileMenuId((prev) =>
                          prev === document.id ? null : document.id,
                        )
                      }
                      actionMenu={
                        <FileActionPopup
                          isOpen={openFileMenuId === document.id}
                          onApprove={() => {
                            setOpenFileMenuId(null);
                            handleApprove();
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

                <div className="flex w-full items-center justify-center gap-[10px] px-[12px] pt-[8px]">
                  <button
                    type="button"
                    onClick={handleReject}
                    className="flex cursor-pointer items-center justify-center rounded-[16px] bg-[#f1f5f9] px-[16px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold transition-colors duration-200 hover:bg-[#e5edf4]"
                  >
                    <span className="bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent">
                      Reject
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="flex cursor-pointer items-center justify-center rounded-[16px] bg-[#cbf6ed] px-[24px] py-[12px] font-['Inter',sans-serif] text-[14px] font-bold text-[#096c5b] transition-colors duration-200 hover:bg-[#b4efe1]"
                  >
                    Approve
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      <RejectDocumentPopup
        document={rejectTarget}
        isOpen={Boolean(rejectTarget)}
        onClose={() => setRejectTarget(null)}
        onConfirm={() => navigate("/landlord/tenants/unvalidated")}
      />
    </LandlordLayout>
  );
};

export default LandlordUnvalidatedTenantDetail;
