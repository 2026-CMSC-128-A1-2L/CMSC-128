import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '../../../../assets/infoicon_icon.svg';

interface ReasonContentProps {
  leaseTransferStages: number;
  setLeaseTransferStages: React.Dispatch<React.SetStateAction<number>>;
  reasonForm: {
    category: string;
    intendedDate: string;
    explanation: string;
  };
  setReasonForm: React.Dispatch<
    React.SetStateAction<{
      category: string;
      intendedDate: string;
      explanation: string;
    }>
  >;
}

export default function ReasonContent(props: ReasonContentProps) {
  const { leaseTransferStages, setLeaseTransferStages, reasonForm, setReasonForm } = props;
  const navigate = useNavigate();
  const fieldTextClass = 'font-normal placeholder:text-[#b9bec4]';
  const filledFieldTextClass = 'text-[#024338]';
  const emptyFieldTextClass = 'text-gray-400';
  const readOnlyFieldTextClass = 'font-normal text-[#647483]';

  // Track validation error states explicitly
  const [errors, setErrors] = useState({
    category: false,
    intendedDate: false,
  });

  const [leaseInfo] = useState({
    startDate: '2025-06-01',
    endDate: '2026-05-31',
    monthsRemaining: '12',
    outstandingBalance: '₱0.00',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setReasonForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error message once the user starts filling out the field
    if (value !== '') {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleProceedClick = () => {
    const isCategoryEmpty = !reasonForm.category;
    const isDateEmpty = !reasonForm.intendedDate;

    // Check if fields are empty and set errors
    setErrors({
      category: isCategoryEmpty,
      intendedDate: isDateEmpty,
    });

    // Prevent submission if either field is missing
    if (isCategoryEmpty || isDateEmpty) {
      return;
    }

    // Safely proceed if all validations pass
    setLeaseTransferStages(leaseTransferStages + 1);
  };

  return (
    <>
      <div className="flex text-lora font-bold items-end px-15 gap-2 mb-2">
        <img src={InfoIcon} alt="" className="w-5 h-5 " />
        <p className=" text-[18px]">Reason for Transfer</p>
      </div>
      <div className="flex flex-col gap-3 w-full px-15 py-4 border-[#f0f0f0] border-2 rounded-num-10">
        <div className="flex flex-col gap-10 font-bold text-inter text-[14px] text-gray-100 pt-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <p>Category</p>
                <select
                  className={`border-2 rounded-num-10 py-3 px-2 outline-none transition-colors ${fieldTextClass} ${
                    reasonForm.category ? filledFieldTextClass : emptyFieldTextClass
                  } ${errors.category ? 'border-red-400 bg-red-50/20' : 'border-[#f0f0f0]'}`}
                  name="category"
                  value={reasonForm.category}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select a reason...
                  </option>
                  <option value="Academics">Graduating</option>
                  <option value="Financial">Financial Reasons</option>
                  <option value="Relocation">Changing Dorms</option>
                  <option value="Personal">Personal Reasons</option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-[12px] font-medium mt-0.5 animate-pulse">
                    * Please fill up Category
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p>Intended Transfer Date</p>
                <input
                  className={`border-2 rounded-num-10 py-3 px-2 outline-none transition-colors ${fieldTextClass} ${
                    reasonForm.intendedDate ? filledFieldTextClass : emptyFieldTextClass
                  } ${errors.intendedDate ? 'border-red-400 bg-red-50/20' : 'border-[#f0f0f0]'}`}
                  type="date"
                  name="intendedDate"
                  value={reasonForm.intendedDate}
                  onChange={handleInputChange}
                />
                {errors.intendedDate && (
                  <span className="text-red-500 text-[12px] font-medium mt-0.5 animate-pulse">
                    * Please fill up Intended Transfer Date
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-2">
                <p>Explanation</p>
                <textarea
                  className={`border-2 border-[#f0f0f0] rounded-num-10 py-5 px-2 outline-none resize-none ${fieldTextClass} ${
                    reasonForm.explanation ? filledFieldTextClass : emptyFieldTextClass
                  }`}
                  placeholder="Provide further explanation for transfer..."
                  name="explanation"
                  value={reasonForm.explanation}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="w-full py-0.5 bg-[#f0f0f0] rounded-full"></div>

          <div className="flex flex-col gap-4">
            <p className="font-bold text-black">LEASE INFORMATION</p>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Lease Start Date</p>
                <input
                  className={`border-2 border-[#f0f0f0] bg-gray-50 rounded-num-10 py-3 px-2 ${readOnlyFieldTextClass}`}
                  disabled={true}
                  type="date"
                  value={leaseInfo.startDate}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Lease End Date</p>
                <input
                  className={`border-2 border-[#f0f0f0] bg-gray-50 rounded-num-10 py-3 px-2 ${readOnlyFieldTextClass}`}
                  disabled={true}
                  type="date"
                  value={leaseInfo.endDate}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Months Remaining</p>
                <input
                  className={`border-2 border-[#f0f0f0] bg-gray-50 rounded-num-10 py-3 px-2 ${readOnlyFieldTextClass}`}
                  disabled={true}
                  type="text"
                  value={leaseInfo.monthsRemaining}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Outstanding Balance</p>
                <input
                  className={`border-2 border-[#f0f0f0] bg-gray-50 rounded-num-10 py-3 px-2 ${readOnlyFieldTextClass}`}
                  disabled={true}
                  type="text"
                  value={leaseInfo.outstandingBalance}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 font-inter font-bold py-20 justify-center">
          <button
            type="button"
            className="px-4 py-1 cursor-pointer text-crimson rounded-full hover:bg-red-50 transition-colors"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
          <button
            type="button"
            className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded-full transition-colors"
            onClick={handleProceedClick}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
}
