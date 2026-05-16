import { type FunctionComponent, useEffect, useState } from 'react';
import PortalPopup from './LandlordManagerPortal';
import LandlordManagerRemoveConfirm from './LandlordManagerRemoveForms/LandlordManagerRemoveConfirm';
import LandlordManagerRemoveSuccess from './LandlordManagerRemoveForms/LandlordManagerRemoveSuccess';
import { FacilityService } from '../../service/FacilityService';

type Manager = {
  id?: string;
  _id?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  manager: Manager | null;
  facilityId: string;
};

const RemoveManagerModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  manager,
  facilityId,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setLoading(false);
  }, [isOpen]);

  if (!isOpen || !manager) return null;

  const managerName =
    manager.displayName || `${manager.firstName || ''} ${manager.lastName || ''}`.trim() || 'Manager';
  const managerId = manager.id || manager._id;

  const handleConfirm = async () => {
    if (!facilityId || !managerId) return;
    setLoading(true);
    try {
      await FacilityService.removeManager(facilityId, managerId);
      setStep(2);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to remove manager:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalPopup overlayColor="rgba(0, 0, 0, 0.25)" placement="Centered" onOutsideClick={onClose}>
      <div key={step} className="animate-fade-in" style={{ animationDuration: '180ms' }}>
        {step === 1 && (
          <LandlordManagerRemoveConfirm
            managerName={managerName}
            onCancel={onClose}
            onConfirm={handleConfirm}
          />
        )}

        {step === 2 && <LandlordManagerRemoveSuccess managerName={managerName} onClose={onClose} />}
      </div>
    </PortalPopup>
  );
};

export default RemoveManagerModal;
