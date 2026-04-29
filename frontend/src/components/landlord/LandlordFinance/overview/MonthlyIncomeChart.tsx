import { type FunctionComponent, useState, useEffect } from 'react';

interface MonthlyData {
  month: string;
  monthIndex: number;
  year: number;
  totalIncome: number;
}

{
  /*interface MonthToShow {
  monthIndex: number;
  year: number;
}


const _ALL_MONTHS = [
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

*/
}

type TimeRange = '12' | '6';

const MonthlyIncomeChart: FunctionComponent = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('12');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMonthlyIncome = async () => {
    setIsLoading(true);
    try {
      const completeData: MonthlyData[] = [
        { month: 'APR', monthIndex: 3, year: 2025, totalIncome: 60000 },
        { month: 'MAY', monthIndex: 4, year: 2025, totalIncome: 72500 },
        { month: 'JUN', monthIndex: 5, year: 2025, totalIncome: 66667 },
        { month: 'JUL', monthIndex: 6, year: 2025, totalIncome: 80833 },
        { month: 'AUG', monthIndex: 7, year: 2025, totalIncome: 74167 },
        { month: 'SEP', monthIndex: 8, year: 2025, totalIncome: 64167 },
        { month: 'OCT', monthIndex: 9, year: 2025, totalIncome: 80833 },
        { month: 'NOV', monthIndex: 10, year: 2025, totalIncome: 72500 },
        { month: 'DEC', monthIndex: 11, year: 2025, totalIncome: 84167 },
        { month: 'JAN', monthIndex: 0, year: 2026, totalIncome: 74167 },
        { month: 'FEB', monthIndex: 1, year: 2026, totalIncome: 90000 },
        { month: 'MAR', monthIndex: 2, year: 2026, totalIncome: 82500 },
      ];

      if (selectedRange === '6') {
        const sixMonthsData = [
          { month: 'OCT', monthIndex: 9, year: 2025, totalIncome: 80833 },
          { month: 'NOV', monthIndex: 10, year: 2025, totalIncome: 72500 },
          { month: 'DEC', monthIndex: 11, year: 2025, totalIncome: 84167 },
          { month: 'JAN', monthIndex: 0, year: 2026, totalIncome: 74167 },
          { month: 'FEB', monthIndex: 1, year: 2026, totalIncome: 90000 },
          { month: 'MAR', monthIndex: 2, year: 2026, totalIncome: 82500 },
        ];
        setMonthlyData(sixMonthsData);
      } else {
        setMonthlyData(completeData);
      }
    } catch (error) {
      console.error('Failed to fetch monthly income:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, [fetchMonthlyIncome]);

  const getChartData = () => {
    if (monthlyData.length === 0) {
      return { months: [], heights: [] };
    }

    const months = monthlyData.map((d) => d.month);
    const maxIncome = Math.max(...monthlyData.map((d) => d.totalIncome), 1);
    const heights = monthlyData.map((d) => (d.totalIncome / maxIncome) * 100);

    return { months, heights };
  };

  const { months, heights } = getChartData();
  const hasData = monthlyData.length > 0;

  const toggleRange = () => {
    setSelectedRange(selectedRange === '12' ? '6' : '12');
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[848px] rounded-2xl bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center py-6 px-4 gap-2.5">
        <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[848px] rounded-2xl bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center justify-center py-6 px-4 gap-2.5">
      {/* Header */}
      <div className="self-stretch flex flex-col sm:flex-row items-center justify-center gap-3">
        <b className="h-6 flex-1 relative tracking-[-0.01em] flex items-center text-[16px] sm:text-[18px] text-gray font-inter text-center sm:text-left">
          Monthly Income
        </b>

        {/* Toggle Button */}
        <button
          onClick={toggleRange}
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
              {/* Bars */}
              <div className="w-full h-[108px] flex items-end justify-around">
                {months.map((m, i) => (
                  <div
                    key={m}
                    className="rounded-[5px] transition-all duration-300"
                    style={{
                      width:
                        selectedRange === '6' ? 'clamp(25px, 14%, 45px)' : 'clamp(20px, 7%, 35px)',
                      height: `${heights[i]}%`,
                      backgroundColor: i === months.length - 1 ? '#024338' : '#096c5b',
                    }}
                  />
                ))}
              </div>
              {/* Month labels */}
              <div className="w-full flex justify-around">
                {months.map((m) => (
                  <div key={m} className="tracking-[0.04em] font-semibold text-[8px] text-black">
                    {m}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-darkslategray-100">
              No data available for the selected period
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between py-0 px-3 text-left gap-2 sm:gap-0">
          <div className="flex items-end gap-1">
            <div
              className="h-[15px] w-[15px] rounded-[5px]"
              style={{ backgroundColor: '#096c5b' }}
            />
            <div className="h-4 relative tracking-[0.02em] font-semibold flex items-center text-[10px] sm:text-[12px] text-darkslategray-100">
              {selectedRange === '6' ? 'Previous Months' : 'Past Months'}
            </div>
          </div>
          <div className="flex items-end gap-1">
            <div
              className="h-[15px] w-[15px] rounded-[5px]"
              style={{ backgroundColor: '#024338' }}
            />
            <div className="h-4 relative tracking-[0.02em] font-semibold flex items-center text-[10px] sm:text-[12px] text-darkslategray-100">
              Current Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncomeChart;
