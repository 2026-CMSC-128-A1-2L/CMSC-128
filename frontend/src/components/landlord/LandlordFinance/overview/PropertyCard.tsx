import { type FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';
import placeholderImage from '../../../../../assets/sapphire.jpg';

interface PropertyCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  totalUnits: number;
  occupiedUnits: number;
  income: number;
  outstanding: number;
  status: 'active' | 'inactive';
  onClick?: () => void;
}

const PropertyCard: FunctionComponent<PropertyCardProps> = ({
  name,
  imageUrl,
  totalUnits,
  occupiedUnits,
  income,
  outstanding,
  status,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const displayImage = imageUrl && !imgError ? imageUrl : placeholderImage;

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div
      className="relative w-[348px] cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`transition-all duration-300 ${
          isHovered ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        <div className="h-[360px] w-[348px] filter-[drop-shadow(0px_4px_20px_rgba(0,0,0,0.15))] relative">
          {/* White background */}
          <div className="absolute inset-0 rounded-[25px] bg-white z-0" />
          
          {/* Image */}
          <img
            className="w-full h-[200px] rounded-t-[25px] object-cover relative z-10"
            alt={name}
            src={displayImage}
            onError={handleImageError}
            />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-[25px] p-3 z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <b className="text-[18px] tracking-[-0.01em] text-black truncate max-w-[180px]">
                {name}
              </b>
              <div className="relative w-[92px] h-5">
                <div className="absolute inset-0 rounded-[5px] border border-teal" />
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span className="text-[12px] font-semibold text-teal capitalize">
                    {status}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-wrap gap-x-12 gap-y-2">
              <div className="w-[100px]">
                <b className="text-[16px]">{totalUnits}</b>
                <div className="text-[12px] tracking-[0.02em] font-semibold font-lora text-silver">
                  TOTAL UNITS
                </div>
              </div>
              <div className="w-[100px]">
                <b className="text-[16px]">{occupiedUnits}</b>
                <div className="text-[12px] tracking-[0.02em] font-semibold font-lora text-silver">
                  OCCUPIED
                </div>
              </div>
              <div className="w-[100px]">
                <b className="text-[16px] bg-linear-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text text-transparent">
                  ₱{income.toLocaleString()}
                </b>
                <div className="text-[12px] tracking-[0.02em] font-semibold font-lora text-silver">
                  INCOME (MAR)
                </div>
              </div>
              <div className="w-[100px]">
                <b className={`text-[16px] ${
                  outstanding > 0 
                    ? 'bg-linear-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent'
                    : 'text-silver'
                }`}>
                  ₱{outstanding.toLocaleString()}
                </b>
                <div className="text-[12px] tracking-[0.02em] font-semibold font-lora text-silver">
                  OUTSTANDING
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow button */}
      <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-darkslategray flex items-center justify-center shadow-md transition-all duration-300 z-10 ${
        isHovered ? 'translate-x-1 bg-teal' : ''
      }`}>
        <Icon icon="mdi:chevron-right" className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};

export default PropertyCard;