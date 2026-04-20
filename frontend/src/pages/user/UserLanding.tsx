import { FunctionComponent } from 'react';
import landing_image from "../../../assets/landing_building.webp";
import AtlasCurious from '../../../assets/logo_curious.svg?react';
import AtlasText from '../../../assets/logo_atlas_text.svg?react';
import map from '../../../assets/map.svg';
import AutoImageSwitcher from '../../components/AutoImageSwitcher';
import SignInPopUp from '../../components/SignInPopUp';


import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLanding: FunctionComponent = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="w-full h-screen relative bg-white overflow-y-auto flex flex-col items-start isolate text-left text-[64px] text-teal-200 font-inter">
      <div className="flex flex-col items-start z-[1] shrink-0">
        <div className="self-stretch h-[1244px] flex flex-col items-start text-num-18 text-darkslategray-200">
          <div className="bg-gray-900 flex flex-col items-start py-px px-0">
            <div className="w-screen flex items-center py-4 px-8 lg:px-16 box-border">
              <div className="flex-1 flex flex-col items-start justify-center">
                <div className="flex items-center gap-2">
                  <AtlasText className="w-32 h-auto fill-darkslategray" fill="#024338" />
                  <Icon icon="tabler:chevron-down-filled" className="h-6 w-6 relative" />
                </div>
              </div>
              <div className="self-stretch flex items-center gap-12 text-center text-teal-200">
                <div className="self-stretch flex items-center justify-center py-0 px-1">
                  <b className="h-[35px] w-[141.6px] relative tracking-num--0_01 flex items-center justify-center shrink-0">
                    See All Listings
                  </b>
                </div>
                <div className="self-stretch flex items-center justify-center py-0 px-1">
                  <b className="h-[35px] w-[76px] relative tracking-num--0_01 flex items-center justify-center shrink-0">
                    About
                  </b>
                </div>
                <div className="self-stretch flex items-center justify-center py-0 px-1">
                  <Link to="/contact">
                    <b className="relative tracking-num--0_01">Contact Us</b>
                  </Link>
                </div>
              </div>
              <button onClick={() => setShowSignIn(true)}>

                <div className="rounded-[45px] [background:linear-gradient(99.18deg,_#5dc2a8_27.88%,_#0c8873_88.15%)] flex items-center justify-center py-3 px-4 gap-1 text-white cursor-pointer">
                  Sign In
                  <Icon icon="si:arrow-right-duotone" className="w-7 h-7 relative" />
                </div>

              </button>
              {showSignIn && (
                <SignInPopUp onClose={() => setShowSignIn(false)} />
              )}

            </div>
          </div>

          {/* Hero content */}
          <div className="self-stretch h-[1149px] overflow-hidden shrink-0 flex flex-col items-start justify-center p-2.5 box-border text-center text-[32px] text-gray-800">
            <div className="self-stretch flex-1 flex items-center justify-end pt-[140px] px-num-80 pb-num-80 relative isolate gap-[140px]">
              <img
                className="h-[916px] w-[1127.2px] absolute !!m-[0 important] top-[304px] left-[872px] object-contain z-[0] shrink-0"
                alt=""
                src={map}
              />
              <img
                className="h-[1638.9px] w-[1335.8px] absolute !!m-[0 important] top-[75.46px] left-[-200.13px] [filter:blur(10px)] object-contain z-[1] shrink-0"
                alt=""
              />
              <img
                className="h-[800px] w-[1190px] absolute !!m-[0 important] top-[259px] left-[-20px] object-cover z-[2] shrink-0"
                alt=""
                src={landing_image}
              />
              <div className="h-[658px] w-[535px] overflow-hidden hidden flex-col items-center py-num-32 px-2.5 box-border gap-4 z-[3] shrink-0">
                <b className="relative tracking-num--0_01">Search Sharper</b>
                <b className="relative tracking-num--0_01 text-gray-700">Live Better</b>
                <b className="relative tracking-num--0_01 text-gray-600">Lease Smarter</b>
                <b className="relative tracking-num--0_01 text-white">Hassle-Free</b>
              </div>
              <div className="self-stretch flex flex-col items-end py-16 px-0 z-[4] shrink-0 text-[160px] font-buhun-retro-two-free">
                <div className="w-[577px] relative tracking-[0.04em] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center">
                  ATLAS
                </div>
                <div className="relative text-[40px] font-semibold font-lora text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-right">
                  Accommodation Tracking <br />
                  and Lodging Allocation System
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch overflow-hidden flex flex-col items-start relative isolate gap-2.5">
          <img
            className="w-[1722px] h-[434px] absolute !!m-[0 important] top-[758px] left-[0px] object-cover z-[0] shrink-0"
            alt=""
          />

          <div className="self-stretch flex flex-col items-center justify-center z-[1] shrink-0">
            <div className="self-stretch bg-white flex items-center py-16 px-num-80 gap-3">
              <div className="flex-1 flex flex-col items-start gap-3">
                <b className="self-stretch relative">What is ATLAS?</b>
                <div className="self-stretch relative text-[20px] leading-10 text-gray-300">
                  <span>
                    <b className="font-inter">ATLAS</b>
                    <span className="font-medium">{` is a dormitory searching and management platform built specifically for the `}</span>
                  </span>
                  <b className="text-teal-100">University of the Philippines Los Baños</b>
                  <span className="font-medium">
                    {' '}
                    community. It bridges the gap between students looking for housing and landlords
                    or housing authorities managing their properties—bringing the entire process
                    online in one reliable, transparent place.
                  </span>
                </div>
              </div>
              <div className="h-[356px] w-[580px] relative rounded-xl bg-white overflow-hidden shrink-0 text-[4.34px] text-dimgray">
                <AutoImageSwitcher />
              </div>
            </div>

            <div className="self-stretch bg-white flex items-center justify-center py-10 px-0 gap-[89px] text-center text-num-24 text-gray-300">
              <div className="h-[233px] w-[200px] relative transition-transform duration-300 ease-in-out hover:scale-110">
                <div className="absolute top-[-11px] left-[-20px] w-[239px] h-60 flex flex-col items-center p-2.5 box-border gap-3.5 shrink-0">
                  <Icon icon="tabler:search" color="#2F8677" className="w-20 h-20" />
                  <b className="w-[177px] relative leading-num-32 flex items-center justify-center">
                    DISCOVER
                  </b>
                  <b className="w-num-199 relative text-num-18 flex font-lora items-center justify-center">
                    Browse and filter available dorms near campus with accurate, up-to-date
                    listings.
                  </b>
                </div>
              </div>
              <div className="h-[247px] w-num-199 relative transition-transform duration-300 ease-in-out hover:scale-110">
                <div className="absolute top-[-2px] left-[-19px] w-[234px] h-[249px] flex flex-col items-center p-2.5 box-border gap-3.5 shrink-0">
                  <Icon icon="emojione-monotone:clipboard" color="#2F8677" className="w-15 h-15" />
                  <b className="w-[177px] relative leading-num-32 flex items-center justify-center">
                    APPLY
                  </b>
                  <b className="w-num-199 relative text-num-18 flex font-lora items-center justify-center">
                    Submit dorm applications digitally, no more paper forms or in-person queuing.
                  </b>
                </div>
              </div>
              <div className="h-[251px] w-num-199 relative transition-transform duration-300 ease-in-out hover:scale-110">
                <div className="absolute top-[-2px] left-[-18px] w-[234px] h-[249px] flex flex-col items-center p-2.5 box-border gap-3.5 shrink-0">
                  <Icon icon="mdi:home" color="#2F8677" className="w-17 h-17" />
                  <b className="self-stretch relative leading-num-32">MANAGE</b>
                  <b className="self-stretch relative text-num-18 font-lora">
                    Landlords can monitor listings, tenants, and documents in one place.
                  </b>
                </div>
              </div>
              <div className="h-[247px] w-num-199 relative transition-transform duration-300 ease-in-out hover:scale-110">
                <div className="absolute top-[-2px] left-[-18px] w-[234px] h-[249px] flex flex-col items-center p-2.5 box-border gap-3.5 shrink-0">
                  <Icon icon="mdi:security" color="#2F8677" className="w-15 h-15" />
                  <b className="w-[177px] relative leading-num-32 flex items-center justify-center">
                    STAY SAFE
                  </b>
                  <b className="w-num-199 relative text-num-18 flex font-lora items-center justify-center">
                    Emergency contacts, hazard disclosures, and safety information available at a
                    glance.
                  </b>
                </div>
              </div>
            </div>

            <div className="self-stretch flex flex-row items-center bg-[#0c8873]">
              <div className="flex-1 flex items-center justify-center py-16 pl-20">
                <AtlasCurious className="w-70 h-70 fill-[#EBF9F6]" />
              </div>
              <div className="flex-1 flex flex-col items-end justify-center py-16 pr-20 gap-3 text-right text-white">
                <b className="self-stretch relative">How does it help?</b>
                <div className="self-stretch relative text-[20px] leading-10 font-medium">
                  Currently, dormitory searching and management at UPLB relies heavily on manual,
                  fragmented processes that are both inefficient and difficult to track. ATLAS
                  replaces these with a structured digital system that benefits every party
                  involved.
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch bg-azure overflow-hidden flex flex-col items-start text-center text-[56px] text-gray-300">
            <div className="w-screen flex flex-col items-center justify-center pt-12 px-40 pb-6 box-border gap-[52px]">
              <div className="relative font-extrabold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#0c8873,_#5dc2a8_72.12%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                Core features that set us
                <br />
                apart from the competition
              </div>
              <div className="self-stretch overflow-hidden flex items-start p-2.5 gap-5 text-left text-num-24">
                <div className="self-stretch flex-1 flex flex-col items-start py-2.5 px-0 gap-2.5">
                  <div className="self-stretch rounded-num-16 bg-white overflow-hidden flex flex-col items-start py-4 px-num-32 gap-2.5">
                    <Icon icon="iconoir:design-nib" className="w-[58px] h-[58px]" color="#096C5B" />
                    <div className="self-stretch flex flex-col items-start gap-1">
                      <b className="relative leading-num-32">Role-based Views</b>
                      <div className="self-stretch relative text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                        Distinct interfaces for Students, Managers, and Admins to ensure users only
                        see what they need.
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex-1 rounded-num-16 bg-white overflow-hidden flex flex-col items-start py-4 px-num-32 gap-2.5">
                    <Icon
                      icon="material-symbols:verified"
                      className="w-[58px] h-[58px]"
                      color="#096C5B"
                    />
                    <div className="self-stretch flex flex-col items-start gap-1">
                      <b className="self-stretch relative leading-num-32">Verification Cycles</b>
                      <div className="self-stretch relative text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                        Verification badges expire periodically to ensure a safe space for the
                        community.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch w-[300px] flex items-start justify-center py-2.5 px-0 box-border">
                  <div className="self-stretch flex-1 rounded-xl bg-white overflow-hidden flex flex-col items-start p-2.5 box-border gap-2.5 max-w-full">
                    <Icon icon="mdi:home" className="w-[58px] h-[58px] ml-5" color="#096C5B" />
                    <div className="self-stretch flex flex-col items-center justify-center py-0 px-num-32 gap-2.5">
                      <b className="self-stretch relative leading-num-32">Accomodation Tracking</b>
                      <div className="self-stretch relative text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                        Housing authorities can manage dormitory rooms, assign approved students,
                        enforce capacity limits, and monitor move-in and move-out dates, all from
                        one unified dashboard. No spreadsheets, no guesswork, no overbooking.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start py-2.5 px-0 gap-2.5">
                  <div className="self-stretch rounded-num-16 bg-white overflow-hidden flex flex-col items-start py-4 px-num-32 gap-2.5">
                    <Icon
                      icon="ic:baseline-notifications-active"
                      className="w-[58px] h-[58px] ml-1"
                      color="#096C5B"
                    />
                    <div className="self-stretch flex flex-col items-start gap-1">
                      <b className="self-stretch relative leading-num-32">Customizable Updates</b>
                      <div className="self-stretch relative text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                        Get notified via email or system notifications the moment a manager approves
                        or rejects your request.
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-num-16 bg-white overflow-hidden flex flex-col items-start py-4 px-num-32">
                    <div className="self-stretch overflow-hidden flex flex-col items-start p-2.5 gap-2.5">
                      <Icon
                        icon="fluent:handshake-16-regular"
                        className="w-[58px] h-[58px]"
                        color="#096C5B"
                      />
                      <div className="self-stretch flex flex-col items-start gap-1">
                        <b className="self-stretch relative leading-num-32">{`Fast & Smooth Process`}</b>
                        <div className="self-stretch relative text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                          Optimized workflows and automated document generation move you from
                          "Applying" to "Approved" in record time.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch bg-darkslategray-100 overflow-hidden flex flex-col items-center justify-center py-20 px-6 md:px-20">
            <div className="h-20" />
            <div className="w-full h-[59px] relative text-[50px] font-extrabold font-inter text-transparent !bg-clip-text [background:linear-gradient(90deg,_#0c8873,_#5dc2a8_72.12%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center flex items-center justify-center">
              What is its PURPOSE?
            </div>
            <div className="h-10" />
            <div className="max-w-2xl w-full">
              <p className="text-num-24 md:text-num-24 lg:text-[18px] leading-relaxed md:leading-[1.6] font-inter font-normal text-white text-center opacity-90">
                Finding a dormitory near UPLB is a stressful process for many students, especially
                those coming from outside Los Baños. Information is scattered, processes are manual,
                and there is little transparency between tenants and landlords. At the same time,
                landlords and housing authorities struggle to coordinate applications, maintain
                records, and communicate with their tenants efficiently.
              </p>
            </div>
            <div className="h-20" />
          </div>

          <div className="self-stretch bg-white overflow-hidden flex flex-col items-start pt-0 px-0 pb-num-80 relative isolate gap-2.5">
            <div className="w-num-1440 h-[751px] absolute !!m-[0 important] top-[-14px] left-[0px] [filter:blur(10px)] overflow-hidden shrink-0 z-[0]">
              <img
                className="absolute top-[665px] left-[-206.68px] w-[921.8px] h-[627.3px] object-contain opacity-[0.75] shrink-0"
                alt=""
              />
              <img
                className="absolute top-[384.72px] left-[1785.56px] w-[941.5px] h-[715.7px] object-contain opacity-[0.75] shrink-0"
                alt=""
              />
              <img
                className="absolute top-[107.28px] left-[1559.45px] w-[864.6px] h-[480.3px] object-contain opacity-[0.75] shrink-0"
                alt=""
              />
            </div>
            <div className="w-screen h-[1087px] absolute !!m-[0 important] top-[584px] left-[0px] [filter:blur(10px)] overflow-hidden shrink-0 z-[1]">
              <img
                className="absolute top-[665px] left-[-206.68px] w-[921.8px] h-[627.3px] object-contain opacity-[0.75] shrink-0"
                alt=""
              />
            </div>
            <div className="w-screen h-[1034px] flex flex-col items-center justify-center py-[111px] px-[118px] box-border gap-10 z-[2] shrink-0">
              <div className="self-stretch relative leading-[60px] font-extrabold">
                What does ATLAS provide?
              </div>
              <div className="w-[1173px] flex flex-col items-end text-center text-num-36 font-poppins">
                <div className="w-num-1172 h-num-138 relative">
                  <div className="absolute top-[0px] left-[0px] bg-white border-teal-200 border-solid border-b-[1px] box-border w-num-1172 h-num-138" />
                  <div className="absolute top-[46px] left-[28.08px] flex items-center gap-[67px]">
                    <b className="h-num-37 w-num-48_7 relative flex items-center justify-center shrink-0">
                      01
                    </b>
                    <b className="h-num-55 w-num-914 relative text-num-28 flex font-inter text-darkslategray-200 text-left items-center shrink-0">
                      A centralized, reliable source of dormitory information
                    </b>
                    <Icon icon="lucide:plus" className="h-[26px] w-[26px]" />
                  </div>
                </div>
                <div className="w-num-1172 h-num-138 relative">
                  <div className="absolute top-[0px] left-[0px] bg-white border-teal-200 border-solid border-b-[1px] box-border w-num-1172 h-num-138" />
                  <div className="absolute top-[46px] left-[28.08px] flex items-center gap-[67px]">
                    <b className="h-num-37 w-num-48_7 relative flex items-center justify-center shrink-0">
                      02
                    </b>
                    <b className="h-num-55 w-num-914 relative text-num-28 flex font-inter text-darkslategray-200 text-left items-center shrink-0">
                      A streamlined digital application and management system
                    </b>
                    <Icon icon="lucide:plus" className="h-[26px] w-[26px]" />
                  </div>
                </div>
                <div className="w-num-1172 h-num-138 relative">
                  <div className="absolute top-[0px] left-[0px] bg-white border-teal-200 border-solid border-b-[1px] box-border w-num-1172 h-num-138" />
                  <div className="absolute top-[46px] left-[28.08px] flex items-center gap-[67px]">
                    <b className="h-num-37 w-num-48_7 relative flex items-center justify-center shrink-0">
                      03
                    </b>
                    <b className="h-num-55 w-num-914 relative text-num-28 flex font-inter text-darkslategray-200 text-left items-center shrink-0">
                      Improved coordination and communication between tenants and providers
                    </b>
                    <Icon icon="lucide:plus" className="h-[26px] w-[26px]" />
                  </div>
                </div>
                <div className="w-num-1172 h-num-138 relative">
                  <div className="absolute top-[0px] left-[0px] bg-white border-teal-200 border-solid border-b-[1px] box-border w-num-1172 h-num-138" />
                  <div className="absolute top-[46px] left-[28.08px] flex items-center gap-[67px]">
                    <b className="h-num-37 w-num-48_7 relative flex items-center justify-center shrink-0">
                      04
                    </b>
                    <b className="h-num-55 w-num-914 relative text-num-28 flex font-inter text-darkslategray-200 text-left items-center shrink-0">
                      Greater transparency, accessibility, and accountability in dormitory-related
                      processes
                    </b>
                    <Icon icon="lucide:plus" className="h-[26px] w-[26px]" />
                  </div>
                </div>
                <div className="w-num-1172 h-num-138 relative">
                  <div className="absolute top-[0px] left-[0px] bg-white border-teal-200 border-solid border-b-[1px] box-border w-num-1172 h-num-138" />
                  <b className="absolute top-[55px] left-[28.08px] flex items-center justify-center w-num-48_7 h-num-37">
                    05
                  </b>
                  <b className="absolute top-[46px] left-[127px] text-num-28 flex font-inter text-darkslategray-200 text-left items-center w-num-914 h-num-55">
                    Safety and compliance information built into every listing
                  </b>
                  <Icon
                    icon="lucide:plus"
                    className="absolute top-[52px] left-[1123px] w-[26px] h-[26px]"
                  />
                </div>
              </div>
            </div>

            <div className="w-screen flex flex-col items-center py-0 px-[79px] box-border gap-[52px] z-[3] shrink-0 text-[100px] text-darkslategray-200">
              <div className="self-stretch h-[71px] w-screen relative">
                <b className="flex items-center w-screen h-[71px]">FAQs</b>
              </div>
              <div className="w-[1280px] h-[504px] relative text-num-18 text-gray-300 font-lora">
                <div className="absolute h-[13.49%] w-[99.69%] top-[19.05%] right-[0%] bottom-[67.46%] left-[0.31%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] rounded-t-num-10 rounded-b-num-0 bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <img
                    className="absolute h-[22.06%] w-[0.47%] top-[59.83%] right-[4.47%] bottom-[18.11%] left-[95.06%] max-w-full overflow-hidden max-h-full object-contain"
                    alt=""
                  />
                  <b className="absolute h-[48.53%] w-[29.4%] top-[26.47%] left-[4.15%] flex items-center">
                    Who can use atlas as a tenant?
                  </b>
                </div>
                <div className="absolute h-[13.49%] w-[99.69%] top-[32.54%] right-[0%] bottom-[53.97%] left-[0.31%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <img
                    className="absolute h-[22.06%] w-[0.47%] top-[59.83%] right-[4.47%] bottom-[18.11%] left-[95.06%] max-w-full overflow-hidden max-h-full object-contain"
                    alt=""
                  />
                  <b className="absolute h-[48.53%] w-[39.64%] top-[26.47%] left-[4.1%] flex items-center">
                    How do I search for available dormitories?
                  </b>
                </div>
                <div className="absolute h-[13.49%] w-[99.69%] top-[46.03%] right-[0%] bottom-[40.48%] left-[0.31%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <img
                    className="absolute h-[22.06%] w-[0.47%] top-[59.83%] right-[4.47%] bottom-[18.11%] left-[95.06%] max-w-full overflow-hidden max-h-full object-contain"
                    alt=""
                  />
                  <b className="absolute h-[48.53%] w-[44.37%] top-[26.47%] left-[4.1%] flex items-center">
                    Can I apply for a dorm directly through ATLAS?
                  </b>
                </div>
                <div className="absolute h-[13.49%] w-[99.69%] top-[59.52%] right-[0%] bottom-[26.98%] left-[0.31%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <img
                    className="absolute h-[22.06%] w-[0.47%] top-[59.83%] right-[4.47%] bottom-[18.11%] left-[95.06%] max-w-full overflow-hidden max-h-full object-contain"
                    alt=""
                  />
                  <b className="absolute h-[48.53%] w-[44.37%] top-[26.47%] left-[4.1%] flex items-center">
                    Is my personal information safe on ATLAS?
                  </b>
                </div>
                <div className="absolute h-[13.49%] w-[99.69%] top-[73.02%] right-[0%] bottom-[13.49%] left-[0.31%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <img
                    className="absolute h-[22.06%] w-[0.47%] top-[59.83%] right-[4.47%] bottom-[18.11%] left-[95.06%] max-w-full overflow-hidden max-h-full object-contain"
                    alt=""
                  />
                  <b className="absolute h-[48.53%] w-[29.4%] top-[26.47%] left-[4.15%] flex items-center">
                    ...
                  </b>
                </div>
                <div className="absolute h-[13.49%] w-[99.69%] top-[86.51%] right-[0%] bottom-[0%] left-[0.31%]">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] rounded-t-num-0 rounded-b-num-10 bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <img
                    className="absolute h-[22.06%] w-[0.47%] top-[59.83%] right-[4.47%] bottom-[18.11%] left-[95.06%] max-w-full overflow-hidden max-h-full object-contain"
                    alt=""
                  />
                  <b className="absolute h-[48.53%] w-[29.4%] top-[26.47%] left-[4.15%] flex items-center">
                    ...
                  </b>
                </div>
                <div className="absolute h-[16.47%] w-full top-[0%] right-[0%] bottom-[83.53%] left-[0%] text-center text-num-14 font-poppins">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_7px_20px_rgba(0,_0,_0,_0.1)] rounded-num-10 bg-gray-500 border-gray-500 border-solid border-[5px] box-border" />
                  <div className="absolute h-[69.88%] w-[12.57%] top-[18.07%] right-[10.39%] bottom-[12.05%] left-[77.04%]">
                    <b className="absolute h-[48.28%] w-full top-[51.72%] left-[0%] flex items-center justify-center">
                      OTHERS
                    </b>
                    <Icon
                      icon="mynaui:dots-circle"
                      className="absolute h-[51.72%] w-[31.65%] top-[0%] right-[34.99%] bottom-[48.28%] left-[33.37%] max-w-full overflow-hidden max-h-full"
                    />
                  </div>
                  <div className="absolute h-[69.88%] w-[9.3%] top-[18.07%] right-[45.31%] bottom-[12.05%] left-[45.39%]">
                    <b className="absolute h-[48.28%] w-full top-[51.72%] left-[0%] flex items-center justify-center">
                      LANDLORDS
                    </b>
                    <Icon
                      icon="material-symbols:home-outline-rounded"
                      className="absolute h-[51.72%] w-[31.65%] top-[0%] right-[34.99%] bottom-[48.28%] left-[33.37%] max-w-full overflow-hidden max-h-full"
                    />
                  </div>
                  <div className="absolute h-[69.88%] w-[7.41%] top-[18.07%] right-[79.6%] bottom-[12.05%] left-[13%]">
                    <b className="absolute h-[48.28%] w-full top-[51.72%] left-[0%] flex items-center justify-center">
                      TENANTS
                    </b>
                    <Icon
                      icon="ic:baseline-person-pin"
                      className="absolute h-[51.72%] w-[31.65%] top-[0%] right-[34.99%] bottom-[48.28%] left-[33.37%] max-w-full overflow-hidden max-h-full"
                    />
                  </div>
                  <div className="absolute h-[9.64%] w-[33.34%] top-[90.36%] right-[66.66%] bottom-[0%] left-[0%] rounded-[100px] bg-teal-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-screen h-[150px] relative shrink-0 z-[2] text-num-12 text-teal-100 font-poppins bg-[#001D18]">
          <img className="absolute top-[0px] left-[0px] w-screen h-[150px]" alt="" />
          <div className="absolute top-[0px] left-[8.89px] w-[1420.2px] h-[150px] flex items-center justify-center gap-[146px]">
            {/* <img className="w-[218.4px] relative max-h-full object-cover" alt="" src={atlas_text} /> */}
            <div className="w-[127.9px] flex flex-col items-start">
              <b className="self-stretch h-[25.3px] relative text-[16px] flex text-white items-center shrink-0">
                PLATFORM
              </b>
              <div className="self-stretch h-num-28_4 relative flex items-center shrink-0 mt-[-4px]">
                Browse Dorms
              </div>
              <div className="self-stretch h-num-28_4 relative flex items-center shrink-0 mt-[-4px]">
                How it works
              </div>
            </div>
            <div className="flex flex-col items-start">
              <b className="w-[127.9px] h-[25.3px] relative text-[16px] flex text-white items-center shrink-0">
                SUPPORT
              </b>
              <div className="w-[108.9px] h-num-28_4 relative flex items-center shrink-0 mt-[-4px]">
                About
              </div>
              <div className="w-[108.9px] h-num-28_4 relative flex items-center shrink-0 mt-[-4px]">
                Contact us
              </div>
            </div>
            <div className="w-[187.5px] flex flex-col items-start">
              <b className="self-stretch h-[25.3px] relative text-[16px] flex text-white items-center shrink-0">
                LEGAL
              </b>
              <div className="self-stretch h-num-28_4 relative flex items-center shrink-0 mt-[-4px]">
                Privacy Policy
              </div>
              <div className="self-stretch h-num-28_4 relative flex items-center shrink-0 mt-[-4px]">
                Terms of Use
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserLanding;
