import { type FunctionComponent, useCallback, useState } from 'react';
import BuildingRequirements from '../../../components/landlord/addbuilding/BuildingRequirements';
import BuildingInformation from '../../../components/landlord/addbuilding/BuildingInformation';
import BuildingSubmit from '../../../components/landlord/addbuilding/BuildingSubmit';
import TutorialIcon from '../../../../assets/help-chat.svg';
import TutorialBubble from '../properties/AddBuildingTutorials';
import { Icon } from '@iconify/react';

const AddBuilding: FunctionComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [showHelp, setShowHelp] = useState(false);

  const onCancelClick = useCallback(() => {}, []);

  const onNextClick = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const onPrevClick = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BuildingRequirements onNextClick={onNextClick} />;
      case 1:
        return <BuildingInformation onNextClick={onNextClick} onPrevClick={onPrevClick} />;
      case 2:
        return <BuildingSubmit onPrevClick={onPrevClick} />;
      default:
    }
  };

  const steps = [
    { label: 'Requirements', active: currentStep === 0 },
    { label: 'Building Information', active: currentStep === 1 },
    { label: 'Finalize', active: currentStep === 2 },
  ];

  return (
    <div className="w-screen font-sans">
      <div className="px-20 pt-4 pb-12">
        <div
          className="flex items-center gap-1.5 py-4 cursor-pointer w-full"
          onClick={onCancelClick}
        >
          <Icon icon="material-symbols-light:chevron-left" className="w-7 h-7" />
          <span className="text-sm font-semibold text-gray-700">Cancel</span>
        </div>

        <div className="rounded-3xl border border-gray-200 px-10 pt-8 pb-10">
          <h1 className="text-2xl font-bold" style={{ color: '#1a5c50' }}>
            Add a New Building
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">
            Follow 3 simple steps and you're ready to go!
          </p>

          <div className="w-full h-px my-6" />

          <div className="flex gap-30 px-20 items-start relative">
            <div className="flex flex-col sticky top-10 self-start" style={{ minWidth: '160px' }}>
              {steps.map((step, i) => (
                <div key={i} className="flex">
                  <div className="flex flex-col items-center mr-3">
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: step.active ? '#1a5c50' : '#d1d5db' }}
                    />
                    {i < steps.length - 1 && (
                      <div
                        className="w-0.5"
                        style={{
                          flex: 1,
                          minHeight: '150px',
                          background: i === 0 ? '#b5c8c5' : '#d1d5db',
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-start pt-1.5 pb-4">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: step.active ? '#1a5c50' : '#9ca3af' }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

            {renderStepContent()}
          </div>
        </div>
      </div>
      {/* ======= FLOATING ICON ========== */}
      <div
        className="fixed bottom-10 right-10 z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
    </div>
  );
};

export default AddBuilding;
