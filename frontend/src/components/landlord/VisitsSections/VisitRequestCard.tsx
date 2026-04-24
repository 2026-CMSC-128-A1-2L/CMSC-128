type VisitRequestCardProps = {
  visitorName: string;
  dateTime: string;
  propertyName: string;
  buildingName: string;
  onAccept: () => void;
  onReject: () => void;
};

export default function VisitRequestCard({
  visitorName,
  dateTime,
  propertyName,
  buildingName,
  onAccept,
  onReject,
}: VisitRequestCardProps) {
  return (
    <div className="w-full rounded-num-8 border border-whitesmoke-200 overflow-hidden flex items-center justify-between p-4 gap-4 hover:bg-whitesmoke-200 transition-colors font-inter">
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="font-semibold text-darkslategray-100">{visitorName}</div>
        <div className="text-sm text-dimgray">{dateTime}</div>
      </div>
      
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="font-semibold text-darkslategray-100">{propertyName}</div>
        <div className="text-sm text-dimgray">{buildingName}</div>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onReject}
          className="rounded-num-8 overflow-hidden flex items-center justify-center py-2 px-4 hover:bg-pink-50 transition-colors border border-crimson"
        >
          <span className="text-sm font-semibold text-crimson">Reject</span>
        </button>
        <button
          onClick={onAccept}
          className="rounded-num-8 bg-teal overflow-hidden flex items-center justify-center py-2 px-4 hover:opacity-90 transition-opacity border-none cursor-pointer"
        >
          <span className="text-sm font-semibold text-white">Accept</span>
        </button>
      </div>
    </div>
  );
}
