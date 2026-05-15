import { useEffect, useRef, type FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

export type ManagerAction = 'message' | 'report' | 'remove';

type Props = {
  open: boolean;
  onClose: () => void;
  onAction: (action: ManagerAction) => void;
  /** Display name for aria labels (tenant, manager, etc.). */
  subjectName: string;
};

const items: Array<{
  key: ManagerAction;
  label: string;
  icon: string;
  danger?: boolean;
}> = [
  { key: 'message', label: 'Message', icon: 'ic:outline-mail' },
  { key: 'report', label: 'Report', icon: 'solar:flag-bold' },
  { key: 'remove', label: 'Remove', icon: 'solar:trash-bin-trash-bold', danger: true },
];

const LandlordManagerActionsPopover: FunctionComponent<Props> = ({
  open,
  onClose,
  onAction,
  subjectName,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={`Actions for ${subjectName}`}
      onClick={(e) => e.stopPropagation()}
      className="absolute left-full top-1/2 z-30 ml-[8px] flex w-[156px] -translate-y-1/2 flex-col gap-[2px] rounded-[10px] border border-solid border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] px-[6px] py-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] origin-left animate-fade-in"
      style={{ animationDuration: '150ms' }}
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="menuitem"
          onClick={(e) => {
            e.stopPropagation();
            onAction(item.key);
          }}
          className={[
            'flex items-center gap-[10px] rounded-[8px] px-[10px] py-[8px] text-left transition-colors',
            item.danger ? 'text-[#dc2626] dark:text-red-400 hover:bg-[#fef2f2] dark:hover:bg-red-900/20' : 'text-[#2f3136] dark:text-[#a4acba] hover:bg-[#f0faf6] dark:hover:bg-[#1f2022]',
          ].join(' ')}
        >
          <Icon icon={item.icon} className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          <span className="font-['Inter',sans-serif] text-[13px] font-semibold">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LandlordManagerActionsPopover;
