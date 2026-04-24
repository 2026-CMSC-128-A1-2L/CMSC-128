type VisitSlotCardProps = {
  time: string;
  visitorName: string;
  backgroundColor?: string;
};

export default function VisitSlotCard({
  time,
  visitorName,
  backgroundColor = 'bg-cyan-200',
}: VisitSlotCardProps) {
  return (
    <div
      className={`rounded-lg ${backgroundColor} overflow-hidden flex flex-col items-center justify-center p-3 box-border text-center text-num-12 font-inter font-medium border border-whitesmoke-200 min-h-20`}
    >
      <div className="font-semibold text-darkslategray-100 text-num-14 leading-tight">{time}</div>
      <div className="text-dimgray text-num-12 leading-tight">{visitorName}</div>
    </div>
  );
}
