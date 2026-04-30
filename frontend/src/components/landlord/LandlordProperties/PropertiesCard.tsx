import type { FunctionComponent } from 'react';
// Assets
import LocationIcon from '../../../../assets/grey_location.svg';
import info from '../../../../assets/info_icon.svg';

interface PropertiesCardProps {
  name: string;
  status: 'Active' | 'Inactive';
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  income: string;
  outstanding: string;
  month: string;
  imageSrc: string;
  url: string;
  onClick: () => void;
}

const PropertiesCard: FunctionComponent<PropertiesCardProps> = ({
  name,
  status,
  address,
  totalUnits,
  occupiedUnits,
  income,
  outstanding,
  month,
  imageSrc,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-40 relative text-left text-lg text-black font-inter mb-4 
                       cursor-pointer transition-all duration-200 
                       hover:shadow-md active:scale-[0.99] active:opacity-90"
    >
      {/* Background */}
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-[10px] bg-white border-whitesmoke border-solid border-[1px] box-border" />

      {/* Property Image */}
      <img
        className="absolute h-full w-[20%] top-0 left-0 rounded-l-[10px] object-cover"
        src={imageSrc}
        alt={name}
      />

      {/* Info Icon */}
      <img
        className="absolute h-1/5 w-[3.48%] top-[7.5%] right-[1.53%] max-w-full"
        src={info}
        alt="info"
      />

      {/* Content Area */}
      <div className="absolute h-[78.75%] w-[40%] top-[10.63%] left-[21%] flex flex-col items-start justify-center gap-2">
        {/* Header: Name and Status */}
        <div className="self-stretch flex items-center gap-2">
          <b className="relative tracking-tight whitespace-nowrap">{name}</b>
          <div className="h-5 w-[72px] relative text-center text-xs text-teal font-poppins shrink-0">
            <div className="absolute h-full w-full rounded-[5px] border-teal border-solid border-[1px]" />
            <div className="absolute inset-0 flex items-center justify-center pl-2">{status}</div>
            <div className="absolute h-1.5 w-1.5 top-[7px] left-[6px] rounded-full bg-teal" />
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-1 text-xs text-dimgray font-lora">
          <img className="w-3" src={LocationIcon} alt="loc" />
          <div className="relative tracking-[0.02em] font-semibold truncate w-[250px]">
            {address}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="w-[380px] h-[72px] grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-1 text-sm font-poppins">
          <b className="text-black">{totalUnits}</b>
          <b className="text-black">{occupiedUnits}</b>

          <div className="text-[10px] text-silver uppercase">Total Units</div>
          <div className="text-[10px] text-silver uppercase">Occupied</div>

          <b className="text-transparent bg-clip-text bg-gradient-to-b from-[#5dc2a8] to-[#0c8873]">
            ₱{income}
          </b>
          <b className="text-transparent bg-clip-text bg-gradient-to-b from-[#c29722] to-[#f6b709]">
            ₱{outstanding}
          </b>

          <div className="text-[10px] text-silver uppercase leading-tight">Income ({month})</div>
          <div className="text-[10px] text-silver uppercase leading-tight">Outstanding</div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesCard;
