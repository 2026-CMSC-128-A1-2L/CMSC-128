import { type FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';

interface TutorialBubbleProps {
  show: boolean;
  onClose: () => void;
}

const TutorialBubble: FunctionComponent<TutorialBubbleProps> = ({ show, onClose }) => {
  const [step, setStep] = useState(1);

  const helpContent = [
    {
      title: 'Submit Documents',
      text: '(For Old UP Students - Option 1) Upload your official University ID. Your name, photo, and college must be clear.',
      position: 'top-[55px] left-[80px]',
      total: 3,
      currentStep: 1,
    },
    {
      title: 'Submit Documents',
      text: '(For Old UP Students - Option 2) Upload your official Form 5 which can be downloaded from your AMIS portal.',
      position: 'top-[55px] left-[80px]',
      total: 3,
      currentStep: 2,
    },
    {
      title: 'Submit Documents',
      text: '(For Incoming Freshman Students) Upload your Notice of Admission that was sent to you via your UP mail.',
      position: 'top-[55px] left-[80px]',
      total: 3,
      currentStep: 3,
    },
    {
      title: 'Reviewing Documents',
      text: 'Once submitted, the admin will validate your submissions.',
      position: 'top-[55px] left-[390px]',
      total: 2,
      currentStep: 1,
    },
    {
      title: 'Reviewing Documents',
      text: 'Reviewing your documents may take up to 48 to 72 hours.',
      position: 'top-[55px] left-[390px]',
      total: 2,
      currentStep: 2,
    },
    {
      title: 'Finalized Documents',
      text: 'Once the admin has reviewed and approved of your documents, your account is now secured!',
      position: 'top-[55px] left-[710px]',
      total: 3,
      currentStep: 1,
    },
    {
      title: 'Finalized Documents',
      text: 'As a verified user, you can now apply, manage, and settle your housing during your...',
      position: 'top-[55px] left-[710px]',
      total: 3,
      currentStep: 2,
    },
    {
      title: 'Finalized Documents',
      text: 'stay here at UPLB. If you have more questions you may visit <here> or contact our admins.',
      position: 'top-[55px] left-[710px]',
      total: 3,
      currentStep: 3,
    },
  ];

  if (!show) return null;

  const current = helpContent[step - 1];
  const totalSteps = helpContent.length;
  const isLastStep = step === totalSteps;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleClose = () => {
    onClose();
    setStep(1); // Reset step counter for next time
  };

  return (
    <div
      className={`absolute ${current.position} z-999 flex flex-col items-start animate-in fade-in zoom-in duration-200 transition-all`}
    >
      <div className="w-[232px] flex flex-col items-center">
        {/* Caret pointing up */}
        <Icon icon="ph:caret-up-fill" className="text-aliceblue w-14 h-15 mb-[-23px] z-10" />

        <div className="w-[232px] rounded-2xl bg-aliceblue shadow-xl border border-whitesmoke-200 flex flex-col items-start overflow-hidden">
          <div className="self-stretch flex flex-col items-start py-4 px-4 gap-3">
            {/* header*/}
            <div className="self-stretch flex items-center justify-between">
              <b className="text-[14px] font-inter text-black">{current.title}</b>
              <div
                className="h-5 w-5 rounded-full flex items-center justify-center cursor-pointer hover:bg-silver transition-colors"
                onClick={handleClose}
              >
                <Icon icon="mdi:close" className="w-3.5 h-3.5 text-slategray" />
              </div>
            </div>

            {/* description */}
            <div className="self-stretch text-[12px] font-medium leading-[1.4] font-lora text-black tracking-wide text-left">
              {current.text}
            </div>

            <div className="self-stretch flex items-center justify-between mt-1">
              {/* step counter */}
              <div className="text-[12px] font-semibold font-lora text-darkslategray tracking-wide">
                {current.currentStep}/{current.total}
              </div>

              <div className="flex gap-2">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="w-[50px] rounded-lg bg-[#d0dbe3] py-1 text-[12px] text-[#2f3136] font-semibold font-lora text-center cursor-pointer hover:brightness-95 transition-all"
                  >
                    Back
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="w-[54px] rounded-lg bg-[#d0dbe3] py-1 text-[12px] text-[#2f3136] font-semibold font-lora text-center cursor-pointer hover:brightness-95 transition-all"
                >
                  {isLastStep ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialBubble;
