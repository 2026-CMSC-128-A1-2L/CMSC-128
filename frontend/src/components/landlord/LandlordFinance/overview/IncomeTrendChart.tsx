import { type FunctionComponent, useState } from 'react';

const MONTH_LABELS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

interface IncomeStatistic {
  facilityId: string;
  year: number;
  month: number;
  monthlyIncome: number;
  outstanding: number;
}

interface IncomeTrendChartProps {
  incomeStatistics: IncomeStatistic[];
}

const IncomeTrendChart: FunctionComponent<IncomeTrendChartProps> = ({ incomeStatistics }) => {
  const [selectedRange, setSelectedRange] = useState<'12' | '6'>('12');

  // Aggregate across all facilities by month
  const byMonth = new Map<string, number>();
  incomeStatistics.forEach(({ year, month, monthlyIncome }) => {
    const key = `${year}-${month}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + monthlyIncome);
  });

  const allData = Array.from(byMonth.entries())
    .map(([key, income]) => {
      const [year, month] = key.split('-').map(Number);
      return { month: MONTH_LABELS[month - 1], year, monthIndex: month, income };
    })
    .sort((a, b) => a.year !== b.year ? a.year - b.year : a.monthIndex - b.monthIndex);

  const displayData = selectedRange === '6' ? allData.slice(-6) : allData.slice(-12);
  const maxIncome = Math.max(...displayData.map((d) => d.income), 1);
  const hasData = displayData.length > 0;

  return (
    <div className="w-full rounded-2xl bg-white border-whitesmoke-200 border-solid border flex flex-col">
      <div className="self-stretch flex items-center justify-between py-4 px-6">
        <b className="h-6 relative tracking-[-0.01em] flex items-center text-[18px] text-gray font-inter">
          Income Trend
        </b>
        <button
          onClick={() => setSelectedRange((r) => (r === '12' ? '6' : '12'))}
          className="w-[100px] rounded-lg bg-darkslategray-200 hover:bg-teal-200 transition-colors flex items-center justify-center py-2 cursor-pointer"
        >
          <span className="tracking-[0.04em] font-semibold text-[10px] text-white whitespace-nowrap">
            {selectedRange === '12' ? '12 Months' : '6 Months'}
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center px-4 pb-4">
        <div className="w-full h-40 rounded-[10px] bg-white flex flex-col items-center pt-6 pb-3">
          {hasData ? (
            <>
              <div className="w-full h-[108px] flex items-end justify-between gap-1">
                {displayData.map((data, i) => (
                  <div
                    key={`${data.month}-${data.year}`}
                    className="flex-1 rounded-[5px] transition-all duration-500 ease-in-out"
                    style={{
                      height: `${(data.income / maxIncome) * 108}px`,
                      backgroundColor: i === displayData.length - 1 ? '#024338' : '#096c5b',
                      minWidth: '20px',
                    }}
                  />
                ))}
              </div>
              <div className="w-full flex justify-between mt-2">
                {displayData.map((data) => (
                  <div key={`${data.month}-${data.year}`} className="flex-1 text-center text-[8px] font-semibold text-black">
                    {data.month}
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

        <div className="self-stretch flex items-center justify-between py-0 px-3 mt-2">
          <div className="flex items-end gap-1">
            <div className="h-[15px] w-[15px] rounded-[5px]" style={{ backgroundColor: '#096c5b' }} />
            <div className="text-[12px] font-semibold text-darkslategray-100">Past Months</div>
          </div>
          <div className="flex items-end gap-1">
            <div className="h-[15px] w-[15px] rounded-[5px]" style={{ backgroundColor: '#024338' }} />
            <div className="text-[12px] font-semibold text-darkslategray-100">Current Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTrendChart;