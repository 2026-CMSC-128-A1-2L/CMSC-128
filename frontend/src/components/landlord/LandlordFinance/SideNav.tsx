import type { FunctionComponent } from 'react';

type TabType = 'overview' | 'billings';

interface SideNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; width: string }[] = [
  { id: 'overview', label: 'Overview', width: 'w-[78px]' },
  { id: 'billings', label: 'Tenant Billings', width: 'w-[123px]' },
];

const SideNav: FunctionComponent<SideNavProps> = ({ activeTab, onTabChange }) => (
  <div className="w-full lg:w-[200px] rounded-[10px] bg-white border-whitesmoke-200 border-solid border box-border flex flex-row lg:flex-col items-center text-center text-[16px] overflow-x-auto lg:overflow-x-visible self-start">
    {tabs.map(({ id, label, width }, i) => (
      <div
        key={id}
        className={`w-full h-16 flex items-center justify-center py-5 px-4 cursor-pointer transition-all duration-200 ${
          i === 0 ? 'rounded-t-[10px]' : ''
        } ${
          activeTab === id
            ? 'border-l-8 lg:border-l-8 border-b-0 lg:border-b-0 border-darkslategray-200 border-solid text-darkslategray-200 bg-gray-50'
            : 'text-darkslategray-100 hover:bg-gray-50'
        }`}
        onClick={() => onTabChange(id)}
      >
        <div
          className={`h-[23px] ${width} relative font-medium flex items-center justify-center shrink-0 transition-transform duration-200 ${
            activeTab === id ? 'scale-105' : 'scale-100'
          }`}
        >
          {label}
        </div>
      </div>
    ))}
  </div>
);

export default SideNav;
