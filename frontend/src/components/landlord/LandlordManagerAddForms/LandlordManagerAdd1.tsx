import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import bill from '../../../../assets/billings.png';
import trash from '../../../../assets/trash.svg';
import report from '../../../../assets/reportUser.svg';
import calendar from '../../../../assets/calendar.svg';
import home from '../../../../assets/Home.svg';

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  onCancel: () => void;
  onSend: (data: AddManagerFormValues) => void;
};

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

// ─── Checkbox Box UI ──────────────────────────────────────────────────────────

const CheckboxBox: FunctionComponent<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => (
  <div className="h-5 w-5 relative cursor-pointer shrink-0" onClick={onChange}>
    <div
      className={`absolute h-full w-full top-0 right-0 bottom-0 left-0 shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-[3px] transition-colors ${checked ? 'bg-teal-600' : 'bg-whitesmoke'
        }`}
    />
    {checked && (
      <svg className="absolute inset-0 m-auto w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AddManager1: FunctionComponent<Props> = ({ onCancel, onSend }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<AddManagerFormValues>({
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

  const toggleOne = (key: keyof ManagerPermissionsCheckboxes) => {
    setValue(`checkboxes.${key}`, !checkboxes[key]);
  };

  const onSubmit = (data: AddManagerFormValues) => {
    console.log('=== Add Manager Form Data ===');
    console.log(JSON.stringify(data, null, 2));
    onSend(data);
  };

  // ─── Permission Row ───────────────────────────────────────────────────────

  const PermissionRow = ({
    icon,
    label,
    description,
    field,
  }: {
    icon: string;
    label: string;
    description: string;
    field: keyof ManagerPermissionsCheckboxes;
  }) => (
    <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
      <div className="flex-1 flex items-center gap-[13px]">
        <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100 shrink-0">
          <img className="h-[12px] w-[12px] relative" alt="" src={icon} />
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <b className="relative text-black">{label}</b>
          <div className="relative text-[11px] font-medium text-dimgray">{description}</div>
        </div>
      </div>
      <input type="checkbox" {...register(`checkboxes.${field}`)} className="hidden" />
      <CheckboxBox checked={checkboxes[field]} onChange={() => toggleOne(field)} />
    </div>
  );

  return (
    <div className="relative rounded-tl-[26px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full flex items-center text-left text-[28px] text-white font-poppins">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[490px] flex flex-col items-center justify-center pt-0 px-0 pb-[48px] box-border gap-[34px]"
      >
        <div className="self-stretch h-[698px] flex flex-col items-center">

          {/* ── Header ── */}
          <div className="self-stretch rounded-tl-[26px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-[10px] pl-[46px] pr-[26px] shrink-0">
            <div className="w-[426px] flex flex-col items-start justify-center pt-[26px] px-0 pb-[6px] box-border shrink-0">
              <b className="self-stretch relative">Add Dorm Manager</b>
              <b className="self-stretch relative text-[15px] tracking-[-0.01em] font-inter text-aliceblue">
                Set permission for the facility manager
              </b>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="self-stretch flex flex-col items-start pt-[26px] px-[38px] pb-4 gap-[18px] shrink-0 text-[13px] text-dimgray font-inter overflow-y-auto">

            {/* Email */}
            <div className="self-stretch flex flex-col items-start gap-[6px]">
              <b className="self-stretch relative">Email Address</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-[38px] rounded-[10px] border-whitesmoke border-solid border-[1px] box-border flex items-center py-1 px-[13px]">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    placeholder="e.g. manager@email.com"
                    className="flex-1 bg-transparent text-black text-[13px] font-medium leading-6 outline-none placeholder-slategray"
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* ── Property Management ── */}
            <div className="self-stretch flex flex-col items-start gap-4">
              <b className="self-stretch relative flex items-center">Property Management</b>
              <div className="self-stretch flex flex-col items-start gap-[17px]">
                <PermissionRow icon={trash} label="Delete Buildings" description="Allow manager to remove building records" field="deleteBuildings" />
                <PermissionRow icon={trash} label="Delete Listings" description="Allow manager to remove listing records" field="deleteListings" />
                <PermissionRow icon={home} label="Manage Buildings" description="Allow manager to access and edit building info" field="manageBuildings" />
              </div>
            </div>

            {/* ── Billings and Financials ── */}
            <div className="self-stretch flex flex-col items-start gap-4">
              <b className="self-stretch relative flex items-center">Billings and Financials</b>
              <div className="self-stretch flex flex-col items-start">
                <PermissionRow icon={bill} label="Manage Billings" description="Manage rents and utility payments" field="manageBillings" />
              </div>
            </div>

            {/* ── Tenant Management ── */}
            <div className="self-stretch flex flex-col items-start gap-4">
              <b className="self-stretch relative flex items-center">Tenant Management</b>
              <div className="self-stretch flex flex-col items-start gap-[17px]">
                <PermissionRow icon={calendar} label="Accept Ocular Visits" description="Accept ocular visit requests from potential tenants" field="acceptOcularVisits" />
                <PermissionRow icon={report} label="Report Users" description="Report users for misconduct upon review" field="reportUsers" />
              </div>
            </div>

          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-[13px] text-[13px] text-crimson font-inter">
          <div className="rounded-[10px] flex items-center justify-center py-[6px] px-5 text-red-500">
            <button type="button" className="relative font-semibold" onClick={onCancel}>
              Cancel
            </button>
          </div>
          <div className="w-30 rounded-[10px] bg-lightcyan overflow-hidden flex items-center justify-center py-[6px] text-teal">
            <button type="submit" className="relative font-semibold">
              Send Invite
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AddManager1;
