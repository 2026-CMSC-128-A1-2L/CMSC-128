import { useState, ComponentType } from 'react';
import ReportManager1 from './ManagerReport1';
import ReportManager2 from './ManagerReport2';
import ReportManager3 from './ManagerReport3';
import ReportManager4 from './ManagerReport4';
import ReportManager5 from './ManagerReport5';
import ReportManager6 from './ManagerReport6';

interface StepProps {
  onNext: () => void;
  onCancel: () => void;
}

const ManagerReportFlow = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Start as hidden

  const steps: { id: string; component: ComponentType<StepProps> }[] = [
    { id: 'policies', component: ReportManager1 },
    { id: 'financial', component: ReportManager2 },
    { id: 'maintenance', component: ReportManager3 },
    { id: 'security', component: ReportManager4 },
    { id: 'confirmation', component: ReportManager5 },
    { id: 'success', component: ReportManager6 },
  ];

  const handleNext = () => {
    if (currentIdx < steps.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleCancel = () => {
    setIsVisible(false); // Hide the popup
    setCurrentIdx(0);     // Reset progress to the first step
  };

  const ActiveComponent = steps[currentIdx].component;

  return (
    <div className="flex flex-col items-center justify-center">
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="rounded-xl bg-teal-700 px-8 py-3 text-white font-semibold hover:bg-teal-800 transition-colors shadow-lg active:scale-95"
        >
          Report Manager
        </button>
      )}

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
          <div className="w-full max-w-[428px] flex justify-center items-center">
            <ActiveComponent 
              onNext={handleNext} 
              onCancel={handleCancel} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerReportFlow;
