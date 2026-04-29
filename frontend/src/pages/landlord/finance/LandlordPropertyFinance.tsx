import { type FunctionComponent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LandlordLayout, { type BreadcrumbItem } from '../../../components/landlord/LandlordLayout';
import SideNav from '../../../components/landlord/LandlordFinance/SideNav';
import { Icon } from '@iconify/react';

// Tabs
import OverviewTab from '../../../components/landlord/LandlordFinance/overview/Overview';
import TenantBillingsTab from '../../../components/landlord/LandlordFinance/billings/TenantBillings';

type TabType = 'overview' | 'billings';

interface PropertyInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const LandlordPropertyFinance: FunctionComponent = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [property] = useState<PropertyInfo>({
    id: propertyId || 'facility1',
    name: 'One Sapphire Place',
    address: 'Lot 3, Block 17, Sapphire St, Umali Subd, Los Baños, Philippines, 4030',
    phone: '0969 014 8776',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 150);
  };

  const handleBackToFinance = () => {
    setIsNavigatingBack(true);
    setTimeout(() => {
      navigate('/landlord/finance');
    }, 200);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Finance', to: '/landlord/finance' },
    { label: property.name },
  ];

  return (
    <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
      <div className={`flex flex-col w-full transition-all duration-300 ease-out ${
        isPageLoading && !isNavigatingBack ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } ${isNavigatingBack ? 'opacity-0 translate-y-4' : ''}`}>
        <div className="self-stretch flex flex-col items-start justify-center gap-3 mb-6">
          <div className="self-stretch flex items-center justify-between gap-5">
            <div className="h-8 flex flex-col items-center justify-end">
              <b className="relative text-[24px] leading-8 text-gray font-inter shrink-0">
                Finance
              </b>
            </div>
          </div>
          <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0" />
        </div>

        {/* Property Header */}
        <div className="self-stretch h-[120px] flex flex-col items-start justify-center py-0 px-2 box-border gap-1 text-num-14 text-darkslategray-100 font-lora mb-6">
          <b className="self-stretch relative text-[24px] leading-8 font-inter">
            {property.name}
          </b>
          <div className="self-stretch flex items-center py-0 px-4 gap-2">
            <Icon icon="mdi:map-marker" className="text-lg" aria-hidden="true" />
            <b className="flex-1 relative text-sm">
              {property.address}
            </b>
          </div>
          <div className="self-stretch flex items-center py-0 px-4 gap-2">
            <Icon icon="mdi:phone" className="text-lg" aria-hidden="true" />
            <b className="flex-1 relative text-sm">{property.phone}</b>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={handleBackToFinance}
          className="self-start flex items-center gap-2 mb-4 px-2 py-1 text-teal-200 hover:text-teal-100 transition-colors duration-200"
        >
          <Icon icon="mdi:chevron-left" className="w-5 h-5" />
          <span className="text-sm font-medium">Back to All Properties</span>
        </button>

        {/* Content with SideNav */}
        <div className="flex flex-col lg:flex-row gap-6">
          <SideNav activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="flex-1 overflow-hidden">
            <div
              className={`transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {activeTab === 'overview' ? <OverviewTab /> : <TenantBillingsTab />}
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};

export default LandlordPropertyFinance;