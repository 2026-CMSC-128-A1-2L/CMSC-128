import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import type { RegistrationProfileData } from '../../pages/Registration';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RegistrationFinalizeProps {
  data: RegistrationProfileData;
  isSubmitting?: boolean;
  onBackClick: () => void;
  onSubmit: () => void | Promise<void>;
}

// ─── Read-only field ──────────────────────────────────────────────────────────

const ReadOnlyField: FunctionComponent<{
  icon: string;
  value: string;
  placeholder?: string;
}> = ({ icon, value, placeholder = '—' }) => (
  <div className="flex-1 self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border overflow-hidden flex items-center py-num-10 px-3 gap-2.5">
    <Icon icon={icon} className="h-6 w-6 shrink-0 text-dimgray" />
    <span className="text-sm font-medium text-black leading-6">{value || placeholder}</span>
  </div>
);

// ─── Role icon map ────────────────────────────────────────────────────────────

const ROLE_ICONS: Record<string, string> = {
  student: 'ph:student',
  landlord: 'material-symbols-light:business-center-outline-rounded',
  manager: 'ph:files',
};

const ROLE_LABELS: Record<string, string> = {
  student: 'Student',
  landlord: 'Landlord',
  manager: 'Manager',
};

// ─── Component ────────────────────────────────────────────────────────────────

const RegistrationFinalize: FunctionComponent<RegistrationFinalizeProps> = ({
  data,
  isSubmitting = false,
  onBackClick,
  onSubmit,
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="flex-1 w-full relative overflow-hidden flex items-start justify-center text-center text-num-14 text-dimgray font-inter">
      <div className="w-[620px] rounded-num-12 border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start pt-3 px-4 pb-4 gap-4">
        {/* Review banner */}
        <div className="self-stretch rounded-xl bg-lightcyan border border-teal-100 flex items-center px-4 py-3 gap-3 text-left mt-2">
          <Icon icon="material-symbols:info-outline" className="w-5 h-5 text-teal-600 shrink-0" />
          <p className="text-xs font-semibold text-teal-700">
            Please review your information before submitting. Make sure everything looks correct.
          </p>
        </div>

        <div className="self-stretch flex flex-col items-start gap-3 px-num-10">
          {/* Full Name */}
          <div className="self-stretch h-11 rounded-num-12 bg-aliceblue border-whitesmoke border-solid border box-border overflow-hidden flex items-center py-0 px-3 gap-2.5">
            <div className="overflow-hidden flex items-center p-1 shrink-0">
              <Icon
                icon="material-symbols:person-outline-rounded"
                className="h-6 w-6 text-dimgray"
              />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm font-medium text-black flex-1 text-left leading-6">
                {data.firstName || '—'}
              </span>
              <div className="self-stretch w-0.5 rounded-[100px] bg-whitesmoke shrink-0" />
              <span className="text-sm font-medium text-black flex-1 text-center leading-6">
                {data.middleName || '—'}
              </span>
              <div className="self-stretch w-0.5 rounded-[100px] bg-whitesmoke shrink-0" />
              <span className="text-sm font-medium text-black flex-1 text-right leading-6">
                {data.lastName || '—'}
              </span>
            </div>
          </div>

          {/* Role */}
          {data.role && (
            <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border overflow-hidden flex items-center py-num-10 px-3 gap-2.5">
              <Icon icon={ROLE_ICONS[data.role]} className="h-6 w-6 shrink-0 text-teal-700" />
              <span className="text-sm font-medium text-black leading-6">
                {ROLE_LABELS[data.role]}
              </span>
            </div>
          )}

          {/* Contact + Email */}
          <div className="self-stretch flex items-start gap-4">
            <ReadOnlyField
              icon="proicons:call"
              value={data.contactNumber}
              placeholder="No contact number"
            />
            <ReadOnlyField icon="mdi-light:email" value={data.email} placeholder="No email" />
          </div>

          {/* Home Address */}
          <ReadOnlyField
            icon="ep:location"
            value={data.homeAddress}
            placeholder="No address provided"
          />
        </div>

        {/* Back / Looks good */}
        <div className="self-stretch overflow-hidden flex items-center justify-center py-0 px-num-10 gap-2.5">
          <button
            type="button"
            onClick={onBackClick}
            className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer text-dimgray hover:opacity-70 transition-opacity"
          >
            <b className="relative">Back</b>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer text-white hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            style={{ background: '#1a5c50' }}
          >
            <b className="relative">{isSubmitting ? 'Saving...' : 'Looks good!'}</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFinalize;
