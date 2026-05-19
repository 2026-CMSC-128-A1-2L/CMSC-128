import { type FunctionComponent, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import type { Billing } from "../types/billing";

interface BillingRowProps {
  billing: Billing;
  roomNumber?: number | string;
  tenantName?: string;
  onStatusChange?: (id: string, status: Billing["paymentStatus"]) => void;
  onEditClick?: (billing: Billing) => void;
  onReceiptClick?: (billing: Billing, roomNumber: string | number, tenantName: string) => void;
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
  onReceiptClick,
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

  // Count submitted receipt files.
  // Backend shape: documents[].files[] — each document entry has a files array of key strings.
  const receiptCount = Array.isArray(billing.documents)
    ? billing.documents.reduce((total: number, d: any) => {
        if (!d) return total;
        if (typeof d === 'string') return d ? total + 1 : total;
        // Primary shape: { files: string[] }
        if (Array.isArray(d.files)) return total + d.files.filter(Boolean).length;
        // Fallback single-file shapes
        const key = d.file ?? d.key ?? d.fileKey ?? d.fileId ?? d.path ?? d.url ?? '';
        return key ? total + 1 : total;
      }, 0)
    : 0;

  const hasReceipts = receiptCount > 0;

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
    window.addEventListener("scroll", handleScroll, true);
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

  const handleReceiptClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReceiptClick?.(billing, roomNumber, tenantName);
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

      {/* Receipt column */}
      <td className={tdBase} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center">
          <button
            onClick={handleReceiptClick}
            title={hasReceipts ? `${receiptCount} receipt${receiptCount > 1 ? 's' : ''} submitted` : 'No receipts yet'}
            className={`relative w-[36px] h-[36px] rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
              hasReceipts
                ? 'bg-lightcyan dark:bg-[#12342e] hover:bg-teal/10 dark:hover:bg-[#1a4a3e]'
                : 'bg-whitesmoke-200 dark:bg-[#1f2121] opacity-50 cursor-default'
            }`}
          >
            <Icon
              icon="solar:receipt-bold"
              className={`w-4 h-4 ${
                hasReceipts ? 'text-teal dark:text-[#72cbb8]' : 'text-gray-100 dark:text-[#6b7280]'
              }`}
            />
            {hasReceipts && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-darkslategray-200 dark:bg-[#0c8873] text-white text-[8px] font-bold font-inter flex items-center justify-center leading-none">
                {receiptCount}
              </span>
            )}
          </button>
        </div>
      </td>

      {/* Status */}
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