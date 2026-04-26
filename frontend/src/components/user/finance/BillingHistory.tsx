import { FunctionComponent } from 'react';
import type { BillingHistoryItem } from '../finance/types/tenantFinance';

interface BillingHistoryProps {
  history?: BillingHistoryItem[];
}

const BillingHistory: FunctionComponent<BillingHistoryProps> = ({ history }) => {
  const defaultHistory: BillingHistoryItem[] = [
    { id: '1', date: 'January 15, 2026', amount: 4500, status: 'paid' },
    { id: '2', date: 'February 15, 2026', amount: 4500, status: 'paid' },
    { id: '3', date: 'March 15, 2026', amount: 4500, status: 'paid' },
  ];

  const data = history || defaultHistory;

  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-3 gap-2 text-left text-[12px]">
      {data.map((item) => (
        <div
          key={item.id}
          className="self-stretch rounded-lg border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-1 px-3"
        >
          <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-0 pr-2.5 gap-1">
            <div className="font-semibold">{item.date}</div>
            <div className="text-[10px] tracking-[0.04em] font-semibold font-lora text-dimgray">
              Php {item.amount.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillingHistory;