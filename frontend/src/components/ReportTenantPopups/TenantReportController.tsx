import { useState, ComponentType } from 'react';
import ReportTenant1 from './TenantReport1';
import ReportTenant2 from './TenantReport2';
import ReportTenant3 from './TenantReport3';
import ReportTenant4 from './TenantReport4';
import ReportTenant5 from './TenantReport5';
import ReportConfirmation from './ReportConfirmation';

interface StepProps {
  onNext: () => void;
  onCancel: () => void;
}

const ReportFlow = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Start as hidden

  const steps: { id: string; component: ComponentType<StepProps> }[] = [
    { id: 'policies', component: ReportTenant1 },
    { id: 'financial', component: ReportTenant2 },
    { id: 'maintenance', component: ReportTenant3 },
    { id: 'security', component: ReportTenant4 },
    { id: 'confirmation', component: ReportTenant5 },
    { id: 'success', component: ReportConfirmation },
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
          Report Tenant
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

export default ReportFlow;