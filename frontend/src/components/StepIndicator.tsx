import ProgressBar from './user/ProgressBar';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator(props: StepIndicatorProps) {
  const { currentStep, steps } = props;
  if (!steps || steps.length === 0) return null;

  return (
    <div className="flex w-full justify-center py-[40px] px-[20px] font-inter">
      <ProgressBar
        currentStepIndex={Math.max(0, currentStep - 1)}
        steps={steps.map((label, index) => ({ key: `${index}-${label}`, label }))}
      />
    </div>
  );
}
