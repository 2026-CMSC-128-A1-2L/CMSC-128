import { FunctionComponent } from 'react';

interface PropertyIncomeChartProps {
  properties: Array<{ name: string; income: number }>;
}

const PropertyIncomeChart: FunctionComponent<PropertyIncomeChartProps> = ({ properties }) => {
  const maxIncome = Math.max(...properties.map(p => p.income), 1);
  const chartHeight = 132;

  const getHeight = (income: number) => (income / maxIncome) * chartHeight;

  return (
    <div className="h-[280px] w-full rounded-2xl bg-white border border-whitesmoke-200 flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-center py-4">
        <b className="text-[18px] text-gray font-inter">Income by Property</b>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
        <div className="flex items-end gap-6 justify-center">
          {properties.map((property, index) => {
            const height = getHeight(property.income);
            const isHighest = property.income === maxIncome;
            return (
              <div key={index} className="w-[104px] flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-md transition-all duration-300 ${
                    isHighest ? 'bg-darkslategray-200' : 'bg-teal-200'
                  }`}
                  style={{ 
                    height: `${height}px`, 
                    minHeight: '20px',
                  }}
                />
                <div className="text-center text-[10px] font-semibold text-black truncate w-full mt-2">
                  {property.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyIncomeChart;