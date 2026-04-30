import { type FunctionComponent } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  required,
  error,
  touched,
}) => {
  return (
    <div className="mb-5">
      <b className="block text-[12px] sm:text-[14px] font-inter text-darkslategray-100 mb-2">
        {label} {required && <span className="text-crimson">*</span>}
      </b>
      <div
        className={`shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-md bg-white h-10 w-full border ${error && touched ? 'border-crimson' : 'border-whitesmoke-200'}`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="w-full h-full px-4 rounded-md text-[12px] sm:text-[14px] font-medium font-inter focus:outline-none bg-transparent"
          placeholder={placeholder}
        />
      </div>
      {error && touched && <p className="text-crimson text-[11px] mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
