<<<<<<< HEAD
import { FunctionComponent, useCallback } from 'react';
import SideBar from '../../../components/landlord/SideBarLandlord';
import Footer from '../../../components/general/Footer';
import { Icon } from '@iconify/react';
import send from '../../../../assets/send.svg';
import DefaultAvatar from '../../../../assets/default_avatar.svg';
import VerifiedBadge from '../../../../assets/verified_badge.svg';
import search from '../../../../assets/search.svg';
import left from '../../../../assets/leftArrow.svg';
import right from '../../../../assets/rightArrow.svg';
import house from '../../../../assets/House.svg';
import balance from '../../../../assets/outstandingBalance.svg';
import income from '../../../../assets/incomeIcon.svg';
import view from '../../../../assets/View More.svg';
import help from '../../../../assets/helpChatIcon.svg';
import sapphire1 from '../../../../assets/sapphire1.jpg';
import sapphire2 from '../../../../assets/sapphire2.jpg';
import sapphire3 from '../../../../assets/sapphire3.png';
=======
import { type FunctionComponent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import sapphire1 from "../../../../assets/sapphire1.jpg";
import sapphire2 from "../../../../assets/sapphire2.jpg";
import sapphire3 from "../../../../assets/sapphire3.png";
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833

import TutorialBubble from "../dashboard/LandlordHomepageTutorials";
import TutorialIcon from "../../../../assets/help-chat.svg";
const STATS = [
  {
    label: "Monthly Income",
    value: "Php 138,600",
    sub: "Feb 2026",
    subColor: "text-[#666]",
  },
  {
    label: "Number of Tenants",
    value: "28",
    sub: "2 ongoing lease transfers",
    subGradient: true,
  },
  { label: "Overdue Rent", value: "1", sub: "Tenant", subColor: "text-[#666]" },
];

const PROPERTIES = [
  {
    name: "Two Sapphire Place",
    img: sapphire1,
    occupied: "18/24",
    income: "₱89,400.00",
    balance: "₱12,600.00",
  },
  {
    name: "One Sapphire Place",
    img: sapphire2,
    occupied: "20/24",
    income: "₱89,400.00",
    balance: "₱12,600.00",
  },
  {
    name: "Three Sapphire Place",
    img: sapphire3,
    occupied: "18/24",
    income: "₱89,400.00",
    balance: "₱12,600.00",
  },
];

const PENDING = [
  { name: "Daphne Dayne", email: "dcanape@up.edu.ph" },
  { name: "Nathaniel Cunanan", email: "ncunanan@up.edu.ph" },
  { name: "Lance Chrysler De Jesus", email: "lvdejesus1@up.edu.ph" },
];

const VISITS = [
  { name: "Daphne Dayne", email: "dcanape@up.edu.ph" },
  { name: "Nathaniel Cunanan", email: "ncunanan@up.edu.ph" },
];

const ACTIVITY = [
  {
    name: "Haira Espinocilla",
    action: "paid rent for month of Feb",
    time: "3d ago",
  },
  { name: "Riz Doroja", action: "paid rent for month of Feb", time: "1d ago" },
  {
    name: "Dorm Manager #2",
    action: "collected payments in One Sapphire",
    time: "2m ago",
  },
  {
    name: "Dorm Manager #1",
    action: "accepted ocular visits for April 9",
    time: "1m ago",
  },
];

const Avatar = ({
  className = "h-[40px] w-[40px]",
}: {
  className?: string;
}) => (
  <span
    className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af] ${className}`}
  >
    <Icon
      icon="solar:user-bold"
      className="h-[60%] w-[60%]"
      aria-hidden="true"
    />
  </span>
);

const PersonRow = ({ name, email }: { name: string; email: string }) => (
  <div className="flex w-full items-center gap-[10px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[4px]">
    <Avatar />
    <div className="flex flex-col gap-[2px] overflow-hidden">
      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">
        {name}
      </b>
      <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">
        {email}
      </span>
    </div>
  </div>
);

const CARD_WIDTH = 280;
const CARD_GAP = 16;

const LandlordHomepage: FunctionComponent = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = PROPERTIES.length;

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    setCurrent(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  };

  const [showHelp, setShowHelp] = useState(false);

  return (
    <LandlordLayout activeSidebarItem="dashboard" breadcrumbs={[]}>
      <div className="flex w-full flex-col gap-[48px] pt-[16px] lg:flex-row lg:items-start">
        {/* Main column */}
        <div className="flex flex-1 flex-col gap-[48px] min-w-0">
          {/* Search */}
          <div className="flex w-full items-center gap-[10px] rounded-[12px] bg-[#f0f7ff] px-[24px] py-[10px]">
            <Icon
              icon="solar:magnifer-bold"
              className="h-[24px] w-[24px] text-[#666]"
              aria-hidden="true"
            />
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
              Search
            </span>
          </div>

          {/* Statistics */}
          <section className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">
                Statistics
              </h2>
              <Link
                to="/landlord/finance"
                className="flex items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#096c5b] underline transition-opacity hover:opacity-70"
              >
                View More
                <Icon
                  icon="radix-icons:arrow-top-right"
                  className="h-[16px] w-[16px]"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] border border-[#f0f0f0] bg-white p-[12px] text-center"
                >
                  <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">
                    {s.label}
                  </b>
                  <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#096c5b]">
                    {s.value}
                  </b>
                  {s.subGradient ? (
                    <span
                      className="font-['Inter',sans-serif] text-[14px] font-medium"
                      style={{
                        background: "linear-gradient(0deg,#ffc273,#fa7900)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.sub}
                    </span>
                  ) : (
                    <span
                      className={`font-['Inter',sans-serif] text-[14px] font-medium ${s.subColor}`}
                    >
                      {s.sub}
                    </span>
                  )}
                </div>
              ))}
              <div className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] bg-[#096c5b] p-[12px] text-center">
                <Icon
                  icon="basil:notification-on-outline"
                  className="h-[48px] w-[48px] text-[#f0f0f0]"
                  aria-hidden="true"
                />
                <b className="font-['Inter',sans-serif] text-[18px] tracking-[-0.01em] text-[#f0f0f0]">
                  Pay Reminder
                </b>
                <button className="flex items-center gap-[8px] rounded-full bg-[#f0f0f0] px-[12px] py-[4px] transition-opacity hover:opacity-80">
                  <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#096c5b]">
                    Notify your tenants
                  </span>
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#096c5b]">
                    <Icon
                      icon="heroicons:paper-airplane"
                      className="h-[14px] w-[14px] text-white"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
              <TutorialBubble
                show={showHelp}
                onClose={() => setShowHelp(false)}
              />
            </div>
          </section>

          {/* Properties carousel */}
          <section className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">
                  Your Current Properties
                </h2>
                <Link
                  to="/landlord/properties"
                  className="flex items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#096c5b] underline transition-opacity hover:opacity-70"
                >
                  View All
                  <Icon
                    icon="radix-icons:arrow-top-right"
                    className="h-[16px] w-[16px]"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              {/* Arrows */}
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={() => scrollTo(current - 1)}
                  disabled={current === 0}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
                  aria-label="Previous property"
                >
                  <Icon
                    icon="solar:arrow-left-bold"
                    className="h-[16px] w-[16px] text-[#2f3136]"
                  />
                </button>
                <button
                  onClick={() => scrollTo(current + 1)}
                  disabled={current === total - 1}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
                  aria-label="Next property"
                >
                  <Icon
                    icon="solar:arrow-right-bold"
                    className="h-[16px] w-[16px] text-[#096c5b]"
                  />
                </button>
              </div>
            </div>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              className="flex gap-[16px] overflow-x-auto scroll-smooth pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {PROPERTIES.map((p) => (
                <div
                  key={p.name}
                  className="flex shrink-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.15)]"
                  style={{ width: CARD_WIDTH }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-[120px] w-full object-cover"
                  />
                  <div className="flex flex-col gap-[8px] p-[12px]">
                    <div className="flex items-center justify-between gap-[8px]">
                      <b className="truncate font-['Inter',sans-serif] text-[16px] tracking-[-0.01em] text-black">
                        {p.name}
                      </b>
                      <span className="flex shrink-0 items-center gap-[4px] rounded-[5px] border border-[#096c5b] px-[8px] py-[2px]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#096c5b]" />
                        <span className="font-['Poppins',sans-serif] text-[12px] text-[#096c5b]">
                          Active
                        </span>
                      </span>
                    </div>
<<<<<<< HEAD
                  </div>
                  <div className="self-stretch h-[908px] flex flex-col items-start py-0 pl-0 pr-num-32 box-border gap-4 text-center text-num-24 text-black">
                    <div className="self-stretch flex flex-col items-start py-2.5 px-0 gap-12">
                      <div className="self-stretch overflow-hidden flex flex-col items-start gap-8">
                        <div className="self-stretch flex items-center gap-6">
                          <b className="relative leading-8">Statistics</b>
                          <div className="flex items-center gap-1 text-num-12 text-teal-200 font-lora">
                            <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                              View More
                            </div>
                            <Icon
                              icon="radix-icons:arrow-top-right"
                              className="w-4 relative max-h-full"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="self-stretch overflow-hidden flex items-center justify-between gap-[-1.3px] text-num-14 text-dimgray">
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-2">
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative">Monthly Income</b>
                              <b className="relative text-num-24 leading-8 text-teal-200">
                                Php 138,600
                              </b>
                            </div>
                            <div className="relative leading-6 font-medium">Feb 2026</div>
                          </div>
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-2">
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative">Number of Tenants</b>
                              <b className="relative text-num-24 leading-8 text-teal-200">28</b>
                            </div>
                            <div className="relative leading-6 font-medium text-transparent !bg-clip-text [background:linear-gradient(0deg,_#ffc273,_#fa7900)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                              2 ongoing lease transfers
                            </div>
                          </div>
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-2">
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative">Overdue Rent</b>
                              <b className="relative text-num-24 leading-8 text-teal-200">1</b>
                            </div>
                            <div className="relative leading-6 font-medium">Tenant</div>
                          </div>
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-darkslategray border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-1 text-num-18 text-whitesmoke">
                            <Icon
                              icon="basil:notification-on-outline"
                              className="w-12 h-12 relative"
                            />
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative tracking-num--0_01">Pay Reminder</b>
                              <div className="rounded-num-100 bg-whitesmoke flex items-center justify-center py-num-4 px-num-12 gap-2.5 text-num-12 text-teal-200">
                                <div className="relative font-medium">Notify your tenants</div>
                                <div className="h-6 w-6 rounded-num-100 bg-teal-200 overflow-hidden shrink-0 flex flex-col items-center justify-center">
                                  <img
                                    className="w-[14.1px] h-[12.2px] relative"
                                    alt=""
                                    src={send}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch overflow-hidden flex flex-col items-start gap-2">
                        <div className="self-stretch flex items-center gap-6">
                          <b className="relative leading-8">Your Current Properties</b>
                          <div className="flex items-center justify-center gap-1 text-num-12 text-teal-200 font-lora">
                            <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                              View All
                            </div>
                            <img className="w-4 relative max-h-full" alt="" />
                          </div>
                        </div>
                        <div className="self-stretch flex items-center justify-end gap-6">
                          <img className="h-6 w-6 relative object-contain" alt="" src={left} />
                          <div className="rounded-num-100 bg-lightcyan overflow-hidden flex items-center py-[7px] px-[9px]">
                            <img className="h-[10.6px] w-1.5 relative" alt="" src={right} />
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-16 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center p-4 gap-6 text-left text-num-14 font-poppins">
                          <div className="h-num-220 w-num-280 overflow-hidden shrink-0 flex flex-col items-start">
                            <div className="w-num-280 h-num-220 relative">
                              <div className="absolute top-[0px] left-[0px] w-[264px] h-52">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)]">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white" />
                                  <img
                                    className="absolute h-[56.35%] w-full top-[0%] right-[0%] bottom-[43.65%] left-[0%] rounded-t-num-10 rounded-b-num-0 max-w-full overflow-hidden max-h-full object-cover"
                                    alt=""
                                    src={sapphire1}
                                  />
                                </div>
                                <div className="absolute top-[128px] left-[5px] w-[253px] h-[67px] flex flex-col items-start justify-center gap-2">
                                  <div className="self-stretch flex items-center justify-between gap-[11px] shrink-0 text-num-18 font-inter">
                                    <b className="relative tracking-num--0_01">
                                      Two Sapphire Place
                                    </b>
                                    <div className="h-5 w-[72px] relative text-center text-num-12 text-teal-100 font-poppins">
                                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] border-teal-100 border-solid border-[1px] box-border" />
                                      <div className="absolute h-[65%] w-[61.11%] top-[20%] left-[27.78%] flex items-center justify-center">
                                        Active
                                      </div>
                                      <div className="absolute h-1/4 w-[6.94%] top-[40%] right-[81.94%] bottom-[35%] left-[11.11%] rounded-[50%] bg-teal-100" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-dimgray">
                                    <img className="h-3.5 w-4 relative" alt="" src={house} />
                                    <b className="h-[13px] w-[51px] relative tracking-num--0_01 flex items-center shrink-0">
                                      18/24
                                    </b>
                                  </div>
                                  <div className="self-stretch flex items-center justify-center gap-4 shrink-0">
                                    <div className="flex items-end gap-2">
                                      <img className="h-3.5 w-4 relative" alt="" src={income} />
                                      <b className="h-num-12_8 w-[75.1px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱89400.00
                                      </b>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img className="h-4 w-4 relative" alt="" src={balance} />
                                      <b className="h-num-12_8 w-[73.2px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱12600.00
                                      </b>
                                    </div>
                                    <img className="h-6 w-6 relative" alt="" src={view} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-num-220 w-num-280 overflow-hidden shrink-0 flex flex-col items-start">
                            <div className="w-num-280 h-num-220 relative">
                              <div className="absolute top-[0px] left-[0px] w-[264px] h-52">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)]">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white" />
                                  <img
                                    className="absolute h-[56.35%] w-full top-[0%] right-[0%] bottom-[43.65%] left-[0%] rounded-t-num-10 rounded-b-num-0 max-w-full overflow-hidden max-h-full object-cover"
                                    alt=""
                                    src={sapphire2}
                                  />
                                </div>
                                <div className="absolute top-[128px] left-[5px] w-[253px] h-[67px] flex flex-col items-start justify-center gap-2">
                                  <div className="self-stretch flex items-center justify-between gap-3 shrink-0 text-num-18 font-inter">
                                    <b className="relative tracking-num--0_01">
                                      One Sapphire Place
                                    </b>
                                    <div className="h-5 w-[72px] relative text-center text-num-12 text-teal-100 font-poppins">
                                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] border-teal-100 border-solid border-[1px] box-border" />
                                      <div className="absolute h-[65%] w-[61.11%] top-[20%] left-[27.78%] flex items-center justify-center">
                                        Active
                                      </div>
                                      <div className="absolute h-1/4 w-[6.94%] top-[40%] right-[81.94%] bottom-[35%] left-[11.11%] rounded-[50%] bg-teal-100" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-dimgray">
                                    <img className="h-3.5 w-4 relative" alt="" src={house} />
                                    <b className="h-[13px] w-[51px] relative tracking-num--0_01 flex items-center shrink-0">
                                      20/24
                                    </b>
                                  </div>
                                  <div className="self-stretch flex items-center justify-center gap-4 shrink-0">
                                    <div className="flex items-end gap-2">
                                      <img className="h-3.5 w-4 relative" alt="" src={income} />
                                      <b className="h-num-12_8 w-[75.1px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱89400.00
                                      </b>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img className="h-4 w-4 relative" alt="" src={balance} />
                                      <b className="h-num-12_8 w-[73.2px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱12600.00
                                      </b>
                                    </div>
                                    <img className="h-6 w-6 relative" alt="" src={view} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-num-220 w-num-280 overflow-hidden shrink-0 flex flex-col items-start">
                            <div className="w-num-280 h-num-220 relative">
                              <div className="absolute top-[0px] left-[0px] w-[264px] h-52">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)]">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white" />
                                  <img
                                    className="absolute h-[56.35%] w-full top-[0%] right-[0%] bottom-[43.65%] left-[0%] rounded-t-num-10 rounded-b-num-0 max-w-full overflow-hidden max-h-full object-cover"
                                    alt=""
                                    src={sapphire3}
                                  />
                                </div>
                                <div className="absolute top-[128px] left-[5px] w-[253px] h-[67px] flex flex-col items-start justify-center gap-2">
                                  <div className="self-stretch flex items-center gap-4 shrink-0 text-num-18 font-inter">
                                    <b className="relative tracking-num--0_01 shrink-0">
                                      Three Sapphire Place
                                    </b>
                                    <div className="h-5 w-[72px] relative shrink-0 text-center text-num-12 text-teal-100 font-poppins">
                                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] border-teal-100 border-solid border-[1px] box-border" />
                                      <div className="absolute h-[65%] w-[61.11%] top-[20%] left-[27.78%] flex items-center justify-center">
                                        Active
                                      </div>
                                      <div className="absolute h-1/4 w-[6.94%] top-[40%] right-[81.94%] bottom-[35%] left-[11.11%] rounded-[50%] bg-teal-100" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-dimgray">
                                    <img className="h-3.5 w-4 relative" alt="" src={house} />
                                    <b className="h-[13px] w-[51px] relative tracking-num--0_01 flex items-center shrink-0">
                                      18/24
                                    </b>
                                  </div>
                                  <div className="self-stretch flex items-center justify-center gap-4 shrink-0">
                                    <div className="flex items-end gap-2">
                                      <img className="h-3.5 w-4 relative" alt="" src={income} />
                                      <b className="h-num-12_8 w-[75.1px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱89400.00
                                      </b>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img className="h-4 w-4 relative" alt="" src={balance} />
                                      <b className="h-num-12_8 w-[73.2px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱12600.00
                                      </b>
                                    </div>
                                    <img className="h-6 w-6 relative" alt="" src={view} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[704px] flex items-start gap-8 text-left text-num-18 text-teal-200">
                      <div className="h-[274px] flex-1 rounded-xl border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-center pt-num-24 px-0 pb-num-32 gap-2.5">
                        <div className="self-stretch overflow-hidden flex items-center py-0 px-num-24 gap-2">
                          <b className="relative tracking-num--0_01">Pending Applications</b>
                          <Icon
                            icon="radix-icons:arrow-top-right"
                            className="w-5 relative max-h-full"
                            alt=""
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start py-0 px-num-24">
                          <div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke overflow-hidden shrink-0 flex flex-col items-start pt-2.5 px-2.5 pb-0 box-border" />
                        </div>
                        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-num-24 gap-3 text-num-14 text-black">
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5 shrink-0">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Daphne Dayne</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                dcanape@up.edu.ph
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5 shrink-0">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Nathaniel Cunanan</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                ncunanan@up.edu.ph
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5 shrink-0">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Lance Chrysler De Jesus</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                lvdejesus1@up.edu.ph
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-[274px] flex-1 rounded-xl border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-center pt-num-24 px-0 pb-num-32 gap-2.5">
                        <div
                          className="self-stretch overflow-hidden flex items-center py-0 px-num-24 gap-2 cursor-pointer"
                          onClick={onHeaderContainerClick}
                        >
                          <b className="relative tracking-num--0_01">Scheduled Visits</b>
                          <Icon
                            icon="radix-icons:arrow-top-right"
                            className="w-5 relative max-h-full"
                            alt=""
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start py-0 px-num-24">
                          <div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke overflow-hidden shrink-0 flex flex-col items-start pt-2.5 px-2.5 pb-0 box-border" />
                        </div>
                        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-num-24 gap-3 text-num-14 text-black">
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Daphne Dayne</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                dcanape@up.edu.ph
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Nathaniel Cunanan</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                ncunanan@up.edu.ph
                              </div>
                            </div>
                          </div>
                        </div>
=======
                    <div className="flex items-center gap-[6px]">
                      <Icon
                        icon="solar:home-bold"
                        className="h-[14px] w-[16px] text-[#666]"
                        aria-hidden="true"
                      />
                      <b className="font-['Poppins',sans-serif] text-[14px] tracking-[-0.01em] text-[#666]">
                        {p.occupied}
                      </b>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[6px]">
                        <Icon
                          icon="solar:graph-up-bold"
                          className="h-[14px] w-[16px] text-[#096c5b]"
                          aria-hidden="true"
                        />
                        <b
                          className="font-['Poppins',sans-serif] text-[13px] tracking-[-0.01em]"
                          style={{
                            background:
                              "linear-gradient(180deg,#5dc2a8 27.88%,#0c8873 84.13%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {p.income}
                        </b>
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <Icon
                          icon="solar:bill-list-bold"
                          className="h-[14px] w-[16px] text-[#c29722]"
                          aria-hidden="true"
                        />
                        <b
                          className="font-['Poppins',sans-serif] text-[13px] tracking-[-0.01em]"
                          style={{
                            background:
                              "linear-gradient(180deg,#c29722,#f6b709)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {p.balance}
                        </b>
                      </div>
                      <Link
                        to="/landlord/properties"
                        className="transition-opacity hover:opacity-70"
                      >
                        <Icon
                          icon="solar:eye-bold"
                          className="h-[24px] w-[24px] text-[#096c5b]"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="self-stretch w-[300px] overflow-hidden shrink-0 flex flex-col items-center text-num-24 text-black">
                  <div className="w-[300px] h-[924px] flex flex-col items-start pt-16 pb-[30px] pl-5 pr-num-32 box-border">
                    <div className="self-stretch flex-1 flex flex-col items-start gap-8">
                      <div className="self-stretch overflow-hidden flex flex-col items-center p-2.5 shrink-0">
                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-center">
                          <img
                            className="w-[74px] relative max-h-full object-cover"
                            alt=""
                            src={DefaultAvatar}
                          />
                        </div>
                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-center gap-1">
                          <div className="flex items-center justify-center gap-1 shrink-0">
                            <b className="self-stretch w-[196px] relative leading-8 flex items-center shrink-0 max-w-[196px]">
                              Quevin James A. Custodio
                            </b>
                            <div className="self-stretch overflow-hidden flex items-end p-[3px]">
                              <img className="h-6 w-6 relative" alt="" src={VerifiedBadge} />
                            </div>
                          </div>
                          <b className="w-[203px] relative text-num-14 flex text-dimgray items-center shrink-0">
                            qcustodio@gmail.com
                          </b>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start gap-3 shrink-0 text-num-14">
                        <b className="self-stretch relative">Activity</b>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Haira Espinocilla</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                3d ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              paid rent for month of Feb
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Riz Doroja</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                1d ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              paid rent for month of Feb
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Dorm Manager #2</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                2m ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              collected payments in One Sapphire
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Dorm Manager #1</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                1m ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              accepted ocular visits for April 9
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-[185px] overflow-hidden shrink-0 flex flex-col items-center p-2.5 box-border" />
                    </div>
                  </div>
=======
              ))}
            </div>
          </section>

          {/* Pending + Visits */}
          <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
            {[
              {
                title: "Pending Applications",
                to: "/landlord/tenants/unvalidated",
                items: PENDING,
              },
              {
                title: "Scheduled Visits",
                to: "/landlord/visits",
                items: VISITS,
              },
            ].map((panel) => (
              <section
                key={panel.title}
                className="flex flex-col gap-[12px] rounded-[12px] border border-[#f0f0f0] p-[24px]"
              >
                <Link
                  to={panel.to}
                  className="flex items-center gap-[8px] font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b] transition-opacity hover:opacity-70"
                >
                  {panel.title}
                  <Icon
                    icon="radix-icons:arrow-top-right"
                    className="h-[20px] w-[20px]"
                    aria-hidden="true"
                  />
                </Link>
                <div className="h-[2px] w-full rounded-full bg-[#f0f0f0]" />
                <div className="flex flex-col gap-[12px]">
                  {panel.items.map((item) => (
                    <PersonRow key={item.email} {...item} />
                  ))}
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="flex w-full flex-col gap-[32px] lg:w-[280px] lg:shrink-0">
          <div className="flex flex-col gap-[8px]">
            <Avatar className="h-[74px] w-[74px]" />
            <div className="flex items-center gap-[6px]">
              <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">
                Quevin James A. Custodio
              </b>
              <Icon
                icon="solar:verified-check-bold"
                className="h-[24px] w-[24px] shrink-0 text-[#096c5b]"
                aria-hidden="true"
              />
            </div>
            <span className="font-['Inter',sans-serif] text-[14px] text-[#666]">
              qcustodio@gmail.com
            </span>
          </div>
          <section className="flex flex-col gap-[12px]">
            <b className="font-['Inter',sans-serif] text-[14px] text-black">
              Activity
            </b>
            <div className="flex flex-col gap-[12px]">
              {ACTIVITY.map((a) => (
                <div
                  key={a.name + a.time}
                  className="flex items-center gap-[8px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[10px]"
                >
                  <Avatar className="h-[40px] w-[40px]" />
                  <div className="flex flex-1 flex-col gap-[4px] overflow-hidden">
                    <div className="flex items-center justify-between gap-[4px]">
                      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">
                        {a.name}
                      </b>
                      <span className="shrink-0 font-['Inter',sans-serif] text-[8px] font-medium text-[#8a9099]">
                        {a.time}
                      </span>
                    </div>
                    <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">
                      {a.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
      {/* ======= FLOATING ICON ========== */}
      <div
        className="fixed bottom-10 right-10 z-1000 cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img
          src={TutorialIcon}
          alt="Help"
          className="w-16 h-16 drop-shadow-lg"
        />
      </div>
    </LandlordLayout>
  );
};

export default LandlordHomepage;
