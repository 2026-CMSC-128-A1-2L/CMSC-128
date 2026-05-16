import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import AddManager from '../../../components/landlord/LandlordManagerAddController';
import ReportManager from '../../../components/landlord/LandlordManagerReportController';
import RemoveManager from '../../../components/landlord/LandlordManagerRemoveController';
import LandlordManagerActionsPopover, {
  type ManagerAction,
} from '../../../components/landlord/LandlordManagerActionsPopover';
import { properties, managers, type Manager } from '../../../data/landlordManagers';

const Managers = () => {
  const navigate = useNavigate();
  const [isAddManagerOpen, setAddManagerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [reportTarget, setReportTarget] = useState<Manager | null>(null);
  const [removeTarget, setRemoveTarget] = useState<Manager | null>(null);

  const handleAction = (manager: Manager, action: ManagerAction) => {
    setOpenMenuId(null);
    if (action === 'message') {
      navigate('/landlord/messages');
      return;
    }
    if (action === 'report') {
      setReportTarget(manager);
      return;
    }
    if (action === 'remove') {
      setRemoveTarget(manager);
    }
  };

  return (
    <LandlordLayout activeSidebarItem="managers" breadcrumbs={[{ label: 'Property Manager List' }]}>
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        <section className="flex w-full flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Inter',sans-serif] text-[14px] text-[#666]">
              View All Managers
            </span>
            <h1 className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] text-black">
              Property Manager List
            </h1>
          </div>
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
        </section>

        <div className="flex flex-col gap-[48px]">
          {properties.map((property) => {
            const propertyManagers = property.managerIds
              .map((id) => managers.find((m) => m.id === id))
              .filter(Boolean) as typeof managers;

            return (
              <section key={property.id} className="flex flex-col gap-[10px] px-[10px]">
                <div className="flex items-center gap-[10px]">
                  <span className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b]">
                    {property.name}
                  </span>
                  <button
                    onClick={() => setAddManagerOpen(true)}
                    aria-label={`Add manager to ${property.name}`}
                    className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70 cursor-pointer"
                  >
                    <Icon icon="mdi-light:plus" className="h-[24px] w-[24px] text-[#096c5b]" />
                  </button>
                </div>

                {propertyManagers.length === 0 ? (
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#666]">
                    No managers assigned yet.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-[24px]">
                    {propertyManagers.map((manager) => {
                      const cardKey = `${property.id}-${manager.id}`;
                      const menuOpen = openMenuId === cardKey;

                      return (
                        <div
                          key={cardKey}
                          onClick={() => navigate(`/landlord/managers/${manager.id}`)}
                          className="flex w-[331px] cursor-pointer items-center justify-between rounded-[8px] px-[16px] py-[10px] transition-colors hover:bg-[#f9f9f9] dark:hover:bg-[#1f2022]"
                        >
                          <div className="flex items-center gap-[10px]">
                            <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af] dark:bg-[#242526] dark:text-[#a4acba]">
                              {manager.photoUrl ? (
                                <img
                                  src={manager.photoUrl}
                                  alt={manager.displayName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Icon
                                  icon="solar:user-bold"
                                  className="h-[28px] w-[28px]"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                            <div className="flex flex-col gap-[2px]">
                              <span className="font-['Inter',sans-serif] text-[16px] font-bold tracking-[-0.01em] text-black dark:text-[#d7e0ef]">
                                {manager.displayName}
                              </span>
                              <span className="font-['Inter',sans-serif] text-[14px] text-[#666] dark:text-[#a4acba]">
                                {manager.email}
                              </span>
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(menuOpen ? null : cardKey);
                              }}
                              aria-haspopup="menu"
                              aria-expanded={menuOpen}
                              aria-label={`More options for ${manager.displayName}`}
                              className="flex items-center justify-center rounded-full p-[4px] transition-opacity hover:opacity-70 cursor-pointer"
                            >
                              <Icon
                                icon="solar:menu-dots-bold"
                                className="h-[20px] w-[20px] text-[#666]"
                              />
                            </button>
                            <LandlordManagerActionsPopover
                              open={menuOpen}
                              onClose={() => setOpenMenuId(null)}
                              onAction={(action) => handleAction(manager, action)}
                              subjectName={manager.displayName}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <AddManager isOpen={isAddManagerOpen} onClose={() => setAddManagerOpen(false)} />
      <ReportManager
        isOpen={!!reportTarget}
        onClose={() => setReportTarget(null)}
        manager={reportTarget}
      />
      <RemoveManager
        isOpen={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        manager={removeTarget}
      />
    </LandlordLayout>
  );
};

export default Managers;
