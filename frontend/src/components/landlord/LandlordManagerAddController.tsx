import { FunctionComponent, useState } from "react";
import AddManager1 from "./LandlordManagerAddForms/LandlordManagerAdd1";
import AddManager2 from "./LandlordManagerAddForms/LandlordManagerAdd2";
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
        <AddManager1 onSend={() => setStep(2)} onCancel={handleClose} />
      )}

      {step === 2 && <AddManager2 onClose={handleClose} />}
    </PortalPopup>
  );
};

export default ReportManagerModal;
