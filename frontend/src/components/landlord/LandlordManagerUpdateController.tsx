import { type FunctionComponent, useState } from 'react';
import UpdateManager1 from './LandlordManagerUpdateForms/LandlordManagerUpdate1.tsx';
import UpdateManager2 from './LandlordManagerUpdateForms/LandlordManagerUpdate2.tsx';
import PortalPopup from './LandlordManagerPortal.tsx';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UpdateManager: FunctionComponent<Props> = ({ isOpen, onClose }) => {
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
      {step === 1 && <UpdateManager1 onSave={() => setStep(2)} onCancel={handleClose} />}

      {step === 2 && <UpdateManager2 onClose={handleClose} />}
    </PortalPopup>
  );
};

export default UpdateManager;
