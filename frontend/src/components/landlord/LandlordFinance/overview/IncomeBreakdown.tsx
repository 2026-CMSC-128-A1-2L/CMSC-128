import { FunctionComponent, useState, useEffect } from 'react';
import ProgressRow from './ProgressBar';
import type { Billing } from '../types/billing';

interface BreakdownData {
  rent: { amount: number; percentage: number };
  utilities: { amount: number; percentage: number };
  misc: { amount: number; percentage: number };
  total: number;
  collectionRate: number;
  occupancyRate: number;
}

const IncomeBreakdown: FunctionComponent = () => {
  const [breakdown, setBreakdown] = useState<BreakdownData>({
    rent: { amount: 0, percentage: 0 },
    utilities: { amount: 0, percentage: 0 },
    misc: { amount: 0, percentage: 0 },
    total: 0,
    collectionRate: 0,
    occupancyRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBreakdownData = async () => {
      setIsLoading(true);
      try {
        const mockBillings: Billing[] = [
          {
            breakdown: [
              { name: 'Rent', amount: 3000 },
              { name: 'Utilities', amount: 1500 },
              { name: 'Misc. Fees', amount: 0 },
            ],
            paidAmount: 4500,
            totalAmount: 4500,
          } as Billing,
          {
            breakdown: [
              { name: 'Rent', amount: 3000 },
              { name: 'Utilities', amount: 1700 },
              { name: 'Misc. Fees', amount: 150 },
            ],
            paidAmount: 1850,
            totalAmount: 4850,
          } as Billing,
          {
            breakdown: [
              { name: 'Rent', amount: 3000 },
              { name: 'Utilities', amount: 1300 },
              { name: 'Misc. Fees', amount: 0 },
            ],
            paidAmount: 0,
            totalAmount: 4300,
          } as Billing,
          {
            breakdown: [
              { name: 'Rent', amount: 3000 },
              { name: 'Utilities', amount: 1450 },
              { name: 'Misc. Fees', amount: 50 },
            ],
            paidAmount: 0,
            totalAmount: 4500,
          } as Billing,
        ];

        let totalRent = 0;
        let totalUtilities = 0;
        let totalMisc = 0;
        let totalPaid = 0;
        let totalAmount = 0;

        mockBillings.forEach((billing) => {
          const rent = billing.breakdown.find((b) => b.name === 'Rent')?.amount || 0;
          const utilities = billing.breakdown.find((b) => b.name === 'Utilities')?.amount || 0;
          const misc = billing.breakdown.find((b) => b.name === 'Misc. Fees')?.amount || 0;

          totalRent += rent;
          totalUtilities += utilities;
          totalMisc += misc;
          totalPaid += billing.paidAmount || 0;
          totalAmount += billing.totalAmount;
        });

        const total = totalRent + totalUtilities + totalMisc;
        const collectionRate = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;
        const occupancyRate = 93.33;

        setBreakdown({
          rent: { amount: totalRent, percentage: (totalRent / total) * 100 },
          utilities: { amount: totalUtilities, percentage: (totalUtilities / total) * 100 },
          misc: { amount: totalMisc, percentage: (totalMisc / total) * 100 },
          total,
          collectionRate,
          occupancyRate,
        });
      } catch (error) {
        console.error('Failed to fetch breakdown data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreakdownData();
  }, []);

  const breakdownCards = [
    { amount: `₱ ${breakdown.rent.amount.toFixed(2)}`, label: 'Rent' },
    { amount: `₱ ${breakdown.utilities.amount.toFixed(2)}`, label: 'Utilities' },
    { amount: `₱ ${breakdown.misc.amount.toFixed(2)}`, label: 'Misc. Fees' },
  ];

  const legendItems = [
    {
      color: 'bg-darkslategray-200',
      textColor: 'text-darkslategray-200',
      label: `Rent - ${breakdown.rent.percentage.toFixed(0)}%`,
    },
    {
      color: 'bg-teal-200',
      textColor: 'text-teal-200',
      label: `Utilities - ${breakdown.utilities.percentage.toFixed(0)}%`,
    },
    {
      color: 'bg-teal-100',
      textColor: 'text-teal-100',
      label: `Misc. - ${breakdown.misc.percentage.toFixed(0)}%`,
    },
  ];

  const donutGradient = `conic-gradient(
    from 0deg,
    #024338 0deg ${breakdown.rent.percentage * 3.6}deg,
    #096c5b ${breakdown.rent.percentage * 3.6}deg ${(breakdown.rent.percentage + breakdown.utilities.percentage) * 3.6}deg,
    #2f8677 ${(breakdown.rent.percentage + breakdown.utilities.percentage) * 3.6}deg 360deg
  )`;

  if (isLoading) {
    return (
      <div className="w-full max-w-[848px] h-[280px] rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start py-6 px-9 gap-[19px]">
        <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[848px] rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start py-6 px-4 sm:px-6 md:px-9 gap-[19px]">
      <div className="flex items-center justify-center p-2 box-border">
        <b className="relative tracking-[-0.01em] shrink-0 text-[16px] sm:text-[18px] text-gray font-inter">
          Income Breakdown
        </b>
      </div>

      <div className="self-stretch flex flex-wrap lg:flex-nowrap items-start gap-6 lg:gap-3 text-[14px] text-teal-200">
        {/* Donut + legend - fixed width */}
        <div className="flex items-center gap-[42px] shrink-0">
          <div className="relative h-[150px] w-[150px] rounded-full shrink-0">
            <div className="absolute inset-0 rounded-full" style={{ background: donutGradient }} />
            <div className="absolute inset-[20px] rounded-full bg-white" />
          </div>
          <div className="flex flex-col gap-2">
            {legendItems.map(({ color, textColor, label }) => (
              <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                <div className={`h-[15px] w-[15px] rounded-[5px] ${color}`} />
                <span className={`font-medium ${textColor} text-[12px] sm:text-[14px]`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown cards + rate bars - takes remaining space */}
        <div className="flex-1 min-w-0 flex flex-col items-start gap-[23px] text-[18px] text-darkslategray-200">
          {/* Breakdown cards - fixed width, no wrap */}
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            {breakdownCards.map(({ amount, label }) => (
              <div
                key={label}
                className="flex-1 min-w-[100px] h-[49px] rounded-[10px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start py-2 px-2.5"
              >
                <b className="w-full h-[22px] relative tracking-[-0.01em] flex items-center shrink-0 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                  {amount}
                </b>
                <div className="self-stretch h-[11px] relative text-[8px] tracking-[0.04em] font-semibold font-lora text-silver flex items-center shrink-0">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="self-stretch flex flex-col items-start gap-5 text-[12px] text-teal-200 font-lora">
            <ProgressRow
              label="Collection Rate"
              value={`${breakdown.collectionRate.toFixed(2)}%`}
              percent={breakdown.collectionRate}
            />
            <ProgressRow
              label="Occupancy Rate"
              value={`${breakdown.occupancyRate.toFixed(2)}%`}
              percent={breakdown.occupancyRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeBreakdown;
