import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import AddManager from "../../../components/landlord/LandlordManagerAddController";
import ReportManager from "../../../components/landlord/LandlordManagerReportController";
import RemoveManager from "../../../components/landlord/LandlordManagerRemoveController";
import LandlordManagerActionsPopover, {
  type ManagerAction,
} from "../../../components/landlord/LandlordManagerActionsPopover";

// manager extraction workaround
import type { ProfileSchema } from "shared";
import type z from "zod";
type Profile = z.infer<typeof ProfileSchema>;
export type Manager = Extract<Profile, { userType: "Manager" }>;
// get facilities
import { FacilityService } from "../../../service/FacilityService";
// get current user
import { useAuthStore } from "../../../store/useAuthStore";

const Managers = () => {
  const navigate = useNavigate();
  const [isAddManagerOpen, setAddManagerOpen] = useState(false);
  const [addManagerFacilityId, setAddManagerFacilityId] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [reportTarget, setReportTarget] = useState<Manager | null>(null);
  const [removeTarget, setRemoveTarget] = useState<{
    manager: Manager;
    facilityId: string;
  } | null>(null);
  //
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  //
  const { user } = useAuthStore();

  const fetchFacilitiesData = async () => {
    try {
      const response = await FacilityService.getFacilities();
      const landlordFacilities = response.data.filter((f: any) => {
        const fLandlordId = (f.landlordId?._id || f.landlordId)?.toString();
        const myId =
          (user as any)._id?.toString() || (user as any).id?.toString();
        return fLandlordId === myId;
      });
      setProperties(landlordFacilities);
    } catch (error) {
      console.error("Error fetching manager data:", error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: add bauble for zero facilities owned
  useEffect(() => {
    if (!user) return;
    fetchFacilitiesData();
  }, [user]);

  const handleAction = (
    manager: Manager,
    action: ManagerAction,
    facilityId: string,
  ) => {
    setOpenMenuId(null);
    if (action === "message") {
      navigate("/landlord/messages");
      return;
    }
    if (action === "report") {
      setReportTarget(manager);
      return;
    }
    if (action === "remove") {
      setRemoveTarget({ manager, facilityId });
    }
  };

  return (
    <LandlordLayout
      activeSidebarItem="managers"
      breadcrumbs={[{ label: "Property Manager List" }]}
    >
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
            const propId = (property.id || property._id).toString();
            const propertyManagers = Array.from(
              new Map(
                (property.managers || [])
                  .filter((m: any) => m.userId)
                  .map((m: any) => {
                    const u = m.userId;
                    const id = (u._id?.$oid || u._id || u.id).toString();
                    return [
                      id,
                      {
                        ...u,
                        id,
                        emails: u.emails || [],
                        firstName: u.firstName,
                        lastName: u.lastName,
                      },
                    ];
                  }),
              ).values(),
            ) as Manager[];

            return (
              <section
                key={propId}
                className="flex flex-col gap-[10px] px-[10px]"
              >
                <div className="flex items-center gap-[10px]">
                  <span className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b]">
                    {property.name}
                  </span>
                  <button
                    onClick={() => {
                      setAddManagerFacilityId(propId);
                      setAddManagerOpen(true);
                    }}
                    aria-label={`Add manager to ${property.name}`}
                    className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70 cursor-pointer"
                  >
                    <Icon
                      icon="mdi-light:plus"
                      className="h-[24px] w-[24px] text-[#096c5b]"
                    />
                  </button>
                </div>

                {propertyManagers.length === 0 ? (
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#666]">
                    No managers assigned yet.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-[24px]">
                    {propertyManagers.map((manager) => {
                      const cardKey = `${propId}-${manager.id}`;
                      const menuOpen = openMenuId === cardKey;

                      return (
                        <div
                          key={cardKey}
                          onClick={() =>
                            navigate(`/landlord/managers/${manager.id}`)
                          }
                          className="flex w-[331px] cursor-pointer items-center justify-between rounded-[8px] px-[16px] py-[10px] transition-colors hover:bg-[#f9f9f9] dark:hover:bg-[#1f2022]"
                        >
                          <div className="flex items-center gap-[10px]">
                            <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af] dark:bg-[#242526] dark:text-[#a4acba]">
                              {manager.profilePicture ? (
                                <img
                                  src={manager.profilePicture}
                                  alt={`${manager.firstName} ${manager.lastName}`}
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
                                {`${manager.firstName} ${manager.lastName}`}
                              </span>
                              <span className="font-['Inter',sans-serif] text-[14px] text-[#666] dark:text-[#a4acba]">
                                {manager.emails?.[0]}
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
                              aria-label={`More options for ${manager.firstName} ${manager.lastName}`}
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
                              onAction={(action) =>
                                handleAction(manager, action, propId)
                              }
                              subjectName={`${manager.firstName} ${manager.lastName}`}
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

      <AddManager
        isOpen={isAddManagerOpen}
        onClose={() => setAddManagerOpen(false)}
        facilityId={addManagerFacilityId}
      />
      <ReportManager
        isOpen={!!reportTarget}
        onClose={() => setReportTarget(null)}
        manager={reportTarget}
      />
      <RemoveManager
        isOpen={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        manager={removeTarget?.manager || null}
        facilityId={removeTarget?.facilityId || ""}
        onSuccess={fetchFacilitiesData}
      />
    </LandlordLayout>
  );
};

export default Managers;
