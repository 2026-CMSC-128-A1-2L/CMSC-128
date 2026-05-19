import { useEffect, useState, type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

//changed contact number and home address to necessary fields in landlord info
export type LandlordInfo = {
  displayName: string;
  email: string;
  fullName: string;
  contactNumber: string;
  homeAddress: string;
  role: string;
  employees: string[];
  verified: boolean;
  verificationStatus?: 'pending' | 'submitted' | 'rejected' | 'approved';
  photoUrl?: string;
};

type LandlordInfoCardProps = {
  info: LandlordInfo;
  onEditContact?: () => void;
  onEditHomeAddress?: () => void;
  activeTab?: 'info' | 'verification';
  setActiveTab?: (tab: 'info' | 'verification') => void;
  setContactNumber?: (contactNumber: string) => void;
  setHomeAddress?: (homeAddress: string) => void;
  setIsEditing?: (isEditing: boolean) => void;
  isEditing?: boolean;
  setIsEditingAddress?: (isEditingAddress: boolean) => void;
  isEditingAddress?: boolean;
  onSaveContact?: (contactNumber: string) => Promise<void> | void;
  onSaveHomeAddress?: (homeAddress: string) => Promise<void> | void;
};

const PLACEHOLDER = '- - - - -';

const getVerificationLabel = (info: LandlordInfo) => {
  if (info.verified || info.verificationStatus === 'approved') return 'Verified';
  if (info.verificationStatus === 'submitted') return 'For Review';
  if (info.verificationStatus === 'rejected') return 'Rejected';
  return 'Unverified';
};

type FieldProps = {
  label: string;
  onEdit?: () => void;
  to?: string;
  children: ReactNode;
};

const Field = ({ label, onEdit, to, children }: FieldProps) => {
  const body = (
    <>
      <div className="flex items-center gap-[8px]">
        <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666] group-hover:text-[#096c5b]">
          {label}
        </span>
        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            aria-label={`Edit ${label.toLowerCase()}`}
            className="flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center text-[#2f3136] transition-colors hover:text-[#096c5b]"
          >
            <Icon icon="iconamoon:edit" className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="font-['Inter',sans-serif] text-[14px] font-bold text-black">{children}</div>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="group flex flex-col items-start gap-[4px] rounded-[6px] transition-colors hover:bg-[#eaf6f2]/60"
      >
        {body}
      </Link>
    );
  }

  return <div className="flex flex-col items-start gap-[4px]">{body}</div>;
};

const LandlordInfoCard = ({
  info,
  onEditContact,
  onEditHomeAddress,
  setActiveTab,
  setContactNumber,
  setHomeAddress,
  setIsEditing,
  isEditing,
  setIsEditingAddress,
  isEditingAddress,
  onSaveContact,
  onSaveHomeAddress,
}: LandlordInfoCardProps) => {
  const handleSaveAddress = async () => {
    const cleaned = homeAddressOnEdit.trim().replace(/\s\s+/g, ' ');
    setHomeAddress?.(cleaned);
    await onSaveHomeAddress?.(cleaned);
    setIsEditingAddress?.(false);
  };

  // save changes and exit editing mode
  const handleSave = async () => {
    if (contactNumberOnEdit.length !== 11) {
      return;
    }
    const newContact = contactNumberOnEdit;
    setContactNumber?.(newContact);
    await onSaveContact?.(newContact);
    setIsEditing?.(false);
  };

  // redact contact number except for first 2 digits
  const redactContact = (number: string) => {
    if (!number || number.length < 2) return number ?? PLACEHOLDER;
    return number.substring(0, 2) + '*'.repeat(number.length - 2);
  };

  //stateful contact number variable to be used for input field
  const [contactNumberOnEdit, setContactNumberOnEdit] = useState(info.contactNumber ?? '');
  const [homeAddressOnEdit, setHomeAddressOnEdit] = useState(info.homeAddress ?? '');

  useEffect(() => {
    setContactNumberOnEdit(info.contactNumber ?? '');
    setHomeAddressOnEdit(info.homeAddress ?? '');
  }, [info.contactNumber, info.homeAddress]);

  return (
    <section className="flex flex-col gap-[24px] rounded-[16px] px-[32px] pt-[32px] pb-[24px]">
      <header className="flex flex-col items-start gap-[4px]">
        <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
          Landlord Profile
        </span>
        <h1 className="font-['Inter',sans-serif] text-[28px] font-bold leading-[36px] text-[#024338]">
          {info.displayName}
        </h1>
        <a
          href={`mailto:${info.email}`}
          className="font-['Inter',sans-serif] text-[14px] font-bold text-[#096c5b] hover:underline"
        >
          {info.email}
        </a>
      </header>

      <div className="grid grid-cols-1 gap-x-[48px] gap-y-[24px] md:grid-cols-[200px_1fr_1fr] md:items-start">
        <div className="flex h-[200px] w-[200px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
          {info.photoUrl ? (
            <img src={info.photoUrl} alt={info.fullName} className="h-full w-full object-cover" />
          ) : (
            <Icon icon="solar:user-bold" className="h-[120px] w-[120px]" aria-hidden="true" />
          )}
        </div>

        <div className="flex flex-col gap-[16px]">
          <Field label="Name">{info.fullName}</Field>
          <Field label="Contact number" onEdit={onEditContact}>
            {isEditing ? (
              <input
                type="text"
                value={contactNumberOnEdit}
                placeholder="09*********"
                onChange={(e) => {
                  const val = e.target.value;
                  const onlyNums = val.replace(/[^0-9]/g, '');

                  // Requirement: Must start with 09 and limit to 11 digits
                  if (onlyNums.length === 0) {
                    setContactNumberOnEdit('');
                  } else if (onlyNums.length === 1) {
                    if (onlyNums === '0') setContactNumberOnEdit('0');
                  } else if (onlyNums.startsWith('09') && onlyNums.length <= 11) {
                    setContactNumberOnEdit(onlyNums);
                  }
                }}
                className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-[200px] py-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            ) : (
              redactContact(contactNumberOnEdit)
            )}
          </Field>
          <Field label="Home Address" onEdit={onEditHomeAddress}>
            {isEditingAddress ? (
              <input
                type="text"
                value={homeAddressOnEdit}
                onChange={(e) => {
                  const val = e.target.value;
                  const isValidChar = /^[a-zA-Z0-9\s.,\-#]*$/.test(val);
                  if (isValidChar && val.length <= 100) setHomeAddressOnEdit(val);
                }}
                className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-[300px] py-1 text-black"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveAddress()}
              />
            ) : (
              homeAddressOnEdit
            )}
          </Field>
        </div>

        <div className="flex flex-col gap-[16px]">
          <Field label="User Role">{info.role}</Field>
          <Field label="Employees">
            {info.employees.length === 0 ? (
              <span>{PLACEHOLDER}</span>
            ) : (
              <ul className="flex flex-col gap-[2px]">
                {info.employees.map((name) => (
                  <li key={name} className="text-[#096c5b]">
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </Field>

          <button
            type="button"
            className="group flex flex-col items-start gap-[4px] rounded-[6px] text-left transition-colors hover:bg-[#eaf6f2]/60 cursor-pointer"
            onClick={() => setActiveTab?.('verification')}
          >
            <Field label="Verification Status">
              <span className="inline-flex items-center gap-[4px] text-[#096c5b] group-hover:underline">
                {getVerificationLabel(info)}
                {info.verified && (
                  <Icon
                    icon="material-symbols:verified"
                    className="h-[16px] w-[16px]"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  icon="iconamoon:arrow-right-2"
                  className="h-[14px] w-[14px] opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </Field>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandlordInfoCard;
