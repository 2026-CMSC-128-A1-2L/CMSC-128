import { type FunctionComponent, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { getPublicFileUrl } from '../../../../service/FileService';

export type ReceiptDocument = {
  file: string;        // file key
  paymentMethod?: string;
  submittedAt?: string;
};

interface ReceiptViewerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  documents: ReceiptDocument[];
  tenantName?: string;
  roomNumber?: string | number;
  totalAmount?: number;
  billingId: string;
  onVerify?: (billingId: string, approved: boolean) => void;
}

const ReceiptViewerPopup: FunctionComponent<ReceiptViewerPopupProps> = ({
  isOpen,
  onClose,
  documents,
  tenantName,
  roomNumber,
  totalAmount,
  billingId,
  onVerify,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const activeDoc = documents[activeIndex];
  const fileUrl = activeDoc?.file ? getPublicFileUrl(activeDoc.file) : null;
  const isPdf = fileUrl?.toLowerCase().includes('.pdf') || activeDoc?.file?.toLowerCase().endsWith('.pdf');

  const methodLabel = (method?: string) => {
    if (!method) return null;
    const map: Record<string, string> = {
      gcash: 'GCash',
      bank_transfer: 'Bank Transfer',
      cash: 'Cash',
      maya: 'Maya',
    };
    return map[method.toLowerCase()] ?? method;
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-[540px] max-h-[90vh] rounded-2xl bg-white dark:bg-[#141515] shadow-2xl flex flex-col overflow-hidden border border-whitesmoke-200 dark:border-[#2a2d2d]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-whitesmoke-200 dark:border-[#2a2d2d] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-lightcyan dark:bg-[#12342e] flex items-center justify-center shrink-0">
                <Icon icon="solar:receipt-bold" className="w-5 h-5 text-teal dark:text-[#72cbb8]" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold font-inter text-gray dark:text-[#edf6f4] leading-tight">
                  Payment Receipt
                </h2>
                {(tenantName || roomNumber) && (
                  <p className="text-[11px] text-gray-100 dark:text-[#a4acba] font-inter mt-0.5">
                    {tenantName && <span>{tenantName}</span>}
                    {tenantName && roomNumber && <span className="mx-1">·</span>}
                    {roomNumber && <span>Room {roomNumber}</span>}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-whitesmoke-200 dark:hover:bg-[#1f2121] transition-colors cursor-pointer"
            >
              <Icon icon="fontisto:close" className="w-4 h-4 text-gray-100 dark:text-[#a4acba]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-whitesmoke-200 dark:bg-[#1f2121] flex items-center justify-center">
                  <Icon icon="solar:document-broken" className="w-8 h-8 text-gray-100 dark:text-[#a4acba]" />
                </div>
                <p className="text-[13px] font-semibold text-gray-100 dark:text-[#a4acba] font-inter">
                  No receipts submitted yet
                </p>
                <p className="text-[11px] text-silver dark:text-[#6b7280] font-inter max-w-[220px]">
                  The tenant hasn't uploaded a payment receipt for this billing.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-0">
                {/* Receipt image / PDF preview */}
                <div className="px-6 pt-5 pb-4">
                  {/* Meta info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {activeDoc?.paymentMethod && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-lightcyan dark:bg-[#12342e] text-teal dark:text-[#72cbb8] text-[10px] font-bold font-inter">
                          <Icon icon="solar:card-bold" className="w-3 h-3" />
                          {methodLabel(activeDoc.paymentMethod)}
                        </span>
                      )}
                      {totalAmount !== undefined && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-whitesmoke-200 dark:bg-[#1f2121] text-gray-100 dark:text-[#d7e0ef] text-[10px] font-bold font-inter">
                          ₱{totalAmount.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {documents.length > 1 && (
                      <span className="text-[10px] text-silver dark:text-[#6b7280] font-inter">
                        {activeIndex + 1} / {documents.length}
                      </span>
                    )}
                  </div>

                  {/* Image / PDF viewer */}
                  <div className="w-full rounded-xl overflow-hidden border border-whitesmoke-200 dark:border-[#2a2d2d] bg-whitesmoke-100 dark:bg-[#0d0e0e] min-h-[300px] flex items-center justify-center relative">
                    {!fileUrl ? (
                      <div className="flex flex-col items-center gap-2 py-10">
                        <Icon icon="solar:document-broken" className="w-10 h-10 text-silver dark:text-[#4a4f4f]" />
                        <p className="text-[12px] text-silver dark:text-[#6b7280] font-inter">Unable to load receipt</p>
                      </div>
                    ) : isPdf ? (
                      <iframe
                        src={fileUrl}
                        title="Receipt PDF"
                        className="w-full h-[400px] border-0"
                      />
                    ) : imgError[activeIndex] ? (
                      <div className="flex flex-col items-center gap-2 py-10">
                        <Icon icon="solar:document-broken" className="w-10 h-10 text-silver dark:text-[#4a4f4f]" />
                        <p className="text-[12px] text-silver dark:text-[#6b7280] font-inter">Image failed to load</p>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-teal dark:text-[#72cbb8] underline font-inter hover:opacity-80"
                        >
                          Open in new tab
                        </a>
                      </div>
                    ) : (
                      <img
                        src={fileUrl}
                        alt={`Receipt ${activeIndex + 1}`}
                        className="max-w-full max-h-[420px] object-contain"
                        onError={() => setImgError((prev) => ({ ...prev, [activeIndex]: true }))}
                      />
                    )}
                  </div>

                  {/* Open externally */}
                  {fileUrl && (
                    <div className="mt-2 flex justify-end">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] text-teal dark:text-[#72cbb8] font-inter font-semibold hover:opacity-75 transition-opacity"
                      >
                        <Icon icon="solar:square-top-down-bold" className="w-3.5 h-3.5" />
                        Open full size
                      </a>
                    </div>
                  )}
                </div>

                {/* Multi-doc tabs */}
                {documents.length > 1 && (
                  <div className="px-6 pb-4 flex gap-2 flex-wrap">
                    {documents.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveIndex(i);
                          setImgError({});
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-inter transition-all cursor-pointer ${
                          i === activeIndex
                            ? 'bg-darkslategray-200 text-white dark:bg-[#114f43] dark:text-[#72cbb8]'
                            : 'bg-whitesmoke-200 text-gray-100 dark:bg-[#1f2121] dark:text-[#a4acba] hover:bg-gray-50 dark:hover:bg-[#252727]'
                        }`}
                      >
                        Receipt {i + 1}
                      </button>
                    ))}
                  </div>
                )}

                {/* Verify / Mark Paid actions */}
                {onVerify && (
                  <div className="px-6 pb-5 pt-1 border-t border-whitesmoke-200 dark:border-[#2a2d2d] flex gap-3 mt-1">
                    <button
                      onClick={() => onVerify(billingId, true)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-linear-to-b from-[#5dc2a8] to-[#0c8873] text-white text-[12px] font-bold font-inter hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => onVerify(billingId, false)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-linear-to-b from-[#c00f0f] to-[#e44f4f] text-white text-[12px] font-bold font-inter hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ReceiptViewerPopup;