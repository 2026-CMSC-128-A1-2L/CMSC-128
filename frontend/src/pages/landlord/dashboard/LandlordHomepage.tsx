import { type FunctionComponent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import sapphire1 from "../../../../assets/sapphire1.jpg";
import sapphire2 from "../../../../assets/sapphire2.jpg";
import sapphire3 from "../../../../assets/sapphire3.png";

const STATS = [
  { label: "Monthly Income", value: "Php 138,600", sub: "Feb 2026", subColor: "text-[#666]" },
  { label: "Number of Tenants", value: "28", sub: "2 ongoing lease transfers", subGradient: true },
  { label: "Overdue Rent", value: "1", sub: "Tenant", subColor: "text-[#666]" },
];

const PROPERTIES = [
  { name: "Two Sapphire Place", img: sapphire1, occupied: "18/24", income: "₱89,400.00", balance: "₱12,600.00" },
  { name: "One Sapphire Place", img: sapphire2, occupied: "20/24", income: "₱89,400.00", balance: "₱12,600.00" },
  { name: "Three Sapphire Place", img: sapphire3, occupied: "18/24", income: "₱89,400.00", balance: "₱12,600.00" },
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
  { name: "Haira Espinocilla", action: "paid rent for month of Feb", time: "3d ago" },
  { name: "Riz Doroja", action: "paid rent for month of Feb", time: "1d ago" },
  { name: "Dorm Manager #2", action: "collected payments in One Sapphire", time: "2m ago" },
  { name: "Dorm Manager #1", action: "accepted ocular visits for April 9", time: "1m ago" },
];

const Avatar = ({ className = "h-[40px] w-[40px]" }: { className?: string }) => (
  <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af] ${className}`}>
    <Icon icon="solar:user-bold" className="h-[60%] w-[60%]" aria-hidden="true" />
  </span>
);

const PersonRow = ({ name, email }: { name: string; email: string }) => (
  <div className="flex w-full items-center gap-[10px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[4px]">
    <Avatar />
    <div className="flex flex-col gap-[2px] overflow-hidden">
      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">{name}</b>
      <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">{email}</span>
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
    trackRef.current?.scrollTo({ left: clamped * (CARD_WIDTH + CARD_GAP), behavior: "smooth" });
  };

  return (
    <LandlordLayout activeSidebarItem="dashboard" breadcrumbs={[]}>
      <div className="flex w-full flex-col gap-[48px] pt-[16px] lg:flex-row lg:items-start">

        {/* Main column */}
        <div className="flex flex-1 flex-col gap-[48px] min-w-0">

          {/* Search */}
          <div className="flex w-full items-center gap-[10px] rounded-[12px] bg-[#f0f7ff] px-[24px] py-[10px]">
            <Icon icon="solar:magnifer-bold" className="h-[24px] w-[24px] text-[#666]" aria-hidden="true" />
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">Search</span>
          </div>

          {/* Statistics */}
          <section className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">Statistics</h2>
              <Link to="/landlord/finance" className="flex items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#096c5b] underline transition-opacity hover:opacity-70">
                View More
                <Icon icon="radix-icons:arrow-top-right" className="h-[16px] w-[16px]" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] border border-[#f0f0f0] bg-white p-[12px] text-center">
                  <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">{s.label}</b>
                  <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-[#096c5b]">{s.value}</b>
                  {s.subGradient ? (
                    <span className="font-['Inter',sans-serif] text-[14px] font-medium" style={{ background: "linear-gradient(0deg,#ffc273,#fa7900)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {s.sub}
                    </span>
                  ) : (
                    <span className={`font-['Inter',sans-serif] text-[14px] font-medium ${s.subColor}`}>{s.sub}</span>
                  )}
                </div>
              ))}
              <div className="flex flex-col items-center justify-center gap-[8px] rounded-[16px] bg-[#096c5b] p-[12px] text-center">
                <Icon icon="basil:notification-on-outline" className="h-[48px] w-[48px] text-[#f0f0f0]" aria-hidden="true" />
                <b className="font-['Inter',sans-serif] text-[18px] tracking-[-0.01em] text-[#f0f0f0]">Pay Reminder</b>
                <button className="flex items-center gap-[8px] rounded-full bg-[#f0f0f0] px-[12px] py-[4px] transition-opacity hover:opacity-80">
                  <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#096c5b]">Notify your tenants</span>
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#096c5b]">
                    <Icon icon="heroicons:paper-airplane" className="h-[14px] w-[14px] text-white" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Properties carousel */}
          <section className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <h2 className="font-['Inter',sans-serif] text-[24px] font-bold text-black">Your Current Properties</h2>
                <Link to="/landlord/properties" className="flex items-center gap-[4px] font-['Lora',serif] text-[12px] font-semibold text-[#096c5b] underline transition-opacity hover:opacity-70">
                  View All
                  <Icon icon="radix-icons:arrow-top-right" className="h-[16px] w-[16px]" aria-hidden="true" />
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
                  <Icon icon="solar:arrow-left-bold" className="h-[16px] w-[16px] text-[#2f3136]" />
                </button>
                <button
                  onClick={() => scrollTo(current + 1)}
                  disabled={current === total - 1}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
                  aria-label="Next property"
                >
                  <Icon icon="solar:arrow-right-bold" className="h-[16px] w-[16px] text-[#096c5b]" />
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
                  <img src={p.img} alt={p.name} className="h-[120px] w-full object-cover" />
                  <div className="flex flex-col gap-[8px] p-[12px]">
                    <div className="flex items-center justify-between gap-[8px]">
                      <b className="truncate font-['Inter',sans-serif] text-[16px] tracking-[-0.01em] text-black">{p.name}</b>
                      <span className="flex shrink-0 items-center gap-[4px] rounded-[5px] border border-[#096c5b] px-[8px] py-[2px]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#096c5b]" />
                        <span className="font-['Poppins',sans-serif] text-[12px] text-[#096c5b]">Active</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <Icon icon="solar:home-bold" className="h-[14px] w-[16px] text-[#666]" aria-hidden="true" />
                      <b className="font-['Poppins',sans-serif] text-[14px] tracking-[-0.01em] text-[#666]">{p.occupied}</b>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[6px]">
                        <Icon icon="solar:graph-up-bold" className="h-[14px] w-[16px] text-[#096c5b]" aria-hidden="true" />
                        <b className="font-['Poppins',sans-serif] text-[13px] tracking-[-0.01em]" style={{ background: "linear-gradient(180deg,#5dc2a8 27.88%,#0c8873 84.13%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.income}</b>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <Icon icon="solar:bill-list-bold" className="h-[14px] w-[16px] text-[#c29722]" aria-hidden="true" />
                        <b className="font-['Poppins',sans-serif] text-[13px] tracking-[-0.01em]" style={{ background: "linear-gradient(180deg,#c29722,#f6b709)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.balance}</b>
                      </div>
                      <Link to="/landlord/properties" className="transition-opacity hover:opacity-70">
                        <Icon icon="solar:eye-bold" className="h-[24px] w-[24px] text-[#096c5b]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pending + Visits */}
          <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
            {[
              { title: "Pending Applications", to: "/landlord/tenants/unvalidated", items: PENDING },
              { title: "Scheduled Visits", to: "/landlord/visits", items: VISITS },
            ].map((panel) => (
              <section key={panel.title} className="flex flex-col gap-[12px] rounded-[12px] border border-[#f0f0f0] p-[24px]">
                <Link to={panel.to} className="flex items-center gap-[8px] font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b] transition-opacity hover:opacity-70">
                  {panel.title}
                  <Icon icon="radix-icons:arrow-top-right" className="h-[20px] w-[20px]" aria-hidden="true" />
                </Link>
                <div className="h-[2px] w-full rounded-full bg-[#f0f0f0]" />
                <div className="flex flex-col gap-[12px]">
                  {panel.items.map((item) => <PersonRow key={item.email} {...item} />)}
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
              <b className="font-['Inter',sans-serif] text-[24px] leading-[32px] text-black">Quevin James A. Custodio</b>
              <Icon icon="solar:verified-check-bold" className="h-[24px] w-[24px] shrink-0 text-[#096c5b]" aria-hidden="true" />
            </div>
            <span className="font-['Inter',sans-serif] text-[14px] text-[#666]">qcustodio@gmail.com</span>
          </div>
          <section className="flex flex-col gap-[12px]">
            <b className="font-['Inter',sans-serif] text-[14px] text-black">Activity</b>
            <div className="flex flex-col gap-[12px]">
              {ACTIVITY.map((a) => (
                <div key={a.name + a.time} className="flex items-center gap-[8px] rounded-[8px] border border-[#f0f0f0] px-[12px] py-[10px]">
                  <Avatar className="h-[40px] w-[40px]" />
                  <div className="flex flex-1 flex-col gap-[4px] overflow-hidden">
                    <div className="flex items-center justify-between gap-[4px]">
                      <b className="truncate font-['Inter',sans-serif] text-[14px] text-black">{a.name}</b>
                      <span className="shrink-0 font-['Inter',sans-serif] text-[8px] font-medium text-[#8a9099]">{a.time}</span>
                    </div>
                    <span className="truncate font-['Lora',serif] text-[12px] font-semibold text-[#8a9099]">{a.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

      </div>
    </LandlordLayout>
  );
};

export default LandlordHomepage;