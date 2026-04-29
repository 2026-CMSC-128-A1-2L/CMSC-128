import { type FunctionComponent, useState, useEffect } from 'react';
import PortalPopup from '../../../general/PortalPopout';

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

  useEffect(() => {
    if (isOpen) {
      setSelectedRoom('');
      setFullName('');
      setRent('');
      setUtilities('');
      setMiscFees('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRoomChange = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
    setFullName('');
    setRent('');
    setUtilities('');
    setMiscFees('');
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        room: selectedRoom,
        fullName,
        rent: parseFloat(rent) || 0,
        utilities: parseFloat(utilities) || 0,
        miscFees: parseFloat(miscFees) || 0,
      });
    }
    onClose();
  };

  const handleCancel = () => {
    setSelectedRoom('');
    setFullName('');
    setRent('');
    setUtilities('');
    setMiscFees('');
    onClose();
  };

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={onClose}
      zIndex={100}
    >
      <div className="relative w-full max-w-[612px] bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] overflow-hidden">
        <div className="bg-linear-to-b from-[#096c5b] to-[#16917c] px-[40px] sm:px-[57px] pt-[30px] pb-[40px]">
          <b className="block text-[24px] sm:text-[32px] text-white mb-2">Add Billing</b>
          <b className="block text-[14px] sm:text-[18px] tracking-[-0.01em] font-inter text-white">
            Add a new billing for your tenant for {selectedMonth}!
          </b>
        </div>

        <div className="px-[30px] sm:px-[60px] py-[30px]">
          {/* Room Field */}
          <div className="mb-5">
            <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
              Room
            </b>
            <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
              <select
                value={selectedRoom}
                onChange={(e) => handleRoomChange(e.target.value)}
                className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
              >
                <option value="">Select Room</option>
                {availableRooms.map((room) => (
                  <option key={room} value={room}>
                    Room {room}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-5">
            <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
              FULL NAME
            </b>
            <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                placeholder="Enter tenant's full name"
              />
            </div>
          </div>

          {/* Rent and Utilities*/}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex-1">
              <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
                RENT
              </b>
              <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
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
              <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
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

          {/* Misc Fees Field */}
          <div className="mb-8">
            <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
              MISC. FEES
            </b>
            <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border border-whitesmoke-200">
              <input
                type="number"
                value={miscFees}
                onChange={(e) => setMiscFees(e.target.value)}
                className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
                placeholder="Enter misc fees"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={handleCancel}
              className="w-full sm:w-[220px] h-10 rounded-md border-whitesmoke-200 border-solid border-2 bg-white text-crimson font-inter text-[12px] sm:text-[14px] font-medium hover:opacity-80 transition-opacity cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-[216px] h-10 rounded-md bg-lightcyan text-teal font-inter text-[12px] sm:text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              ADD BILLING
            </button>
          </div>
        </div>
      </div>
    </PortalPopup>
  );
};

export default AddBillingPopup;
