import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import AdminPopupOverlay from './AdminPopupOverlay';

export type VerificationDocument = {
  docId: string;
  name: string;
  status: "accepted" | "rejected" | "pending";
  message?: string;
  files: string[];
};

export type VerificationApplicant = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  emails: string[];
  address?: string;
  contact?: string;
  userType?: "Student" | "Landlord" | "Manager" | "Admin";
  status: "setup" | "unverified" | "verified" | "inactive" | "disabled";
  verificationStatus: "pending" | "submitted" | "rejected" | "approved";
  documents: VerificationDocument[];
  createdAt?: string;
  updatedAt?: string;
};

type ApplicantReviewModalProps = {
  isOpen: boolean;
  applicant: VerificationApplicant | null;
  studentNumber: string;
  degreeProgram: string;
  rejectionMessages: Record<string, string>;
  error: string | null;
  onClose: () => void;
  onStudentNumberChange: (value: string) => void;
  onDegreeProgramChange: (value: string) => void;
  onRejectionMessageChange: (docId: string, value: string) => void;
  onAcceptDocument: (docId: string) => void;
  onRejectDocument: (docId: string) => void;
  onApproveUser: () => void;
  onRejectUser: () => void;
  onDownloadDocument: (docId: string, fileIndex: number) => void;
};

const DOC_STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

type VerificationFileItem = {
  docId: string;
  file: string;
  label: string;
  url: string;
  isImage: boolean;
};

export const getDisplayName = (user: VerificationApplicant) =>
  [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");

export const formatRole = (role?: string) => role ?? "Unassigned";

const getFileKey = (value: string) => {
  if (!value.startsWith('http')) return value.replace(/^\/+/, '');

  try {
    return new URL(value).pathname.replace(/^\/+/, '');
  } catch {
    return value;
  }
};

const toPublicFileUrl = (value: string) => {
  const key = getFileKey(value);
  return `/api/files/public?key=${encodeURIComponent(key)}`;
};

const getFileLabel = (value: string) => {
  const key = getFileKey(value);
  return key.split('/').pop() || 'Uploaded file';
};

const isLikelyImage = (value: string) => /\.(avif|gif|jpe?g|png|webp)$/i.test(getFileKey(value));

const getImageCandidates = (url: string) => {
  const candidates = [url];

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith('/atlas/atlas/')) {
      candidates.push(`${parsedUrl.origin}${pathname.replace('/atlas/atlas/', '/atlas/')}`);
    }

    if (pathname.startsWith('/atlas/')) {
      candidates.push(`${parsedUrl.origin}${pathname.replace('/atlas/', '/')}`);
    } else {
      candidates.push(`${parsedUrl.origin}/atlas${pathname}`);
    }
  } catch {
    return candidates;
  }

  return [...new Set(candidates)];
};

const ApplicantReviewModal = ({
  isOpen,
  applicant,
  studentNumber,
  degreeProgram,
  rejectionMessages,
  error,
  onClose,
  onStudentNumberChange,
  onDegreeProgramChange,
  onRejectionMessageChange,
  onAcceptDocument,
  onRejectDocument,
  onApproveUser,
  onRejectUser,
  onDownloadDocument,
}: ApplicantReviewModalProps) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [thumbnailUrls, setThumbnailUrls] = useState<Record<string, string>>({});
  const fileItems = useMemo<VerificationFileItem[]>(
    () =>
      applicant?.documents.flatMap((doc) =>
        doc.files.map((file) => ({
          docId: doc.docId,
          file,
          label: getFileLabel(file),
          url: toPublicFileUrl(file),
          isImage: isLikelyImage(file),
        })),
      ) ?? [],
    [applicant?.documents],
  );
  const imageItems = useMemo(() => fileItems.filter((item) => item.isImage), [fileItems]);
  const imageCandidates = useMemo(
    () => imageItems.map((item) => getImageCandidates(item.url)),
    [imageItems],
  );
  const getThumbnailUrl = (item: VerificationFileItem) => thumbnailUrls[item.file] ?? item.url;
  const slides = imageCandidates.map((candidates, index) => ({
    src: thumbnailUrls[imageItems[index]?.file ?? ''] ?? candidates[0],
  }));
  const tryNextThumbnailUrl = (item: VerificationFileItem) => {
    const currentUrl = getThumbnailUrl(item);
    const imageIndex = imageItems.findIndex((imageItem) => imageItem.file === item.file);
    const candidates = imageCandidates[imageIndex] ?? [];
    const currentIndex = candidates.indexOf(currentUrl);
    const nextUrl = candidates[currentIndex + 1];
    if (nextUrl) {
      setThumbnailUrls((urls) => ({ ...urls, [item.file]: nextUrl }));
    }
  };

  if (!applicant) return null;

  return (
    <AdminPopupOverlay onClose={onClose} isOpen={isOpen}>
      <div className="flex w-[640px] max-h-[90vh] flex-col overflow-hidden rounded-tl-[32px] bg-white dark:bg-[#141515] dark:border dark:border-[#303331]">
        {/* Teal Gradient Header */}
        <div className="w-full shrink-0 rounded-tl-[32px] bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[57px] py-3">
          <div className="w-full py-8 pb-2">
            <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
              Applicant Review
            </h2>
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
              Review submitted documents
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-12 pt-8 pb-6 bg-white dark:bg-[#141515]">
          {/* Applicant Info */}
          <div className="mb-6">
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#001d18] dark:text-[#d7e0ef]">
              {getDisplayName(applicant)}
            </p>
            <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-medium text-[#666] dark:text-[#a4acba]">
              {applicant.emails?.[0]} &bull; {formatRole(applicant.userType)}
            </p>
            {applicant.contact && (
              <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-medium text-[#666] dark:text-[#a4acba]">
                Contact:{" "}
                <span className="font-bold text-[#2f3136] dark:text-[#d7e0ef]">
                  {applicant.contact}
                </span>
              </p>
            )}
          </div>

          {/* Student Fields */}
          {applicant.userType === "Student" && (
            <div className="mb-6 grid grid-cols-2 gap-4 rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-[#f8fffe] dark:bg-[#17201d] p-5">
              <label className="flex flex-col gap-1.5">
                <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
                  Student Number
                </span>
                <input
                  value={studentNumber}
                  onChange={(e) => onStudentNumberChange(e.target.value)}
                  placeholder="202400001"
                  className="rounded-[12px] border border-[#d0d0d0] dark:border-[#404341] bg-white dark:bg-[#1f2022] px-4 py-2.5 font-['Inter',sans-serif] text-[14px] font-medium text-black dark:text-[#d7e0ef] outline-none transition-colors focus:border-[#096c5b] dark:focus:border-[#72cbb8]"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
                  Degree Program
                </span>
                <input
                  value={degreeProgram}
                  onChange={(e) => onDegreeProgramChange(e.target.value)}
                  placeholder="BS Computer Science"
                  className="rounded-[12px] border border-[#d0d0d0] dark:border-[#404341] bg-white dark:bg-[#1f2022] px-4 py-2.5 font-['Inter',sans-serif] text-[14px] font-medium text-black dark:text-[#d7e0ef] outline-none transition-colors focus:border-[#096c5b] dark:focus:border-[#72cbb8]"
                />
              </label>
            </div>
          )}

          {/* Label */}
          <p className="mb-3 font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
            Submitted Documents
          </p>

          {/* Document Cards */}
          <div className="flex flex-col gap-3">
            {applicant.documents?.map((doc) => (
              <div
                key={doc.docId}
                className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#edf7f5] dark:bg-[#12342e]">
                      <Icon
                        icon="solar:document-text-bold"
                        className="h-5 w-5 text-[#096c5b] dark:text-[#72cbb8]"
                      />
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                        {doc.name}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[13px] font-medium text-[#64748b] dark:text-[#a4acba]">
                        {doc.files.length} file
                        {doc.files.length !== 1 ? "s" : ""} attached
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1.5">
                      {doc.files.map((file, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => onDownloadDocument(doc.docId, index)}
                          className="flex items-center justify-center transition-opacity hover:opacity-60 cursor-pointer"
                          title={`Download ${file.split("/").pop() || file}`}
                        >
                          <Icon
                            icon="solar:download-bold"
                            className="h-5 w-5 text-[#096c5b] dark:text-[#72cbb8]"
                          />
                        </button>
                      ))}
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 font-['Inter',sans-serif] text-[12px] font-semibold ${DOC_STATUS_STYLES[doc.status] ?? DOC_STATUS_STYLES.pending}`}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                </div>

                {doc.message && (
                  <p className="mt-3 rounded-[8px] bg-red-50 px-3 py-2 font-['Inter',sans-serif] text-[13px] font-medium text-red-600">
                    {doc.message}
                  </p>
                )}

                {doc.files.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {doc.files.map((file) => {
                      const item = fileItems.find(
                        (fileItem) => fileItem.docId === doc.docId && fileItem.file === file,
                      );
                      if (!item) return null;

                      const imageIndex = imageItems.findIndex(
                        (imageItem) => imageItem.file === item.file,
                      );

                      return (
                        <div
                          key={`${doc.docId}-${file}`}
                          className="overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-[#f8fafc] dark:border-[#303331] dark:bg-[#141515]"
                        >
                          {item.isImage ? (
                            <button
                              type="button"
                              onClick={() => setLightboxIndex(imageIndex)}
                              className="group relative block h-24 w-full cursor-pointer overflow-hidden bg-[#edf7f5] p-0 dark:bg-[#12342e]"
                            >
                              <img
                                src={getThumbnailUrl(item)}
                                alt={`${doc.name} attachment`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                onError={() => tryNextThumbnailUrl(item)}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                                <Icon icon="iconamoon:eye" className="h-6 w-6" />
                              </div>
                            </button>
                          ) : (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex h-24 w-full items-center justify-center bg-[#edf7f5] text-[#096c5b] transition-opacity hover:opacity-80 dark:bg-[#12342e] dark:text-[#72cbb8]"
                            >
                              <Icon icon="solar:document-text-bold" className="h-8 w-8" />
                            </a>
                          )}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-2 px-3 py-2 font-['Inter',sans-serif] text-[12px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80 dark:text-[#72cbb8]"
                          >
                            <span className="truncate">{item.label}</span>
                            <Icon
                              icon="heroicons:arrow-top-right-on-square"
                              className="h-4 w-4 shrink-0"
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}

                {doc.status === 'pending' && (
                  <>
                    <input
                      value={rejectionMessages[doc.docId] ?? ""}
                      onChange={(e) =>
                        onRejectionMessageChange(doc.docId, e.target.value)
                      }
                      placeholder="Rejection reason (optional)"
                      className="mt-3 w-full rounded-[12px] border border-[#e5e7eb] dark:border-[#303331] bg-[#fafafa] dark:bg-[#141515] px-4 py-2.5 font-['Inter',sans-serif] text-[13px] font-medium text-black dark:text-[#d7e0ef] outline-none transition-colors placeholder:text-[#94a3b8] dark:placeholder:text-[#a4acba] focus:border-[#096c5b] dark:focus:border-[#72cbb8]"
                    />
                    <div className="mt-3 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => onRejectDocument(doc.docId)}
                        className="cursor-pointer rounded-[12px] px-5 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => onAcceptDocument(doc.docId)}
                        className="cursor-pointer rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-5 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
                      >
                        Accept
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="mt-4 rounded-[12px] bg-red-50 px-4 py-3 font-['Inter',sans-serif] text-[14px] font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>

        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={Math.max(lightboxIndex, 0)}
          slides={slides}
        />

        {/* Footer Buttons */}
        <div className="flex shrink-0 items-center justify-center gap-4 border-t border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] px-12 py-5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#64748b] transition-opacity hover:opacity-80"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onRejectUser}
            className="cursor-pointer rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80"
          >
            Reject User
          </button>
          <button
            type="button"
            onClick={onApproveUser}
            className="cursor-pointer rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
          >
            Approve User
          </button>
        </div>
      </div>
    </AdminPopupOverlay>
  );
};

export default ApplicantReviewModal;
