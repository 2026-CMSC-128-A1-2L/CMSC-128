import type { FunctionComponent } from 'react';
import type { BillListItem } from '../../../hooks/useFinance';

interface BillingHistoryProps {
  history?: BillListItem[];
}

const BillingHistory: FunctionComponent<BillingHistoryProps> = ({ history = [] }) => {
  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-3 gap-2 text-left text-[12px]">
      {history.map((item) => (
        <div
          key={item._id}
          className="self-stretch rounded-lg border-whitesmoke-200 border-solid border overflow-hidden flex items-center py-1 px-3"
        >
          <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-0 pr-2.5 gap-1">
            <div className="font-semibold">{item.dueDate}</div>
            <div className="text-[10px] tracking-[0.04em] font-semibold font-lora text-dimgray">
              Php {item.totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillingHistory;