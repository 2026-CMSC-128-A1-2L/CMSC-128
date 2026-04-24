import { FunctionComponent, useCallback } from 'react';
import BuildingRequirements from '../../../components/landlord/BuildingRequirements';
import { Icon } from '@iconify/react';

const steps = [
  { label: 'Requirements', active: true },
  { label: 'Building Information', active: false },
  { label: 'Finalize', active: false },
];

const AddBuilding: FunctionComponent = () => {
  const onCancelClick = useCallback(() => { }, []);
  const onNextClick = useCallback(() => { }, []);

  return (
    <div className="w-screen font-sans">
      <div className="px-20 pt-4 pb-12">

        {/* Cancel button */}
        <div className="flex items-center gap-1.5 py-4 cursor-pointer w-fit" onClick={onCancelClick}>
          <Icon icon="iconamoon:arrow-left-2" className="w-6 h-6" />
          <span className="text-sm font-semibold text-gray-700">Cancel</span>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 px-10 pt-8 pb-10">

          {/* Title */}
          <h1 className="text-2xl font-bold" style={{ color: '#1a5c50' }}>Add a New Building</h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">Follow 3 simple steps and you're ready to go!</p>

          {/* Divider */}
          <div className="w-full h-px my-6" />

          {/* Body: stepper + content */}
          {/* Note: items-start is recommended on the parent flex container for sticky children */}
          <div className="flex gap-40 px-20 items-start relative">

            {/* Stepper — added sticky, top-10, and self-start to keep it anchored while scrolling */}
            <div className="flex flex-col sticky top-10 self-start" style={{ minWidth: '160px' }}>
              {steps.map((step, i) => (
                <div key={i} className="flex">
                  {/* Left: dot + line */}
                  <div className="flex flex-col items-center mr-3">
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: step.active ? '#1a5c50' : '#d1d5db' }}
                    >
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-0.5"
                        style={{
                          flex: 1,
                          minHeight: '150px',
                          background: i === 0
                            ? 'linear-gradient(to bottom, rgba(26,92,80,0.7), #b5c8c5)'
                            : '#d1d5db',
                        }}
                      />
                    )}
                  </div>
                  {/* Right: label */}
                  <div className="flex items-start pt-1.5 pb-4">
                    <span
                      className="text-sm font-semibold whitespace-pre-line leading-5"
                      style={{ color: step.active ? '#1a5c50' : '#9ca3af' }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Abstracted */}
            <BuildingRequirements onNextClick={onNextClick} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBuilding;
