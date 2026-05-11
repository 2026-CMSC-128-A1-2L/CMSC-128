import { type FunctionComponent, useCallback, useState } from "react";
import BuildingRequirements from "../../../components/landlord/addbuilding/BuildingRequirements";
import BuildingInformation from "../../../components/landlord/addbuilding/BuildingInformation";
import BuildingSubmit from "../../../components/landlord/addbuilding/BuildingSubmit";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import TutorialBubble from "../properties/AddBuildingTutorials";

const AddBuilding: FunctionComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const onCancelClick = useCallback(() => {
    navigate("/landlord/properties");
  }, [navigate]);

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
        return (
          <BuildingInformation
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
          />
        );
      case 2:
        return <BuildingSubmit onPrevClick={onPrevClick} />;
      default:
        return null;
    }
  };

  const steps = [
    { label: "Requirements", active: currentStep === 0 },
    { label: "Building Information", active: currentStep === 1 },
    { label: "Finalize", active: currentStep === 2 },
  ];

  return (
    <div className="w-screen font-inter min-h-screen bg-white dark:bg-darkmode dark:text-gray-100">
      <div className="px-10 lg:px-20 pt-4 pb-12">
        <button
          type="button"
          className="group flex items-center gap-1.5 py-4 cursor-pointer w-fit"
          onClick={onCancelClick}
        >
          <Icon
            icon="material-symbols-light:chevron-left"
            className="w-7 h-7"
          />
          <div className="relative">
            <span className="text-sm font-semibold text-darkgreen">Cancel</span>
            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-darkgreen transition-all duration-300 rounded-full ease-out group-hover:w-full" />
          </div>
        </button>

        <div className="rounded-3xl border border-whitesmoke px-6 md:px-10 pt-8 pb-10 shadow-sm dark:border-gray-700 dark:bg-[#121212]">
          <h1 className="text-2xl font-bold" style={{ color: "#1a5c50" }}>
            Add a New Building
          </h1>
          <p className="text-sm font-semibold text-black mt-1 dark:text-gray-100">
            Follow 3 simple steps and you're ready to go!
          </p>

          <div className="w-full h-px my-6 " />

          {/* Main Content Layout */}
          <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-start relative w-full">
            {/* Sidebar (Stepper) */}
            <div
              className="flex flex-col sticky top-10 self-start"
              style={{ minWidth: "180px" }}
            >
              {steps.map((step, i) => (
                <div key={i} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs transition-colors duration-300"
                      style={{
                        background: step.active ? "#1a5c50" : "#d1d5db",
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-0.5 transition-colors duration-300"
                        style={{
                          flex: 1,
                          minHeight: "100px", // Reduced min-height slightly for better framing
                          background: currentStep > i ? "#1a5c50" : "#d1d5db",
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-start pt-1.5 pb-4">
                    <span
                      className="text-sm font-semibold transition-colors duration-300"
                      style={{ color: step.active ? "#1a5c50" : "#9ca3af" }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Content Wrapper - The Critical Fix */}
            <div className="flex-1 min-w-0 w-full">{renderStepContent()}</div>

            <TutorialBubble
              show={showHelp}
              onClose={() => setShowHelp(false)}
            />
          </div>
        </div>
      </div>

      {/* ======= FLOATING HELP ICON ========== */}
      <button
        type="button"
        className="fixed bottom-10 right-10 z-50 cursor-pointer transition-all hover:scale-110 active:scale-95 outline-none"
        onClick={() => setShowHelp(!showHelp)}
        aria-label="Toggle Help"
      >
        <div
          className="w-16 h-16 drop-shadow-lg"
          style={{
            background: "linear-gradient(135deg, #096C5B, #16917C)",
            WebkitMask:
              "url('https://api.iconify.design/iconoir/chat-bubble-question-solid.svg') no-repeat center / contain",
            mask: "url('https://api.iconify.design/iconoir/chat-bubble-question-solid.svg') no-repeat center / contain",
          }}
        />
      </button>
    </div>
  );
};

export default AddBuilding;
