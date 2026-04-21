import { FunctionComponent, useState } from "react";
import ReportManager1 from "./LandlordManagerReportForms/ManagerReport1";
import ReportManager2 from "./LandlordManagerReportForms/ManagerReport2";
import ReportManager3 from "./LandlordManagerReportForms/ManagerReport3";
import ReportManager4 from "./LandlordManagerReportForms/ManagerReport4";
import ReportManager5 from "./LandlordManagerReportForms/ManagerReport5";
import ReportManager6 from "./LandlordManagerReportForms/ManagerReport6";
import PortalPopup from "./LandlordManagerPortal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ReportManagerModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setStep(1); // reset when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={handleClose}
    >
      {step === 1 && (
        <ReportManager1
          onNext={() => setStep(2)}
          onCancel={handleClose}
        />
      )}

      {step === 2 && (
        <ReportManager2
          onNext={() => setStep(3)}
          onCancel={handleClose}
        />
      )}

      {step === 3 && (
        <ReportManager3
          onNext={() => setStep(4)}
          onCancel={handleClose}
        />
      )}

      {step === 4 && (
        <ReportManager4
          onNext={() => setStep(5)}
          onCancel={handleClose}
        />
      )}

      {step === 5 && (
        <ReportManager5
          onSubmit={() => setStep(6)}
          onCancel={handleClose}
        />
      )}

      {step === 6 && (
        <ReportManager6
          onClose={handleClose}
        />
      )}
    </PortalPopup>
  );
};

export default ReportManagerModal;