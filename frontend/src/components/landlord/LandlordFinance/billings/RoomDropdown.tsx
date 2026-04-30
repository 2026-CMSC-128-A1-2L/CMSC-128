import { type FunctionComponent, useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface RoomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const RoomDropdown: FunctionComponent<RoomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  required,
  error,
  touched,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="mb-5">
      {label && (
        <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
          {label} {required && <span className="text-crimson">*</span>}
        </b>
      )}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border flex items-center justify-between px-4 cursor-pointer transition-colors ${
            disabled ? 'bg-whitesmoke-100 cursor-not-allowed' : 'hover:border-teal'
          } ${error && touched ? 'border-crimson' : 'border-whitesmoke-200'}`}
        >
          <div className={`text-[12px] sm:text-[14px] font-medium font-inter ${selectedOption ? 'text-black' : 'text-dimgray'}`}>
            {selectedOption?.label || placeholder}
          </div>
          {!disabled && (
            <Icon icon="mdi-light:chevron-down" className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </div>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-[12px] sm:text-[14px] font-medium cursor-pointer hover:bg-whitesmoke-100 transition-colors"
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && touched && <p className="text-crimson text-[11px] mt-1">{error}</p>}
    </div>
  );
};

export default RoomDropdown;