import ProgressBar, { type VerificationStep } from '../user/ProgressBar';

export type { VerificationStep };

const VerificationProgress = ({ currentStep }: { currentStep: VerificationStep }) => {
  return <ProgressBar currentStep={currentStep} />;
};

export default VerificationProgress;
