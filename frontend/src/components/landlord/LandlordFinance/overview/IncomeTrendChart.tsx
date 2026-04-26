import { FunctionComponent, useState, useEffect } from 'react';

interface MonthlyData {
  month: string;
  income: number;
  isCurrent: boolean;
}

const IncomeTrendChart: FunctionComponent = () => {
  const [selectedRange, setSelectedRange] = useState<'12' | '6'>('12');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const mockData: MonthlyData[] = [
      { month: 'APR', income: 60000, isCurrent: false },
      { month: 'MAY', income: 72500, isCurrent: false },
      { month: 'JUN', income: 66667, isCurrent: false },
      { month: 'JUL', income: 80833, isCurrent: false },
      { month: 'AUG', income: 74167, isCurrent: false },
      { month: 'SEP', income: 64167, isCurrent: false },
      { month: 'OCT', income: 80833, isCurrent: false },
      { month: 'NOV', income: 72500, isCurrent: false },
      { month: 'DEC', income: 84167, isCurrent: false },
      { month: 'JAN', income: 74167, isCurrent: false },
      { month: 'FEB', income: 90000, isCurrent: false },
      { month: 'MAR', income: 82500, isCurrent: true },
    ];

    setIsAnimating(true);
    
    setTimeout(() => {
      const displayData = selectedRange === '6' ? mockData.slice(-6) : mockData;
      setMonthlyData(displayData);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 150);
  }, [selectedRange]);

  const maxIncome = Math.max(...monthlyData.map(d => d.income), 1);

  const getHeight = (income: number) => (income / maxIncome) * 108;

  const toggleRange = () => {
    setSelectedRange(prev => prev === '12' ? '6' : '12');
  };

  return (
    <div className="w-full rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] flex flex-col">
      <div className="self-stretch flex items-center justify-between py-4 px-6">
        <b className="h-6 relative tracking-[-0.01em] flex items-center text-[18px] text-gray font-inter">
          Income Trend
        </b>
        <button
          onClick={toggleRange}
          className="w-[100px] rounded-lg bg-darkslategray-200 hover:bg-teal-200 transition-colors flex items-center justify-center py-2 cursor-pointer"
        >
          <span className="tracking-[0.04em] font-semibold text-[10px] text-white whitespace-nowrap">
            {selectedRange === '12' ? '12 Months' : '6 Months'}
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center px-4 pb-4">
        <div className="w-full h-40 rounded-[10px] bg-white flex flex-col items-center pt-6 pb-3">
          <div className="w-full h-[108px] flex items-end justify-between gap-1">
            {monthlyData.map((data) => (
              <div
                key={data.month}
                className={`flex-1 rounded-[5px] transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
                }`}
                style={{
                  height: isAnimating ? '0%' : `${getHeight(data.income)}%`,
                  backgroundColor: data.isCurrent ? '#024338' : '#096c5b',
                  minWidth: '20px',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
          <div className="w-full flex justify-between mt-2">
            {monthlyData.map((data) => (
              <div
                key={data.month}
                className={`flex-1 text-center text-[8px] font-semibold text-black transition-all duration-300 ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {data.month}
              </div>
            ))}
          </div>
        </div>

        <div className="self-stretch flex items-center justify-between py-0 px-3 mt-2">
          <div className="flex items-end gap-1 group cursor-pointer">
            <div 
              className="h-[15px] w-[15px] rounded-[5px] transition-all duration-300 group-hover:scale-110" 
              style={{ backgroundColor: '#096c5b' }} 
            />
            <div className="text-[10px] sm:text-[12px] font-semibold text-darkslategray-100 transition-all duration-200 group-hover:text-teal-200">
              {selectedRange === '6' ? 'Previous Months' : 'Past Months'}
            </div>
          </div>
          <div className="flex items-end gap-1 group cursor-pointer">
            <div 
              className="h-[15px] w-[15px] rounded-[5px] transition-all duration-300 group-hover:scale-110" 
              style={{ backgroundColor: '#024338' }} 
            />
            <div className="text-[10px] sm:text-[12px] font-semibold text-darkslategray-100 transition-all duration-200 group-hover:text-teal-200">
              Current Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTrendChart;