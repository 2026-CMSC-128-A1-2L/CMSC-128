import { FunctionComponent } from 'react';

interface StepProps {
    onCancel: () => void;
}

const ReportConfirmation: FunctionComponent<StepProps> = ({onCancel}) => {
  
  const handleClose = () => {
    console.log("Success popup closed.");
    onCancel(); 
    
  };

  return (
  
    <div className="mx-auto h-[500px] relative rounded-2xl bg-white overflow-hidden flex flex-col items-center p-8 box-border text-center font-inter border border-whitesmoke-200 shadow-lg">
      <div className="self-stretch h-full overflow-hidden shrink-0 flex flex-col items-center pt-[45px] px-2.5 pb-6 box-border gap-6">
        
        
        <div className="self-stretch flex flex-col items-center">
          <div className="bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
            <div className="h-[84px] w-[84px] bg-lightcyan rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-teal" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

         
          <div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-2.5 gap-2.5">
            <b className="self-stretch relative text-2xl leading-8 text-black">
              Report Submitted.
            </b>
            <div className="self-stretch relative text-sm leading-5 text-black">
              <span className="font-medium text-dimgray">
                {`Thank you for your report. You’re helping keep ATLAS safe for our `}
              </span>
              <i className="font-bold text-teal">mga iskolar ng bayan</i>
              <span className="font-medium text-dimgray">
                {` and landlords.`}
                <br />
                <br />
                Your report has been successfully submitted. Our team will review the details and take appropriate action.
              </span>
            </div>
          </div>
        </div>

        
        <div className="self-stretch flex flex-col items-center p-2.5 mt-auto">
          <button 
            onClick={handleClose}
            className="w-full max-w-[200px] rounded-xl bg-lightcyan border-none overflow-hidden flex items-center justify-center py-3 px-8 text-teal cursor-pointer transition-all hover:bg-teal hover:text-white active:scale-95 shadow-sm"
          >
            <div className="relative text-sm font-bold">Close</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportConfirmation;