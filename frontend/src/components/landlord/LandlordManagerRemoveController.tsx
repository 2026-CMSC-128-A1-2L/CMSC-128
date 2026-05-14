import { type FunctionComponent, useEffect, useState } from 'react';
import PortalPopup from './LandlordManagerPortal';
import LandlordManagerRemoveConfirm from './LandlordManagerRemoveForms/LandlordManagerRemoveConfirm';
import LandlordManagerRemoveSuccess from './LandlordManagerRemoveForms/LandlordManagerRemoveSuccess';

type Manager = {
  displayName: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager | null;
};

const RemoveManagerModal: FunctionComponent<Props> = ({ isOpen, onClose, manager }) => {
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
  }, [isOpen]);

  if (!isOpen || !manager) return null;

  const handleConfirm = () => {
    // TODO: hook up actual removal once API is available.
    console.log('=== Manager Remove Requested ===', manager.displayName);
    setStep(2);
  };

  return (
    <PortalPopup overlayColor="rgba(0, 0, 0, 0.25)" placement="Centered" onOutsideClick={onClose}>
      <div key={step} className="animate-fade-in" style={{ animationDuration: '180ms' }}>
        {step === 1 && (
          <LandlordManagerRemoveConfirm
            managerName={manager.displayName}
            onCancel={onClose}
            onConfirm={handleConfirm}
          />
        )}

        {step === 2 && (
          <LandlordManagerRemoveSuccess managerName={manager.displayName} onClose={onClose} />
        )}
      </div>
    </PortalPopup>
  );
};

export default RemoveManagerModal;
