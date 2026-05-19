import { type FunctionComponent, useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface TutorialBubbleProps {
  show: boolean;
  onClose: () => void;
}

const TutorialBubble: FunctionComponent<TutorialBubbleProps> = ({ show, onClose }) => {
  const [step, setStep] = useState(1);
  const [bubblePos, setBubblePos] = useState({ top: 0, left: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

  const helpContent = [
    {
      title: 'Statistics',
      text: 'You can monitor your property\'s performance in real-time!',
      targetId: 'dashboard-stats-heading',
      total: 4,
      currentStep: 1,
    },
    {
      title: 'Statistics',
      text: 'This section provides a quick summary of your monthly revenue, total tenant count, and...',
      targetId: 'dashboard-stats-heading',
      total: 4,
      currentStep: 2,
    },
    {
      title: 'Statistics',
      text: 'any overdue payments that require your attention. You may send reminders to your tenants...',
      targetId: 'dashboard-stats-heading',
      total: 4,
      currentStep: 3,
    },
    {
      title: 'Statistics',
      text: 'regarding overdue rent or upcoming dues with a single click!',
      targetId: 'dashboard-stats-heading',
      total: 4,
      currentStep: 4,
    },
    {
      title: 'Current Properties',
      text: 'This section shows all of your registered properties!',
      targetId: 'dashboard-properties-heading',
      total: 4,
      currentStep: 1,
    },
    {
      title: 'Current Properties',
      text: 'Each card shows your current occupancy rate to help identify which units have vacancies.',
      targetId: 'dashboard-properties-heading',
      total: 4,
      currentStep: 2,
    },
    {
      title: 'Current Properties',
      text: 'You may also track your earnings and any pending dues for each property.',
      targetId: 'dashboard-properties-heading',
      total: 4,
      currentStep: 3,
    },
    {
      title: 'Current Properties',
      text: 'Click on the arrow icon to manage room assignments, update rules, or edit property photos.',
      targetId: 'dashboard-properties-heading',
      total: 4,
      currentStep: 4,
    },
    {
      title: 'Pending Applications',
      text: 'You can have an overview of your current tenant applications here. To view more details...',
      targetId: 'dashboard-pending-heading',
      total: 2,
      currentStep: 1,
    },
    {
      title: 'Pending Applications',
      text: 'click "View All" to be redirected to all of your pending applications under "My Tenants" tab.',
      targetId: 'dashboard-pending-heading',
      total: 2,
      currentStep: 2,
    },
    {
      title: 'Scheduled Visits',
      text: 'You can have an overview of scheduled visits from potential tenants. To view more details...',
      targetId: 'dashboard-visits-heading',
      total: 2,
      currentStep: 1,
    },
    {
      title: 'Scheduled Visits',
      text: 'click "View All" to be redirected to your calendar. You may accept or decline visits from tenants.',
      targetId: 'dashboard-visits-heading',
      total: 2,
      currentStep: 2,
    },
  ];

  useEffect(() => {
    if (!show) return;

    const updatePosition = () => {
      const currentContent = helpContent[step - 1];
      const target = document.getElementById(currentContent.targetId);

      if (target && bubbleRef.current) {
        const rect = target.getBoundingClientRect();
        const bubbleHeight = bubbleRef.current.offsetHeight;
        setBubblePos({
          top: rect.top + rect.height / 2 - bubbleHeight / 2,
          left: rect.right - 10,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [show, step]);

  if (!show) return null;

  const current = helpContent[step - 1];
  const totalSteps = helpContent.length;
  const isLastStep = step === totalSteps;
  const bubbleStyle = {
    top: `${bubblePos.top}px`,
    left: `${bubblePos.left}px`,
  };

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
      ref={bubbleRef}
      className="fixed z-[999] flex flex-col items-start animate-in fade-in zoom-in duration-200 transition-all"
      style={bubbleStyle}
    >
      <div className="w-[232px] flex flex-row items-center">
        <Icon
          icon="ph:caret-left-fill"
          className="text-aliceblue w-14 h-15 mr-[-23px] z-10 dark:text-[#141515]"
        />

        <div className="w-[232px] rounded-2xl bg-aliceblue shadow-xl border border-whitesmoke-200 flex flex-col items-start overflow-hidden dark:bg-[#141515] dark:border-[#303331] dark:shadow-none">
          <div className="self-stretch flex flex-col items-start py-4 px-4 gap-3">
            <div className="self-stretch flex items-center justify-between">
              <b className="text-[14px] font-inter text-black dark:text-[#edf6f4]">{current.title}</b>
              <div
                className="h-5 w-5 rounded-full flex items-center justify-center cursor-pointer hover:bg-silver transition-colors dark:hover:bg-[#202123]"
                onClick={() => {
                  onClose();
                  setStep(1);
                }}
              >
                <Icon icon="mdi:close" className="w-3.5 h-3.5 text-slategray dark:text-[#a4acba]" />
              </div>
            </div>

            <div className="self-stretch text-[12px] font-medium leading-[1.4] font-lora text-black tracking-wide text-left dark:text-[#d7e0ef]">
              {current.text}
            </div>

            <div className="self-stretch flex items-center justify-between mt-1">
              <div className="text-[12px] font-semibold font-lora text-darkslategray tracking-wide dark:text-[#72cbb8]">
                {current.currentStep}/{current.total}
              </div>

              <div className="flex gap-2">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="w-[50px] rounded-lg bg-[#d0dbe3] py-1 text-[12px] text-[#2f3136] font-semibold font-lora text-center cursor-pointer hover:brightness-95 transition-all dark:bg-[#202123] dark:text-[#d7e0ef] dark:border dark:border-[#303331]"
                  >
                    Back
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="w-[54px] rounded-lg bg-[#d0dbe3] py-1 text-[12px] text-[#2f3136] font-semibold font-lora text-center cursor-pointer hover:brightness-95 transition-all dark:bg-[#124f43] dark:text-[#edf6f4]"
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
