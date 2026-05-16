import { type FunctionComponent, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Billing } from "../types/billing";

interface BillingRowProps {
  billing: Billing;
  roomNumber?: number | string;
  tenantName?: string;
  onStatusChange?: (id: string, status: Billing["paymentStatus"]) => void;
  onEditClick?: (billing: Billing) => void;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

type PaymentStatus = "unpaid" | "paid" | "overdue" | "partially_paid";

const getStatusDisplay = (status: PaymentStatus): string => {
  switch (status) {
    case "paid":
      return "Paid";
    case "partially_paid":
      return "Partial";
    case "overdue":
      return "Overdue";
    case "unpaid":
      return "Pending";
    default:
      return "Select";
  }
};

const php = (n: number) => `₱${n.toFixed(2)}`;

const statusGradients: Record<PaymentStatus, string> = {
  paid: "bg-linear-to-b from-[#5dc2a8] to-[#0c8873]",
  partially_paid: "bg-linear-to-t from-[#fa7900] to-[#ffc273]",
  unpaid: "bg-linear-to-b from-[#c29722] to-[#f6b709]",
  overdue: "bg-linear-to-b from-[#c00f0f] to-[#e44f4f]",
};

const statusOptions: PaymentStatus[] = [
  "paid",
  "partially_paid",
  "unpaid",
  "overdue",
];

const BillingRow: FunctionComponent<BillingRowProps> = ({
  billing,
  roomNumber = 0,
  tenantName = "",
  onStatusChange,
  onEditClick,
  isOpen = false,
  onToggle,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | null>(
    billing.paymentStatus,
  );
  const [isChanging, setIsChanging] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const rentAmount =
    billing.breakdown.find((b) => b.name === "Rent")?.amount || 0;
  const utilitiesAmount =
    billing.breakdown.find((b) => b.name === "Utilities")?.amount || 0;
  const miscAmount =
    billing.breakdown.find((b) => b.name === "Misc. Fees")?.amount || 0;
  const paidAmount = billing.paidAmount || 0;

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => {
      onToggle?.(billing._id);
    };
    window.addEventListener("scroll", handleScroll, true); // capture phase catches all scroll events
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen, onToggle, billing._id]);

  useEffect(() => {
    setSelectedStatus(billing.paymentStatus);
  }, [billing.paymentStatus]);

  const handleStatusChange = (status: PaymentStatus) => {
    setIsChanging(true);
    setSelectedStatus(status);
    onStatusChange?.(billing._id, status);
    onToggle?.(billing._id);
    setTimeout(() => setIsChanging(false), 300);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.(billing._id);
  };

  const displayStatus = selectedStatus
    ? getStatusDisplay(selectedStatus)
    : "Select";
  const hasStatus = selectedStatus !== null;

  const tdBase =
    "px-3 h-12 text-center text-[12px] sm:text-[13px] font-inter text-darkslategray-100 whitespace-nowrap dark:text-[#d7e0ef]";

  return (
    <tr
      onClick={() => onEditClick?.(billing)}
      className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-whitesmoke-200 last:border-b-0 dark:border-[#343737] dark:hover:bg-[#171918]"
    >
      <td className={`${tdBase} font-medium`}>{roomNumber}</td>

      <td
        className={`${tdBase} font-medium max-w-[160px] overflow-hidden text-ellipsis`}
      >
        {tenantName}
      </td>

      <td className={tdBase}>{php(rentAmount)}</td>
      <td className={tdBase}>{php(utilitiesAmount)}</td>
      <td className={tdBase}>{php(miscAmount)}</td>
      <td className={`${tdBase} font-medium`}>{php(billing.totalAmount)}</td>
      <td className={tdBase}>{php(paidAmount)}</td>

      {/* Status — stopPropagation so clicking doesn't open the edit popup */}
      <td className={tdBase} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center">
          <button
            ref={buttonRef}
            onClick={handleToggle}
            className={`w-[100px] rounded-lg ${
              hasStatus && selectedStatus
                ? `${statusGradients[selectedStatus]} flex items-center justify-center`
                : "bg-white border-whitesmoke-200 border-solid border dark:bg-[#101111] dark:border-[#343737]"
            } py-[4.5px] px-2 font-inter cursor-pointer transition-all duration-300 hover:opacity-90 ${
              isChanging ? "scale-95" : "scale-100"
            }`}
          >
            <b
              className={`text-[10px] sm:text-[11px] font-medium transition-all duration-300 ${
                hasStatus && selectedStatus
                  ? "text-white"
                  : "text-darkslategray-100 dark:text-[#d7e0ef]"
              } ${isChanging ? "opacity-0" : "opacity-100"} cursor-pointer`}
            >
              {displayStatus}
            </b>
          </button>
        </div>

        {isOpen &&
          dropdownPos &&
          createPortal(
            <>
              <div
                className="fixed inset-0 z-40 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle?.(billing._id);
                }}
              />
              <div
                className="fixed z-50 w-[100px] bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden dark:bg-[#141515] dark:border-[#343737]"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  transform: "translateX(-50%)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {statusOptions.map((status) => {
                  const isSelected = selectedStatus === status;
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`w-full px-2 sm:px-3 py-2 text-[8px] sm:text-[10px] font-bold text-center hover:bg-gray-50 transition-colors font-inter dark:hover:bg-[#1b1d1d] ${
                        isSelected ? statusGradients[status] : ""
                      } cursor-pointer`}
                    >
                      {isSelected ? (
                        <span className="text-white cursor-pointer">
                          {getStatusDisplay(status)}
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundImage: `linear-gradient(to bottom, ${
                              status === "paid"
                                ? "#5dc2a8, #0c8873"
                                : status === "partially_paid"
                                  ? "#ffc273, #fa7900"
                                  : status === "unpaid"
                                    ? "#c29722, #f6b709"
                                    : "#c00f0f, #e44f4f"
                            })`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {getStatusDisplay(status)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>,
            document.body,
          )}
      </td>
    </tr>
  );
};

export default BillingRow;
