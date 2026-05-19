import { useEffect, useLayoutEffect, useRef, useState, type FunctionComponent } from 'react';
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
  const [placement, setPlacement] = useState<'right' | 'left' | 'below'>('right');

  useLayoutEffect(() => {
    if (!open) return;

    const anchor = ref.current?.parentElement;
    if (!anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const menuWidth = 156;
    const gap = 8;
    const pagePadding = 16;
    const fitsRight = anchorRect.right + gap + menuWidth <= window.innerWidth - pagePadding;
    const fitsLeft = anchorRect.left - gap - menuWidth >= pagePadding;

    if (fitsRight) {
      setPlacement('right');
    } else if (fitsLeft) {
      setPlacement('left');
    } else {
      setPlacement('below');
    }
  }, [open]);

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

  const placementClass = {
    right: 'left-full top-1/2 ml-[8px] -translate-y-1/2 origin-left',
    left: 'right-full top-1/2 mr-[8px] -translate-y-1/2 origin-right',
    below: 'right-0 top-[calc(100%+8px)] origin-top-right',
  }[placement];

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={`Actions for ${subjectName}`}
      onClick={(e) => e.stopPropagation()}
      className={[
        'absolute z-30 flex w-[156px] flex-col gap-[2px] rounded-[10px] border border-solid border-[#f0f0f0] bg-white px-[6px] py-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] animate-fade-in dark:border-[#303331] dark:bg-[#141515]',
        placementClass,
      ].join(' ')}
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
            item.danger
              ? 'text-[#dc2626] dark:text-red-400 hover:bg-[#fef2f2] dark:hover:bg-red-900/20'
              : 'text-[#2f3136] dark:text-[#a4acba] hover:bg-[#f0faf6] dark:hover:bg-[#1f2022]',
          ].join(' ')}
        >
          <Icon icon={item.icon} className="h-[18px] w-[18px] shrink-0 cursor-pointer" aria-hidden="true" />
          <span className="font-['Inter',sans-serif] text-[13px] font-semibold">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LandlordManagerActionsPopover;
