import { type FunctionComponent, useState } from 'react';
import AddManager1, {
  type AddManagerFormValues,
} from './LandlordManagerAddForms/LandlordManagerAdd1';
import AddManager2 from './LandlordManagerAddForms/LandlordManagerAdd2';
import PortalPopup from './LandlordManagerPortal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ReportManagerModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleClose = () => {
    setStep(1);
    setSubmittedEmail('');
    onClose();
  };

  const handleSend = (data: AddManagerFormValues) => {
    setSubmittedEmail(data.email);
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={handleClose}
    >
      {step === 1 && <AddManager1 onSend={handleSend} onCancel={handleClose} />}
      {step === 2 && <AddManager2 onClose={handleClose} email={submittedEmail} />}
    </PortalPopup>
  );
};

export default ReportManagerModal;
