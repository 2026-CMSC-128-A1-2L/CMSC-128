import { type FunctionComponent, useState } from 'react';
import type { MonthlyIncomeData } from '../../../../hooks/useFacilityFinance';

type TimeRange = '12' | '6';

interface MonthlyIncomeChartProps {
  monthlyIncome: MonthlyIncomeData[];
}

const MonthlyIncomeChart: FunctionComponent<MonthlyIncomeChartProps> = ({ monthlyIncome }) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('12');

  const displayData =
    selectedRange === '6' ? monthlyIncome.slice(-6) : monthlyIncome.slice(-12);

  const months = displayData.map((d) => d.month);
  const maxIncome = Math.max(...displayData.map((d) => d.totalIncome), 1);
  const heights = displayData.map((d) => (d.totalIncome / maxIncome) * 100);
  const hasData = displayData.length > 0;

  return (
    <div className="w-full max-w-[848px] rounded-2xl bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center py-6 px-4 gap-2.5">
      {/* Header */}
      <div className="self-stretch flex flex-col sm:flex-row items-center justify-center gap-3">
        <b className="h-6 flex-1 relative tracking-[-0.01em] flex items-center text-[16px] sm:text-[18px] text-gray font-inter">
          Monthly Income
        </b>
        <button
          onClick={() => setSelectedRange((r) => (r === '12' ? '6' : '12'))}
          className="w-[100px] rounded-lg bg-darkslategray-200 hover:bg-teal-200 transition-colors flex items-center justify-center p-2 cursor-pointer"
        >
          <span className="tracking-[0.04em] font-semibold text-[10px] text-white whitespace-nowrap">
            {selectedRange === '12' ? '12 Months' : '6 Months'}
          </span>
        </button>
      </div>

      {/* Chart */}
      <div className="self-stretch flex flex-col items-start gap-2.5 text-center text-[8px] text-black font-lora">
        <div className="self-stretch h-40 rounded-[10px] bg-white flex flex-col items-center pt-[26px] pb-[11px] px-3 box-border gap-1.5">
          {hasData ? (
            <>
              <div className="w-full h-[108px] flex items-end justify-around">
                {months.map((m, i) => (
                  <div
                    key={`${m}-${i}`}
                    className="rounded-[5px] transition-all duration-300"
                    style={{
                      width: selectedRange === '6' ? 'clamp(25px, 14%, 45px)' : 'clamp(20px, 7%, 35px)',
                      height: `${heights[i]}%`,
                      backgroundColor: i === months.length - 1 ? '#024338' : '#096c5b',
                    }}
                  />
                ))}
              </div>
              <div className="w-full flex justify-around">
                {months.map((m, i) => (
                  <div key={`label-${m}-${i}`} className="tracking-[0.04em] font-semibold text-[8px] text-black">
                    {m}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-dimgray text-sm">
              No income data yet
            </div>
          )}
        </div>

        <div className="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between py-0 px-3 gap-2">
          <div className="flex items-end gap-1">
            <div className="h-[15px] w-[15px] rounded-[5px]" style={{ backgroundColor: '#096c5b' }} />
            <div className="h-4 tracking-[0.02em] font-semibold flex items-center text-[10px] sm:text-[12px] text-darkslategray-100">
              Past Months
            </div>
          </div>
          <div className="flex items-end gap-1">
            <div className="h-[15px] w-[15px] rounded-[5px]" style={{ backgroundColor: '#024338' }} />
            <div className="h-4 tracking-[0.02em] font-semibold flex items-center text-[10px] sm:text-[12px] text-darkslategray-100">
              Current Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncomeChart;