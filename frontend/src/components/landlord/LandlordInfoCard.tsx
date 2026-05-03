import type { ReactNode } from 'react';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export type LandlordInfo = {
  displayName: string;
  email: string;
  fullName: string;
  contactNumber?: string;
  homeAddress?: string;
  role: string;
  employees: string[];
  verified: boolean;
  photoUrl?: string;
};

type LandlordInfoCardProps = {
  info: LandlordInfo;
  onUpdateInfo?: (updatedData: Partial<LandlordInfo>) => void;
  verificationHref?: string;
};

const PLACEHOLDER = '- - - - -';

const LandlordInfoCard = ({
  info,
  onUpdateInfo,
  verificationHref = '/landlord/profile/verification',
}: LandlordInfoCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // editing States
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // validation States
  const [contactError, setContactError] = useState(false);

  // local input states
  const [contactNumber, setContactNumber] = useState(info.contactNumber || '');
  const [homeAddress, setHomeAddress] = useState(info.homeAddress || '');

  // validation for save contact
  const handleSaveContact = () => {
    if (contactNumber.length > 0 && contactNumber.length !== 11) {
      setContactError(true);
      return;
    }
    
    setContactError(false);
    onUpdateInfo?.({ contactNumber });
    setIsEditingContact(false);
  };

  const handleSaveAddress = () => {
    const cleaned = homeAddress.trim().replace(/\s\s+/g, ' ');
    setHomeAddress(cleaned);
    onUpdateInfo?.({ homeAddress: cleaned });
    setIsEditingAddress(false);
  };

  return (
    <section className="flex flex-col gap-[24px] rounded-[16px] px-[32px] pt-[32px] pb-[24px]">
      <header className="flex flex-col items-start gap-[4px]">
        <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
          Landlord Profile
        </span>
        <div className="flex items-center gap-2">
          <h1 className="font-['Inter',sans-serif] text-[28px] font-bold leading-[36px] text-[#024338]">
            {info.displayName}
          </h1>
          {info.verified && (
             <Icon icon="material-symbols:verified" className="h-6 w-6 text-[#096c5b]" />
          )}
        </div>
        <a href={`mailto:${info.email}`} className="font-['Inter',sans-serif] text-[14px] font-bold text-[#096c5b] hover:underline">
          {info.email}
        </a>
      </header>

      <div className="grid grid-cols-1 gap-x-[48px] gap-y-[24px] md:grid-cols-[200px_1fr_1fr] md:items-start">
        
        {/* profile photo*/}
        <div className="relative group w-[200px] h-[200px] cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="w-full h-full rounded-full overflow-hidden bg-[#e5e7eb] flex items-center justify-center">
            {info.photoUrl ? (
              <img src={info.photoUrl} alt={info.fullName} className="h-full w-full object-cover transition-all duration-300 group-hover:blur-sm" />
            ) : (
              <Icon icon="solar:user-bold" className="h-[120px] w-[120px] text-[#9ca3af] transition-all duration-300 group-hover:blur-sm" />
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300">
            <Icon icon="iconamoon:edit" className="opacity-0 group-hover:opacity-100 h-10 w-10 text-[#096C5B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <b className="text-[14px] text-[#666]">Name</b>
            <b className="text-black uppercase">{info.fullName}</b>
          </div>

          {/* contact num */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <b className="text-[14px] text-[#666]">Contact number</b>
              <button onClick={() => (isEditingContact ? handleSaveContact() : setIsEditingContact(true))}>
                <Icon 
                  icon={isEditingContact ? 'solar:check-read-linear' : 'iconamoon:edit'} 
                  className="h-5 w-5 text-[#096C5B]" 
                />
              </button>
            </div>
            <div className="flex flex-col items-start w-full">
              {isEditingContact ? (
                <>
                  <input
                    autoFocus
                    type="text"
                    value={contactNumber}
                    placeholder="09*********"
                    className={`border-b text-[14px] bg-transparent outline-none w-50 py-1 transition-colors ${
                      contactError ? 'border-red-500 text-red-600' : 'border-[#096C5B] text-black'
                    }`}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      if (val.length === 0) setContactNumber('');
                      else if (val.length === 1 && val === '0') setContactNumber('0');
                      else if (val.startsWith('09') && val.length <= 11) {
                        setContactNumber(val);
                        if (val.length === 11) setContactError(false);
                      }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveContact()}
                  />
                  {contactError && (
                    <span className="text-[10px] text-red-500 font-bold mt-1">
                      Contact number must be 11 digits
                    </span>
                  )}
                </>
              ) : (
                <b className="text-black py-1 h-[32px]">{contactNumber || PLACEHOLDER}</b>
              )}
            </div>
          </div>

          {/* home address */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <b className="text-[14px] text-[#666]">Home Address</b>
              <button onClick={() => (isEditingAddress ? handleSaveAddress() : setIsEditingAddress(true))}>
                <Icon icon={isEditingAddress ? 'solar:check-read-linear' : 'iconamoon:edit'} className="h-5 w-5 text-[#096C5B]" />
              </button>
            </div>
            <div className="min-h-[32px] flex items-center">
              {isEditingAddress ? (
                <input
                  autoFocus
                  type="text"
                  value={homeAddress}
                  placeholder="Enter full address"
                  className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-full py-1"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[a-zA-Z0-9\s.,\-#]*$/.test(val) && val.length <= 100) setHomeAddress(val);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveAddress()}
                />
              ) : (
                <b className="text-black py-1">{homeAddress || PLACEHOLDER}</b>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <b className="text-[14px] text-[#666]">User Role</b>
            <b className="text-black">{info.role}</b>
          </div>
          <div className="flex flex-col gap-1">
            <b className="text-[14px] text-[#666]">Employees</b>
            <div className="min-h-[32px]">
              {info.employees.length > 0 ? (
                <ul className="list-none p-0 m-0">
                  {info.employees.map(emp => (
                    <li key={emp} className="text-[#096c5b] font-bold text-[14px]">{emp}</li>
                  ))}
                </ul>
              ) : <b className="text-black">{PLACEHOLDER}</b>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <b className="text-[14px] text-[#666]">Verification Status</b>
            <Link to={verificationHref} className="no-underline group">
              <b className="text-transparent bg-clip-text bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] flex items-center gap-1">
                {info.verified ? 'Verified' : 'Unverified'}
                <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4 text-[#096c5b] opacity-0 group-hover:opacity-100 transition-opacity" />
              </b>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandlordInfoCard;