import type { FunctionComponent } from 'react';
import StatCard from './StatCard';
import MonthlyIncomeChart from './MonthlyIncomeChart';
import IncomeBreakdown from './IncomeBreakdown';
import type { FacilityOverview, MonthlyIncomeData, IncomeBreakdownData } from '../../../../hooks/useFacilityFinance';

interface OverviewTabProps {
  overview: FacilityOverview | null;
  monthlyIncome: MonthlyIncomeData[];
  incomeBreakdown: IncomeBreakdownData | null;
}

const OverviewTab: FunctionComponent<OverviewTabProps> = ({ overview, monthlyIncome, incomeBreakdown }) => {
  const statCards = [
    { label: 'Income', value: `₱${(overview?.totalIncome ?? 0).toFixed(2)}`, highlight: true },
    {
      label: 'Occupancy',
      value: `${overview?.occupiedUnits ?? 0}/${overview?.totalUnits ?? 0}`,
    },
    {
      label: 'Collection Rate',
      value: `${overview?.collectionRate ?? 0}%`,
    },
    {
      label: 'Occupancy Rate',
      value: `${overview?.occupancyRate ?? 0}%`,
    },
  ];

  if (!overview) {
    return (
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[84px] rounded-[10px] bg-gray-100 animate-pulse" />
          ))}
        </div>
        <div className="w-full h-[280px] rounded-2xl bg-gray-100 animate-pulse" />
        <div className="w-full h-[280px] rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5 text-left text-[18px] text-gray font-inter w-full dark:text-[#d7e0ef]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
      <div className="w-full">
        <MonthlyIncomeChart monthlyIncome={monthlyIncome} />
      </div>
      <div className="w-full">
        <IncomeBreakdown incomeBreakdown={incomeBreakdown} />
      </div>
    </div>
  );
};

export default OverviewTab;
