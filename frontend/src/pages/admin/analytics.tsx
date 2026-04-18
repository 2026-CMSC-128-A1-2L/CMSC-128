import NavBarAdmin from '../../components/NavBarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';
import { Icon } from '@iconify/react';

const statsCards = [
  {
    value: '89,935',
    label: 'Total users',
    change: '+1.01% this week',
    changeValue: '10.2',
    iconName: 'solar:users-group-rounded-outline',
    up: true,
  },
  {
    value: '325',
    label: 'Total Listings',
    change: '+1.01% this week',
    changeValue: '10.2',
    iconName: 'fluent-emoji-flat:house',
    up: true,
  },
  {
    value: '$ 34,343',
    label: 'Successful Transactions',
    change: '-0.91% this week',
    changeValue: '2.56',
    iconName: 'solar:wallet-money-outline',
    up: false,
  },
  {
    value: '120',
    label: 'Reports Handled',
    change: '+1.01% this week',
    changeValue: '10.2',
    iconName: 'oui:nav-judgements',
    up: true,
  },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const yLabels = [100, 80, 60, 40, 20, 0];

function Analytics() {
  return (
    <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
      <NavBarAdmin />
      <div className="flex flex-1">
        <SideBarAdmin activeItem="analytics" />
        <div className="flex-1 bg-white px-10 py-8">
          <h1 className="font-['Inter'] text-[48px] font-bold text-black">Analytics</h1>

          {/* Stats Cards */}
          <div className="mt-6 flex gap-6 rounded-xl bg-white p-5 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]">
            {statsCards.map((card) => (
              <div key={card.label} className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-['Outfit'] text-[40px] font-semibold text-black">
                    {card.value}
                  </span>
                  <div className="flex h-15 w-15 items-center justify-center rounded-xl border border-[#d0d0d0] bg-white shadow-[0px_2px_10px_0px_rgba(124,141,181,0.12)]">
                    <Icon icon={card.iconName} className="h-10 w-10 text-black" />
                  </div>
                </div>
                <span className="font-['Outfit'] text-[24px] text-black">{card.label}</span>
                <div className="flex items-center gap-1 text-[#7c8db5]">
                  <Icon
                    icon={
                      card.up ? 'solar:arrow-right-up-outline' : 'solar:arrow-right-down-outline'
                    }
                    className={`h-7.5 w-7.5 ${card.up ? 'text-green-500' : 'text-red-500'}`}
                  />
                  <span className="font-['Outfit'] text-[20px]">{card.changeValue}</span>
                  <span className="font-['Poppins'] text-[16px]">{card.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Line Chart */}
          <div className="mt-8 rounded-xl bg-white p-8 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <h2 className="font-['Outfit'] text-[30px] font-medium text-black">
                Newly Joined Users
              </h2>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#4a90d9]" />
                  <span className="font-['Outfit'] text-[18px] text-black">Landlords</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#60d394]" />
                  <span className="font-['Outfit'] text-[18px] text-black">Tenants</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 shadow-[0px_3px_15px_0px_rgba(124,141,181,0.12)]">
                  <span className="font-['Outfit'] text-[18px] text-black">Monthly</span>
                  <Icon icon="solar:alt-arrow-down-outline" className="h-6 w-6 text-black" />
                </div>
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="mt-9 flex">
              <div className="flex flex-col justify-between pr-4">
                {yLabels.map((label) => (
                  <span
                    key={label}
                    className="font-['Outfit'] text-[18px] text-[#7c8db5] text-right w-9"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="relative h-75 w-full rounded-lg border border-dashed border-[#e0e0e0] bg-[#fafafa]">
                  <p className="absolute inset-0 flex items-center justify-center font-['Outfit'] text-[16px] text-[#7c8db5]">
                    Chart data will be rendered here
                  </p>
                </div>
                <div className="mt-3 flex justify-between px-2">
                  {months.map((m) => (
                    <span key={m} className="font-['Outfit'] text-[18px] text-[#7c8db5]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
