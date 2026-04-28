import type React from 'react';

// Define the props so it can be controlled by the parent component
interface CheckboxItemProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  noBorder?: boolean;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, isChecked, onToggle, noBorder }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex cursor-pointer items-center w-full px-[16px] py-[12px] bg-white border rounded-num-8 transition-colors text-left group 
                ${isChecked ? 'border-[#2f8677]' : 'border-gainsboro hover:border-[#2f8677]'}
                ${noBorder ? 'border-0' : 'border-2'}
                `}
    >
      {/* Custom Checkbox Square */}
      <div
        className={`w-[24px] h-[24px] border-3  mr-[16px] flex justify-center items-center flex-shrink-0 transition-colors ${
          isChecked ? 'bg-darkslategray border-darkslategray' : 'border-darkslategray bg-white'
        }`}
      >
        {/* Checkmark SVG (Only renders when isChecked is true) */}
        {isChecked && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L5 9L13 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Text Label */}
      <span className="font-bold text-darkslategray text-num-16 group-hover:opacity-80">
        {label}
      </span>
    </button>
  );
};

export default CheckboxItem;
