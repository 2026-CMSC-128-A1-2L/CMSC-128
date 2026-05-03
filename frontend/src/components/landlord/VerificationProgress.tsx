import { Fragment } from "react";
import { Icon } from "@iconify/react";

export type VerificationStep = "submit" | "reviewing" | "finish";

type VerificationProgressProps = {
  currentStep: VerificationStep;
};

const steps: Array<{ key: VerificationStep; label: string }> = [
  { key: "submit", label: "Submit" },
  { key: "reviewing", label: "Reviewing" },
  { key: "finish", label: "Finish" },
];

type StepState = "completed" | "active" | "upcoming";

const getCircleClasses = (state: StepState): string => {
  if (state === "completed") return "bg-teal text-white";
  if (state === "active") return "bg-darkslategray text-white";
  return "bg-silver-100 text-transparent";
};

const VerificationProgress = ({ currentStep }: VerificationProgressProps) => {
  const currentIdx = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex w-full max-w-[723px] items-start">
      {steps.map((step, idx) => {
        const state: StepState =
          idx < currentIdx
            ? "completed"
            : idx === currentIdx
              ? "active"
              : "upcoming";
        const isLast = idx === steps.length - 1;

        return (
          <Fragment key={step.key}>
            <div className="flex flex-col items-center gap-[10px]">
              <div className="relative flex h-[22px] w-[22px] items-center justify-center">
                {state === "active" && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-darkslategray/30 animate-ripple" />
                    <div className="absolute inset-0 rounded-full bg-darkslategray/30 animate-ripple [animation-delay:1000ms]" />
                  </>
                )}

                <span
                  className={[
                    "relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full transition-colors duration-200",
                    getCircleClasses(state),
                  ].join(" ")}
                >
                  {state === "completed" && (
                    <Icon
                      icon="material-symbols:check-rounded"
                      className="h-[14px] w-[14px]"
                    />
                  )}
                </span>
              </div>

              <span className="font-inter text-[14px] font-semibold whitespace-nowrap text-darkslategray">
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="mx-[12px] mt-[8px] h-[6px] flex-1 overflow-hidden rounded-full bg-silver-100">
                <div
                  className={[
                    "h-full rounded-full transition-all duration-300",
                    idx < currentIdx
                      ? "w-full bg-teal"
                      : idx === currentIdx
                        ? "w-1/2 bg-gradient-to-r from-darkslategray/80 to-silver-100"
                        : "w-0",
                  ].join(" ")}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default VerificationProgress;
