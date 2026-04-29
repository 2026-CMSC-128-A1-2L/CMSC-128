import { type FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

const PERMISSIONS = [
  {
    section: 'Property Management',
    items: [
      {
        icon: 'solar:trash-bin-trash-bold',
        title: 'Delete Buildings',
        desc: 'Allow manager to remove building records',
      },
      {
        icon: 'solar:trash-bin-trash-bold',
        title: 'Delete Listings',
        desc: 'Allow manager to remove listing records',
      },
      {
        icon: 'solar:home-bold',
        title: 'Manage Buildings',
        desc: 'Allow manager to access and edit building info',
      },
    ],
  },
  {
    section: 'Billings and Financials',
    items: [
      {
        icon: 'solar:bill-list-bold',
        title: 'Manage Billings',
        desc: 'Manage rents and utility payments',
      },
    ],
  },
  {
    section: 'Tenant Management',
    items: [
      {
        icon: 'solar:calendar-bold',
        title: 'Accept Ocular Visits',
        desc: 'Accept ocular visit requests',
      },
      {
        icon: 'solar:flag-bold',
        title: 'Report Users',
        desc: 'Report users for misconduct upon review',
      },
    ],
  },
];

const ALL_KEYS = PERMISSIONS.flatMap((g) => g.items.map((i) => i.title));

const UpdateManager1: FunctionComponent<Props> = ({ onCancel, onSave }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setChecked((p) => {
      const n = new Set(p);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  const toggleSection = (keys: string[]) =>
    setChecked((p) => {
      const n = new Set(p);
      const allOn = keys.every((k) => n.has(k));
      keys.forEach((k) => (allOn ? n.delete(k) : n.add(k)));
      return n;
    });
  const toggleAll = () =>
    setChecked(checked.size === ALL_KEYS.length ? new Set() : new Set(ALL_KEYS));

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
      }`}
    >
      {active && <Icon icon="solar:check-bold" className="h-[11px] w-[11px] text-white" />}
    </button>
  );

  return (
    <div className="relative rounded-tl-[25.6px] bg-white w-[490px] flex flex-col items-center pb-[48px] gap-[33.6px]">
      {/* Header */}
      <div className="self-stretch rounded-tl-[25.6px] bg-linear-to-b from-[#096c5b] to-[#16917c] flex flex-col items-start justify-center py-[9.6px] pl-[45.6px] pr-[25.6px]">
        <div className="flex flex-col items-start pt-[25.6px] pb-[6.4px] gap-[4px]">
          <b className="font-['Poppins',sans-serif] text-[32px] text-white">Update Permissions</b>
          <b className="font-['Inter',sans-serif] text-[18px] tracking-[-0.01em] text-[#e8f4f8]">
            Update your manager's permissions
          </b>
        </div>
      </div>

      {/* Body */}
      <div className="self-stretch flex flex-col items-start px-[38.4px] pb-[16px] gap-[17.6px]">
        {/* Email */}
        <div className="self-stretch flex flex-col items-start gap-[6.4px]">
          <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">Email Address</b>
          <div className="self-stretch h-[38.4px] rounded-[9.6px] border border-[#f5f5f5] flex items-center px-[12.8px]">
            <span className="font-['Inter',sans-serif] text-[14px] font-medium text-black">
              ncunanan@gmail.com
            </span>
          </div>
        </div>

        {/* Select all */}
        <div className="self-stretch flex items-center justify-end gap-[8.8px] pr-[17.6px]">
          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#8a9099]">
            Select All
          </span>
          <Checkbox active={checked.size === ALL_KEYS.length} onCheck={toggleAll} />
        </div>

        {PERMISSIONS.map((group) => {
          const sectionKeys = group.items.map((i) => i.title);
          const allOn = sectionKeys.every((k) => checked.has(k));
          return (
            <div key={group.section} className="self-stretch flex flex-col items-start gap-[16px]">
              <div className="self-stretch flex items-center justify-between pr-[17.6px]">
                <b className="font-['Inter',sans-serif] text-[14px] text-[#666]">{group.section}</b>
                <div className="flex items-center gap-[8.8px]">
                  <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#8a9099]">
                    Select All
                  </span>
                  <Checkbox active={allOn} onCheck={() => toggleSection(sectionKeys)} />
                </div>
              </div>
              <div className="self-stretch flex flex-col gap-[16.8px]">
                {group.items.map((item) => {
                  const active = checked.has(item.title);
                  return (
                    <button
                      key={item.title}
                      onClick={() => toggle(item.title)}
                      className={`self-stretch rounded-[9.6px] flex items-center py-[9.6px] pl-[9.6px] pr-[17.6px] gap-[12.8px] text-left transition-colors ${active ? 'bg-[#f0fdf9]' : 'hover:bg-[#fafafa]'}`}
                    >
                      <div className="flex flex-1 items-center gap-[12.8px]">
                        <div
                          className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-colors ${active ? 'bg-[#096c5b]' : 'bg-[#f5f5f5]'}`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`h-[12px] w-[12px] ${active ? 'text-white' : 'text-[#096c5b]'}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex flex-col gap-[3.2px]">
                          <b className="font-['Inter',sans-serif] text-[14px] text-black">
                            {item.title}
                          </b>
                          <span className="font-['Inter',sans-serif] text-[12px] font-medium text-[#666]">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <Checkbox active={active} onCheck={() => toggle(item.title)} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-[12.8px]">
        <button
          onClick={onCancel}
          className="rounded-[9.6px] py-[6.4px] px-[19.2px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#dc143c] transition-opacity hover:opacity-70"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="rounded-[9.6px] bg-[#e0f7f4] py-[6.4px] px-[19.2px] font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateManager1;
