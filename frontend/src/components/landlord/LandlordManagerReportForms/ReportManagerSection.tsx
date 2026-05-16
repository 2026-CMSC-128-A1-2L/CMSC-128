import { Icon } from '@iconify/react';

type Item = { title: string; desc?: string };

type Props = {
  section: string;
  items: Item[];
  checked: Set<string>;
  onToggle: (key: string) => void;
  onToggleAll: (keys: string[]) => void;
};

const ReportManagerSection = ({ section, items, checked, onToggle, onToggleAll }: Props) => {
  const keys = items.map((i) => i.title);
  const allOn = keys.every((k) => checked.has(k));

  const Checkbox = ({ active, onCheck }: { active: boolean; onCheck: () => void }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onCheck();
      }}
      role="checkbox"
      aria-checked={active}
      className={`flex h-[19.2px] w-[19.2px] shrink-0 items-center justify-center rounded-[3.2px] border transition-colors ${
        active
          ? 'border-[#096c5b] bg-[#096c5b]'
          : 'border-[#d1d5db] bg-[#f5f5f5] shadow-[0px_0px_1.6px_rgba(0,0,0,0.25)]'
      } cursor-pointer`}
    >
      {active && <Icon icon="solar:check-bold" className="h-[11px] w-[11px] text-white cursor-pointer" />}
    </button>
  );

  return (
    <div className="self-stretch flex flex-col items-start gap-[9.6px]">
      <div className="self-stretch flex items-center justify-between pr-[17.6px]">
        <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">{section}</b>
        <div className="flex items-center gap-[8.8px]">
          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#8a9099]">
            Select All
          </span>
          <Checkbox active={allOn} onCheck={() => onToggleAll(keys)} />
        </div>
      </div>
      <div className="self-stretch flex flex-col gap-[16.8px]">
        {items.map((item) => {
          const active = checked.has(item.title);
          return (
            <button
              key={item.title}
              onClick={() => onToggle(item.title)}
              className={`self-stretch rounded-[9.6px] flex items-center py-[9.6px] pl-[19.2px] pr-[17.6px] gap-[12.8px] text-left transition-colors ${active ? 'bg-[#f0fdf9]' : 'hover:bg-[#fafafa]'} cursor-pointer`}
            >
              <div className="flex flex-1 flex-col gap-[3.2px] cursor-pointer">
                <b className="font-['Inter',sans-serif] text-[14px] text-black">{item.title}</b>
                {item.desc && (
                  <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#666]">
                    {item.desc}
                  </span>
                )}
              </div>
              <Checkbox active={active} onCheck={() => onToggle(item.title)} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReportManagerSection;
