import { useState, type ChangeEvent } from 'react';
import InfoIcon from '../../../../assets/infoicon_icon.svg';
import FileUploadCard from '../../general/FileUploadCard';

interface DetailsFormType {
  transferFee: string;
  depositHandling: string;
  advanceRentStatus: string;
}

interface UploadedFilesType {
  leaseAgreement: File | null;
  requestLetter: File | null;
}

interface DocumentsContentProps {
  leaseTransferStages: number;
  setLeaseTransferStages: any;
  detailsForm: { transferFee: string; depositHandling: string; advanceRentStatus: string };
  setDetailsForm: React.Dispatch<React.SetStateAction<DetailsFormType>>;
  uploadedFiles: { leaseAgreement: File | null; requestLetter: File | null };
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFilesType>>;
}

export default function DocumentsContent(props: DocumentsContentProps) {
  const { leaseTransferStages, setLeaseTransferStages, detailsForm, setDetailsForm, uploadedFiles, setUploadedFiles } = props;


  // 3. Complete Form Validation Error Flag States
  const [errors, setErrors] = useState({
    transferFee: false,
    depositHandling: false,
    advanceRentStatus: false,
    leaseAgreement: false,
    requestLetter: false,
  });

  const [financials] = useState({
    outstandingBalance: '₱0.00',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Currency filter validation check logic for Transfer Fee box
    if (name === 'transferFee') {
      // Allows digits and optionally up to two decimal places maximum
      const monetaryRegex = /^\d*\.?\d{0,2}$/;
      if (!monetaryRegex.test(value)) {
        return; // Deny non-numeric currency typing
      }
    }

    setDetailsForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear UI warning errors dynamically upon typing input
    if (value !== '') {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (field: 'leaseAgreement' | 'requestLetter') => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setUploadedFiles((prev) => ({
        ...prev,
        [field]: selectedFile,
      }));

      // Dismiss dynamic file warning errors once uploaded successfully
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleProceedClick = () => {
    const checkErrors = {
      transferFee: !detailsForm.transferFee || parseFloat(detailsForm.transferFee) <= 0,
      depositHandling: !detailsForm.depositHandling,
      advanceRentStatus: !detailsForm.advanceRentStatus,
      leaseAgreement: !uploadedFiles.leaseAgreement,
      requestLetter: !uploadedFiles.requestLetter,
    };

    setErrors(checkErrors);

    // Halt step transition workflows if explicit required item metrics are missing
    const hasAnyErrors = Object.values(checkErrors).some((isInvalid) => isInvalid);
    if (hasAnyErrors) {
      return;
    }

    // Submit safe formatted values forward cleanly
    console.log('Text Form Submissions:', detailsForm);
    console.log('File Binary Form Submissions:', uploadedFiles);
    setLeaseTransferStages(leaseTransferStages + 1);
  };

  return (
    <>
      <div className="flex text-lora font-bold items-end px-15 gap-2 mb-2">
        <img src={InfoIcon} alt="" className="w-5 h-5 " />
        <p className=" text-[18px]">Transfer Details</p>
      </div>
      <div className="flex flex-col gap-3 w-full px-15 py-4 border-[#f0f0f0] border-2 rounded-num-10">
        <div className="flex flex-col gap-10 font-bold text-inter text-[14px] text-gray-100 pt-4">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-black">FINANCIAL TERMS</p>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Transfer Fee</p>
                <input
                  className={`border-2 rounded-num-10 py-3 px-2 outline-none transition-colors ${
                    errors.transferFee ? 'border-red-400 bg-red-50/20' : 'border-[#f0f0f0]'
                  }`}
                  disabled={false}
                  type="text"
                  name="transferFee"
                  value={detailsForm.transferFee}
                  onChange={handleInputChange}
                  placeholder="Enter fee amount (e.g. 500)..."
                />
                {errors.transferFee && (
                  <span className="text-red-500 text-[12px] font-medium mt-0.5 animate-pulse">
                    * Please enter a valid Transfer Fee
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p>Deposit Handling</p>
                <select
                  className={`border-2 rounded-num-10 py-3 px-2 outline-none transition-colors ${
                    errors.depositHandling ? 'border-red-400 bg-red-50/20' : 'border-[#f0f0f0]'
                  }`}
                  disabled={false}
                  name="depositHandling"
                  value={detailsForm.depositHandling}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select option...</option>
                  <option value="Transfer to New Tenant">Transfer to New Tenant</option>
                  <option value="Refund to Current Tenant">Refund to Current Tenant</option>
                  <option value="Forfeit">Forfeit Deposit</option>
                </select>
                {errors.depositHandling && (
                  <span className="text-red-500 text-[12px] font-medium mt-0.5 animate-pulse">
                    * Please fill up Deposit Handling
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p>Advance Rent Status</p>
                <select 
                  className={`border-2 rounded-num-10 py-3 px-2 outline-none transition-colors ${
                    errors.advanceRentStatus ? 'border-red-400 bg-red-50/20' : 'border-[#f0f0f0]'
                  }`}
                  name="advanceRentStatus"
                  value={detailsForm.advanceRentStatus}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select status...</option>
                  <option value="Fully Paid">Fully Paid</option>
                  <option value="Not Paid">Not Paid</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
                {errors.advanceRentStatus && (
                  <span className="text-red-500 text-[12px] font-medium mt-0.5 animate-pulse">
                    * Please fill up Advance Rent Status
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p>Outstanding Balance</p>
                <input
                  className="border-2 border-[#f0f0f0] bg-gray-50 text-gray-400 rounded-num-10 py-3 px-2"
                  disabled={true}
                  type="text"
                  value={financials.outstandingBalance}
                />
              </div>
            </div>
          </div>

          <div className="w-full py-0.5 bg-[#f0f0f0] rounded-full"></div>
          
          <div className="flex flex-col gap-4">
            <p className="font-bold text-black">DOCUMENTS</p>
            
            <div className="flex flex-col w-full">
              <FileUploadCard
                title="Current Lease Agreement"
                isRequired={true}
                desc=".pdf less than 500KB"
                fileName={uploadedFiles.leaseAgreement?.name || ""}
                onFileChange={handleFileChange('leaseAgreement')}
              />
              {errors.leaseAgreement && (
                <span className="text-red-500 text-[12px] font-medium -mt-2 mb-4 ml-1 animate-pulse">
                  * Please upload your Current Lease Agreement
                </span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <FileUploadCard
                title="Transfer Request Letter"
                isRequired={true}
                desc=".pdf less than 500KB"
                fileName={uploadedFiles.requestLetter?.name || ""}
                onFileChange={handleFileChange('requestLetter')}
              />
              {errors.requestLetter && (
                <span className="text-red-500 text-[12px] font-medium -mt-2 mb-4 ml-1 animate-pulse">
                  * Please upload your Transfer Request Letter
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-10 font-inter font-bold py-20 justify-center">
          <button
            className="px-4 py-1 cursor-pointer text-crimson rounded-full hover:bg-red-50 transition-colors"
            onClick={() => {
              setLeaseTransferStages(leaseTransferStages - 1);
            }}
          >
            Go Back
          </button>
          <button
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