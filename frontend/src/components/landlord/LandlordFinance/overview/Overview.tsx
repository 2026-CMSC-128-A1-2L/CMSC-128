import { FunctionComponent, useState, useEffect } from 'react';
import StatCard from './StatCard';
import MonthlyIncomeChart from './MonthlyIncomeChart';
import IncomeBreakdown from './IncomeBreakdown';
import type { Billing } from '../types/billing';

interface OverviewStats {
  income: number;
  occupancy: { current: number; total: number };
  paymentsCollected: { current: number; total: number };
  outstandingBalance: number;
}

const OverviewTab: FunctionComponent = () => {
  const [stats, setStats] = useState<OverviewStats>({
    income: 0,
    occupancy: { current: 0, total: 0 },
    paymentsCollected: { current: 0, total: 0 },
    outstandingBalance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewStats = async () => {
      setIsLoading(true);
      try {
        const mockBillings: Billing[] = [
          { totalAmount: 4500, paidAmount: 4500, paymentStatus: 'paid' } as Billing,
          { totalAmount: 4850, paidAmount: 1850, paymentStatus: 'partially_paid' } as Billing,
          { totalAmount: 4300, paidAmount: 0, paymentStatus: 'unpaid' } as Billing,
          { totalAmount: 4500, paidAmount: 0, paymentStatus: 'unpaid' } as Billing,
        ];

        const totalIncome = mockBillings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
        const totalOutstanding = mockBillings.reduce(
          (sum, b) => sum + (b.totalAmount - (b.paidAmount || 0)),
          0,
        );
        const paidCount = mockBillings.filter((b) => b.paymentStatus === 'paid').length;

        setStats({
          income: totalIncome,
          occupancy: { current: 28, total: 30 },
          paymentsCollected: { current: paidCount, total: mockBillings.length },
          outstandingBalance: totalOutstanding,
        });
      } catch (error) {
        console.error('Failed to fetch overview stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewStats();
  }, []);

  const statCards = [
    { label: 'Income', value: `₱${stats.income.toFixed(2)}`, highlight: true },
    { label: 'Occupancy', value: `${stats.occupancy.current}/${stats.occupancy.total}` },
    {
      label: 'Payments Collected',
      value: `${stats.paymentsCollected.current}/${stats.paymentsCollected.total}`,
    },
    { label: 'Outstanding Balance', value: `₱${stats.outstandingBalance.toFixed(2)}` },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-start gap-5 text-left text-[18px] text-gray font-inter w-full">
        <div className="w-full h-[84px] bg-gray-100 animate-pulse rounded-[10px]" />
        <div className="w-full h-[280px] bg-gray-100 animate-pulse rounded-2xl" />
        <div className="w-full h-[280px] bg-gray-100 animate-pulse rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5 text-left text-[18px] text-gray font-inter w-full">
      {/* Stat cards row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="w-full">
        <MonthlyIncomeChart />
      </div>
      <div className="w-full">
        <IncomeBreakdown />
      </div>
    </div>
  );
};

export default OverviewTab;
