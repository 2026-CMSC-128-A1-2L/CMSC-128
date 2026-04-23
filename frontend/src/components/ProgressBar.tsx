import { FunctionComponent } from 'react';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ currentStep }) => {
  const steps = ['Submit', 'Reviewing', 'Finish'];

  return (
    <div className="self-stretch flex flex-col items-center justify-center text-darkslategray-200 font-poppins">
      <div className="w-[723px] h-[87px] relative">
        
        <div
          className={`absolute h-[9.2%] w-[32.64%] top-[29.89%] left-[11.07%] rounded-[34.55px] ${
            currentStep >= 1 
              ? '[background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5_99.99%)]' 
              : 'bg-[#B5C8C5]'
          }`}
        />
        <div
          className={`absolute h-[9.2%] w-[34.44%] top-[26.44%] left-[54.91%] rounded-[34.55px] ${
            currentStep >= 2 
              ? '[background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5_99.99%)]' 
              : 'bg-[#B5C8C5]'
          }`}
        />

        {/* Labels */}
        <div className="absolute h-[37.93%] w-[13.42%] top-[51.72%] left-[0%] leading-8 font-semibold flex items-center justify-center">
          {steps[0]}
        </div>
        <div className="absolute h-[37.93%] w-[11.2%] top-[51.72%] left-[43.71%] font-semibold flex items-center justify-center">
          {steps[1]}
        </div>
        <div className="absolute h-[37.93%] w-[10.37%] top-[51.72%] left-[88.93%] font-semibold flex items-center justify-center">
          {steps[2]}
        </div>

        <div className="absolute h-[37.93%] w-[4.56%] top-[13.79%] left-[4.43%] rounded-[50%] bg-darkslategray-200" />

        <div
          className={`absolute h-[37.93%] w-[4.56%] top-[12.64%] left-[47.03%] rounded-[50%] ${
            currentStep > 1 ? 'bg-darkslategray-200' : 'bg-[#B5C8C5]'
          }`}
        />

        <div
          className={`absolute h-[37.93%] w-[4.56%] top-[12.64%] left-[91.84%] rounded-[50%] ${
            currentStep > 2 ? 'bg-darkslategray-200' : 'bg-[#B5C8C5]'
          }`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;