import { FunctionComponent, useCallback, useState } from 'react';
import BuildingRequirements from '../../../components/landlord/addbuilding/BuildingRequirements';
// Import your next component here once you create it
import BuildingInformation from '../../../components/landlord/addbuilding/BuildingInformation';
import BuildingSubmit from '../../../components/landlord/addbuilding/BuildingSubmit';
import { Icon } from '@iconify/react';

const AddBuilding: FunctionComponent = () => {
  // 1. Track the current step (0 = Requirements, 1 = Information, 2 = Finalize)
  const [currentStep, setCurrentStep] = useState(0);

  const onCancelClick = useCallback(() => {
    // Logic to close modal or go back to previous page
  }, []);

  // 2. Make onNextClick advance the step
  const onNextClick = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  // Make a "Previous" click if you need one later
  const onPrevClick = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  // 3. Create a function to conditionally render the content based on the step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BuildingRequirements onNextClick={onNextClick} />;
      case 1:
        // Pass onNextClick to the next component too if it has a next button
        return <BuildingInformation onNextClick={onNextClick} onPrevClick={onPrevClick} />;
      case 2:
        return <BuildingSubmit onPrevClick={onPrevClick} />;
      default:
    }
  };

  // 4. Update the stepper array to dynamically highlight the active step
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
                  {/* ... Your existing stepper dot/line UI ... */}
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

            {/* 5. Call the render function here instead of hardcoding the component */}
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBuilding;
