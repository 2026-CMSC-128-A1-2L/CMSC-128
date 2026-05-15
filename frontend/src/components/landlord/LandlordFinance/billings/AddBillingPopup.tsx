import { type FunctionComponent, useState, useEffect } from 'react';
import PortalPopup from '../../../general/PortalPopout';
import RoomDropdown from './RoomDropdown';
import NumberInput from './NumberInput';
import PopupButtons from './PopupButtons';

interface SelectedMonth {
  name: string;
  month: number;
  year: number;
  displayName: string;
}

interface AddBillingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  facilityId: string;
  occupiedUnitIds: Set<string>;
  selectedMonth: SelectedMonth;
  isSaving?: boolean;
  onSubmit?: (data: {
    unitId: string;
    rent: number;
    utilities: number;
    miscFees: number;
    dueDate: string;
    paymentMethod: { method: 'gcash' | 'bank_transfer'; qr: [] }[];
  }) => Promise<void>;
}

interface ValidationErrors {
  unitId?: string;
  rent?: string;
  utilities?: string;
  miscFees?: string;
}

interface AddBillingPopupPropsExtended extends AddBillingPopupProps {
  availableUnitOptions?: { value: string; label: string }[];
}

const AddBillingPopup: FunctionComponent<AddBillingPopupPropsExtended> = ({
  isOpen,
  onClose,
  selectedMonth,
  onSubmit,
  isSaving = false,
  availableUnitOptions = [],
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [miscFees, setMiscFees] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setSelectedUnitId('');
      setRent('');
      setUtilities('');
      setMiscFees('');
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'unitId':
        if (!value) return 'Please select a room';
        return '';
      case 'rent': {
        if (!value) return 'Please enter rent amount';
        const num = parseFloat(value);
        if (isNaN(num)) return 'Please enter a valid number';
        if (num < 0) return 'Amount cannot be negative';
        return '';
      }
      case 'utilities': {
        if (!value) return 'Please enter utilities amount';
        const num = parseFloat(value);
        if (isNaN(num)) return 'Please enter a valid number';
        if (num < 0) return 'Amount cannot be negative';
        return '';
      }
      case 'miscFees':
        if (value) {
          const num = parseFloat(value);
          if (isNaN(num)) return 'Please enter a valid number';
          if (num < 0) return 'Amount cannot be negative';
        }
        return '';
      default:
        return '';
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {
      unitId: validateField('unitId', selectedUnitId),
      rent: validateField('rent', rent),
      utilities: validateField('utilities', utilities),
      miscFees: validateField('miscFees', miscFees),
    };
    setErrors(newErrors);
    setTouched({ unitId: true, rent: true, utilities: true, miscFees: true });
    return !Object.values(newErrors).some((e) => e && e.length > 0);
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    // Build dueDate as the last day of the selected month
    const dueDate = new Date(selectedMonth.year, selectedMonth.month + 1, 0).toISOString();

    await onSubmit?.({
      unitId: selectedUnitId,
      rent: parseFloat(rent) || 0,
      utilities: parseFloat(utilities) || 0,
      miscFees: parseFloat(miscFees) || 0,
      dueDate,
      paymentMethod: [{ method: 'gcash', qr: [] }],
    });
  };

  const isFormValid =
    !!selectedUnitId &&
    !!rent &&
    !!utilities &&
    !errors.unitId &&
    !errors.rent &&
    !errors.utilities;

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={onClose}
      zIndex={100}
    >
      <div className="relative w-full max-w-[612px] bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] overflow-hidden">
        <div className="bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[40px] sm:px-[57px] pt-[30px] pb-[40px]">
          <b className="block text-[24px] sm:text-[32px] text-white mb-2">Add Billing</b>
          <b className="block text-[14px] sm:text-[18px] tracking-[-0.01em] font-inter text-white">
            Add a new billing for your tenant for {selectedMonth.displayName}!
          </b>
        </div>

        <div className="px-[30px] sm:px-[60px] py-[30px]">
          <RoomDropdown
            value={selectedUnitId}
            onChange={setSelectedUnitId}
            options={availableUnitOptions}
            placeholder="Select Room"
            label="Room"
            required
            error={errors.unitId}
            touched={touched.unitId}
          />

          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <NumberInput
              value={rent}
              onChange={setRent}
              onBlur={() => handleFieldBlur('rent', rent)}
              label="RENT"
              placeholder="Enter rent amount"
              required
              error={errors.rent}
              touched={touched.rent}
            />
            <NumberInput
              value={utilities}
              onChange={setUtilities}
              onBlur={() => handleFieldBlur('utilities', utilities)}
              label="UTILITIES"
              placeholder="Enter utilities amount"
              required
              error={errors.utilities}
              touched={touched.utilities}
            />
          </div>

          <div className="mb-8">
            <NumberInput
              value={miscFees}
              onChange={setMiscFees}
              onBlur={() => handleFieldBlur('miscFees', miscFees)}
              label="MISC. FEES"
              placeholder="Enter misc fees (optional)"
              error={errors.miscFees}
              touched={touched.miscFees}
            />
          </div>

          <PopupButtons
            onCancel={onClose}
            onSubmit={handleSubmit}
            isFormValid={!!isFormValid && !isSaving}
            submitText={isSaving ? 'SAVING...' : 'ADD BILLING'}
          />
        </div>
      </div>
    </PortalPopup>
  );
};

export default AddBillingPopup;