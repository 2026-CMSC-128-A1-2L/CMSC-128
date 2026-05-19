import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

export type FilterOption = {
  key: string;
  label: string;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (keys: string[]) => void;
};

type AdminFilterBarProps = {
  groups: FilterGroup[];
  className?: string;
};

function AdminFilterBar({ groups, className = '' }: AdminFilterBarProps) {
  const panelId = useId();
  const [panelOpen, setPanelOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = groups.some((g) => g.selected.length > 0);

  useEffect(() => {
    if (!panelOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setPanelOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false);
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [panelOpen]);

  const handleChipClick = (groupId: string, optionKey: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const next = group.selected.includes(optionKey)
      ? group.selected.filter((k) => k !== optionKey)
      : [...group.selected, optionKey];
    group.onChange(next);
  };

  const handleResetAll = () => {
    groups.forEach((g) => {
      g.onChange([]);
    });
  };

  const summaryLabel = hasActiveFilters ? 'Filters · active' : 'Filter';

  return (
    <div className={`relative shrink-0 ${className}`} ref={wrapRef}>
      <button
        type="button"
        aria-expanded={panelOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setPanelOpen((o) => !o)}
        className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d0d0d0] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-4 transition-colors duration-200 hover:border-[#024338] dark:hover:border-[#72cbb8]"
      >
        <span className="font-['Poppins'] text-sm font-medium text-[#7c8db5] dark:text-[#a4acba]">
          {summaryLabel}
        </span>
        <Icon
          icon="mdi-light:chevron-down"
          className={`h-5 w-5 text-[#7c8db5] dark:text-[#a4acba] transition-transform ${panelOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {panelOpen && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Filter options"
          className="absolute right-0 top-full z-40 mt-2 w-[min(100vw-32px,340px)] rounded-2xl border border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="flex flex-col gap-5">
            {groups.map((group) => (
              <div key={group.id} className="flex flex-col gap-2">
                <span className="font-['Poppins'] text-[11px] font-bold uppercase tracking-wide text-[#7c8db5] dark:text-[#a4acba]">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt) => {
                    const active = group.selected.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleChipClick(group.id, opt.key)}
                        className={`rounded-full px-3.5 py-1.5 font-['Poppins'] text-xs font-semibold transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#024338] text-white dark:bg-[#12342e] dark:text-[#72cbb8]'
                            : 'bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb] dark:bg-[#242526] dark:text-[#a4acba] dark:hover:bg-[#2d302f]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetAll}
                className="self-start font-['Poppins'] text-xs font-semibold text-[#024338] dark:text-[#72cbb8] underline-offset-2 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFilterBar;
