import type { FunctionComponent } from "react";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ currentStep }) => {
  const steps = ["Submit", "Reviewing", "Finish"];

  return (
    <div className="w-full flex flex-col items-center font-poppins py-4">
      {/* Container with a max-width to match your previous ~723px design */}
      <div className="w-full max-w-[723px] flex items-start justify-between relative">
        {steps.map((label, index) => (
          <div
            key={label}
            className="flex flex-col items-center relative flex-1"
          >
            {/* The Circle (w-8 h-8) */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                currentStep >= index
                  ? "bg-darkslategray-200 text-white"
                  : "bg-[#B5C8C5] text-white"
              }`}
            >
              {/* Number Label inside the circle */}
              <span className="text-xs font-bold">{index + 1}</span>
            </div>

            {/* Step Text Label below circle */}
            <div
              className={`mt-2 text-sm font-semibold transition-colors duration-300 ${
                currentStep >= index
                  ? "text-darkslategray-200"
                  : "text-[#B5C8C5]"
              }`}
            >
              {label}
            </div>

            {/* Connecting Line logic */}
            {index < steps.length - 1 && (
              <div
                className="absolute top-4 left-[50%] w-full h-[3px] -z-0"
                style={{ backgroundColor: "#B5C8C5" }}
              >
                {/* Active Gradient Fill Overlay */}
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: currentStep > index ? "100%" : "0%",
                    background:
                      "linear-gradient(90deg, rgba(2,67,56,0.8), #b5c8c5 99.99%)",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
