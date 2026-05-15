import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '../../../../assets/infoicon_icon.svg';
import FinalizeDisplayLines from './FinalizeDisplayLines';
import CheckboxItem from '../user-report/CheckboxItem';
import ConfirmTransfer1 from '../../../components/user/Profile/ConfirmTransfer1'; 
import ConfirmTransfer2 from '../Profile/ConfirmTransfer2';

// 1. Updated the interface to accept the state payloads from previous steps
interface FinalizeContentProps {
  leaseTransferStages: number;
  setLeaseTransferStages: any;
  DormitoryName: string;
  RoomNumber: string;
  formData: {
    category: string;
    intendedDate: string;
    explanation: string;
  };
  financialsDocsData: {
    transferFee: string;
    depositHandling: string;
    advanceRentStatus: string;
  };
}

export default function FinalizeContent(props: FinalizeContentProps) {
  const { 
    leaseTransferStages, 
    setLeaseTransferStages, 
    DormitoryName, 
    RoomNumber,
    formData,
    financialsDocsData 
  } = props;
  
  const Property = `${DormitoryName} - ${RoomNumber}`;
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showSuccessPopup2, setShowSuccessPopup2] = useState(false);

  const onUserProfileTextClick = useCallback(() => {
    setShowSuccessPopup(true);
  }, []);

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  const onNext = useCallback(() => {
    setShowSuccessPopup(false); 
    setShowSuccessPopup2(true); 
  }, []); 

  const closePopup2 = () => {
    setShowSuccessPopup2(false); 
    navigate('/profile-switcher'); 
  };
  
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <>
      <div className="flex text-lora font-bold items-end px-15 gap-2 mb-2">
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <ConfirmTransfer1 onClose={closePopup} onConfirm={onNext} />
          </div>
        )}
        {showSuccessPopup2 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <ConfirmTransfer2 onClose={closePopup2} />
          </div>
        )}
        <img src={InfoIcon} alt="" className="w-5 h-5 " />
        <p className=" text-[18px]">Finalize</p>
      </div>
      <div className="flex flex-col gap-3 w-full px-15 py-2 border-[#f0f0f0] border-2 rounded-num-10">
        <div className="flex flex-col gap-10 font-bold text-inter text-[14px] text-gray-100 pt-4">
          <div className="flex flex-col w-full gap-2">
            
            {/* Unit Info Section */}
            <p className="text-slate-900 font-bold text-[14px] tracking-wide my-4 uppercase">
              Unit Being Transferred
            </p>
            <FinalizeDisplayLines category="PROPERTY" item={Property} />
            <FinalizeDisplayLines category="REASON" item={formData.category || 'Not specified'} />
            <FinalizeDisplayLines category="TRANSFER DATE" item={formData.intendedDate || 'Not specified'} />
            
            {/* Financial Terms Section */}
            <p className="text-slate-900 font-bold text-[14px] tracking-wide my-4 uppercase">
              Financial Terms
            </p>
            <FinalizeDisplayLines 
              category="TRANSFER FEE" 
              item={financialsDocsData.transferFee ? `₱${financialsDocsData.transferFee}` : '₱0.00'} 
            />
            <FinalizeDisplayLines category="DEPOSIT" item={financialsDocsData.depositHandling || 'Not specified'} />
            <FinalizeDisplayLines category="ADVANCE RENT" item={financialsDocsData.advanceRentStatus || 'Not specified'} />
          </div>

          <div className="w-full py-0.5 bg-[#f0f0f0] rounded-full"></div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-black">TERMS & CONDITIONS</p>

            <div className="flex flex-col gap-5 border border-[#f0f0f0] rounded-[10px] p-6 mb-4 font-lora">
              {/* Item 1 */}
              <div className="flex flex-col">
                <p className="font-bold text-[14px]">1. General</p>
                <p className="text-gray-400 font-medium text-[12px] leading-relaxed mt-1">
                  This Lease Transfer Application ("Pasalo") is a formal request to transfer tenancy
                  rights from the current tenant to an incoming tenant, subject to the approval of
                  the landlord or housing manager through ATLAS.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col">
                <p className="font-bold text-[14px]">2. Landlord Approval Required</p>
                <p className="text-gray-400 font-medium text-[12px] leading-relaxed mt-1">
                  Submission of this application does not constitute a confirmed transfer. The
                  landlord retains the right to approve, reject, or request modifications to this
                  transfer request within 5 business days of submission.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col">
                <p className="font-bold text-[14px]">3. Outgoing Tenant Obligations</p>
                <p className="text-gray-400 font-medium text-[12px] leading-relaxed mt-1">
                  The current tenant must ensure all outstanding balances (rent, utilities,
                  penalties) are fully settled before the transfer is approved. The unit must be
                  returned in the condition described in this application.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col">
                <p className="font-bold text-[14px]">4. Financial Settlements</p>
                <p className="text-gray-400 font-medium text-[12px] leading-relaxed mt-1">
                  Security deposit handling and advance rent arrangements are subject to separate
                  agreement between the current tenant, incoming tenant, and landlord. ATLAS is not
                  liable for any financial disputes arising from the transfer.
                </p>
              </div>

              {/* Item 5 */}
              <div className="flex flex-col">
                <p className="font-bold text-[14px]">5. Documents & Identity</p>
                <p className="text-gray-400 font-medium text-[12px] leading-relaxed mt-1">
                  All submitted documents must be authentic. Submission of falsified documents will
                  result in immediate rejection and possible account suspension.
                </p>
              </div>
            </div>

            <div>
              <CheckboxItem
                label="I have read and agree to the Terms and Conditions above"
                isChecked={isAgreed}
                onToggle={() => {
                  setIsAgreed(!isAgreed);
                }}
                noBorder={true}
              />
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
            className={`px-4 py-1 rounded-full bg-[#f1f5f9] transition-all
              ${isAgreed ? 'text-[#096c5b] hover:bg-[#e2e8f0] cursor-pointer' : 'text-[#cfcfcf] cursor-not-allowed'}
            `}
            onClick={onUserProfileTextClick}
            disabled={!isAgreed}
          >
            Finalize
          </button>
        </div>
      </div>
    </>
  );
}