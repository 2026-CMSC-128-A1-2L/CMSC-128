import { FunctionComponent, useState, useEffect } from 'react';
import type { Billing } from '../types/billing';
import PortalPopup from '../../../general/PortalPopout';

interface EditBillingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  billing: Billing | null;
  onSave?: (updatedBilling: Billing) => void;
}

const EditBillingPopup: FunctionComponent<EditBillingPopupProps> = ({
  isOpen,
  onClose,
  billing,
  onSave,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [miscFees, setMiscFees] = useState<string>('');
  const [amountPaid, setAmountPaid] = useState<string>('');

  useEffect(() => {
    if (isOpen && billing) {
      const rentItem = billing.breakdown.find((b) => b.name === 'Rent');
      const utilitiesItem = billing.breakdown.find((b) => b.name === 'Utilities');
      const miscItem = billing.breakdown.find((b) => b.name === 'Misc. Fees');

      setFullName('');
      setRent(rentItem?.amount.toString() || '');
      setUtilities(utilitiesItem?.amount.toString() || '');
      setMiscFees(miscItem?.amount.toString() || '');
      setAmountPaid(billing.paidAmount?.toString() || '');
    }
  }, [isOpen, billing]);

  const handleSave = () => {
    if (onSave && billing) {
      const updatedBreakdown = [
        { name: 'Rent', amount: parseFloat(rent) || 0 },
        { name: 'Utilities', amount: parseFloat(utilities) || 0 },
        { name: 'Misc. Fees', amount: parseFloat(miscFees) || 0 },
      ];

      const totalAmount = updatedBreakdown.reduce((sum, item) => sum + item.amount, 0);
      const paidAmountValue = parseFloat(amountPaid) || 0;

      let paymentStatus: Billing['paymentStatus'] = 'unpaid';
      if (paidAmountValue >= totalAmount) {
        paymentStatus = 'paid';
      } else if (paidAmountValue > 0) {
        paymentStatus = 'partially_paid';
      }

      const updatedBilling: Billing = {
        ...billing,
        breakdown: updatedBreakdown,
        totalAmount,
        paidAmount: paidAmountValue || null,
        paymentStatus,
        paymentDate: paidAmountValue > 0 ? new Date().toISOString() : null,
      };

      onSave(updatedBilling);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const getRoomNumber = (unitId: string): string => {
    const roomMap: Record<string, string> = {
      unit1: '01',
      unit2: '02',
      unit3: '03',
      unit4: '04',
    };
    return roomMap[unitId] || unitId;
  };

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={onClose}
      zIndex={100}
    >
      <div className="relative w-full max-w-[612px] bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)] overflow-hidden">
        <div className="bg-gradient-to-b from-[#c29722] to-[#f6b709] px-[40px] sm:px-[57px] pt-[30px] pb-[40px]">
          <b className="block text-[24px] sm:text-[32px] text-white mb-2">Edit Billing</b>
          <b className="block text-[14px] sm:text-[18px] tracking-[-0.01em] font-inter text-white">
            Edit existing billing of your tenant for this month!
          </b>
        </div>

        <div className="px-[30px] sm:px-[60px] py-[30px]">
          <div className="mb-5">
            <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
              Room
            </b>
            <div className="shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-whitesmoke-100 h-10 w-full">
              <div className="w-full h-full px-4 flex items-center text-[12px] sm:text-[14px] font-medium font-inter text-darkslategray-100">
                {billing ? `Room ${getRoomNumber(billing.unitId)}` : 'Select a room'}
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-5">
            <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
              FULL NAME
            </b>
            <div className="shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                placeholder="Enter tenant's full name"
              />
            </div>
          </div>

          {/* Rent and Utilities */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex-1">
              <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
                RENT
              </b>
              <div className="shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                  placeholder="Enter rent amount"
                />
              </div>
            </div>
            <div className="flex-1">
              <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
                UTILITIES
              </b>
              <div className="shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
                <input
                  type="number"
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                  className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                  placeholder="Enter utilities amount"
                />
              </div>
            </div>
          </div>

          {/* Misc Fees and Amount Paid*/}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
                MISC. FEES
              </b>
              <div className="shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
                <input
                  type="number"
                  value={miscFees}
                  onChange={(e) => setMiscFees(e.target.value)}
                  className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                  placeholder="Enter misc fees"
                />
              </div>
            </div>
            <div className="flex-1">
              <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2 whitespace-nowrap">
                AMOUNT PAID
              </b>
              <div className="shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                  placeholder="Enter amount paid"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={handleCancel}
              className="w-full sm:w-[220px] h-10 rounded-md border-whitesmoke-200 border-solid border-[2px] bg-white text-crimson font-inter text-[12px] sm:text-[14px] font-medium hover:opacity-80 transition-opacity cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-[216px] h-10 rounded-md bg-lightcyan text-teal font-inter text-[12px] sm:text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </PortalPopup>
  );
};

export default EditBillingPopup;
