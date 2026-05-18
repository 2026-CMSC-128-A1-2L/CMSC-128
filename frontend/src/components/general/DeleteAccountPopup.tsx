import { type FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';
import PortalPopup from './PortalPopup';

export type DeleteAccountPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  userName?: string;
};

const DeleteAccountPopup: FunctionComponent<DeleteAccountPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const CONFIRM_WORD = 'DELETE';
  const isConfirmed = confirmText.trim().toUpperCase() === CONFIRM_WORD;

  const handleConfirm = async () => {
    if (!isConfirmed || isDeleting) return;
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    setConfirmText('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.5)"
      placement="Centered"
      onOutsideClick={handleClose}
      zIndex={100}
    >
      <div className="relative w-[520px] max-w-[95vw] rounded-[32px] bg-white overflow-hidden flex flex-col text-left font-inter shadow-2xl">

        {/* Header */}
        <div
          className="flex flex-col items-start justify-center py-8 pl-14 pr-8"
          style={{ background: 'linear-gradient(183.48deg, #c00f0f, #e44f4f)' }}
        >
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icon icon="mdi:account-remove" className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <b className="text-[28px] leading-8 font-poppins">Delete Account</b>
              <span className="text-[14px] font-inter text-red-100 tracking-[-0.01em]">
                This action is permanent and cannot be undone
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col items-start gap-6 pt-8 pb-6 px-12">

          {/* Warning box */}
          <div className="self-stretch rounded-[12px] bg-red-50 border border-red-200 flex items-start gap-3 p-4">
            <Icon
              icon="flat-color-icons:info"
              className="w-5 h-5 shrink-0 mt-0.5"
            />
            <div className="flex flex-col gap-1 text-[13px] text-gray-200 leading-5">
              <b className="text-red-700">You are about to permanently delete your account.</b>
              <span className="text-dimgray font-medium">
                Deletion will result in the complete removal of all your personal data and
                documentation from our active servers. Once processed, this data{' '}
                <b className="text-gray-200">cannot be recovered</b>.
              </span>
            </div>
          </div>

          {/* What gets deleted list */}
          <div className="self-stretch flex flex-col gap-2 text-[13px] text-dimgray">
            <b className="text-[14px] text-black">The following will be permanently deleted:</b>
            {[
              { icon: 'mdi:account', label: 'Your profile and account information' },
              { icon: 'mdi:file-document', label: 'All submitted documents and verifications' },
              { icon: 'mdi:message', label: 'All messages and communication logs' },
              { icon: 'mdi:home', label: 'Rental history and applications' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <Icon icon={icon} className="w-3 h-3 text-crimson" />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Confirm input */}
          <div className="self-stretch flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-black">
              Type{' '}
              <span
                className="font-bold px-1.5 py-0.5 rounded text-[12px] tracking-wider"
                style={{ background: '#fee2e2', color: '#c00f0f' }}
              >
                DELETE
              </span>{' '}
              to confirm{userName ? ` deletion of ${userName}'s account` : ''}:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE here"
              disabled={isDeleting}
              className={`w-full rounded-[12px] border-2 p-3 text-[14px] font-semibold tracking-wide outline-none transition-colors font-lora ${
                confirmText && !isConfirmed
                  ? 'border-red-300 bg-red-50 focus:border-crimson'
                  : isConfirmed
                    ? 'border-red-400 bg-red-50'
                    : 'border-whitesmoke-200 focus:border-red-300'
              } ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {confirmText && !isConfirmed && (
              <span className="text-[12px] text-crimson font-medium">
                Please type DELETE exactly to proceed.
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 h-0.5 bg-whitesmoke-200" />

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-8 py-5">
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="rounded-[12px] flex items-center justify-center py-2.5 px-6 text-[14px] font-semibold text-dimgray border border-whitesmoke-200 bg-white hover:bg-whitesmoke-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!isConfirmed || isDeleting}
            className={`rounded-[12px] flex items-center justify-center gap-2 py-2.5 px-6 text-[14px] font-semibold text-white transition-all duration-200 border-none ${
              isConfirmed && !isDeleting
                ? 'cursor-pointer hover:scale-[1.02] active:scale-95 hover:opacity-90'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ background: 'linear-gradient(180deg, #c00f0f, #e44f4f)' }}
          >
            {isDeleting ? (
              <>
                <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Icon icon="mdi:delete-forever" className="w-4 h-4" />
                Delete Account
              </>
            )}
          </button>
        </div>
      </div>
    </PortalPopup>
  );
};

export default DeleteAccountPopup;