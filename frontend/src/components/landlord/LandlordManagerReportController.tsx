import { type FunctionComponent, useEffect, useMemo, useState } from "react";
import PortalPopup from "./LandlordManagerPortal";
import LandlordManagerReportCategory, {
  type ReportCategory,
} from "./LandlordManagerReportForms/LandlordManagerReportCategory";
import LandlordManagerReportConfirm from "./LandlordManagerReportForms/LandlordManagerReportConfirm";
import LandlordManagerReportSuccess from "./LandlordManagerReportForms/LandlordManagerReportSuccess";
import { ReportService } from "../../service/ReportService";

type Manager = {
  id?: string;
  _id?: any;
  displayName?: string;
  email?: string;
  emails?: string[];
  firstName?: string;
  lastName?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager | null;
  type?: "manager" | "tenant";
};

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    key: "admin",
    title: "Administrative & Management Issues",
    items: [
      {
        key: "admin_records",
        title: "Mismanagement of Tenant Records",
        desc: "Lost, incomplete, or falsified data",
      },
      {
        key: "admin_policy",
        title: "Failure to Enforce Dorm Policies",
        desc: "Ignoring curfews, guest rules, etc.",
      },
      {
        key: "admin_decisions",
        title: "Unauthorized Decision-Making",
        desc: "Acting without landlord approval",
      },
      {
        key: "admin_negligence",
        title: "Negligence in Duties",
        desc: "Not responding to tenant concerns or issues",
      },
      {
        key: "admin_conflict",
        title: "Conflict of Interest",
        desc: "Favoring certain tenants unfairly",
      },
    ],
  },
  {
    key: "financial",
    title: "Financial Misconduct",
    items: [
      {
        key: "fin_rent",
        title: "Rent Collection Irregularities",
        desc: "Delayed deposits, missing payments",
      },
      {
        key: "fin_charges",
        title: "Unauthorized Fees or Charges",
        desc: "Collects payments not related to tenant's financial duties",
      },
      {
        key: "fin_funds",
        title: "Misuse of Funds",
        desc: "Maintenance funds, deposits, etc.",
      },
    ],
  },
  {
    key: "property",
    title: "Property & Maintenance Issues",
    items: [
      { key: "prop_clean", title: "Failure to Maintain Cleanliness" },
      { key: "prop_repair", title: "Ignoring Repair Requests" },
      { key: "prop_staff", title: "Improper Handling of Maintenance Staff" },
      { key: "prop_safety", title: "Safety Hazards Not Addressed" },
    ],
  },
  {
    key: "security",
    title: "Security & Safety Concerns",
    items: [
      { key: "sec_access", title: "Allowing Unauthorized Access" },
      { key: "sec_practices", title: "Negligent Security Practices" },
      { key: "sec_incidents", title: "Failure to Report Incidents" },
      { key: "sec_surveillance", title: "Tampering with Surveillance Systems" },
    ],
  },
];

const ReportManagerModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  manager,
  type = "manager",
}) => {
  // step 0..3 = categories; 4 = confirm; 5 = success
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setSelected(new Set());
    setLoading(false);
  }, [isOpen]);

  const totalCategorySteps = REPORT_CATEGORIES.length;

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
        category.items.forEach((item) => next.delete(item.key));
      } else {
        category.items.forEach((item) => next.add(item.key));
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    const managerId = manager?.id || (manager?._id?.$oid || manager?._id);

    if (!managerId) {
      console.error("Cannot report: Manager ID is missing");
      return;
    }

    setLoading(true);

    // Extract human-readable titles from the selected categories
    const selectedFlags = REPORT_CATEGORIES.flatMap((c) =>
      c.items.filter((i) => selected.has(i.key)).map((i) => i.title),
    );

    // Create a description for the report
    const description = `Reported for: ${selectedFlags.join(", ")}`.substring(
      0,
      200,
    );

    try {
      await ReportService.reportUser(managerId.toString(), {
        description: description,
        flags:
          selectedFlags.length > 0 ? selectedFlags : ["General Misconduct"],
        evidence: [],
      });
      setStep(totalCategorySteps + 1);
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = useMemo<ReportCategory | null>(() => {
    if (step < 0 || step >= totalCategorySteps) return null;
    return REPORT_CATEGORIES[step];
  }, [step, totalCategorySteps]);

  if (!isOpen || !manager) return null;

  const managerEmail =
    manager.email || (manager.emails && manager.emails[0]) || "N/A";
  const managerName =
    manager.displayName ||
    `${manager.firstName || ""} ${manager.lastName || ""}`.trim() ||
    "Manager";

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={handleClose}
    >
      <div
        key={step}
        className={`animate-fade-in ${loading ? "pointer-events-none opacity-50" : ""}`}
        style={{ animationDuration: "180ms" }}
      >
        {currentCategory && (
          <LandlordManagerReportCategory
            managerName={managerName}
            managerEmail={managerEmail}
            category={currentCategory}
            selected={selected}
            isFirstStep={step === 0}
            isLastCategory={step === totalCategorySteps - 1}
            onToggle={toggleItem}
            onToggleAll={() => toggleAllInCategory(currentCategory)}
            onCancel={handleClose}
            onBack={() => setStep((s) => Math.max(0, s - 1))}
            onNext={() => setStep((s) => s + 1)}
            type={type}
          />
        )}

        {step === totalCategorySteps && (
          <LandlordManagerReportConfirm
            onBack={() => setStep((s) => Math.max(0, s - 1))}
            onSubmit={handleSubmit}
            type={type}
          />
        )}

        {step === totalCategorySteps + 1 && (
          <LandlordManagerReportSuccess onClose={handleClose} type={type} />
        )}
      </div>
    </PortalPopup>
  );
};

export default ReportManagerModal;
