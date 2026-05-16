import type { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  onCancel: () => void;
  onSend: (data: AddManagerFormValues) => void;
};

// ─── Permission config (icon + metadata) ─────────────────────────────────────

const PERMISSIONS = [
  {
    section: 'Property Management',
    items: [
      {
        icon: 'solar:trash-bin-trash-bold',
        title: 'Delete Buildings',
        desc: 'Allow manager to remove building records',
        field: 'deleteBuildings' as const,
      },
      {
        icon: 'solar:trash-bin-trash-bold',
        title: 'Delete Listings',
        desc: 'Allow manager to remove listing records',
        field: 'deleteListings' as const,
      },
      {
        icon: 'solar:home-bold',
        title: 'Manage Buildings',
        desc: 'Allow manager to access and edit building info',
        field: 'manageBuildings' as const,
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
        field: 'manageBillings' as const,
      },
    ],
  },
  {
    section: 'Tenant Management',
    items: [
      {
        icon: 'solar:calendar-bold',
        title: 'Accept Ocular Visits',
        desc: 'Accept ocular visit requests from potential tenants',
        field: 'acceptOcularVisits' as const,
      },
      {
        icon: 'solar:flag-bold',
        title: 'Report Users',
        desc: 'Report users for misconduct upon review',
        field: 'reportUsers' as const,
      },
    ],
  },
];

// ─── Checkbox Interface ───────────────────────────────────────────────────────

interface ManagerPermissionsCheckboxes {
  deleteBuildings: boolean;
  deleteListings: boolean;
  manageBuildings: boolean;
  manageBillings: boolean;
  acceptOcularVisits: boolean;
  reportUsers: boolean;
}

// ─── Full Form Shape ──────────────────────────────────────────────────────────

export interface AddManagerFormValues {
  email: string;
  checkboxes: ManagerPermissionsCheckboxes;
}

// ─── Checkbox UI ─────────────────────────────────────────────────────────────

const Checkbox: FunctionComponent<{ active: boolean; onToggle: () => void }> = ({
  active,
  onToggle,
}) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
      active
        ? 'border-[#096c5b] bg-[#096c5b] dark:border-[#12342e] dark:bg-[#12342e]'
        : 'border-[#d1d5db] bg-[#f5f5f5] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] dark:border-[#303331] dark:bg-[#1f2022]'
    }`}
    aria-checked={active}
    role="checkbox"
  >
    {active && <Icon icon="solar:check-bold" className="h-[12px] w-[12px] text-white" />}
  </button>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AddManager1: FunctionComponent<Props> = ({ onCancel, onSend }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddManagerFormValues>({
    defaultValues: {
      email: '',
      checkboxes: {
        deleteBuildings: false,
        deleteListings: false,
        manageBuildings: false,
        manageBillings: false,
        acceptOcularVisits: false,
        reportUsers: false,
      },
    },
    mode: 'onChange',
  });

  const checkboxes = watch('checkboxes');

  // ─── Toggle helpers ───────────────────────────────────────────────────────

  const toggleOne = (field: keyof ManagerPermissionsCheckboxes) => {
    setValue(`checkboxes.${field}`, !checkboxes[field]);
  };

  const toggleAll = () => {
    const allFields = PERMISSIONS.flatMap((g) => g.items.map((i) => i.field));
    const allOn = allFields.every((f) => checkboxes[f]);
    allFields.forEach((f) => setValue(`checkboxes.${f}`, !allOn));
  };

  const allFields = PERMISSIONS.flatMap((g) => g.items.map((i) => i.field));
  const isAllChecked = allFields.every((f) => checkboxes[f]);

  // ─── Submit ───────────────────────────────────────────────────────────────

  const onSubmit = (data: AddManagerFormValues) => {
    console.log('=== Add Manager Form Data ===');
    console.log(JSON.stringify(data, null, 2));
    onSend(data);
  };

  return (
    // AFTER
    <div className="relative rounded-[26px] bg-white dark:bg-[#141515] w-[490px] flex flex-col items-center overflow-hidden max-h-[90vh]">
      {/* ── Header ── */}
      <div className="self-stretch rounded-tl-[26px] bg-linear-to-b from-[#096c5b] to-[#16917c] flex flex-col items-start justify-center py-[10px] pl-[46px] pr-[26px]">
        <div className="flex flex-col items-start pt-[26px] pb-[6px] gap-[4px]">
          <b className="font-['Poppins',sans-serif] text-[28px] text-white">Add Dorm Manager</b>
          <b className="font-['Inter',sans-serif] text-[15px] tracking-[-0.01em] text-[#e8f4f8]">
            Set permission for the facility manager
          </b>
        </div>
      </div>
      {/* ── Body ── */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="self-stretch flex flex-col items-start px-[38px] pb-[6px] gap-[18px] overflow-y-auto max-h-full flex-1"
      >
        <div className="pb-[32px]" />
        {/* Email */}
        <div className="self-stretch flex flex-col items-start gap-[6px]">
          <b className="font-['Inter',sans-serif] text-[13px] text-[#666] dark:text-[#a4acba]">
            Email Address
          </b>
          <div className="self-stretch flex flex-col gap-1">
            <div className="self-stretch h-[38px] rounded-[10px] border border-[#f5f5f5] dark:border-[#303331] flex items-center px-[13px]">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                placeholder="e.g. manager@email.com"
                className="flex-1 bg-transparent font-['Inter',sans-serif] text-[13px] font-medium text-black dark:text-[#d7e0ef] outline-none placeholder-[#8a9099] dark:placeholder-[#6b7280]"
              />
            </div>
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>
        </div>

        {/* Global Select All */}
        <div className="self-stretch flex items-center justify-end gap-[9px] pr-[18px]">
          <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#8a9099] dark:text-[#a4acba]">
            Select All
          </span>
          <Checkbox active={isAllChecked} onToggle={toggleAll} />
        </div>

        {/* Permission Sections */}
        {PERMISSIONS.map((group) => {
          return (
            <div key={group.section} className="self-stretch flex flex-col items-start gap-[16px]">
              {/* Section header — no per-section Select All */}
              <b className="font-['Inter',sans-serif] text-[13px] text-[#666] dark:text-[#a4acba]">
                {group.section}
              </b>

              {/* Permission rows */}
              <div className="self-stretch flex flex-col gap-[17px]">
                {group.items.map((item) => {
                  const active = checkboxes[item.field];
                  return (
                    <button
                      key={item.field}
                      type="button"
                      onClick={() => toggleOne(item.field)}
                      className={`self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px] text-left transition-colors ${
                        active
                          ? 'bg-[#f0fdf9] dark:bg-[#12342e]'
                          : 'hover:bg-[#fafafa] dark:hover:bg-[#1f2022]'
                      }`}
                    >
                      {/* Hidden RHF field to keep form values in sync */}
                      <input
                        type="checkbox"
                        {...register(`checkboxes.${item.field}`)}
                        className="hidden"
                      />

                      <div className="flex flex-1 items-center gap-[13px]">
                        {/* Icon circle — teal when active */}
                        <div
                          className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full transition-colors ${
                            active ? 'bg-[#096c5b]' : 'bg-[#f5f5f5] dark:bg-[#1f2022]'
                          }`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`h-[12px] w-[12px] ${active ? 'text-white' : 'text-[#096c5b] dark:text-[#72cbb8]'}`}
                          />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <b className="font-['Inter',sans-serif] text-[13px] text-black dark:text-[#d7e0ef]">
                            {item.title}
                          </b>
                          <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#666] dark:text-[#a4acba]">
                            {item.desc}
                          </span>
                        </div>
                      </div>

                      <Checkbox active={active} onToggle={() => toggleOne(item.field)} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Footer ── */}
        <div className="self-stretch flex items-center justify-center gap-[13px] pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[10px] py-[6px] px-[20px] font-['Inter',sans-serif] text-[13px] font-semibold text-[#dc143c] dark:text-red-400 transition-opacity hover:opacity-70"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-[10px] bg-[#e0f7f4] dark:bg-[#12342e] py-[6px] px-[20px] font-['Inter',sans-serif] text-[13px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
          >
            Send Invite
          </button>
        </div>
        <div className="pb-[32px]" />
      </form>
    </div>
  );
};

export default AddManager1;
