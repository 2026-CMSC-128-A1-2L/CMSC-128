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
      title: 'Statistics',
      text: 'You can monitor your property’s performance in real-time!',
      position: 'top-[50px] left-[410px]',
      total: 4,
      currentStep: 1,
    },
    {
      title: 'Statistics',
      text: 'This section provides a quick summary of your monthly revenue, total tenant count, and...',
      position: 'top-[50px] left-[410px]',
      total: 4,
      currentStep: 2,
    },
    {
      title: 'Statistics',
      text: 'any overdue payments that require your attention. You may send reminders to your tenants...',
      position: 'top-[50px] left-[410px]',
      total: 4,
      currentStep: 3,
    },
    {
      title: 'Statistics',
      text: 'regarding overdue rent or upcoming dues with a single click!',
      position: 'top-[50px] left-[410px]',
      total: 4,
      currentStep: 4,
    },
    {
      title: 'Current Properties',
      text: 'This section shows all of your registered properties!',
      position: 'top-[310px] left-[470px]',
      total: 4,
      currentStep: 1,
    },
    {
      title: 'Current Propertiee',
      text: 'Each card shows your current occupancy rate to help identify which units have vacancies.',
      position: 'top-[310px] left-[470px]',
      total: 4,
      currentStep: 2,
    },
    {
      title: 'Current Properties',
      text: 'You may also track your earnings and any pending dues for each property.',
      position: 'top-[310px] left-[470px]',
      total: 4,
      currentStep: 3,
    },
    {
      title: 'Current Propertiee',
      text: 'Click on the arrow icon to manage room assignments, update rules, or edit property photos.',
      position: 'top-[310px] left-[470px]',
      total: 4,
      currentStep: 4,
    },
    {
      title: 'Pending Applications',
      text: 'You can have an overview of your current tenant applications here. To view more details...',
      position: 'top-[420px] left-[440px]',
      total: 2,
      currentStep: 1,
    },
    {
      title: 'Pending Applications',
      text: 'click “View All” to be redirected to all of your pending applications under “My Tenants” tab.',
      position: 'top-[420px] left-[440px]',
      total: 2,
      currentStep: 2,
    },
    {
      title: 'Scheduled Visits',
      text: 'You can have an overview of scheduled visits from potential tenants. To view more details...',
      position: 'top-[420px] left-[770px]',
      total: 2,
      currentStep: 1,
    },
    {
      title: 'Scheduled Visits',
      text: 'click “View All” to be redirected to your calendar. You may accept or decline visits from tenants.',
      position: 'top-[420px] left-[770px]',
      total: 2,
      currentStep: 2,
    },
  ];

  if (!show) return null;

  const current = helpContent[step - 1];
  const totalSteps = helpContent.length;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isLastStep = step === totalSteps;

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

                {!isLastStep && (
                  <button
                    onClick={handleNext}
                    className="w-[54px] rounded-lg bg-[#d0dbe3] py-1 text-[12px] text-[#2f3136] font-semibold font-lora text-center cursor-pointer hover:brightness-95 transition-all"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialBubble;
