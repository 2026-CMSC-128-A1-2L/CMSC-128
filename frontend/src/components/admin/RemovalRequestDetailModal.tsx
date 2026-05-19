import { Icon } from '@iconify/react';
import AdminPopupOverlay from './AdminPopupOverlay';
import type { RemovalRequestData } from '../../service/RemovalRequestService';

type Props = {
  isOpen: boolean;
  request: RemovalRequestData | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  getLandlordName: (landlordId: RemovalRequestData['landlordId']) => string;
};

const SS: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
};
const SL: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

const Badge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 font-['Inter',sans-serif] text-[12px] font-semibold ${SS[status] ?? SS.pending}`}
  >
    {SL[status] ?? status}
  </span>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
    {children}
  </p>
);

const ReasonChip = ({
  label,
  active,
  detail,
}: {
  label: string;
  active: boolean;
  detail?: string;
}) =>
  active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf7f5] dark:bg-[#12342e] border border-[#cbf6ed] dark:border-[#1a4a3e] px-3 py-1.5">
      <Icon icon="material-symbols:check-rounded" className="h-4 w-4 text-[#096c5b] dark:text-[#72cbb8]" />
      <span className="font-['Inter',sans-serif] text-[13px] font-semibold text-[#096c5b] dark:text-[#72cbb8]">
        {label}
      </span>
      {detail && (
        <span className="ml-1 font-['Inter',sans-serif] text-[12px] text-[#666] dark:text-[#a4acba]">
          &mdash; {detail}
        </span>
      )}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] dark:border-[#303331] bg-[#f8fafc] dark:bg-[#1f2022] px-3 py-1.5 font-['Inter',sans-serif] text-[13px] text-[#94a3b8] dark:text-[#a4acba]">
      {label}
    </span>
  );

export default function RemovalRequestDetailModal({
  isOpen,
  request,
  onClose,
  onApprove,
  onReject,
  getLandlordName,
}: Props) {
  if (!request) return null;

  const reasonsList = [
    ...(request.reasons.backedOut ? ['Applicant has backed out'] : []),
    ...(request.reasons.noDocuments ? ['Applicant has failed to submit any document'] : []),
    ...(request.reasons.other && request.reasons.otherReason
      ? [`Other: ${request.reasons.otherReason}`]
      : request.reasons.other
        ? ['Other']
        : []),
  ];

  return (
    <AdminPopupOverlay onClose={onClose} isOpen={isOpen}>
      <div className="flex w-[612px] max-h-[90vh] flex-col overflow-hidden rounded-tl-[32px] bg-white dark:bg-[#141515] dark:border dark:border-[#303331]">
        <div className="w-full shrink-0 rounded-tl-[32px] bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[57px] py-3">
          <div className="w-full py-8 pb-2">
            <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
              Tenant Removal Request
            </h2>
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
              Review request details
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-12 pt-8 pb-6 bg-white dark:bg-[#141515]">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
              Status:
            </span>
            <Badge status={request.status} />
          </div>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#edf7f5] dark:bg-[#12342e]">
                <Icon
                  icon="solar:user-bold"
                  className="h-5 w-5 text-[#096c5b] dark:text-[#72cbb8]"
                />
              </div>
              <div>
                <Label>Landlord</Label>
                <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                  {getLandlordName(request.landlordId)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#fefce8] dark:bg-[#2d2a10]">
                <Icon
                  icon="solar:users-group-two-rounded-bold"
                  className="h-5 w-5 text-[#a16207] dark:text-[#facc15]"
                />
              </div>
              <div>
                <Label>Tenant</Label>
                <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                  {request.tenantDisplayName ?? 'Unknown'}
                </p>
                {request.tenantEmail && (
                  <p className="mt-0.5 font-['Inter',sans-serif] text-[13px] text-[#666] dark:text-[#a4acba]">
                    {request.tenantEmail}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {request.facilityName && (
            <Card>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f3e8ff] dark:bg-[#1e1033]">
                  <Icon
                    icon="solar:buildings-bold"
                    className="h-5 w-5 text-[#7c3aed] dark:text-[#a78bfa]"
                  />
                </div>
                <div>
                  <Label>Facility</Label>
                  <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                    {request.facilityName}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <Label>Grounds for Removal</Label>
            <div className="flex flex-wrap gap-2">
              <ReasonChip
                label="Applicant has backed out"
                active={request.reasons.backedOut}
              />
              <ReasonChip
                label="Failed to submit documents"
                active={request.reasons.noDocuments}
              />
              <ReasonChip
                label="Other"
                active={request.reasons.other}
                detail={request.reasons.otherReason}
              />
            </div>
            {reasonsList.length > 0 && (
              <div className="mt-3 flex flex-col gap-1">
                {reasonsList.map((reason) => (
                  <p
                    key={reason}
                    className="font-['Inter',sans-serif] text-[13px] text-[#666] dark:text-[#a4acba]"
                  >
                    &bull; {reason}
                  </p>
                ))}
              </div>
            )}
          </Card>

          {request.createdAt && (
            <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="mb-1 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Submitted On
              </p>
              <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-center gap-4 border-t border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] px-12 py-5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#64748b] transition-opacity hover:opacity-80"
          >
            Close
          </button>
          {request.status === 'pending' && (
            <>
              <button
                type="button"
                onClick={() => onReject(request._id)}
                className="cursor-pointer rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => onApprove(request._id)}
                className="cursor-pointer rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </AdminPopupOverlay>
  );
}
