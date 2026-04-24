import VisitRequestCard from './VisitRequestCard';

type VisitRequest = {
  id: string;
  visitorName: string;
  dateTime: string;
  propertyName: string;
  buildingName: string;
};

type VisitRequestsSectionProps = {
  requests: VisitRequest[];
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
};

const defaultRequests: VisitRequest[] = [
  {
    id: '1',
    visitorName: 'Daphne Dayne',
    dateTime: 'April 9, 2026 - 11:00 AM',
    propertyName: 'Three Sapphire Place',
    buildingName: 'Building Name',
  },
  {
    id: '2',
    visitorName: 'Caleb Romero',
    dateTime: 'April 6, 2026 - 1:00 PM',
    propertyName: 'Two Sapphire Place',
    buildingName: 'Building Name',
  },
];

export default function VisitRequestsSection({
  requests = defaultRequests,
  onAccept,
  onReject,
}: VisitRequestsSectionProps) {
  const handleAccept = (requestId: string) => {
    onAccept?.(requestId);
  };

  const handleReject = (requestId: string) => {
    onReject?.(requestId);
  };

  return (
    <div className="w-full rounded-num-8 bg-white border border-whitesmoke-200 overflow-hidden flex flex-col items-start py-4 px-6 gap-3 text-darkslategray-100 font-inter">
      <div className="flex items-center gap-3 text-lg">
        <b className="font-bold text-darkslategray-100">Visit Requests</b>
        <b className="font-bold text-teal">{requests.length}</b>
      </div>

      <div className="w-full flex flex-col gap-3">
        {requests.length === 0 ? (
          <div className="w-full flex items-center justify-center py-8 text-dimgray">
            No visit requests
          </div>
        ) : (
          requests.map((request) => (
            <VisitRequestCard
              key={request.id}
              visitorName={request.visitorName}
              dateTime={request.dateTime}
              propertyName={request.propertyName}
              buildingName={request.buildingName}
              onAccept={() => handleAccept(request.id)}
              onReject={() => handleReject(request.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
