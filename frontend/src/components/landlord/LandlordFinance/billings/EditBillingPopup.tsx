import { type FunctionComponent, useState, useEffect } from 'react';
import type { Billing } from '../types/billing';
import PortalPopup from '../../../general/PortalPopout';
import NumberInput from './NumberInput';
import PopupButtons from './PopupButtons';

interface EditBillingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  billing: Billing | null;
  onSave?: (updatedBilling: Billing) => void;
}

interface ValidationErrors {
  rent?: string;
  utilities?: string;
  miscFees?: string;
  amountPaid?: string;
}

const EditBillingPopup: FunctionComponent<EditBillingPopupProps> = ({
  isOpen,
  onClose,
  billing,
  onSave,
}) => {
  const [rent, setRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [miscFees, setMiscFees] = useState<string>('');
  const [amountPaid, setAmountPaid] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen && billing) {
      const rentItem = billing.breakdown.find((b) => b.name === 'Rent');
      const utilitiesItem = billing.breakdown.find((b) => b.name === 'Utilities');
      const miscItem = billing.breakdown.find((b) => b.name === 'Misc. Fees');

      setRent(rentItem?.amount.toString() || '');
      setUtilities(utilitiesItem?.amount.toString() || '');
      setMiscFees(miscItem?.amount.toString() || '');
      setAmountPaid(billing.paidAmount?.toString() || '');
      setErrors({});
      setTouched({});
    }
  }, [isOpen, billing]);

  const validateField = (field: string, value: string, currentRent?: string, currentUtilities?: string, currentMisc?: string): string => {
    const num = parseFloat(value);
    const currentRentValue = currentRent !== undefined ? currentRent : rent;
    const currentUtilitiesValue = currentUtilities !== undefined ? currentUtilities : utilities;
    const currentMiscValue = currentMisc !== undefined ? currentMisc : miscFees;

    switch (field) {
      case 'rent':
        if (!value) return 'Please enter rent amount';
        if (isNaN(num)) return 'Please enter a valid number';
        if (num <= 0) return 'Amount must be greater than 0';
        return '';
      case 'utilities':
        if (!value) return 'Please enter utilities amount';
        if (isNaN(num)) return 'Please enter a valid number';
        if (num < 0) return 'Amount cannot be negative';
        return '';
      case 'miscFees':
        if (value && isNaN(num)) return 'Please enter a valid number';
        if (value && num < 0) return 'Amount cannot be negative';
        return '';
      case 'amountPaid':
        if (value) {
          if (isNaN(num)) return 'Please enter a valid number';
          if (num < 0) return 'Amount cannot be negative';
          const totalRent = parseFloat(currentRentValue) || 0;
          const totalUtilities = parseFloat(currentUtilitiesValue) || 0;
          const totalMisc = parseFloat(currentMiscValue) || 0;
          const totalAmount = totalRent + totalUtilities + totalMisc;
          if (num > totalAmount) return `Amount paid cannot exceed total amount (₱${totalAmount.toFixed(2)})`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    // Update the field value
    if (field === 'rent') setRent(value);
    if (field === 'utilities') setUtilities(value);
    if (field === 'miscFees') setMiscFees(value);
    if (field === 'amountPaid') setAmountPaid(value);

    // Clear error for this field if it was previously invalid
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    let error = '';
    if (field === 'rent') {
      error = validateField('rent', value);
    } else if (field === 'utilities') {
      error = validateField('utilities', value);
    } else if (field === 'miscFees') {
      error = validateField('miscFees', value);
    } else if (field === 'amountPaid') {
      error = validateField('amountPaid', value);
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateAll = (): boolean => {
    // Use current state values for validation
    const rentError = validateField('rent', rent);
    const utilitiesError = validateField('utilities', utilities);
    const miscFeesError = validateField('miscFees', miscFees);
    const amountPaidError = validateField('amountPaid', amountPaid, rent, utilities, miscFees);

    const newErrors: ValidationErrors = {
      rent: rentError,
      utilities: utilitiesError,
      miscFees: miscFeesError,
      amountPaid: amountPaidError,
    };

    setErrors(newErrors);
    setTouched({
      rent: true,
      utilities: true,
      miscFees: true,
      amountPaid: true,
    });

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error && error.length > 0);
    return !hasErrors;
  };

  const handleSave = () => {
    if (validateAll() && billing) {
      const updatedBreakdown = [
        { name: 'Rent', amount: parseFloat(rent) || 0 },
        { name: 'Utilities', amount: parseFloat(utilities) || 0 },
        { name: 'Misc. Fees', amount: parseFloat(miscFees) || 0 },
      ];
      const totalAmount = updatedBreakdown.reduce((sum, item) => sum + item.amount, 0);
      const paidAmountValue = parseFloat(amountPaid) || 0;

      let paymentStatus: Billing['paymentStatus'] = 'unpaid';
      if (paidAmountValue >= totalAmount) paymentStatus = 'paid';
      else if (paidAmountValue > 0) paymentStatus = 'partially_paid';

      onSave?.({ ...billing, breakdown: updatedBreakdown, totalAmount, paidAmount: paidAmountValue || null, paymentStatus, paymentDate: paidAmountValue > 0 ? new Date().toISOString() : null });
      onClose();
    }
  };

  const getRoomNumber = (unitId: string): string => {
    const roomMap: Record<string, string> = { unit1: '01', unit2: '02', unit3: '03', unit4: '04' };
    return roomMap[unitId] || unitId;
  };

  const totalAmount = (parseFloat(rent) || 0) + (parseFloat(utilities) || 0) + (parseFloat(miscFees) || 0);

  // Check if form is valid for enabling the save button
  const isFormValid =
    rent &&
    utilities &&
    !errors.rent &&
    !errors.utilities &&
    rent !== '' &&
    utilities !== '' &&
    parseFloat(rent) > 0;

  if (!isOpen) return null;

  return (
    <PortalPopup overlayColor="rgba(0, 0, 0, 0.25)" placement="Centered" onOutsideClick={onClose} zIndex={100}>
      <div className="relative w-full max-w-[612px] bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] overflow-hidden">
        <div className="bg-gradient-to-b from-[#c29722] to-[#f6b709] px-[40px] sm:px-[57px] pt-[30px] pb-[40px]">
          <b className="block text-[24px] sm:text-[32px] text-white mb-2">Edit Billing</b>
          <b className="block text-[14px] sm:text-[18px] tracking-[-0.01em] font-inter text-white">
            Edit existing billing of your tenant for this month!
          </b>
        </div>

        <div className="px-[30px] sm:px-[60px] py-[30px]">
          <div className="mb-5">
            <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">Room</b>
            <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-whitesmoke-100 h-10 w-full">
              <div className="w-full h-full px-4 flex items-center text-[12px] sm:text-[14px] font-medium font-inter text-darkslategray-100">
                {billing ? `Room ${getRoomNumber(billing.unitId)}` : 'Select a room'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <NumberInput
              value={rent}
              onChange={(value) => handleFieldChange('rent', value)}
              onBlur={() => handleFieldBlur('rent', rent)}
              label="RENT"
              placeholder="Enter rent amount"
              required
              error={errors.rent}
              touched={touched.rent}
            />
            <NumberInput
              value={utilities}
              onChange={(value) => handleFieldChange('utilities', value)}
              onBlur={() => handleFieldBlur('utilities', utilities)}
              label="UTILITIES"
              placeholder="Enter utilities amount"
              required
              error={errors.utilities}
              touched={touched.utilities}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <NumberInput
              value={miscFees}
              onChange={(value) => handleFieldChange('miscFees', value)}
              onBlur={() => handleFieldBlur('miscFees', miscFees)}
              label="MISC. FEES"
              placeholder="Enter misc fees"
              error={errors.miscFees}
              touched={touched.miscFees}
            />
            <NumberInput
              value={amountPaid}
              onChange={(value) => handleFieldChange('amountPaid', value)}
              onBlur={() => handleFieldBlur('amountPaid', amountPaid)}
              label="AMOUNT PAID"
              placeholder="Enter amount paid"
              error={errors.amountPaid}
              touched={touched.amountPaid}
            />
          </div>

          <div className="mb-8 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <b className="text-[14px] text-darkslategray-100">Total Amount Due:</b>
              <b className="text-[16px] text-teal">₱{totalAmount.toFixed(2)}</b>
            </div>
          </div>

          <PopupButtons
            onCancel={onClose}
            onSubmit={handleSave}
            isFormValid={!!isFormValid}
            submitText="SAVE CHANGES"
          />
        </div>
      </div>
    </PortalPopup>
  );
};

export default EditBillingPopup;
