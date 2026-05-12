import { Icon } from '@iconify/react';
import AdminPopupOverlay from './AdminPopupOverlay';

type FacilityDoc = { docId: string; name: string; status: string; files: string[] };
type MediaItem = { sourceType: string; value: string };
type FacilityData = {
  _id?: string; id?: string; name: string; type: string; status: string; capacity: number;
  description: string; location: { text: string };
  media?: MediaItem[]; documents?: FacilityDoc[]; createdAt?: string;
};

type Props = {
  isOpen: boolean;
  facility: FacilityData | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  formatType: (type: string) => string;
};

export default function FacilityReviewModal({ isOpen, facility, onClose, onApprove, onReject, formatType }: Props) {
  if (!isOpen || !facility) return null;
  return (
    <AdminPopupOverlay onClose={onClose}>
      <div className="flex w-[640px] max-h-[90vh] flex-col overflow-hidden rounded-tl-[32px] bg-white">
        <div className="w-full shrink-0 rounded-tl-[32px] bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[57px] py-3">
          <div className="w-full py-8 pb-2">
            <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">Facility Review</h2>
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">Review submitted facility</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-12 pt-8 pb-6">
          <div className="mb-6">
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#001d18]">{facility.name}</p>
            <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-medium text-[#666]">{formatType(facility.type)} &bull; {facility.location.text}</p>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666]">Capacity</p>
              <p className="mt-1 font-['Inter',sans-serif] text-[22px] font-bold text-[#001d18]">{facility.capacity}</p>
            </div>
            <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666]">Type</p>
              <p className="mt-1 font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18]">{formatType(facility.type)}</p>
            </div>
            {facility.createdAt && (
              <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
                <p className="font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666]">Submitted</p>
                <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-bold text-[#001d18]">
                  {new Date(facility.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            )}
          </div>
          <div className="mb-4 rounded-[16px] border border-[#e5e7eb] bg-white p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
            <p className="mb-2 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666]">Description</p>
            <p className="font-['Inter',sans-serif] text-[15px] font-medium leading-relaxed text-[#001d18]">{facility.description.replace(/\[.*?\]\s*/, '')}</p>
          </div>
          {facility.media && facility.media.length > 0 && (
            <div className="mb-4 rounded-[16px] border border-[#e5e7eb] bg-white p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666]">Media</p>
              <div className="flex gap-3 overflow-x-auto">
                {facility.media.map((m, i) => (
                  <img key={`media-${i}`} src={m.value} alt={`${facility.name} ${i + 1}`} className="h-36 w-56 shrink-0 rounded-[12px] object-cover border border-[#e5e7eb]" />
                ))}
              </div>
            </div>
          )}
          {facility.documents && facility.documents.length > 0 && (
            <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666]">Submitted Documents</p>
              <div className="flex flex-col gap-2">
                {facility.documents.map((doc) => (
                  <div key={doc.docId} className="flex items-center justify-between rounded-[12px] border border-[#e5e7eb] bg-[#fafafa] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#edf7f5]">
                        <Icon icon="solar:document-text-bold" className="h-4 w-4 text-[#096c5b]" />
                      </div>
                      <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#001d18]">{doc.name}</span>
                    </div>
                    <span className="font-['Inter',sans-serif] text-[12px] font-semibold text-[#64748b]">{doc.files.length} file{doc.files.length !== 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-4 border-t border-[#f0f0f0] px-12 py-5">
          <button type="button" onClick={onClose} className="rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#64748b] transition-opacity hover:opacity-80">Cancel</button>
          {facility.status === 'submitted' && (
            <>
              <button type="button" onClick={onReject} className="rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80">Reject</button>
              <button type="button" onClick={onApprove} className="rounded-[12px] bg-[#cbf6ed] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80">Approve</button>
            </>
          )}
        </div>
      </div>
    </AdminPopupOverlay>
  );
}
