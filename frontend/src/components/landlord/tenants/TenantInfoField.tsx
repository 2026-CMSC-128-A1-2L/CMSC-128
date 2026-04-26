import type { ReactNode } from 'react';

type TenantInfoFieldProps = {
  label: string;
  children: ReactNode;
  valueClassName?: string;
};

const TenantInfoField = ({ label, children, valueClassName = 'text-black' }: TenantInfoFieldProps) => {
  return (
    <div className="flex flex-col items-start gap-[4px]">
      <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-[#666]">
        {label}
      </span>
      <span
        className={[
          "font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap",
          valueClassName,
        ].join(' ')}
      >
        {children}
      </span>
    </div>
  );
};

export default TenantInfoField;
