import { type FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import RegistrationProfile from '../components/general/RegistrationProfile';
import RegistrationVerification from '../components/general/RegistrationVerification';
import RegistrationFinalize from '../components/general/RegistrationFinalize';
import { UserService } from '../service/UserService';
import type { OnboardSelfRequestBody } from '../interface/user';

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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<RegistrationProfileData | null>(null);
  const [isLoadingSelf, setIsLoadingSelf] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onCancelClick = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;

    const loadSelf = async () => {
      setIsLoadingSelf(true);
      try {
        const response = await UserService.getSelf();
        if (cancelled) return;
        const user = response.data;
        const role =
          user.userType === 'Student'
            ? 'student'
            : user.userType === 'Landlord'
              ? 'landlord'
              : user.userType === 'Manager'
                ? 'manager'
                : '';

        setProfileData({
          firstName: user.firstName ?? '',
          middleName: user.middleName ?? '',
          lastName: user.lastName ?? '',
          contactNumber: user.contact ?? '',
          email: user.emails?.[0] ?? user.email ?? '',
          homeAddress: user.address ?? '',
          role,
        });
      } catch (error) {
        if (!cancelled && isAxiosError(error) && error.response?.status === 401) {
          navigate('/home');
        }
      } finally {
        if (!cancelled) setIsLoadingSelf(false);
      }
    };

    loadSelf();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 2));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleProfileSubmit = (data: RegistrationProfileData) => {
    setProfileData(data);
    setSubmitError(null);
    goNext();
  };

  const handleFinalSubmit = async () => {
    if (!profileData || isSubmitting) return;

    const userTypeByRole = {
      student: 'Student',
      landlord: 'Landlord',
      manager: 'Manager',
    } as const;

    if (!profileData.role) {
      setSubmitError('Please choose an account type before submitting.');
      setCurrentStep(0);
      return;
    }

    const body: OnboardSelfRequestBody = {
      userType: userTypeByRole[profileData.role],
      firstName: profileData.firstName.trim(),
      middleName: profileData.middleName.trim(),
      lastName: profileData.lastName.trim(),
      contact: profileData.contactNumber.trim(),
      address: profileData.homeAddress.trim(),
    };

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await UserService.onboardSelf(body);
      navigate(profileData.role === 'student' ? '/home' : '/landlord-homepage');
    } catch (error) {
      const message =
        isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Could not finish registration. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    if (isLoadingSelf) {
      return (
        <div className="flex min-h-[260px] items-center justify-center text-sm font-semibold text-slategray">
          Loading your account...
        </div>
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <RegistrationProfile
            initialData={profileData ?? undefined}
            onNextClick={handleProfileSubmit}
          />
        );
      case 1:
        return <RegistrationVerification onNextClick={goNext} onBackClick={goBack} />;
      case 2:
        if (!profileData) {
          return (
            <RegistrationProfile
              initialData={profileData ?? undefined}
              onNextClick={handleProfileSubmit}
            />
          );
        }
        return (
          <RegistrationFinalize
            data={profileData}
            isSubmitting={isSubmitting}
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
        <button
          type="button"
          className="flex items-center gap-1.5 py-4 cursor-pointer w-fit"
          onClick={onCancelClick}
        >
          <Icon icon="material-symbols:chevron-left" className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">Cancel</span>
        </button>

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
                <div key={step.label} className="flex">
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
          {submitError && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {submitError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
