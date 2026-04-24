import UpcomingVisitCard from './UpcomingVisitCard';

type UpcomingVisit = {
  id: string;
  propertyName: string;
  visitCount: number;
};

type UpcomingVisitsSectionProps = {
  visits: UpcomingVisit[];
};

const defaultVisits: UpcomingVisit[] = [
  {
    id: '1',
    propertyName: 'One Sapphire Place',
    visitCount: 1,
  },
  {
    id: '2',
    propertyName: 'Two Sapphire Place',
    visitCount: 3,
  },
  {
    id: '3',
    propertyName: 'Three Sapphire Place',
    visitCount: 3,
  },
];

export default function UpcomingVisitsSection({
  visits = defaultVisits,
}: UpcomingVisitsSectionProps) {
  return (
    <div className="w-full flex flex-col items-start gap-2">
      <b className="text-sm font-bold text-darkslategray-100 font-inter">Upcoming Visits</b>
      <div className="w-full flex flex-col gap-2">
        {visits.map((visit) => (
          <UpcomingVisitCard
            key={visit.id}
            propertyName={visit.propertyName}
            visitCount={visit.visitCount}
          />
        ))}
      </div>
    </div>
  );
}
