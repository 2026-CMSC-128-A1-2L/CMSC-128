import { FunctionComponent, useState } from 'react';
import bill from 'frontend/assets/billings.png';
import trash from 'frontend/assets/trash.svg';
import report from 'frontend/assets/reportUser.svg';
import calendar from 'frontend/assets/calendar.svg';
import home from 'frontend/assets/Home.svg';

interface PermissionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: 'property' | 'finance' | 'tenant';
}

type StepProps = {
  onCancel: () => void;
  onNext: (email: string, permissions: string[]) => void;
};

const PERMISSIONS: PermissionOption[] = [
  { id: 'del_build', label: 'Delete Buildings', description: 'Allow manager to remove building records', icon: trash, category: 'property' },
  { id: 'del_list', label: 'Delete Listings', description: 'Allow manager to remove listing records', icon: trash, category: 'property' },
  { id: 'manage_build', label: 'Manage Buildings', description: 'Allow manager to access and edit building info', icon: home, category: 'property' },
  { id: 'manage_bill', label: 'Manage Billings', description: 'Manage rents and utility payments', icon: bill, category: 'finance' },
  { id: 'ocular', label: 'Accept Ocular Visits', description: 'Accept ocular visit requests', icon: calendar, category: 'tenant' },
  { id: 'report_user', label: 'Report Users', description: 'Report users for misconduct upon review', icon: report, category: 'tenant' },
];

const UpdateManager1: FunctionComponent<StepProps> = ({ onCancel, onNext }) => {
  const email = 'ncunanan@gmail.com';
  const [selectedIds, setSelectedIds] = useState<string[]>(['manage_bill', 'manage_build']);

  const togglePermission = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleCategory = (category: string) => {
    const categoryIds = PERMISSIONS.filter(p => p.category === category).map(p => p.id);
    const allSelected = categoryIds.every(id => selectedIds.includes(id));
    
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !categoryIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...categoryIds])));
    }
  };

  return (
    <div className="relative rounded-[24px] bg-white w-full flex flex-col items-center text-left text-white font-poppins shadow-xl overflow-hidden">
      
      {/* Header Section */}
      <div className="self-stretch [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-8 pl-10 pr-6">
        <div className="w-full flex flex-col items-start justify-center pt-4 px-0 pb-1 shrink-0">
          <b className="self-stretch relative text-[22px]">Update Permissions</b>
          <b className="self-stretch relative text-[13px] tracking-[-0.01em] font-inter text-aliceblue">
            Update your manager's permissions
          </b>
        </div>
      </div>

      {/* Main Content */}
      <div className="self-stretch flex flex-col items-start pt-6 px-8 pb-4 gap-8 text-[12px] text-dimgray font-inter">
        
        {/* Static Email Display */}
        <div className="self-stretch flex flex-col items-start gap-2">
          <b className="self-stretch relative text-[11px]">Email Address</b>
          <div className="self-stretch h-9 rounded-lg border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start justify-center py-1 px-3 text-black font-inter text-[12px] bg-gray-50">
            <div className="relative font-medium">{email}</div>
          </div>
        </div>

        {/* Permission Sections */}
        {[
          { key: 'property', label: 'Property Management' },
          { key: 'finance', label: 'Billings and Financials' },
          { key: 'tenant', label: 'Tenant Management' }
        ].map((cat) => {
          const catIds = PERMISSIONS.filter(p => p.category === cat.key).map(p => p.id);
          const isCatSelected = catIds.length > 0 && catIds.every(id => selectedIds.includes(id));

          return (
            <div key={cat.key} className="self-stretch flex flex-col items-start gap-3">
              <div className="self-stretch flex items-end py-0 pl-0 pr-4">
                <b className="self-stretch flex-1 relative flex items-center text-[12px]">
                  {cat.label}
                </b>
                <button 
                  onClick={() => toggleCategory(cat.key)}
                  className="flex items-center gap-[8px] text-[10px] text-slategray border-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <div className="relative font-medium">Select All</div>
                  <div className="h-4 w-4 relative">
                    <div className={`absolute h-full w-full rounded-sm transition-all ${
                      isCatSelected ? 'bg-teal' : 'bg-whitesmoke-100 border border-gray-200'
                    }`} />
                    {isCatSelected && <CheckIcon />}
                  </div>
                </button>
              </div>

              <div className="self-stretch flex flex-col items-start gap-[14px]">
                {PERMISSIONS.filter(p => p.category === cat.key).map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <label 
                      key={p.id}
                      className="self-stretch rounded-lg flex items-center py-2 px-4 gap-3 cursor-pointer hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={isSelected}
                        onChange={() => togglePermission(p.id)}
                      />
                      <div className="w-7 h-7 flex items-center justify-center relative rounded-full bg-whitesmoke-100 shrink-0">
                        <img className="h-3.5 w-3.5 relative" alt="" src={p.icon} />
                      </div>
                      <div className="flex-1 flex flex-col items-start justify-center gap-0.5 text-black">
                        <b className="relative text-[12px]">{p.label}</b>
                        <div className="relative text-[10px] font-medium text-dimgray leading-tight">{p.description}</div>
                      </div>
                      <div className="h-5 w-5 relative shrink-0">
                        <div className={`absolute h-full w-full rounded-sm transition-all ${
                          isSelected ? 'bg-teal' : 'bg-whitesmoke-100 border border-gray-200'
                        }`} />
                        {isSelected && <CheckIcon />}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 py-8 text-[12px] text-crimson font-inter">
        <button 
          onClick={onCancel}
          className="rounded-lg flex items-center justify-center py-1.5 px-6 cursor-pointer bg-transparent border-none text-crimson font-semibold hover:bg-red-50 active:scale-95 transition-all"
        >
          Cancel
        </button>
        <button 
          onClick={() => onNext(email, selectedIds)}
          className="rounded-lg bg-lightcyan overflow-hidden flex items-center justify-center py-1.5 px-6 border-none text-teal font-semibold cursor-pointer hover:bg-opacity-80 active:scale-95 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg 
    className="absolute h-[70%] w-[70%] top-[15%] left-[15%]" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="4" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default UpdateManager1;