import { type FunctionComponent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LandlordLayout, { type BreadcrumbItem } from '../../../components/landlord/LandlordLayout';
import StatCard from '../../../components/landlord/LandlordFinance/overview/StatCard';
import PropertyIncomeChart from '../../../components/landlord/LandlordFinance/overview/PropertyIncomeChart';
import IncomeTrendChart from '../../../components/landlord/LandlordFinance/overview/IncomeTrendChart';
import PropertyCard from '../../../components/landlord/LandlordFinance/overview/PropertyCard';
import { Icon } from '@iconify/react';


interface PropertyStats {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
  totalUnits: number;
  occupiedUnits: number;
  income: number;
  outstanding: number;
  status: 'active' | 'inactive';
}

interface OverviewStats {
  totalIncome: number;
  totalBuildings: number;
  occupancyRate: number;
  outstandingBalance: number;
  collectionRate: number;
}

const LandlordFinance: FunctionComponent = () => {
  const navigate = useNavigate();
  const _location = useLocation();
  const [stats, setStats] = useState<OverviewStats>({
    totalIncome: 0,
    totalBuildings: 0,
    occupancyRate: 0,
    outstandingBalance: 0,
    collectionRate: 0,
  });
  const [properties, setProperties] = useState<PropertyStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedPropertyId, setClickedPropertyId] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const mockStats: OverviewStats = {
          totalIncome: 163600.00,
          totalBuildings: 3,
          occupancyRate: 82,
          outstandingBalance: 23400.00,
          collectionRate: 94,
        };

        const mockProperties: PropertyStats[] = [
          {
            id: 'facility1',
            name: 'One Sapphire Place',
            address: 'Lot 3, Block 17, Sapphire St, Umali Subd, Los Baños, Philippines, 4030',
            // No imageUrl - will use placeholder
            totalUnits: 24,
            occupiedUnits: 24,
            income: 89400.00,
            outstanding: 12600.00,
            status: 'active',
          },
          {
            id: 'facility2',
            name: 'Two Emerald Avenue',
            address: 'Lot 5, Block 12, Emerald Ave, Los Baños, Philippines, 4030',
            // No imageUrl - will use placeholder
            totalUnits: 21,
            occupiedUnits: 18,
            income: 73200.00,
            outstanding: 9300.00,
            status: 'active',
          },
          {
            id: 'facility3',
            name: 'Three Ruby Road',
            address: 'Lot 8, Block 5, Ruby Road, Los Baños, Philippines, 4030',
            // No imageUrl - will use placeholder
            totalUnits: 16,
            occupiedUnits: 12,
            income: 42340.00,
            outstanding: 0.00,
            status: 'active',
          },
        ];

        setStats(mockStats);
        setProperties(mockProperties);
      } catch (error) {
        console.error('Failed to fetch finance data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Finance', to: '/landlord/finance' },
  ];

  const statCards = [
    { label: 'Total Income', value: `₱${stats.totalIncome.toFixed(2)}`, highlight: true },
    { label: 'Total Buildings', value: stats.totalBuildings.toString() },
    { label: 'Occupancy Rate', value: `${stats.occupancyRate}%` },
    { label: 'Outstanding Balance', value: `₱${stats.outstandingBalance.toFixed(2)}` },
    { label: 'Collection Rate', value: `${stats.collectionRate}%` },
  ];

  const handlePropertyClick = (propertyId: string) => {
    setClickedPropertyId(propertyId);
    setTimeout(() => {
      navigate(`/landlord/finance/property/${propertyId}`);
    }, 200);
  };

  const handleAddProperty = () => {
    navigate('/landlord/properties/new');
  };

  if (isLoading) {
    return (
      <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
        <div className="flex flex-col gap-6">
          <div className="w-full h-[84px] bg-gray-100 animate-pulse rounded-[10px]" />
          <div className="w-full h-[280px] bg-gray-100 animate-pulse rounded-2xl" />
          <div className="w-full h-[280px] bg-gray-100 animate-pulse rounded-2xl" />
          <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-2xl" />
        </div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
      <div className={`flex flex-col w-full transition-all duration-300 ease-out ${
        isPageLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        {/* Header */}
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

        {/* Stats Cards Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[15px] mb-6">
          {statCards.map((card, index) => (
            <div key={card.label} className="transition-all duration-300 hover:translate-y-[-2px]" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...card} />
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="transition-all duration-300 hover:translate-y-[-2px]">
            <PropertyIncomeChart properties={properties} />
          </div>
          <div className="transition-all duration-300 hover:translate-y-[-2px]">
            <IncomeTrendChart />
          </div>
        </div>

        {/* Properties Section */}
        <div className="w-full mt-4">
          <div className="self-stretch flex items-center justify-start py-0 px-3 mb-4">
            <b className="h-[42px] relative tracking-[-0.01em] flex items-center text-[18px] text-black font-inter">
              Your Properties
            </b>
          </div>
          <div className="w-full flex flex-wrap items-start gap-4">
            {properties.map((property, index) => (
              <div 
                key={property.id} 
                className={`transition-all duration-300 hover:translate-y-[-4px] ${
                  clickedPropertyId === property.id ? 'animate-pulse-scale' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard 
                  {...property} 
                  onClick={() => handlePropertyClick(property.id)} 
                />
              </div>
            ))}
            {/* Add Property Card */}
            <div className="transition-all duration-300 hover:translate-y-[-4px]">
              <div
                onClick={handleAddProperty}
                className="h-[360px] w-[348px] flex flex-col items-center justify-center rounded-[25px] bg-white border-silver border-dashed border-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center gap-3">
                    <Icon icon="mdi:plus" className="w-12 h-12 text-gray-400" />
                  <b className="text-[18px] tracking-[-0.01em] text-gray">Add New Property</b>
                  <div className="text-[14px] font-medium text-silver text-center max-w-[220px]">
                    Register a dorm, boarding house, etc.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};

export default LandlordFinance;