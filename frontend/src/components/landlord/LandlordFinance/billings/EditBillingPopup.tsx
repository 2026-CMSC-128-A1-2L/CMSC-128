import { FunctionComponent, useState, useEffect } from 'react';
import type { Billing } from '../types/billing';

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
  onSave 
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [miscFees, setMiscFees] = useState<string>('');
  const [amountPaid, setAmountPaid] = useState<string>('');
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen && billing) {
      setShouldRender(true);
      const rentItem = billing.breakdown.find(b => b.name === 'Rent');
      const utilitiesItem = billing.breakdown.find(b => b.name === 'Utilities');
      const miscItem = billing.breakdown.find(b => b.name === 'Misc. Fees');
      
      setFullName('');
      setRent(rentItem?.amount.toString() || '');
      setUtilities(utilitiesItem?.amount.toString() || '');
      setMiscFees(miscItem?.amount.toString() || '');
      setAmountPaid(billing.paidAmount?.toString() || '');
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, billing]);

  if (!shouldRender) return null;

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
      'unit1': '01',
      'unit2': '02',
      'unit3': '03',
      'unit4': '04',
    };
    return roomMap[unitId] || unitId;
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
        onClick={onClose}
      />
      
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative w-full max-w-[612px] h-auto min-h-[621px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)] text-left text-num-12 text-black font-inter">
          <div className="absolute top-0 left-0 rounded-tl-[32px] rounded-tr-0 rounded-b-0 bg-white w-full h-full" />
          
          <div className="absolute top-[-3px] left-0 rounded-tl-[32px] rounded-tr-0 rounded-b-0 bg-gradient-to-b from-[#c29722] to-[#f6b709] w-full h-[139px]" />
          
          <b className="absolute top-[19px] left-[5%] sm:left-[57px] text-[24px] sm:text-[32px] flex text-white items-center w-[90%] sm:w-[533px] h-[72px]">Edit Billing</b>
          <b className="absolute top-[61px] left-[5%] sm:left-[57px] text-[14px] sm:text-[18px] tracking-[-0.01em] flex font-inter text-white items-center w-[90%] sm:w-[450px] h-14">
            Edit existing billing of your tenant for this month!
          </b>
          
          {/* Room Field - Read Only */}
          <b className="absolute top-[160px] left-[5%] sm:left-[60px] flex items-center w-[90%] sm:w-[420px] h-14 font-inter text-[12px] sm:text-[14px]">Room</b>
          <div className="absolute top-[200px] left-[5%] sm:left-[60px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-gray-100 bg-opacity-50 w-[90%] sm:w-[480px] h-8">
            <div className="w-full h-full px-4 py-1 text-[12px] sm:text-[14px] leading-6 font-medium font-inter flex items-center text-darkslategray-100">
              {billing ? `Room ${getRoomNumber(billing.unitId)}` : 'Select a room'}
            </div>
          </div>

          {/* Full Name Field */}
          <b className="absolute top-[228px] left-[5%] sm:left-[60px] flex items-center w-[90%] sm:w-[420px] h-14 font-inter text-[12px] sm:text-[14px]">FULL NAME</b>
          <div className="absolute top-[268px] left-[5%] sm:left-[60px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white w-[90%] sm:w-[480px] h-8">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
              placeholder="Enter tenant's full name"
            />
          </div>

          {/* Rent Field */}
          <b className="absolute top-[310px] left-[5%] sm:left-[60px] flex items-center w-9 h-14 font-inter text-[12px] sm:text-[14px]">RENT</b>
          <div className="absolute top-[350px] left-[5%] sm:left-[60px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white w-[42%] sm:w-[225px] h-8">
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
              placeholder="Enter rent amount"
            />
          </div>

          {/* Utilities Field */}
          <b className="absolute top-[310px] left-[52%] sm:left-[315px] flex items-center w-[65px] h-14 font-inter text-[12px] sm:text-[14px]">UTILITIES</b>
          <div className="absolute top-[350px] left-[52%] sm:left-[315px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white w-[42%] sm:w-[225px] h-8">
            <input
              type="number"
              value={utilities}
              onChange={(e) => setUtilities(e.target.value)}
              className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
              placeholder="Enter utilities amount"
            />
          </div>

          {/* Misc. Fees Field */}
          <b className="absolute top-[390px] left-[5%] sm:left-[60px] flex items-center w-[97px] h-14 font-inter text-[12px] sm:text-[14px]">MISC. FEES</b>
          <div className="absolute top-[430px] left-[5%] sm:left-[60px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white w-[42%] sm:w-[225px] h-8">
            <input
              type="number"
              value={miscFees}
              onChange={(e) => setMiscFees(e.target.value)}
              className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
              placeholder="Enter misc fees"
            />
          </div>

          {/* Amount Paid Field - Fixed overlapping issue */}
          <b className="absolute top-[390px] left-[52%] sm:left-[315px] flex items-center w-[90px] sm:w-[97px] h-14 font-inter text-[12px] sm:text-[14px] whitespace-nowrap">AMOUNT PAID</b>
          <div className="absolute top-[430px] left-[52%] sm:left-[315px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white w-[42%] sm:w-[225px] h-8">
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
              placeholder="Enter amount paid"
            />
          </div>

          {/* Cancel Button */}
          <div 
            onClick={handleCancel}
            className="absolute bottom-[30px] left-[5%] sm:left-[66px] w-[42%] sm:w-[220px] h-[39px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="absolute top-0 left-0 rounded-md border-whitesmoke-200 border-solid border-[2px] bg-white w-full h-[39px]" />
            <div className="absolute top-[10px] left-[24px] leading-6 font-medium flex items-center justify-center w-[calc(100%-48px)] h-5 text-[12px] sm:text-[14px] text-crimson font-inter">
              CANCEL
            </div>
          </div>

          {/* Save Changes Button */}
          <div 
            onClick={handleSave}
            className="absolute bottom-[30px] right-[5%] sm:right-auto sm:left-[330px] w-[42%] sm:w-[216.1px] h-[39px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="absolute top-0 left-0 rounded-md bg-lightcyan w-full h-[39px]" />
            <div className="absolute top-[9px] left-[30px] leading-6 font-medium flex items-center justify-center w-[calc(100%-60px)] h-5 text-[12px] sm:text-[14px] text-teal font-inter whitespace-nowrap">
              SAVE CHANGES
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBillingPopup;