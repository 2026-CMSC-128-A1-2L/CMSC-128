import { type FunctionComponent, useState, useEffect } from 'react';
import PortalPopup from '../../../general/PortalPopout';
import RoomDropdown from './RoomDropdown';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import PopupButtons from './PopupButtons';

interface AddBillingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  availableRooms: number[];
  selectedMonth?: string;
  onSubmit?: (data: {
    room: string;
    fullName: string;
    rent: number;
    utilities: number;
    miscFees: number;
  }) => void;
}

interface ValidationErrors {
  room?: string;
  fullName?: string;
  rent?: string;
  utilities?: string;
  miscFees?: string;
}

const AddBillingPopup: FunctionComponent<AddBillingPopupProps> = ({
  isOpen,
  onClose,
  availableRooms = [],
  selectedMonth = '',
  onSubmit,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [miscFees, setMiscFees] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setSelectedRoom('');
      setFullName('');
      setRent('');
      setUtilities('');
      setMiscFees('');
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'room':
        if (!value) return 'Please select a room';
        return '';
      case 'fullName':
        if (!value.trim()) return 'Please enter tenant name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'rent': {
        if (!value) return 'Please enter rent amount';
        const rentNum = parseFloat(value);
        if (isNaN(rentNum)) return 'Please enter a valid number';
        if (rentNum < 0) return 'Amount cannot be negative';
        return '';
      }
      case 'utilities': {
        if (!value) return 'Please enter utilities amount';
        const utilitiesNum = parseFloat(value);
        if (isNaN(utilitiesNum)) return 'Please enter a valid number';
        if (utilitiesNum < 0) return 'Amount cannot be negative';
        return '';
      }
      case 'miscFees':
        if (value) {
          const miscNum = parseFloat(value);
          if (isNaN(miscNum)) return 'Please enter a valid number';
          if (miscNum < 0) return 'Amount cannot be negative';
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
      room: validateField('room', selectedRoom),
      fullName: validateField('fullName', fullName),
      rent: validateField('rent', rent),
      utilities: validateField('utilities', utilities),
      miscFees: validateField('miscFees', miscFees),
    };
    setErrors(newErrors);
    setTouched({ room: true, fullName: true, rent: true, utilities: true, miscFees: true });
    return !Object.values(newErrors).some((error) => error && error.length > 0);
  };

  const handleSubmit = () => {
    if (validateAll()) {
      onSubmit?.({
        room: selectedRoom,
        fullName: fullName.trim(),
        rent: parseFloat(rent) || 0,
        utilities: parseFloat(utilities) || 0,
        miscFees: parseFloat(miscFees) || 0,
      });
      onClose();
    }
  };

  const isFormValid =
    selectedRoom &&
    fullName.trim() &&
    rent &&
    utilities &&
    !errors.room &&
    !errors.fullName &&
    !errors.rent &&
    !errors.utilities;

  const roomOptions = availableRooms.map((room) => ({
    value: room.toString(),
    label: `Room ${room}`,
  }));

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
            Add a new billing for your tenant for {selectedMonth}!
          </b>
        </div>

        <div className="px-[30px] sm:px-[60px] py-[30px]">
          <RoomDropdown
            value={selectedRoom}
            onChange={setSelectedRoom}
            options={roomOptions}
            placeholder="Select Room"
            label="Room"
            required
            error={errors.room}
            touched={touched.room}
          />

          <TextInput
            value={fullName}
            onChange={setFullName}
            onBlur={() => handleFieldBlur('fullName', fullName)}
            label="FULL NAME"
            placeholder="Enter tenant's full name"
            required
            error={errors.fullName}
            touched={touched.fullName}
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
            isFormValid={!!isFormValid}
            submitText="ADD BILLING"
          />
        </div>
      </div>
    </PortalPopup>
  );
};

export default AddBillingPopup;
