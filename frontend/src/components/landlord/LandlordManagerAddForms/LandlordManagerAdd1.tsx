import { FunctionComponent, useState } from "react";
import { Icon } from "@iconify/react";

type Props = {
  onCancel: () => void;
  onSend: (data: AddManagerFormValues) => void;
};

const PERMISSIONS = [
  {
    section: "Property Management",
    items: [
      {
        icon: "solar:trash-bin-trash-bold",
        title: "Delete Buildings",
        desc: "Allow manager to remove building records",
      },
      {
        icon: "solar:trash-bin-trash-bold",
        title: "Delete Listings",
        desc: "Allow manager to remove listing records",
      },
      {
        icon: "solar:home-bold",
        title: "Manage Buildings",
        desc: "Allow manager to access and edit building info",
      },
    ],
  },
  {
    section: "Billings and Financials",
    items: [
      {
        icon: "solar:bill-list-bold",
        title: "Manage Billings",
        desc: "Manage rents and utility payments",
      },
    ],
  },
  {
    section: "Tenant Management",
    items: [
      {
        icon: "solar:calendar-bold",
        title: "Accept Ocular Visits",
        desc: "Accept ocular visit requests from potential tenants",
      },
      {
        icon: "solar:flag-bold",
        title: "Report Users",
        desc: "Report users for misconduct upon review",
      },
    ],
  },
];

const ALL_KEYS = PERMISSIONS.flatMap((g) => g.items.map((item) => item.title));

const AddManager1: FunctionComponent<Props> = ({ onCancel, onSend }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const toggleSection = (keys: string[]) => {
    const allOn = keys.every((k) => checked.has(k));
    setChecked((prev) => {
      const next = new Set(prev);
      keys.forEach((k) => (allOn ? next.delete(k) : next.add(k)));
      return next;
    });
  };

  const toggleAll = () => {
    setChecked(
      checked.size === ALL_KEYS.length ? new Set() : new Set(ALL_KEYS),
    );
  };

  const Checkbox = ({
    active,
    onToggle,
  }: {
    active: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
        active
          ? "border-[#096c5b] bg-[#096c5b]"
          : "border-[#d1d5db] bg-[#f5f5f5] shadow-[0px_0px_2px_rgba(0,0,0,0.25)]"
      }`}
      aria-checked={active}
      role="checkbox"
    >
      {active && (
        <Icon
          icon="solar:check-bold"
          className="h-[12px] w-[12px] text-white"
        />
      )}
    </button>
  );

  return (
    <div className="relative rounded-tl-[26px] bg-white w-[490px] flex flex-col items-center pb-[48px] gap-[34px]">
      {/* Header */}
      <div className="self-stretch rounded-tl-[26px] bg-gradient-to-b from-[#096c5b] to-[#16917c] flex flex-col items-start justify-center py-[10px] pl-[46px] pr-[26px]">
        <div className="flex flex-col items-start pt-[26px] pb-[6px] gap-[4px]">
          <b className="font-['Poppins',sans-serif] text-[28px] text-white">
            Add Dorm Manager
          </b>
          <b className="font-['Inter',sans-serif] text-[15px] tracking-[-0.01em] text-[#e8f4f8]">
            Set permission for the facility manager
          </b>
        </div>
      </div>

      {/* Body */}
      <div className="self-stretch flex flex-col items-start px-[38px] pb-[16px] gap-[18px]">
        {/* Email */}
        <div className="self-stretch flex flex-col items-start gap-[6px]">
          <b className="font-['Inter',sans-serif] text-[13px] text-[#666]">
            Email Address
          </b>
          <div className="self-stretch h-[38px] rounded-[10px] border border-[#f5f5f5] flex items-center px-[13px]">
            <span className="font-['Inter',sans-serif] text-[13px] font-medium text-black">
              ncunanan@gmail.com
            </span>
          </div>
        </div>

        {/* Select all */}
        <div className="self-stretch flex items-center justify-end gap-[9px] pr-[18px]">
          <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#8a9099]">
            Select All
          </span>
          <Checkbox
            active={checked.size === ALL_KEYS.length}
            onToggle={toggleAll}
          />
        </div>

        {PERMISSIONS.map((group) => {
          const sectionKeys = group.items.map((i) => i.title);
          const allOn = sectionKeys.every((k) => checked.has(k));
          return (
            <div
              key={group.section}
              className="self-stretch flex flex-col items-start gap-[16px]"
            >
              <div className="self-stretch flex items-center justify-between pr-[18px]">
                <b className="font-['Inter',sans-serif] text-[13px] text-[#666]">
                  {group.section}
                </b>
                <div className="flex items-center gap-[9px]">
                  <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#8a9099]">
                    Select All
                  </span>
                  <Checkbox
                    active={allOn}
                    onToggle={() => toggleSection(sectionKeys)}
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-col gap-[17px]">
                {group.items.map((item) => {
                  const active = checked.has(item.title);
                  return (
                    <button
                      key={item.title}
                      onClick={() => toggle(item.title)}
                      className={`self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px] text-left transition-colors ${
                        active ? "bg-[#f0fdf9]" : "hover:bg-[#fafafa]"
                      }`}
                    >
                      <div className="flex flex-1 items-center gap-[13px]">
                        <div
                          className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-colors ${active ? "bg-[#096c5b]" : "bg-[#f5f5f5]"}`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`h-[12px] w-[12px] ${active ? "text-white" : "text-[#096c5b]"}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <b className="font-['Inter',sans-serif] text-[13px] text-black">
                            {item.title}
                          </b>
                          <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#666]">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <Checkbox
                        active={active}
                        onToggle={() => toggle(item.title)}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-[13px]">
        <button
          onClick={onCancel}
          className="rounded-[10px] py-[6px] px-[20px] font-['Inter',sans-serif] text-[13px] font-semibold text-[#dc143c] transition-opacity hover:opacity-70"
        >
          Cancel
        </button>
        <button
          onClick={onSend}
          className="rounded-[10px] bg-[#e0f7f4] py-[6px] px-[20px] font-['Inter',sans-serif] text-[13px] font-semibold text-[#096c5b] transition-opacity hover:opacity-80"
        >
          Send Invite
        </button>
      </div>
    </div>
  );
};

export default AddManager1;
