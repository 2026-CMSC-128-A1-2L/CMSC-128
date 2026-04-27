import { type FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import type { RegistrationProfileData } from '../../pages/Registration';

// ─── Props ────────────────────────────────────────────────────────────────────

interface RegistrationProfileProps {
  onNextClick: (data: RegistrationProfileData) => void;
}

// ─── Role option ──────────────────────────────────────────────────────────────

const ROLES: { value: RegistrationProfileData['role']; label: string; icon: string }[] = [
  { value: 'student', label: 'I am a student!', icon: 'ph:student' },
  { value: 'landlord', label: 'I am a landlord!', icon: 'material-symbols-light:business-center-outline-rounded' },
  { value: 'manager', label: 'I am a manager!', icon: 'ph:files' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const RegistrationProfile: FunctionComponent<RegistrationProfileProps> = ({ onNextClick }) => {
  const [selectedRole, setSelectedRole] = useState<RegistrationProfileData['role']>('');
  const [roleError, setRoleError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<RegistrationProfileData, 'role'>>({
    mode: 'onChange',
  });

  const onSubmit = (data: Omit<RegistrationProfileData, 'role'>) => {
    if (!selectedRole) {
      setRoleError('Please select a role');
      return;
    }
    setRoleError('');
    onNextClick({ ...data, role: selectedRole });
  };

  return (
    <div className="flex-1 w-full relative overflow-hidden flex items-start justify-center text-center text-num-14 text-dimgray font-inter">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[620px] rounded-num-12 border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start pt-3 px-4 pb-5 gap-5"
      >

        {/* ── Full Name ── */}
        <div className="self-stretch flex flex-col items-start justify-start px-num-10 pt-num-10 gap-1">
          <div className="self-stretch h-11 rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex items-center justify-start py-0 px-3 gap-2.5">
            <div className="overflow-hidden flex items-center p-1 shrink-0">
              <Icon icon="material-symbols:person-outline-rounded" className="h-6 w-6" />
            </div>
            <input
              {...register('firstName', { required: 'First name is required' })}
              placeholder="First Name"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-black placeholder-slategray outline-none leading-6"
            />
            <div className="self-stretch w-0.5 rounded-[100px] bg-whitesmoke shrink-0" />
            <input
              {...register('middleName')}
              placeholder="Middle Name"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-black placeholder-slategray outline-none leading-6 text-left"
            />
            <div className="self-stretch w-0.5 rounded-[100px] bg-whitesmoke shrink-0" />
            <input
              {...register('lastName', { required: 'Last name is required' })}
              placeholder="Last Name"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-black placeholder-slategray outline-none leading-6 text-left"
            />
          </div>
          {(errors.firstName || errors.lastName) && (
            <span className="text-xs text-red-500 text-left">
              {errors.firstName?.message || errors.lastName?.message}
            </span>
          )}
        </div>

        {/* ── Contact + Email ── */}
        <div className="self-stretch flex items-start px-num-10 gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <div className="rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-10 px-3 gap-2">
              <Icon icon="proicons:call" className="h-6 w-6 shrink-0" />
              <input
                {...register('contactNumber', {
                  required: 'Contact number is required',
                  pattern: { value: /^[0-9+\s-]{7,15}$/, message: 'Enter a valid number' },
                })}
                placeholder="Contact Number"
                className="flex-1 bg-transparent text-sm font-medium text-black placeholder-slategray outline-none leading-6"
              />
            </div>
            {errors.contactNumber && (
              <span className="text-xs text-red-500 text-left">{errors.contactNumber.message}</span>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div className="rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-10 px-3 gap-2.5">
              <Icon icon="mdi-light:email" className="h-6 w-6 shrink-0" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                })}
                placeholder="Email"
                className="flex-1 bg-transparent text-sm font-medium text-black placeholder-slategray outline-none leading-6"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 text-left">{errors.email.message}</span>
            )}
          </div>
        </div>

        {/* ── Home Address ── */}
        <div className="self-stretch flex flex-col items-start px-num-10 gap-1">
          <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-10 px-3 gap-2.5">
            <Icon icon="ep:location" className="h-6 w-6 shrink-0" />
            <input
              {...register('homeAddress', { required: 'Home address is required' })}
              placeholder="Home Address"
              className="flex-1 bg-transparent text-sm font-medium text-black placeholder-slategray outline-none leading-6"
            />
          </div>
          {errors.homeAddress && (
            <span className="text-xs text-red-500 text-left">{errors.homeAddress.message}</span>
          )}
        </div>

        {/* ── Role Selection ── */}
        <div className="self-stretch flex flex-col items-start px-num-10 gap-2">
          <div className="self-stretch flex items-center justify-center gap-6">
            {ROLES.map((role) => {
              const isSelected = selectedRole === role.value;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => { setSelectedRole(role.value); setRoleError(''); }}
                  className={`flex-1 rounded-num-12 border overflow-hidden flex flex-col items-center p-num-10 gap-2 transition-colors ${isSelected
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-whitesmoke hover:bg-gray-50 text-dimgray'
                    }`}
                >
                  <Icon icon={role.icon} className="h-6 w-6" />
                  <span className="text-xs font-semibold leading-5">{role.label}</span>
                </button>
              );
            })}
          </div>
          {roleError && (
            <span className="text-xs text-red-500">{roleError}</span>
          )}
        </div>

        {/* ── Proceed ── */}
        <div className="self-stretch overflow-hidden flex items-center justify-center py-0 px-num-10 text-white">
          <button
            type="submit"
            className="rounded-[45px] flex items-center justify-center py-2 px-8 gap-2.5 hover:opacity-90 transition-opacity"
            style={{ background: '#1a5c50' }}
          >
            <Icon icon="material-symbols-light:owl-rounded" className="h-6 w-6" />
            <b className="relative">Proceed</b>
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegistrationProfile;
