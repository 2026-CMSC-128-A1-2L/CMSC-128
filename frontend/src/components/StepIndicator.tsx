import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator(props: StepIndicatorProps) {
  const { currentStep, steps } = props;
  if (!steps || steps.length === 0) return null;
  return (
    <div className="flex items-center w-full max-w-[780px] py-[40px] px-[20px] mx-auto font-inter">
      {steps.map((label, index) => {
        // Calculate the step number (1-indexed) based on the array position
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isPast = currentStep > stepNumber;

        return (
          <React.Fragment key={index}>
            {/* Step Node & Label */}
            <div className="relative flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-[35px] h-[35px] rounded-full ${
                  isActive || isPast ? 'bg-darkslategray' : 'bg-silver-100'
                }`}
              ></div>

              {/* Absolute Label - now just pulling the string directly */}
              <span className="absolute top-[40px] whitespace-nowrap font-bold text-teal text-num-14">
                {label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[9px] mx-[24px] rounded-full ${
                  isPast
                    ? 'bg-darkslategray'
                    : isActive
                    ? 'bg-linear-to-r from-darkslategray to-silver-100' 
                    : 'bg-silver-100' 
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
