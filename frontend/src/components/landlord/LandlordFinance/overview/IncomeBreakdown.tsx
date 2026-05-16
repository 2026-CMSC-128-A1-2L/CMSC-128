import type { FunctionComponent } from 'react';
import ProgressRow from './ProgressBar';
import type { IncomeBreakdownData } from '../../../../hooks/useFacilityFinance';

interface IncomeBreakdownProps {
  incomeBreakdown: IncomeBreakdownData | null;
}

const IncomeBreakdown: FunctionComponent<IncomeBreakdownProps> = ({ incomeBreakdown }) => {
  const breakdown = incomeBreakdown ?? {
    rent: { amount: 0, percentage: 0 },
    utilities: { amount: 0, percentage: 0 },
    misc: { amount: 0, percentage: 0 },
    total: 0,
  };

  const breakdownCards = [
    { amount: `₱ ${breakdown.rent.amount.toFixed(2)}`, label: 'Rent' },
    { amount: `₱ ${breakdown.utilities.amount.toFixed(2)}`, label: 'Utilities' },
    { amount: `₱ ${breakdown.misc.amount.toFixed(2)}`, label: 'Misc. Fees' },
  ];

  const legendItems = [
    { color: 'bg-darkslategray-200', textColor: 'text-darkslategray-200', label: `Rent - ${breakdown.rent.percentage.toFixed(0)}%` },
    { color: 'bg-teal-200', textColor: 'text-teal-200', label: `Utilities - ${breakdown.utilities.percentage.toFixed(0)}%` },
    { color: 'bg-teal-100', textColor: 'text-teal-100', label: `Misc. - ${breakdown.misc.percentage.toFixed(0)}%` },
  ];

  const donutGradient = `conic-gradient(
    from 0deg,
    #024338 0deg ${breakdown.rent.percentage * 3.6}deg,
    #096c5b ${breakdown.rent.percentage * 3.6}deg ${(breakdown.rent.percentage + breakdown.utilities.percentage) * 3.6}deg,
    #2f8677 ${(breakdown.rent.percentage + breakdown.utilities.percentage) * 3.6}deg 360deg
  )`;

  return (
    <div className="w-full rounded-2xl bg-white border-whitesmoke-200 border-solid border flex flex-col items-start py-6 px-4 sm:px-6 md:px-9 gap-[19px] dark:bg-[#101111] dark:border-[#343737]">
      <div className="flex items-center justify-center p-2 box-border">
        <b className="relative tracking-[-0.01em] shrink-0 text-[16px] sm:text-[18px] text-gray font-inter dark:text-[#edf6f4]">
          Income Breakdown
        </b>
      </div>

      <div className="self-stretch flex flex-wrap lg:flex-nowrap items-start gap-6 lg:gap-3 text-[14px] text-teal-200">
        {/* Donut + legend */}
        <div className="flex items-center gap-[42px] shrink-0">
          <div className="relative h-[150px] w-[150px] rounded-full shrink-0">
            <div className="absolute inset-0 rounded-full" style={{ background: donutGradient }} />
            <div className="absolute inset-[20px] rounded-full bg-white dark:bg-[#101111]" />
          </div>
          <div className="flex flex-col gap-2">
            {legendItems.map(({ color, textColor, label }) => (
              <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                <div className={`h-[15px] w-[15px] rounded-[5px] ${color}`} />
                <span className={`font-medium ${textColor} text-[12px] sm:text-[14px]`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown cards + rate bars */}
        <div className="flex-1 min-w-0 flex flex-col items-start gap-[23px] text-[18px] text-darkslategray-200 dark:text-[#72cbb8]">
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            {breakdownCards.map(({ amount, label }) => (
              <div
                key={label}
                className="flex-1 min-w-[100px] h-[49px] rounded-[10px] bg-white border-whitesmoke-200 border-solid border flex flex-col items-start py-2 px-2.5 dark:bg-[#121313] dark:border-[#343737]"
              >
                <b className="w-full h-[22px] relative tracking-[-0.01em] flex items-center shrink-0 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                  {amount}
                </b>
                <div className="self-stretch h-[11px] relative text-[8px] tracking-[0.04em] font-semibold font-lora text-silver flex items-center shrink-0 dark:text-[#a4acba]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {incomeBreakdown && (
            <div className="self-stretch flex flex-col items-start gap-5 text-[12px] text-teal-200 font-lora">
              <ProgressRow
                label="Rent Share"
                value={`${breakdown.rent.percentage.toFixed(0)}%`}
                percent={breakdown.rent.percentage}
              />
              <ProgressRow
                label="Utilities Share"
                value={`${breakdown.utilities.percentage.toFixed(0)}%`}
                percent={breakdown.utilities.percentage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeBreakdown;
