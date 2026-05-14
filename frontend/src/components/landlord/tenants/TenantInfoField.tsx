import type { ReactNode } from 'react';

type TenantInfoFieldProps = {
  label: string;
  children: ReactNode;
  valueClassName?: string;
};

const TenantInfoField = ({
  label,
  children,
  valueClassName = 'text-black',
}: TenantInfoFieldProps) => {
  return (
    <div className="flex min-w-0 flex-col items-start gap-[4px]">
      <span className="max-w-full font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
        {label}
      </span>
      <span
        className={[
          "max-w-full whitespace-normal break-words font-['Inter',sans-serif] text-[14px] font-bold leading-[20px]",
          valueClassName,
        ].join(' ')}
      >
        {children}
      </span>
    </div>
  );
};

export default TenantInfoField;
