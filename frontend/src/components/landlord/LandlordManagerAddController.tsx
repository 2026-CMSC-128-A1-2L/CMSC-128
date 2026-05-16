import { type FunctionComponent, useState } from 'react';
import AddManager1, {
  type AddManagerFormValues,
} from './LandlordManagerAddForms/LandlordManagerAdd1';
import AddManager2 from './LandlordManagerAddForms/LandlordManagerAdd2';
import PortalPopup from './LandlordManagerPortal';
import { InviteService } from '../../service/InviteService';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  facilityId: string;
};

const AddManagerModal: FunctionComponent<Props> = ({ isOpen, onClose, facilityId }) => {
  const [step, setStep] = useState(1);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setStep(1);
    setSubmittedEmail('');
    setLoading(false);
    onClose();
  };

  const handleSend = async (data: AddManagerFormValues) => {
    if (!facilityId) {
      console.error('No facility ID provided for the invitation');
      return;
    }

    setLoading(true);
    try {
      await InviteService.inviteManager({
        facilityId,
        email: data.email,
        permissions: data.checkboxes,
      });
      setSubmittedEmail(data.email);
      setStep(2);
    } catch (error) {
      console.error('Failed to send invite:', error);
      // In a real app, we'd show a user-friendly error message here
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <PortalPopup
      overlayColor="rgba(0, 0, 0, 0.25)"
      placement="Centered"
      onOutsideClick={handleClose}
    >
      <div className={loading ? 'pointer-events-none opacity-50' : ''}>
        {step === 1 && <AddManager1 onSend={handleSend} onCancel={handleClose} />}
        {step === 2 && <AddManager2 onClose={handleClose} email={submittedEmail} />}
      </div>
    </PortalPopup>
  );
};

export default AddManagerModal;
