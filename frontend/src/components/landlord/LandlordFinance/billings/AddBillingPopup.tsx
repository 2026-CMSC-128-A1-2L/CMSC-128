import { FunctionComponent, useState, useEffect } from 'react';

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
  onSubmit 
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [miscFees, setMiscFees] = useState<string>('');
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setSelectedRoom('');
      setFullName('');
      setRent('');
      setUtilities('');
      setMiscFees('');
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

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
          <div className="absolute top-[0px] left-[0px] rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full h-full" />
          
          <div className="absolute top-[-3px] left-[0px] rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-gradient-to-b from-[#096c5b] to-[#16917c] w-full h-[139px]" />
          
          <b className="absolute top-[19px] left-[5%] sm:left-[57px] text-[24px] sm:text-[32px] flex text-white items-center w-[90%] sm:w-[533px] h-[72px]">Add Billing</b>
          <b className="absolute top-[64px] left-[5%] sm:left-[60px] text-[14px] sm:text-[18px] tracking-[-0.01em] flex font-inter text-white items-center w-[90%] sm:w-[450px] h-14">
            Add a new billing for your tenant for {selectedMonth}!
          </b>
          
          {/* Room Field */}
          <b className="absolute top-[160px] left-[5%] sm:left-[60px] flex items-center w-[90%] sm:w-[420px] h-14 font-inter text-[12px] sm:text-[14px]">Room</b>
          <div className="absolute top-[200px] left-[5%] sm:left-[60px] shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] rounded-md bg-white w-[90%] sm:w-[480px] h-8">
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

          {/* Cancel Button */}
          <div 
            onClick={handleCancel}
            className="absolute bottom-[30px] left-[5%] sm:left-[66px] w-[42%] sm:w-[220px] h-[39px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="absolute top-[0px] left-[0px] rounded-md border-whitesmoke-200 border-solid border-[2px] bg-white w-full h-[39px]" />
            <div className="absolute top-[10px] left-[24px] leading-6 font-medium flex items-center justify-center w-[calc(100%-48px)] h-5 text-[12px] sm:text-[14px] text-crimson font-inter">
              CANCEL
            </div>
          </div>

          {/* Add Billing Button */}
          <div 
            onClick={handleSubmit}
            className="absolute bottom-[30px] right-[5%] sm:right-[auto] sm:left-[330px] w-[42%] sm:w-[216.1px] h-[39px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="absolute top-[0px] left-[0px] rounded-md bg-lightcyan w-full h-[39px]" />
            <div className="absolute top-[9px] left-[30px] leading-6 font-medium flex items-center justify-center w-[calc(100%-60px)] h-5 text-[12px] sm:text-[14px] text-teal font-inter">
              ADD BILLING
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBillingPopup;