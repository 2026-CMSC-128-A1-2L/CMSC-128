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
      title: 'Landlord Profile',
      text: 'This is your profile page!',
      position: 'top-[50px] left-[390px]',
      total: 2,
      currentStep: 1,
    },
    {
      title: 'Landlord Profile',
      text: 'Here, you can view your personal information and modify it as needed.',
      position: 'top-[30px] left-[390px]',
      total: 2,
      currentStep: 2,
    },
    {
      title: 'Availability',
      text: 'This section is your availability schedule. You can set your available time slots for potential tenant visits.',
      position: 'top-[480px] left-[390px]',
      total: 1,
      currentStep: 1,
    },
    {
      title: 'Managed Properties',
      text: 'This section shows all of your registered properties. You can manage your properties and track their performance here.',
      position: 'top-[650px] left-[540px]',
      total: 1,
      currentStep: 1,
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
      onClose();
      setStep(1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div
      className={`absolute ${current.position} z-999 flex flex-col items-start animate-in fade-in zoom-in duration-200 transition-all`}
    >
      <div className="w-[232px] flex flex-row items-center">
        <Icon icon="ph:caret-left-fill" className="text-aliceblue w-14 h-15 mr-[-23px] z-10" />

        <div className="w-[232px] rounded-2xl bg-aliceblue shadow-xl border border-whitesmoke-200 flex flex-col items-start overflow-hidden">
          <div className="self-stretch flex flex-col items-start py-4 px-4 gap-3">
            {/* header*/}
            <div className="self-stretch flex items-center justify-between">
              <b className="text-[14px] font-inter text-black">{current.title}</b>
              <div
                className="h-5 w-5 rounded-full flex items-center justify-center cursor-pointer hover:bg-silver transition-colors"
                onClick={() => {
                  onClose();
                  setStep(1);
                }}
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
