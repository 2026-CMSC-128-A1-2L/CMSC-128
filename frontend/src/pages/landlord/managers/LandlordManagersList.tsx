import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import AddManager from "../../../components/landlord/LandlordManagerAddController";
import ReportManager from "../../../components/landlord/LandlordManagerReportController";
import { properties, managers } from "../../../data/landlordManagers";

const Managers = () => {
  const navigate = useNavigate();
  const [isAddManagerOpen, setAddManagerOpen] = useState(false);
  const [isReportManagerOpen, setReportManagerOpen] = useState(false);

  return (
    <LandlordLayout
      activeSidebarItem="managers"
      breadcrumbs={[{ label: "Property Manager List" }]}
    >
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        <section className="flex w-full flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Inter',sans-serif] text-[14px] text-[#666]">View All Managers</span>
            <h1 className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] text-black">Property Manager List</h1>
          </div>
          <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
        </section>

        <div className="flex flex-col gap-[48px]">
          {properties.map((property) => {
            const propertyManagers = property.managerIds.map((id) =>
              managers.find((m) => m.id === id)
            ).filter(Boolean) as typeof managers;

            return (
              <section key={property.id} className="flex flex-col gap-[10px] px-[10px]">
                <div className="flex items-center gap-[10px]">
                  <span className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b]">
                    {property.name}
                  </span>
                  <button
                    onClick={() => setAddManagerOpen(true)}
                    aria-label={`Add manager to ${property.name}`}
                    className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
                  >
                    <Icon icon="mdi-light:plus" className="h-[24px] w-[24px] text-[#096c5b]" />
                  </button>
                </div>

                {propertyManagers.length === 0 ? (
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#666]">No managers assigned yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-[24px]">
                    {propertyManagers.map((manager) => (
                      <div
                        key={manager.id}
                        onClick={() => navigate(`/landlord/managers/${manager.id}`)}
                        className="flex w-[331px] cursor-pointer items-center justify-between rounded-[8px] px-[16px] py-[10px] transition-colors hover:bg-[#f9f9f9]"
                      >
                        <div className="flex items-center gap-[10px]">
                          <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
                            {manager.photoUrl ? (
                              <img src={manager.photoUrl} alt={manager.displayName} className="h-full w-full object-cover" />
                            ) : (
                              <Icon icon="solar:user-bold" className="h-[28px] w-[28px]" aria-hidden="true" />
                            )}
                          </span>
                          <div className="flex flex-col gap-[2px]">
                            <span className="font-['Inter',sans-serif] text-[16px] font-bold tracking-[-0.01em] text-black">{manager.displayName}</span>
                            <span className="font-['Inter',sans-serif] text-[14px] text-[#666]">{manager.email}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setReportManagerOpen(true); }}
                          aria-label={`More options for ${manager.displayName}`}
                          className="flex items-center justify-center rounded-full p-[4px] transition-opacity hover:opacity-70"
                        >
                          <Icon icon="solar:menu-dots-bold" className="h-[20px] w-[20px] text-[#666]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <AddManager isOpen={isAddManagerOpen} onClose={() => setAddManagerOpen(false)} />
      <ReportManager isOpen={isReportManagerOpen} onClose={() => setReportManagerOpen(false)} />
    </LandlordLayout>
  );
};

export default Managers;