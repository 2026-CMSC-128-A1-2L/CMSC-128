import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import VerifiedBadge from '../../../../../assets/verified_badge.svg';
import DefaultAvatar from '../../../../../assets/default_avatar.svg';
import { useState, useRef } from 'react';
import Footer from '../../../../components/general/Footer';
import Switch from '../../../../components/user/CurrentDormToVerificationSwitch';
import Sidebar from '../../../../components/user/SideBar';
import placeholder from '../../../../../assets/logo_atlas_text.svg';
import { Link } from 'react-router-dom';

const CurrentDorm: FunctionComponent = () => {
  const onContractInformationContainerClick = useCallback(() => {
    // Add your code here
  }, []);

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

  const [activeTab, setActiveTab] = useState('Contract Information');

  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      {/* <img className="w-[1440px] h-[1192px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" /> */}
      <div className="w-full max-w-[1440px] h-[1536px] overflow-hidden shrink-0 flex flex-col items-start z-[1] mx-auto">
        {/* <div className="w-full max-w-[1440px] min-h-screen overflow-hidden flex flex-col items-start z-[1] mx-auto"></div> */}

        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start">
          <div className="self-stretch flex-1 flex items-center">
            <div className="self-stretch w-[200px] flex items-start">
              <Sidebar />
            </div>
            <div className="h-[1112px] hidden flex-col items-center">
              <div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            </div>
            <div className="self-stretch w-[1240px] flex flex-col items-start justify-between gap-0">
              <div className="self-stretch flex flex-col items-start py-num-0 pl-num-32 pr-20">
                <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                  <div className="h-6 flex items-center gap-1.5">
                    <div className="relative font-semibold">User Profile</div>
                    <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                    <div className="relative font-semibold">Current Dorm</div>
                  </div>
                  <div className="w-[704px] rounded-num-12 bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-num-24 box-border gap-2.5 text-dimgray font-inter">
                    <img className="h-6 w-6 relative" alt="" />
                    <b className="relative">
                      Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                    </b>
                  </div>
                </div>
                <div className="self-stretch h-[1280px] rounded-2xl bg-white flex flex-col items-start gap-3 text-center text-dimgray font-inter">
                  <div className="self-stretch h-[382px] rounded-2xl flex flex-col items-start gap-3">
                    <div className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start p-num-32">
                      <div className="self-stretch flex flex-col items-start gap-2.5">
                        <b className="relative">Student Profile</b>
                        <div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200">
                          <b className="relative leading-8">Daphne Dayne</b>
                          <img className="h-6 w-6 relative" alt="" src={VerifiedBadge} />
                        </div>
                        <b className="relative text-teal-200">dcanape@up.edu.ph</b>
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
                              <b className="relative text-black py-1 text-left">
                                {redactContact(contactNumber)}
                              </b>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-center gap-2">
                            <b className="relative">Home Address</b>

                            <button
                              onClick={() =>
                                isEditingAddress ? handleSaveAddress() : setIsEditingAddress(true)
                              }
                              className="focus:outline-none hover:opacity-80 transition-opacity"
                            >
                              <Icon
                                icon={
                                  isEditingAddress ? 'solar:check-read-linear' : 'iconamoon:edit'
                                }
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

                            {/* wala pa sha pupuntahan. to be added soon */}
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer hover:underline"
                            >
                              <div className="relative font-medium">See Finance</div>
                              <Icon
                                icon="solar:arrow-right-up-linear"
                                className="h-4 w-4 relative"
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
                  <div className="self-stretch h-[680px] flex flex-col items-start gap-12 text-white">
                    {<Switch />}
                    <div className="self-stretch flex flex-col items-start gap-3 shrink-0 text-[24px] text-teal-200">
                      <div className="w-[1128px] h-[520px] bg-white flex flex-col items-center justify-center">
                        <div className="w-[916px] h-[520px] rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start">
                          <img
                            className="w-[916px] relative rounded-t-num-12 rounded-b-none max-h-full object-cover"
                            alt=""
                            src={placeholder}
                          />
                          <div className="self-stretch h-40 flex flex-col items-start">
                            <div className="w-[916px] h-16 flex flex-col items-center justify-center py-5 px-[27px] box-border shrink-0 text-left text-black">
                              <b className="relative leading-8 shrink-0">One Sapphire Place</b>
                            </div>
                            <div className="flex items-center py-num-0 px-[26px] gap-3 shrink-0 text-[18px]">
                              <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center">
                                <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                                  <b className="relative tracking-[-0.01em]">Room 31</b>
                                </div>
                                <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                                  <div className="relative tracking-[0.04em] font-semibold">
                                    UNIT
                                  </div>
                                </div>
                              </div>
                              <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center">
                                <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                                  <b className="relative tracking-[-0.01em]">1 Year</b>
                                </div>
                                <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                                  <div className="relative tracking-[0.04em] font-semibold">
                                    Contract
                                  </div>
                                </div>
                              </div>
                              <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center">
                                <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                                  <b className="relative tracking-[-0.01em]">May 18, 2026</b>
                                </div>
                                <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                                  <div className="relative tracking-[0.04em] font-semibold">
                                    Lease End
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-[916px] flex items-center justify-center py-num-10 px-num-0 box-border shrink-0 text-[12px]">
                              <div className="h-10 w-[863px] rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex items-center justify-center">
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                  className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer hover:underline"
                                >
                                  <div className="relative font-medium">View Details</div>
                                  <Icon
                                    icon="solar:arrow-right-up-linear"
                                    className="h-6 w-6 relative"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex items-start justify-center pt-num-24 px-num-32 pb-20 gap-6 text-num-14 text-black">
                        {/* left sidebar */}
                        <div className="h-[168px] w-[280px] rounded-2xl border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-3 px-4">
                          <div className="self-stretch flex flex-col items-end py-1 px-0 gap-1">
                            {/* contract info */}
                            <div
                              className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group"
                              onClick={() => setActiveTab('Contract Information')}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`relative font-semibold transition-colors ${activeTab === 'Contract Information' ? 'text-[#096C5B]' : 'text-black'}`}
                                >
                                  Contract Information
                                </div>
                                <Icon
                                  icon="iconamoon:arrow-right-2"
                                  className={`h-6 w-6 transition-colors ${activeTab === 'Contract Information' ? 'text-[#096C5B]' : 'text-black'}`}
                                />
                              </div>
                            </div>

                            {/* rate and review */}
                            <Link to="/rate-review" className="cursor-pointer hover:underline">
                              <div
                                className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group"
                                onClick={() => setActiveTab('Rate and Review')}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`relative font-semibold transition-colors ${activeTab === 'Rate and Review' ? 'text-[#096C5B]' : 'text-black'}`}
                                  >
                                    Rate and Review
                                  </div>
                                  <Icon
                                    icon="iconamoon:arrow-right-2"
                                    className={`h-6 w-6 transition-colors ${activeTab === 'Rate and Review' ? 'text-[#096C5B]' : 'text-black'}`}
                                  />
                                </div>
                              </div>
                            </Link>

                            {/* report listing */}
                            <Link to="/report-dorm" className="cursor-pointer hover:underline">
                              <div
                                className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group"
                                onClick={() => setActiveTab('Report Listing')}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`relative font-semibold transition-colors ${activeTab === 'Report Listing' ? 'text-[#096C5B]' : 'text-black'}`}
                                  >
                                    Report Listing
                                  </div>
                                  <Icon
                                    icon="iconamoon:arrow-right-2"
                                    className={`h-6 w-6 transition-colors ${activeTab === 'Report Listing' ? 'text-[#096C5B]' : 'text-black'}`}
                                  />
                                </div>
                              </div>
                            </Link>

                            {/* pasalo unit */}
                            <Link to="/lease-transfer" className="cursor-pointer hover:underline">
                              <div
                                className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group"
                                onClick={() => setActiveTab('Pasalo Unit')}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`relative font-semibold transition-colors ${activeTab === 'Pasalo Unit' ? 'text-[#096C5B]' : 'text-black'}`}
                                  >
                                    Pasalo Unit
                                  </div>
                                  <Icon
                                    icon="iconamoon:arrow-right-2"
                                    className={`h-6 w-6 transition-colors ${activeTab === 'Pasalo Unit' ? 'text-[#096C5B]' : 'text-black'}`}
                                  />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* right sidebar: contents */}
                        <div className="h-[168px] w-[612px] rounded-lg border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-center px-8 text-left">
                          {activeTab === 'Contract Information' && (
                            <div className="flex-1 flex items-center justify-between py-3">
                              <div className="flex items-center gap-4">
                                <Icon icon="line-md:file" className="h-10 w-10 text-black" />
                                <div className="flex flex-col items-start justify-center">
                                  <b className="text-[16px] text-black">tenancy_contract.pdf</b>
                                  <div className="text-[12px] font-semibold text-slategray">
                                    Submitted: 02 April 2026
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                                <b className="text-[14px] text-[#096C5B]">
                                  Download Tenancy Contract
                                </b>
                                <Icon
                                  icon="material-symbols:download-rounded"
                                  className="h-6 w-6 text-[#096C5B]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {<Footer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDorm;
