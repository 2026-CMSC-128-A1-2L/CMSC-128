import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import DefaultAvatar from '../../../assets/default_avatar.svg';
import VerifiedBadge from '../../../assets/verified_badge.svg';

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState<string>(DefaultAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle profile image change
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // contact number editing state
  const [isEditing, setIsEditing] = useState(false);
  const [contactNumber, setContactNumber] = useState('09*********');

  // home address editing state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [homeAddress, setHomeAddress] = useState('Brgy. Batong Malake, Los Banos, Laguna');

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
  };

  // save changes and exit editing mode
  const handleSave = () => {
    setIsEditing(false);
  };

  // redact contact number except for first 2 digits
  const redactContact = (number: string) => {
    if (number.length < 2) return number;
    return number.substring(0, 2) + '*'.repeat(number.length - 2);
  };

  return (
    <div className="self-stretch h-[382px] rounded-2xl flex flex-col items-start gap-3">
      <div className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start p-num-32">
        <div className="self-stretch flex flex-col items-start gap-2.5">
          <b className="relative">Student Profile</b>
          <div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200">
            <b className="relative leading-8">Daphne Dayne</b>
            <img className="h-6 w-6 relative" alt="" src={VerifiedBadge} />
          </div>
          <b className="relative text-[#096c5b]">dcanape@up.edu.ph</b>
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5">
        <div
          className="relative cursor-pointer group w-[200px] h-[200px]"
          onClick={() => fileInputRef.current?.click()}
        >
          {/* profile image*/}
          <img
            className="w-full h-full rounded-full object-cover transition-all duration-300 group-hover:blur-sm"
            alt="Profile"
            src={profileImage}
          />

          {/* hover */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300">
            <Icon
              icon="iconamoon:edit"
              className="opacity-0 group-hover:opacity-100 h-10 w-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              color="#096C5B"
            />
          </div>

          {/* input change */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfileImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Name</b>
            <b className="relative text-black">CANAPE, DAPHNE</b>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <b className="relative">Contact number</b>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="focus:outline-none hover:opacity-80 transition-opacity"
              >
                <Icon
                  icon={isEditing ? 'solar:check-read-linear' : 'iconamoon:edit'}
                  className="h-6 w-6 relative"
                  color="#096C5B"
                />
              </button>
            </div>
            <div className="w-[350px] min-h-[32px] flex items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  autoFocus
                  className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-[200px] py-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
              ) : (
                <b className="relative text-black py-1 text-left">{redactContact(contactNumber)}</b>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <b className="relative">Home Address</b>

              <button
                onClick={() => (isEditingAddress ? handleSaveAddress() : setIsEditingAddress(true))}
                className="focus:outline-none hover:opacity-80 transition-opacity"
              >
                <Icon
                  icon={isEditingAddress ? 'solar:check-read-linear' : 'iconamoon:edit'}
                  className="h-6 w-6 relative"
                  color="#096C5B"
                />
              </button>
            </div>
            <div className="w-[350px] min-h-[32px] flex items-center">
              {isEditingAddress ? (
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  autoFocus
                  className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-[300px] py-1 text-black"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveAddress()}
                />
              ) : (
                <b className="relative text-black py-1 text-left">{homeAddress}</b>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
          <div className="flex flex-col items-start gap-1">
            <b className="relative">{`User Role `}</b>
            <b className="relative text-black">Tenant</b>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Student Number</b>
            <b className="relative text-black">2023*****</b>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Verification Status</b>
            <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Verified
            </b>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Current Dorm</b>
            <b className="relative text-black">One Sapphire Place</b>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Rent Fee</b>
            <div className="self-stretch flex items-center gap-8 text-black">
              <b className="relative">Paid</b>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer hover:underline"
              >
                <div className="relative font-medium text-[#096c5b]">See Finance</div>
                <Icon
                  icon="solar:arrow-right-up-linear"
                  className="h-4 w-4 relative text-[#096c5b]"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Contract Duration</b>
            <b className="relative text-black">1 year</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
