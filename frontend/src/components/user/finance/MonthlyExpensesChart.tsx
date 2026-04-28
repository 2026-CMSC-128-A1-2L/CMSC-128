<<<<<<< HEAD
import { FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';

interface MonthlyData {
  month: string;
  amount: number;
}

const ALL_MONTHS = [
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
  'JAN',
  'FEB',
  'MAR',
];
const ALL_EXPENSES = [4500, 4850, 4300, 4500, 4700, 4900, 5100, 4950, 5200, 5050, 5300, 5450];

type TimeRange = '12' | '6';

const MonthlyExpensesChart: FunctionComponent = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('12');

  const getChartData = () => {
    if (selectedRange === '6') {
      const last6Months = ALL_MONTHS.slice(-6);
      const last6Expenses = ALL_EXPENSES.slice(-6);
      return { months: last6Months, expenses: last6Expenses };
    }
    return { months: ALL_MONTHS, expenses: ALL_EXPENSES };
  };

  const { months, expenses } = getChartData();
  const maxExpense = Math.max(...expenses, 1);
  const heights = expenses.map((e) => (e / maxExpense) * 100);

  const toggleRange = () => {
    setSelectedRange(selectedRange === '12' ? '6' : '12');
  };

  return (
    <div className="w-full h-[280px] rounded-[16px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center justify-center py-6 px-4 relative gap-2.5">
      {/* Header with Toggle Button */}
      <div className="w-full flex items-center justify-center gap-3 z-10">
        <b className="h-6 flex-1 text-[18px] tracking-[-0.01em] flex items-center">
          Monthly Expenses
        </b>
        <button
          onClick={toggleRange}
          className="rounded-lg bg-darkslategray-200 hover:bg-teal-200 transition-colors flex items-center justify-center p-2 cursor-pointer w-[100px]"
        >
          <span className="text-[10px] font-semibold text-white whitespace-nowrap">
            {selectedRange === '12' ? '12 Months' : '6 Months'}
          </span>
        </button>
      </div>

      {/* Chart */}
      <div className="w-full flex flex-col items-start gap-2.5">
        <div className="w-full h-40 rounded-[10px] bg-white flex flex-col items-center pt-[26px] pb-[11px] px-3 box-border gap-1.5">
          <div className="w-full h-[108px] flex items-end justify-around">
            {months.map((month, i) => (
              <div
                key={month}
                className="rounded-[5px] transition-all duration-300"
                style={{
                  width: selectedRange === '6' ? 'clamp(25px, 12%, 45px)' : 'clamp(20px, 7%, 35px)',
                  height: `${heights[i]}%`,
                  backgroundColor: i === months.length - 1 ? '#024338' : '#096c5b',
                }}
              />
            ))}
          </div>
          <div className="w-full flex justify-around">
            {months.map((month) => (
              <div key={month} className="tracking-[0.04em] font-semibold text-[8px] text-black">
                {month}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-start justify-between text-left text-[12px] text-silver">
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
=======
import { type FunctionComponent, useState } from 'react';

{/*
  interface MonthlyData {
  month: string;
  amount: number;
}
*/}

const ALL_MONTHS = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];
const ALL_EXPENSES = [4500, 4850, 4300, 4500, 4700, 4900, 5100, 4950, 5200, 5050, 5300, 5450];

type TimeRange = '12' | '6';

const MonthlyExpensesChart: FunctionComponent = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('12');

  const getChartData = () => {
    if (selectedRange === '6') {
      const last6Months = ALL_MONTHS.slice(-6);
      const last6Expenses = ALL_EXPENSES.slice(-6);
      return { months: last6Months, expenses: last6Expenses };
    }
    return { months: ALL_MONTHS, expenses: ALL_EXPENSES };
  };

  const { months, expenses } = getChartData();
  const maxExpense = Math.max(...expenses, 1);
  const heights = expenses.map(e => (e / maxExpense) * 100);

  const toggleRange = () => {
    setSelectedRange(selectedRange === '12' ? '6' : '12');
  };

  return (
    <div className="w-full h-[280px] rounded-[16px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center justify-center py-6 px-4 relative gap-2.5">
      {/* Header with Toggle Button */}
      <div className="w-full flex items-center justify-center gap-3 z-10">
        <b className="h-6 flex-1 text-[18px] tracking-[-0.01em] flex items-center">Monthly Expenses</b>
        <button
          onClick={toggleRange}
          className="rounded-lg bg-darkslategray-200 hover:bg-teal-200 transition-colors flex items-center justify-center p-2 cursor-pointer w-[100px]"
        >
          <span className="text-[10px] font-semibold text-white whitespace-nowrap">
            {selectedRange === '12' ? '12 Months' : '6 Months'}
          </span>
        </button>
      </div>

      {/* Chart */}
      <div className="w-full flex flex-col items-start gap-2.5">
        <div className="w-full h-40 rounded-[10px] bg-white flex flex-col items-center pt-[26px] pb-[11px] px-3 box-border gap-1.5">
          <div className="w-full h-[108px] flex items-end justify-around">
            {months.map((month, i) => (
              <div
                key={month}
                className="rounded-[5px] transition-all duration-300"
                style={{
                  width: selectedRange === '6' ? 'clamp(25px, 12%, 45px)' : 'clamp(20px, 7%, 35px)',
                  height: `${heights[i]}%`,
                  backgroundColor: i === months.length - 1 ? '#024338' : '#096c5b'
                }}
              />
            ))}
          </div>
          <div className="w-full flex justify-around">
            {months.map((month) => (
              <div key={month} className="tracking-[0.04em] font-semibold text-[8px] text-black">
                {month}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-start justify-between text-left text-[12px] text-silver">
          <div className="flex items-end gap-1">
            <div className="h-[15px] w-[15px] rounded-[5px]" style={{ backgroundColor: '#096c5b' }} />
            <div className="h-4 tracking-[0.02em] font-semibold flex items-center">Past Months</div>
          </div>
          <div className="flex items-end gap-1">
            <div className="h-[15px] w-[15px] rounded-[5px]" style={{ backgroundColor: '#024338' }} />
            <div className="h-4 tracking-[0.02em] font-semibold flex items-center">Current Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
