import type React from 'react';

// Define the props so it can be controlled by the parent component
interface CheckboxItemProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  noBorder?: boolean;
  compact?: boolean;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  label,
  isChecked,
  onToggle,
  noBorder,
  compact = false,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex cursor-pointer items-center w-full bg-white border rounded-num-8 transition-colors text-left group ${
        compact ? 'px-2 py-1.5' : 'px-[16px] py-[12px]'
      }
                ${isChecked ? 'border-[#2f8677]' : 'border-gainsboro hover:border-[#2f8677]'}
                ${noBorder ? 'border-0' : 'border-2'}
                `}
    >
      {/* Custom Checkbox Square */}
      <div
        className={`${compact ? 'w-[14px] h-[14px] mr-2 border-2' : 'w-[24px] h-[24px] mr-[16px] border-3'} flex justify-center items-center shrink-0 transition-colors ${
          isChecked ? 'bg-darkslategray border-darkslategray' : 'border-darkslategray bg-white'
        }`}
      >
        {/* Checkmark SVG (Only renders when isChecked is true) */}
        {isChecked && (
          <svg
            aria-hidden="true"
            width={compact ? '9' : '14'}
            height={compact ? '7' : '10'}
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
      <span
        className={`font-bold text-darkslategray group-hover:opacity-80 ${
          compact ? 'truncate text-[9px] leading-3' : 'text-num-16'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default CheckboxItem;
