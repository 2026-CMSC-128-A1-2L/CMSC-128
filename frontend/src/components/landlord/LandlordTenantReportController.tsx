import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import PortalPopup from './LandlordManagerPortal';
import LandlordManagerReportCategory, {
  type ReportCategory,
} from './LandlordManagerReportForms/LandlordManagerReportCategory';
import LandlordManagerReportConfirm from './LandlordManagerReportForms/LandlordManagerReportConfirm';
import LandlordManagerReportSuccess from './LandlordManagerReportForms/LandlordManagerReportSuccess';
import { ReportService } from '../../service/ReportService';

type Tenant = {
  id: string;
  displayName: string;
  email: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant | null;
};

const TENANT_REPORT_CATEGORIES: ReportCategory[] = [
  {
    key: 'dorm_policy',
    title: 'Violation of Dorm Policies',
    items: [
      {
        key: 'dorm_appliances',
        title: 'Prohibited Appliances',
        desc: 'Usage of high-wattage appliances (e.g. heaters, toaster ovens.)',
      },
      {
        key: 'dorm_harassment',
        title: 'Harassment & Bullying',
        desc: 'Abuse to roommates or fellow tenants.',
      },
      {
        key: 'dorm_substances',
        title: 'Possession of Alcohol/Drugs',
        desc: 'Possession of alcohol and controlled substances.',
      },
      {
        key: 'dorm_pets',
        title: 'Pet Violations',
        desc: 'Keeping of unauthorized animals',
      },
      {
        key: 'dorm_noise',
        title: 'Excessive Noise',
      },
    ],
  },
  {
    key: 'financial',
    title: 'Financial Misconducts',
    items: [
      {
        key: 'fin_rent',
        title: 'Failure to Pay Rent Fees',
        desc: 'Consistent failure to pay rent on specified time.',
      },
      {
        key: 'fin_late',
        title: 'Persistent Late Payments',
        desc: 'Frequent late payment of fees.',
      },
      {
        key: 'fin_utilities',
        title: 'Unpaid Utilities',
        desc: 'Failure to pay assigned utility bills.',
      },
    ],
  },
  {
    key: 'property',
    title: 'Property Maintenance & Damage',
    items: [
      {
        key: 'prop_damage',
        title: 'Property Damage',
        desc: 'Significant damage to property, due to negligence or intent.',
      },
      {
        key: 'prop_alteration',
        title: 'Unauthorized Alteration',
        desc: 'Unauthorized changes made to the property.',
      },
      {
        key: 'prop_upkeep',
        title: 'Failure of Upkeep',
        desc: 'Sanitation Issues, Excessive hoarding, incorrect trash disposal.',
      },
    ],
  },
  {
    key: 'security',
    title: 'Security & Safety Concerns',
    items: [
      {
        key: 'sec_access',
        title: 'Allowing Unauthorized Access',
        desc: 'Sharing of property keys, extended guest stay.',
      },
      {
        key: 'sec_incidents',
        title: 'Failure to Report Incidents',
      },
      {
        key: 'sec_surveillance',
        title: 'Tampering with Surveillance Systems',
      },
    ],
  },
];

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: unknown; error?: unknown } } })
      .response;
    const message = response?.data?.message ?? response?.data?.error;
    if (typeof message === 'string') return message;
  }
  return 'Could not submit your report. Please try again.';
};

const LandlordTenantReportController: FunctionComponent<Props> = ({ isOpen, onClose, tenant }) => {
  // step 0..3 = categories; 4 = confirm; 5 = success
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setSelected(new Set());
    setLoading(false);
    setSubmitError(null);
  }, [isOpen]);

  const totalCategorySteps = TENANT_REPORT_CATEGORIES.length;

  const handleClose = () => {
    onClose();
  };

  const toggleItem = (itemKey: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(itemKey)) next.delete(itemKey);
      else next.add(itemKey);
      return next;
    });
  };

  const toggleAllInCategory = (category: ReportCategory) => {
    const allChecked = category.items.every((item) => selected.has(item.key));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allChecked) {
        category.items.forEach((item) => {
          next.delete(item.key);
        });
      } else {
        category.items.forEach((item) => {
          next.add(item.key);
        });
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    const tenantId = tenant?.id;
    if (!tenantId) {
      setSubmitError('Tenant account could not be found.');
      return;
    }

    const selectedFlags = TENANT_REPORT_CATEGORIES.flatMap((category) =>
      category.items.filter((item) => selected.has(item.key)).map((item) => item.title),
    );
    const reportFlags = selectedFlags.length > 0 ? selectedFlags : ['General Misconduct'];
    const description = `Reported for: ${reportFlags.join(', ')}`.slice(0, 200);

    setLoading(true);
    setSubmitError(null);

    try {
      await ReportService.reportUser(tenantId, {
        description,
        flags: reportFlags,
        evidence: [],
      });
      setStep(totalCategorySteps + 1);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = useMemo<ReportCategory | null>(() => {
    if (step < 0 || step >= totalCategorySteps) return null;
    return TENANT_REPORT_CATEGORIES[step];
  }, [step]);

  if (!isOpen || !tenant) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={handleClose}
    >
      <div
        key={step}
        className={`animate-fade-in ${loading ? 'pointer-events-none opacity-60' : ''}`}
        style={{ animationDuration: '180ms' }}
      >
        {currentCategory && (
          <LandlordManagerReportCategory
            managerName={tenant.displayName}
            managerEmail={tenant.email}
            category={currentCategory}
            selected={selected}
            isFirstStep={step === 0}
            isLastCategory={step === totalCategorySteps - 1}
            onToggle={toggleItem}
            onToggleAll={() => toggleAllInCategory(currentCategory)}
            onCancel={handleClose}
            onBack={() => setStep((s) => Math.max(0, s - 1))}
            onNext={() => setStep((s) => s + 1)}
            type="tenant"
          />
        )}

        {step === totalCategorySteps && (
          <LandlordManagerReportConfirm
            onBack={() => setStep((s) => s - 1)}
            onSubmit={handleSubmit}
            isSubmitting={loading}
            errorMessage={submitError}
            type="tenant"
          />
        )}

        {step === totalCategorySteps + 1 && <LandlordManagerReportSuccess onClose={handleClose} />}
      </div>
    </PortalPopup>
  );
};

export default LandlordTenantReportController;
