import VisitSlotCard from './VisitSlotCard';

type VisitSlot = {
  id: string;
  time: string;
  visitorName: string;
  backgroundColor?: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
};

type VisitsCalendarViewProps = {
  visits: VisitSlot[];
};

const defaultVisits: VisitSlot[] = [
  {
    id: '1',
    time: '10:30 AM',
    visitorName: 'Espinocilla',
    backgroundColor: 'bg-lightcyan',
    dayOfWeek: 0, // Sunday
  },
  {
    id: '2',
    time: '9:00 AM',
    visitorName: 'Revilla',
    backgroundColor: 'bg-azure',
    dayOfWeek: 1, // Monday
  },
  {
    id: '3',
    time: '10:00 AM',
    visitorName: 'Caduyac',
    backgroundColor: 'bg-aliceblue',
    dayOfWeek: 2, // Tuesday
  },
  {
    id: '4',
    time: '3:30 PM',
    visitorName: 'Doroja',
    backgroundColor: 'bg-lightcyan',
    dayOfWeek: 2, // Tuesday
  },
  {
    id: '5',
    time: '11:00 AM',
    visitorName: 'Santos',
    backgroundColor: 'bg-azure',
    dayOfWeek: 5, // Friday
  },
  {
    id: '6',
    time: '11:00 AM',
    visitorName: 'Cunanan',
    backgroundColor: 'bg-aliceblue',
    dayOfWeek: 4, // Thursday
  },
  {
    id: '7',
    time: '4:00 PM',
    visitorName: 'De Castro',
    backgroundColor: 'bg-lightcyan',
    dayOfWeek: 1, // Monday
  },
];

export default function VisitsCalendarView({
  visits = defaultVisits,
}: VisitsCalendarViewProps) {
  // Get unique times and sort them
  const uniqueTimes = Array.from(new Set(visits.map((v) => v.time))).sort(
    (a, b) => {
      const timeA = new Date(`2000-01-01 ${a}`).getTime();
      const timeB = new Date(`2000-01-01 ${b}`).getTime();
      return timeA - timeB;
    }
  );

  // Create a grid structure: timeSlots x days
  const timeSlots = uniqueTimes.map((time) => {
    return {
      time,
      dayVisits: Array(7)
        .fill(null)
        .map((_, dayIndex) =>
          visits.find((v) => v.time === time && v.dayOfWeek === dayIndex)
        ),
    };
  });

  return (
    <div className="w-full">
      <div className="space-y-3">
        {timeSlots.map((slot) => (
          <div key={slot.time} className="grid grid-cols-7 gap-4">
            {slot.dayVisits.map((visit, dayIndex) => (
              <div key={dayIndex}>
                {visit ? (
                  <VisitSlotCard
                    time={visit.time}
                    visitorName={visit.visitorName}
                    backgroundColor={visit.backgroundColor}
                  />
                ) : (
                  <div className="min-h-20" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
