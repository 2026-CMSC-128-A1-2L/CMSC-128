import { useState, type FunctionComponent } from 'react';

type Props = {
  onBack: () => void;
  onSubmit: () => void;
  type?: 'manager' | 'tenant';
};

const LandlordManagerReportConfirm: FunctionComponent<Props> = ({ onBack, onSubmit, type = 'manager' }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleSubmit = () => {
    if (!acknowledged) return;
    onSubmit();
  };

  return (
    <div className="relative flex w-[612px] flex-col items-center overflow-hidden rounded-[26px] bg-white dark:bg-[#141515]">
      {/* Header */}
      <div
        className="flex w-full flex-col items-start justify-center pl-[57px] pr-[32px] py-[12px]"
        style={{
          backgroundImage:
            'linear-gradient(180.76181469696922deg, rgb(9, 108, 91) 1.4032%, rgb(22, 145, 124) 96.96%)',
        }}
      >
        <div className="flex w-full flex-col items-start justify-center pb-[8px] pt-[32px]">
          <b className="font-['Poppins',sans-serif] text-[32px] leading-[normal] text-white">
            {type === 'tenant' ? 'Report Tenant' : 'Report Manager'}
          </b>
          <b className="font-['Inter',sans-serif] text-[18px] leading-[normal] tracking-[-0.18px] text-[#f1f5f9]">
            Report your {type === 'tenant' ? 'tenant' : 'dorm manager'}
          </b>
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full flex-col items-start gap-[24px] px-[48px] pt-[40px] pb-[24px]">
        <div className="flex w-full items-start justify-center gap-[10px] px-[8px]">
          <button
            type="button"
            role="checkbox"
            aria-checked={acknowledged}
            aria-label="I declare the report is truthful"
            onClick={() => setAcknowledged((p) => !p)}
            className={[
              'mt-[4px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] transition-colors',
              acknowledged
                ? 'bg-[#096c5b] shadow-[0_0_2px_rgba(0,0,0,0.25)] dark:bg-[#12342e]'
                : 'bg-[#f0f0f0] shadow-[0_0_2px_rgba(0,0,0,0.25)] dark:bg-[#1f2022] dark:border dark:border-[#303331]',
            ].join(' ')}
          >
            {acknowledged && (
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <p className="flex-1 text-center font-['Inter',sans-serif] text-[14px] font-medium leading-[25px] text-black dark:text-[#d7e0ef]">
            I declare that all information and reports submitted are{' '}
            <span className="font-bold text-[#096c5b] dark:text-[#72cbb8]">truthful</span>,{' '}
            <span className="font-bold text-[#096c5b] dark:text-[#72cbb8]">complete</span>, and{' '}
            <span className="font-bold text-[#096c5b]">based on verified facts</span> to the best of
            my knowledge. I acknowledge that any false or misleading information may lead to
            consequences in accordance with applicable rules and regulations.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex w-full items-center justify-center gap-[16px] pb-[32px] pt-[8px]">
        <button
          type="button"
          onClick={onBack}
          className="rounded-[12px] px-[24px] py-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] dark:text-red-400 transition-opacity hover:opacity-70"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!acknowledged}
          className={[
            'rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-[24px] py-[8px] font-["Inter",sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity',
            acknowledged ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50',
          ].join(' ')}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LandlordManagerReportConfirm;
