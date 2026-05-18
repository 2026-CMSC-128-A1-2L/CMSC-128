import { type FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandlordLayout, { type BreadcrumbItem } from '../../../components/landlord/LandlordLayout';
import StatCard from '../../../components/landlord/LandlordFinance/overview/StatCard';
import PropertyIncomeChart from '../../../components/landlord/LandlordFinance/overview/PropertyIncomeChart';
import IncomeTrendChart from '../../../components/landlord/LandlordFinance/overview/IncomeTrendChart';
import PropertyCard from '../../../components/landlord/LandlordFinance/overview/PropertyCard';
import { Icon } from '@iconify/react';
import { useLandlordFinance } from '../../../hooks/useLandlordFinance';
import { SkeletonBlock } from '../../../components/general/Skeleton';

const LandlordFinance: FunctionComponent = () => {
  const navigate = useNavigate();
  const { dashboard, isLoading, error, refetch } = useLandlordFinance();
  const [clickedPropertyId, setClickedPropertyId] = useState<string | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Finance', to: '/landlord/finance' }];

  const handlePropertyClick = (propertyId: string) => {
    setClickedPropertyId(propertyId);
    setTimeout(() => {
      navigate(`/landlord/finance/property/${propertyId}`);
    }, 200);
  };

  const handleAddProperty = () => {
    navigate('/landlord/add-building');
  };

  const statCards = dashboard
    ? [
        { label: 'Total Income', value: `₱${dashboard.totalIncome.toFixed(2)}`, highlight: true },
        { label: 'Total Buildings', value: dashboard.facilityCards.length.toString() },
        { label: 'Occupancy Rate', value: `${dashboard.occupancyRate}%` },
        { label: 'Outstanding Balance', value: `₱${dashboard.totalOutstanding.toFixed(2)}` },
        { label: 'Collection Rate', value: `${dashboard.collectionRate}%` },
      ]
    : [];

  const layout = (content: React.ReactNode) => (
    <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
      <div className="flex flex-col w-full">{content}</div>
    </LandlordLayout>
  );

  if (isLoading) {
    return layout(
      <>
        {/* Header skeleton */}
        <div className="self-stretch flex flex-col items-start justify-center gap-3 mb-6">
          <SkeletonBlock className="h-8 w-32" />
          <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 dark:bg-[#242626]" />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[15px] mb-6">
          {['income', 'buildings', 'occupancy', 'balance', 'collection'].map((key) => (
            <div
              key={key}
              className="rounded-[10px] border border-[#f0f0f0] bg-white p-4 dark:border-[#303331] dark:bg-[#141515]"
            >
              <SkeletonBlock className="mb-3 h-4 w-24" />
              <SkeletonBlock className="h-7 w-32" />
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SkeletonBlock className="h-[280px] rounded-2xl" />
          <SkeletonBlock className="h-[280px] rounded-2xl" />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {['property-a', 'property-b', 'property-c'].map((key) => (
            <SkeletonBlock key={key} className="h-[260px] rounded-[25px]" />
          ))}
        </div>
      </>,
    );
  }

  if (error) {
    return layout(
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-crimson font-semibold">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-xl bg-lightcyan-100 text-teal font-semibold hover:opacity-90 cursor-pointer"
        >
          Retry
        </button>
      </div>,
    );
  }

  return layout(
    <>
      {/* Header */}
      <div className="self-stretch flex flex-col items-start justify-center gap-3 mb-6">
        <div className="self-stretch flex items-center justify-between gap-5">
          <div className="h-8 flex flex-col items-center justify-end">
            <b className="relative text-[24px] leading-8 text-gray font-inter shrink-0 dark:text-[#edf6f4]">Finance</b>
          </div>
        </div>
        <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 dark:bg-[#242626]" />
      </div>

      {/* Stats Cards Row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[15px] mb-6">
        {statCards.map((card) => (
          <div key={card.label} className="transition-all duration-300 hover:translate-y-[-2px]">
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <PropertyIncomeChart
            properties={(dashboard?.facilityCards ?? []).map((c) => ({
              name: c.name,
              income: c.income,
            }))}
          />
        </div>
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <IncomeTrendChart incomeStatistics={dashboard?.incomeStatistics ?? []} />
        </div>
      </div>

      {/* Properties Section */}
      <div className="w-full mt-4">
        <div className="self-stretch flex items-center justify-start py-0 px-3 mb-4">
          <b className="h-[42px] relative tracking-[-0.01em] flex items-center text-[18px] text-black font-inter dark:text-[#edf6f4]">
            Your Properties
          </b>
        </div>
        <div className="w-full flex flex-wrap items-start gap-4">
          {(dashboard?.facilityCards ?? []).map((property) => (
            <div
              key={property.id}
              className={`transition-all duration-300 hover:translate-y-[-4px] ${
                clickedPropertyId === property.id ? 'animate-pulse-scale' : ''
              } cursor-pointer`}
            >
              <PropertyCard
                id={property.id}
                name={property.name}
                imageUrl={property.thumbnail ?? undefined}
                totalUnits={property.units}
                occupiedUnits={property.totalOccupied}
                income={property.income}
                outstanding={property.outstanding}
                status="active"
                onClick={() => handlePropertyClick(property.id)}
              />
            </div>
          ))}
          {/* Add Property Card */}
          <div className="transition-all duration-300 hover:translate-y-[-4px]">
            <div
              onClick={handleAddProperty}
              className="h-[360px] w-[348px] flex flex-col items-center justify-center rounded-[25px] bg-white border-silver border-dashed border-2 cursor-pointer hover:bg-gray-50 transition-colors dark:bg-[#121313] dark:border-[#303331] dark:hover:bg-[#181a19]"
            >
              <div className="flex flex-col items-center gap-3">
                <Icon icon="mdi:plus" className="w-12 h-12 text-gray-400 dark:text-[#72cbb8]" />
                <b className="text-[18px] tracking-[-0.01em] text-gray dark:text-[#d7e0ef]">Add New Property</b>
                <div className="text-[14px] font-medium text-silver text-center max-w-[220px] dark:text-[#a4acba]">
                  Register a dorm, boarding house, etc.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
  );
};

export default LandlordFinance;
