import { FunctionComponent, useState, useEffect, useRef } from 'react';
import type { Billing } from '../types/billing';

interface BillingRowProps {
  billing: Billing;
  roomNumber?: number;
  tenantName?: string;
  onStatusChange?: (id: string, status: Billing['paymentStatus']) => void;
  onEditClick?: (billing: Billing) => void;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

type PaymentStatus = 'unpaid' | 'paid' | 'overdue' | 'partially_paid';

const getStatusDisplay = (status: PaymentStatus): string => {
  switch (status) {
    case 'paid': return 'Paid';
    case 'partially_paid': return 'Partial';
    case 'overdue': return 'Overdue';
    case 'unpaid': return 'Pending';
    default: return 'Select';
  }
};

const php = (n: number) => `₱${n.toFixed(2)}`;

const statusGradients: Record<PaymentStatus, string> = {
  paid: 'bg-gradient-to-b from-[#5dc2a8] to-[#0c8873]',
  partially_paid: 'bg-gradient-to-t from-[#fa7900] to-[#ffc273]',
  unpaid: 'bg-gradient-to-b from-[#c29722] to-[#f6b709]',
  overdue: 'bg-gradient-to-b from-[#c00f0f] to-[#e44f4f]',
};

const statusOptions: PaymentStatus[] = ['paid', 'partially_paid', 'unpaid', 'overdue'];

const BillingRow: FunctionComponent<BillingRowProps> = ({ 
  billing,
  roomNumber = 0,
  tenantName = '',
  onStatusChange, 
  onEditClick,
  isOpen = false, 
  onToggle 
}) => {
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | null>(billing.paymentStatus);
  const [isChanging, setIsChanging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const rentAmount = billing.breakdown.find(b => b.name === 'Rent')?.amount || 0;
  const utilitiesAmount = billing.breakdown.find(b => b.name === 'Utilities')?.amount || 0;
  const miscAmount = billing.breakdown.find(b => b.name === 'Misc. Fees')?.amount || 0;
  const paidAmount = billing.paidAmount || 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onToggle && isOpen) {
          onToggle(billing._id);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle, billing._id]);

  const handleStatusChange = (status: PaymentStatus) => {
    setIsChanging(true);
    setSelectedStatus(status);
    if (onStatusChange) {
      onStatusChange(billing._id, status);
    }
    if (onToggle) {
      onToggle(billing._id);
    }
    
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(billing._id);
    }
  };

  const handleRowClick = () => {
    if (onEditClick) {
      onEditClick(billing);
    }
  };

  const displayStatus = selectedStatus ? getStatusDisplay(selectedStatus) : 'Select';
  const hasStatus = selectedStatus !== null;

  return (
    <div 
      onClick={handleRowClick}
      className="w-full flex items-center gap-3 sm:gap-5 px-[12px] sm:px-[19px] h-10 text-center text-[10px] sm:text-[11px] font-inter text-darkslategray-100 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="h-10 w-10 min-w-[40px] flex items-center justify-center shrink-0 font-medium text-[11px] sm:text-[12px]">{roomNumber}</div>
      <div className="h-10 w-32 sm:w-40 min-w-[100px] flex items-center justify-center shrink-0 font-medium text-[11px] sm:text-[12px] truncate">{tenantName}</div>
      <div className="h-10 w-[65px] sm:w-[72px] min-w-[60px] flex items-center justify-center shrink-0 text-[10px] sm:text-[11px]">{php(rentAmount)}</div>
      <div className="h-10 w-[65px] sm:w-[72px] min-w-[60px] flex items-center justify-center shrink-0 text-[10px] sm:text-[11px]">{php(utilitiesAmount)}</div>
      <div className="h-10 w-[65px] sm:w-[72px] min-w-[60px] flex items-center justify-center shrink-0 text-[10px] sm:text-[11px]">{php(miscAmount)}</div>
      <div className="h-10 w-[65px] sm:w-[72px] min-w-[60px] flex items-center justify-center shrink-0 text-[10px] sm:text-[11px] font-medium">{php(billing.totalAmount)}</div>
      <div className="h-10 w-[70px] sm:w-20 min-w-[70px] flex items-center justify-center shrink-0 text-[10px] sm:text-[11px]">{php(paidAmount)}</div>
      <div className="w-[90px] sm:w-[100px] min-w-[90px] flex items-center justify-center py-2 px-0 shrink-0 relative" ref={dropdownRef}>
        <button
          onClick={handleToggle}
          className={`w-[85px] sm:w-[92px] rounded-lg ${
            hasStatus && selectedStatus
              ? statusGradients[selectedStatus] + ' flex items-center justify-center'
              : 'bg-white border-whitesmoke-200 border-solid border-[1px]'
          } py-[4.5px] px-0 font-inter cursor-pointer transition-all duration-300 hover:opacity-90 ${
            isChanging ? 'scale-95' : 'scale-100'
          }`}
        >
          <b className={`text-[10px] sm:text-[12px] font-medium transition-all duration-300 ${
            hasStatus && selectedStatus ? 'text-white' : 'text-darkslategray-100'
          } ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
            {displayStatus}
          </b>
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => onToggle && onToggle(billing._id)}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[85px] sm:w-[92px] z-50 bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden">
              {statusOptions.map((status) => {
                const isSelected = selectedStatus === status;
                const statusDisplay = getStatusDisplay(status);
                
                return (
                  <button
                    key={status}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(status);
                    }}
                    className={`w-full px-2 sm:px-3 py-2 text-[8px] sm:text-[10px] font-bold text-center hover:bg-gray-50 transition-colors font-inter ${
                      isSelected ? statusGradients[status] : ''
                    }`}
                  >
                    {isSelected ? (
                      <span className="text-white">{statusDisplay}</span>
                    ) : (
                      <span 
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, ${
                            status === 'paid' ? '#5dc2a8, #0c8873' :
                            status === 'partially_paid' ? '#ffc273, #fa7900' :
                            status === 'unpaid' ? '#c29722, #f6b709' :
                            '#c00f0f, #e44f4f'
                          })`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {statusDisplay}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingRow;