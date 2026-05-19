import type { FunctionComponent } from 'react';
import type { BillListItem } from '../../../hooks/useFinance';

interface UpcomingPaymentsProps {
  payments: BillListItem[];
  onPayNow: (billingId: string) => void;
}

const UpcomingPayments: FunctionComponent<UpcomingPaymentsProps> = ({ payments, onPayNow }) => {
  if (payments.length === 0) {
    return (
      <div className="self-stretch overflow-hidden flex flex-col items-start p-2.5 gap-2.5 text-left text-[14px] font-inter">
        <b className="self-stretch text-[18px] tracking-[-0.01em]">Upcoming Payments</b>
        <div className="self-stretch h-0.5 border-whitesmoke-200 border-solid border" />
        <div className="text-center text-dimgray py-8">No upcoming payments</div>
      </div>
    );
  }

  return (
    <div className="self-stretch overflow-hidden flex flex-col items-start p-2.5 gap-2.5 text-left text-[14px] font-inter">
      <b className="self-stretch text-[18px] tracking-[-0.01em]">Upcoming Payments</b>
      <div className="self-stretch h-0.5 border-whitesmoke-200 border-solid border" />

      {payments.map((payment) => (
        <div
          key={payment._id}
          className="self-stretch rounded-lg border-whitesmoke-200 border-solid border overflow-hidden flex items-center justify-between py-2 px-2.5 gap-5"
        >
          <div className="self-stretch flex items-center gap-2.5">
            <div className="h-5 w-5 rounded-[4px] bg-linear-to-b from-[#c29722] to-[#f6b709] overflow-hidden shrink-0" />
            <div className="self-stretch overflow-hidden flex flex-col items-start py-1 pl-0 pr-2.5 gap-1">
              <div className="font-semibold shrink-0">{payment.dueDate}</div>
              <div className="text-[12px] tracking-[0.02em] font-semibold font-lora text-dimgray shrink-0">
                Php {payment.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
          <button
            onClick={() => onPayNow(payment._id)}
            className="w-20 rounded-[12px] bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-2.5 cursor-pointer text-center text-teal hover:opacity-90 transition-opacity"
          >
            <div className="font-semibold">Pay Now</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpcomingPayments;