interface FinalizeContentProps {
  reportStages: number;
  setReportStages: any;
  reportJsonData: string;
}

import FileUploadCard from '../../general/FileUploadCard';
import ConfirmReport from '../../../components/user/Profile/ConfirmReport';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';


export default function FinalizeContent(props: FinalizeContentProps) {
  const navigate = useNavigate(); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onUserProfileTextClick = useCallback(() => {
      setShowSuccessPopup(true);
    }, []);
  
  const closePopup = () => {
    setShowSuccessPopup(false);
    navigate('/profile-switcher');
  };


  const { reportStages, setReportStages, reportJsonData } = props;
  return (
    <div className="flex flex-col max-w-[714px] md:w-[714px] text-black font-inter py-12 gap-3 items-center">
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <ConfirmReport onClose={closePopup} />
        </div>
      )}
      
      <FileUploadCard title="Review Photo 1" />
      <FileUploadCard title="Review Photo 2" />

      <div className="flex gap-10  font-inter font-bold py-10">
        <button
          className="px-4 py-1 w-fit font-bold text-[14px] cursor-pointer text-crimson rounded-full"
          onClick={() => {
            setReportStages(reportStages - 1);
          }}
        >
          Go Back
        </button>
        <button
          className="px-4 py-1 w-fit font-bold text-[14px] cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full"
          onClick={onUserProfileTextClick}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
