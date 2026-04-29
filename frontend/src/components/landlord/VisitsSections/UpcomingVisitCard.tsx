import type { ReactNode } from 'react';

type UpcomingVisitCardProps = {
  propertyName: string;
  visitCount: number;
  icon?: ReactNode;
};

const getColorForProperty = (name: string): string => {
  if (name.includes('One')) return 'bg-rose-300';
  if (name.includes('Two')) return 'bg-amber-300';
  if (name.includes('Three')) return 'bg-lightcyan';
  return 'bg-gray-300';
};

export default function UpcomingVisitCard({
  propertyName,
  visitCount,
  icon,
}: UpcomingVisitCardProps) {
  const bgColor = getColorForProperty(propertyName);

  return (
    <div className="w-full h-12 rounded-num-8 border border-whitesmoke-200 box-border overflow-hidden flex items-center p-3 gap-2 hover:bg-whitesmoke-200 transition-colors cursor-pointer font-inter">
      <div className={`w-6 h-6 rounded shrink-0 ${bgColor}`}>
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between min-w-0 gap-2">
        <div className="text-num-14 font-medium text-dimgray truncate">{propertyName}</div>
        <div className="text-num-14 font-semibold text-dimgray shrink-0">
          {visitCount}
        </div>
      </div>
    </div>
  );
}
