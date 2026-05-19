import { Fragment } from 'react';
import { Icon } from '@iconify/react';

export type VerificationStep = 'submit' | 'reviewing' | 'finish';

type ProgressStep<Key extends string = string> = {
  key: Key;
  label: string;
};

type ProgressOrientation = 'horizontal' | 'vertical';

type ProgressBarProps<Key extends string = VerificationStep> = {
  currentStep?: Key;
  currentStepIndex?: number;
  steps?: Array<ProgressStep<Key>>;
  className?: string;
  orientation?: ProgressOrientation;
  connectorClassName?: string;
};

const defaultSteps: Array<ProgressStep<VerificationStep>> = [
  { key: 'submit', label: 'Submit' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'finish', label: 'Finish' },
];

type StepState = 'completed' | 'active' | 'upcoming';

const getCircleClasses = (state: StepState): string => {
  if (state === 'completed') return 'bg-teal text-white dark:bg-[#2e8677]';
  if (state === 'active')
    return 'bg-darkslategray text-white dark:bg-[#0f6c5b] dark:text-[#0f1010]';
  return 'bg-silver-100 text-transparent dark:bg-[#c8d8d6]';
};

const ProgressBar = <Key extends string = VerificationStep>({
  currentStep,
  currentStepIndex,
  steps,
  className = '',
  orientation = 'horizontal',
  connectorClassName = '',
}: ProgressBarProps<Key>) => {
  const progressSteps = (steps?.length ? steps : defaultSteps) as Array<ProgressStep<Key>>;
  const currentIdx =
    typeof currentStepIndex === 'number'
      ? Math.max(0, Math.min(currentStepIndex, progressSteps.length - 1))
      : Math.max(
          0,
          progressSteps.findIndex((s) => s.key === currentStep),
        );

  const renderCircle = (state: StepState) => (
    <div className="relative flex h-[22px] w-[22px] items-center justify-center">
      {state === 'active' && (
        <>
          <div className="absolute inset-0 rounded-full bg-darkslategray/30 animate-ripple dark:bg-[#0f6c5b]/20" />
          <div className="absolute inset-0 rounded-full bg-darkslategray/30 animate-ripple [animation-delay:1000ms] dark:bg-[#0f6c5b]/20" />
        </>
      )}
      <span
        className={[
          'relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full transition-colors duration-200',
          getCircleClasses(state),
        ].join(' ')}
      >
        {state === 'completed' && (
          <Icon icon="material-symbols:check-rounded" className="h-[14px] w-[14px]" />
        )}
      </span>
    </div>
  );

  const renderLabel = (label: string) => (
    <span className="font-['Inter',sans-serif] text-[14px] font-semibold whitespace-nowrap text-[#024338] dark:text-[#9ed5c9]">
      {label}
    </span>
  );

  if (orientation === 'vertical') {
    return (
      <div className={['flex w-full max-w-[260px] flex-col', className].join(' ')}>
        {progressSteps.map((step, idx) => {
          const state: StepState =
            idx < currentIdx ? 'completed' : idx === currentIdx ? 'active' : 'upcoming';
          const isLast = idx === progressSteps.length - 1;

          return (
            <div key={step.key} className="flex items-stretch">
              <div className="mr-3 flex flex-col items-center">
                {renderCircle(state)}
                {!isLast && (
                  <div
                    className={[
                      'my-[10px] w-[6px] min-h-[100px] flex-1 overflow-hidden rounded-full bg-[#b5c8c5] dark:bg-[#4c5b59]',
                      connectorClassName,
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'w-full rounded-full transition-all duration-300',
                        idx < currentIdx
                          ? 'h-full bg-[#096c5b] dark:bg-[#2e8677]'
                          : idx === currentIdx
                            ? 'h-1/2 bg-linear-to-b from-[rgba(2,67,56,0.8)] to-[#b5c8c5] dark:from-[#88b5ad] dark:to-[#c8d8d6]'
                            : 'h-0',
                      ].join(' ')}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-start pt-[2px] pb-4">{renderLabel(step.label)}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={['flex w-full max-w-[723px] items-start', className].join(' ')}>
      {progressSteps.map((step, idx) => {
        const state: StepState =
          idx < currentIdx ? 'completed' : idx === currentIdx ? 'active' : 'upcoming';
        const isLast = idx === progressSteps.length - 1;

        return (
          <Fragment key={step.key}>
            <div className="relative flex flex-col items-center gap-[10px]">
              {renderCircle(state)}
              {renderLabel(step.label)}
            </div>

            {!isLast && (
              <div
                className={[
                  'mx-[12px] mt-[8px] h-[6px] flex-1 overflow-hidden rounded-full bg-[#b5c8c5] dark:bg-[#4c5b59]',
                  connectorClassName,
                ].join(' ')}
              >
                <div
                  className={[
                    'h-full rounded-full transition-all duration-300',
                    idx < currentIdx
                      ? 'w-full bg-[#096c5b] dark:bg-[#2e8677]'
                      : idx === currentIdx
                        ? 'w-1/2 bg-linear-to-r from-[rgba(2,67,56,0.8)] to-[#b5c8c5] dark:from-[#88b5ad] dark:to-[#c8d8d6]'
                        : 'w-0',
                  ].join(' ')}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
