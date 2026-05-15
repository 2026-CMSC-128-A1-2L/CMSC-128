import { type FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import RegistrationProfile from '../components/general/RegistrationProfile';
import RegistrationVerification from '../components/general/RegistrationVerification';
import RegistrationFinalize from '../components/general/RegistrationFinalize';
import { UserService } from '../service/UserService';
import type { OnboardSelfRequestBody } from '../interface/user';
import ProgressBar from '../components/user/ProgressBar';

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
        if (user.status !== 'setup' && user.userType) {
          if (user.userType === 'Landlord' || user.userType === 'Manager') {
            navigate('/landlord-homepage', { replace: true });
          } else if (user.userType === 'Admin') {
            navigate('/admin/applications', { replace: true });
          } else {
            navigate('/home', { replace: true });
          }
          return;
        }

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

  const steps = ['User Profile', 'Verification', 'Finalize'];

  return (
    <div className="w-screen min-h-screen font-sans bg-white dark:bg-[#101111]">
      <div className="px-20 pt-4 pb-12">
        {/* Cancel */}
        <button
          type="button"
          className="flex items-center gap-1.5 py-4 cursor-pointer w-fit text-gray-700 dark:text-[#a4acba]"
          onClick={onCancelClick}
        >
          <Icon
            icon="material-symbols:chevron-left"
            className="w-4 h-4 text-gray-700 dark:text-[#a4acba]"
          />
          <span className="text-sm font-semibold text-gray-700 dark:text-[#a4acba]">Cancel</span>
        </button>

        <div className="rounded-3xl border border-whitesmoke dark:border-[#303331] bg-white dark:bg-[#141515] px-10 pt-8 pb-10">
          <h1 className="text-2xl font-bold text-[#1a5c50] dark:text-[#d7e0ef]">
            Welcome to Atlas
          </h1>
          <p className="text-sm font-semibold text-slategray dark:text-[#a4acba] mt-1">
            Follow 3 simple steps and you're ready to go!
          </p>

          <div className="w-full h-px my-6 bg-whitesmoke dark:bg-[#303331]" />

          <div className="flex gap-20 px-10 items-start relative">
            {/* Sticky stepper */}
            <div className="sticky top-10 self-start shrink-0" style={{ minWidth: '160px' }}>
              <ProgressBar
                currentStepIndex={currentStep}
                orientation="vertical"
                connectorClassName="min-h-[150px]"
                steps={steps.map((label, index) => ({ key: `${index}-${label}`, label }))}
              />
            </div>
            {/* Step content */}
            <div className="flex-1 min-w-0">{renderStepContent()}</div>
          </div>
          {submitError && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-400">
              {submitError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
