import { type FunctionComponent, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import RegistrationProfile from '../components/general/RegistrationProfile';
import RegistrationVerification from '../components/general/RegistrationVerification';
import RegistrationFinalize from '../components/general/RegistrationFinalize';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RegistrationProfileData {
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  homeAddress: string;
  role: 'student' | 'landlord' | 'manager' | '';
}

// ─── Component ────────────────────────────────────────────────────────────────

const Registration: FunctionComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<RegistrationProfileData | null>(null);

  const onCancelClick = useCallback(() => {
    // handle cancel / navigate away
  }, []);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 2));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleProfileSubmit = (data: RegistrationProfileData) => {
    setProfileData(data);
    goNext();
  };

  const handleFinalSubmit = () => {
    console.log('=== Final Registration Data ===');
    console.log(JSON.stringify(profileData, null, 2));
    // navigate away or show success
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <RegistrationProfile onNextClick={handleProfileSubmit} />;
      case 1:
        return <RegistrationVerification onNextClick={goNext} onBackClick={goBack} />;
      case 2:
        return (
          <RegistrationFinalize
            data={profileData!}
            onBackClick={goBack}
            onSubmit={handleFinalSubmit}
          />
        );
      default:
        return null;
    }
  };

  const steps = [
    { label: 'User Profile', active: currentStep === 0 },
    { label: 'Verification', active: currentStep === 1 },
    { label: 'Finalize', active: currentStep === 2 },
  ];

  return (
    <div className="w-screen font-sans">
      <div className="px-20 pt-4 pb-12">
        {/* Cancel */}
        <div
          className="flex items-center gap-1.5 py-4 cursor-pointer w-fit"
          onClick={onCancelClick}
        >
          <Icon icon="material-symbols:chevron-left" className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">Cancel</span>
        </div>

        <div className="rounded-3xl border border-whitesmoke px-10 pt-8 pb-10">
          <h1 className="text-2xl font-bold" style={{ color: '#1a5c50' }}>
            Welcome to Atlas
          </h1>
          <p className="text-sm font-semibold text-slategray mt-1">
            Follow 3 simple steps and you're ready to go!
          </p>

          <div className="w-full h-px my-6" />

          <div className="flex gap-20 px-10 items-start relative">
            {/* Sticky stepper */}
            <div
              className="flex flex-col sticky top-10 self-start shrink-0"
              style={{ minWidth: '160px' }}
            >
              {steps.map((step, i) => (
                <div key={i} className="flex">
                  <div className="flex flex-col items-center mr-3">
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors duration-300"
                      style={{ background: step.active ? '#1a5c50' : '#d1d5db' }}
                    >
                      {step.active && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white opacity-90" />
                      )}
                      {currentStep > i && (
                        <Icon
                          icon="material-symbols:check-rounded"
                          className="w-4 h-4 text-white"
                        />
                      )}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-0.5 transition-all duration-300"
                        style={{
                          flex: 1,
                          minHeight: '150px',
                          background:
                            currentStep > i
                              ? '#1a5c50'
                              : i === 0 && currentStep === 0
                                ? 'linear-gradient(to bottom, rgba(26,92,80,0.7), #b5c8c5)'
                                : '#d1d5db',
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-start pt-1.5 pb-4">
                    <span
                      className="text-sm font-semibold transition-colors duration-300"
                      style={{
                        color: step.active ? '#1a5c50' : currentStep > i ? '#1a5c50' : '#9ca3af',
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">{renderStepContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
