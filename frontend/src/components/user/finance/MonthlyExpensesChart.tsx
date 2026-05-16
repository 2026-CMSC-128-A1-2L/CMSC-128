// frontend/src/components/user/finance/MonthlyExpensesChart.tsx
import { type FunctionComponent, useState } from 'react';
import { useTheme } from '../../../pages/utilities/DarkMode';
import type { MonthlyStatistic } from '../../../hooks/useFinance';

const MONTH_LABELS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

type TimeRange = '12' | '6';

interface MonthlyExpensesChartProps {
  monthlyStats?: MonthlyStatistic[];
}

const MonthlyExpensesChart: FunctionComponent<MonthlyExpensesChartProps> = ({
  monthlyStats = [],
}) => {
  const { isDark } = useTheme();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('12');

  const getChartData = () => {
    const slice = selectedRange === '6' ? monthlyStats.slice(-6) : monthlyStats.slice(-12);

    if (slice.length === 0) {
      return { months: [], expenses: [] };
    }

    return {
      months: slice.map((s) => MONTH_LABELS[s.month - 1]),
      expenses: slice.map((s) => s.monthlyExpense),
    };
  };

  const { months, expenses } = getChartData();
  const maxExpense = Math.max(...expenses, 1);
  const heights = expenses.map((e) => (e / maxExpense) * 100);

  return (
    <div className="w-full h-[280px] rounded-[16px] bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center py-6 px-4 relative gap-2.5 dark:bg-[#101111] dark:border-[#303331] dark:text-[#72cbb8]">
      {/* Header with Toggle */}
      <div className="w-full flex items-center justify-center gap-3 z-10">
        <b className="h-6 flex-1 text-[18px] tracking-[-0.01em] flex items-center">
          Monthly Expenses
        </b>
        <button
          onClick={() => setSelectedRange((r) => (r === '12' ? '6' : '12'))}
          className="rounded-lg bg-darkslategray-200 hover:bg-teal-200 transition-colors flex items-center justify-center p-2 cursor-pointer w-[100px] dark:bg-[#0d3a32] dark:hover:bg-[#164e43]"
        >
          <span className="text-[10px] font-semibold text-white whitespace-nowrap">
            {selectedRange === '12' ? '12 Months' : '6 Months'}
          </span>
        </button>
      </div>

      {/* Chart body */}
      <div className="w-full flex flex-col items-start gap-2.5">
        <div className="w-full h-40 rounded-[10px] bg-white flex flex-col items-center pt-[26px] pb-[11px] px-3 box-border gap-1.5 dark:bg-[#101111]">
          {months.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-dimgray text-sm">
              No expense data yet
            </div>
          ) : (
            <>
              <div className="w-full h-[108px] flex items-end justify-around">
                {months.map((month, i) => (
                  <div
                    key={`${month}-${i}`}
                    className="rounded-[5px] transition-all duration-300"
                    style={{
                      width:
                        selectedRange === '6' ? 'clamp(25px, 12%, 45px)' : 'clamp(20px, 7%, 35px)',
                      height: `${heights[i]}%`,
                      backgroundColor: isDark
                        ? i === months.length - 1
                          ? '#0f5a4d'
                          : '#2d806d'
                        : i === months.length - 1
                          ? '#024338'
                          : '#096c5b',
                    }}
                  />
                ))}
              </div>
              <div className="w-full flex justify-around">
                {months.map((month, i) => (
                  <div
                    key={`label-${month}-${i}`}
                    className="tracking-[0.04em] font-semibold text-[8px] text-black dark:text-[#edf6f4]"
                  >
                    {month}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-full flex items-start justify-between text-left text-[12px] text-silver dark:text-[#a4acba]">
          <div className="flex items-end gap-1">
            <div
              className="h-[15px] w-[15px] rounded-[5px]"
              style={{ backgroundColor: '#096c5b' }}
            />
            <div className="h-4 tracking-[0.02em] font-semibold flex items-center">Past Months</div>
          </div>
          <div className="flex items-end gap-1">
            <div
              className="h-[15px] w-[15px] rounded-[5px]"
              style={{ backgroundColor: '#024338' }}
            />
            <div className="h-4 tracking-[0.02em] font-semibold flex items-center">
              Current Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;
