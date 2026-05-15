import type { FunctionComponent } from 'react';

export interface Section {
  id: string;
  label: string;
  anchor: string;
}

export const SectionHeader: FunctionComponent<{ id: string; title: string }> = ({
  id,
  title,
}) => (
  <div id={id} className="flex flex-col items-start gap-1 scroll-mt-6">
    <h2 className="text-[22px] font-bold text-teal font-inter leading-8">{title}</h2>
    <div
      className="h-0.5 rounded-full bg-whitesmoke-200"
      style={{
        width: '100%',
        transformOrigin: 'left center',
        animation: 'section-divider-grow 0.5s ease forwards',
      }}
    />
    <style>{`
      @keyframes section-divider-grow {
        from { transform: scaleX(0); opacity: 0; }
        to   { transform: scaleX(1); opacity: 1; }
      }
    `}</style>
  </div>
);

export interface CalloutProps {
  variant?: 'teal' | 'orange' | 'lightcyan';
  label: string;
  children: React.ReactNode;
}

export const Callout: FunctionComponent<CalloutProps> = ({
  variant = 'teal',
  label,
  children,
}) => {
  const borderColor =
    variant === 'teal'
      ? 'border-l-teal'
      : variant === 'orange'
      ? 'border-l-[#fa7900]'
      : 'border-l-lightcyan';

  return (
    <div
      className={`w-full rounded-num-12 border-l-4 ${borderColor} border-whitesmoke-200 border border-solid bg-white`}
      style={{ transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(9,108,91,0.08)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
        (e.currentTarget as HTMLDivElement).style.transform = '';
      }}
    >
      <div className="px-5 py-4">
        <p className="text-num-14 leading-num-24 font-medium text-darkslategray-100 m-0">
          <span className="font-bold text-black">{label}: </span>
          <span className="text-dimgray font-lora">{children}</span>
        </p>
      </div>
    </div>
  );
};

export const BulletList: FunctionComponent<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="m-0 pl-5 flex flex-col gap-1.5 text-num-14 leading-num-24 font-medium text-black">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);