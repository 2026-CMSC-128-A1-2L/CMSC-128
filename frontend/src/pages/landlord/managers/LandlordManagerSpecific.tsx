import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import UpdateManager from "../../../components/landlord/LandlordManagerUpdateController";
import { FacilityService } from "../../../service/FacilityService";
import { useAuthStore } from "../../../store/useAuthStore";

const permissionLabels: Record<string, string> = {
  deleteListings: "Delete Listings",
  manageListings: "Manage Listings",
  manageBillings: "Manage Billings",
  manageBookings: "Manage Bookings",
  manageApplications: "Manage Applications",
  reportUsers: "Report Users",
};

const ViewSpecificManager = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [manager, setManager] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateManagerOpen, setUpdateManagerOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchManagerData = async () => {
      try {
        const response = await FacilityService.getFacilities();
        const landlordFacilities = response.data.filter((f: any) => {
          const fLandlordId = (f.landlordId?._id || f.landlordId)?.toString();
          const myId =
            (user as any)._id?.toString() || (user as any).id?.toString();
          return fLandlordId === myId;
        });

        let foundManager = null;
        for (const facility of landlordFacilities) {
          const m = (facility.managers || []).find((m: any) => {
            const uId =
              m.userId?._id?.toString() ||
              m.userId?.id?.toString() ||
              m.userId?.toString();
            return uId === id;
          });
          if (m) {
            foundManager = m;
            break;
          }
        }

        if (foundManager) {
          setManager(foundManager);
        }
      } catch (error) {
        console.error("Error fetching manager data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchManagerData();
  }, [user, id]);

  if (loading) {
    return (
      <LandlordLayout
        activeSidebarItem="managers"
        breadcrumbs={[{ label: "Managers", to: "/landlord/managers" }]}
      >
        <div className="flex w-full items-center justify-center pt-[100px]">
          <span className="font-['Inter',sans-serif] text-[16px] text-[#666]">
            Loading...
          </span>
        </div>
      </LandlordLayout>
    );
  }

  if (!manager) return <Navigate to="/landlord/managers" replace />;

  const displayName =
    manager.displayName ||
    `${manager.firstName || ""} ${manager.lastName || ""}`.trim();
  const email = manager.email || (manager.emails && manager.emails[0]) || "";
  const fullName =
    manager.fullName ||
    `${manager.lastName || ""}, ${manager.firstName || ""}`.trim();

  // Format permissions
  const permissionsList = Object.entries(manager.permissions || {}).map(
    ([key, value]) => ({
      label: permissionLabels[key] || key,
      granted: !!value,
    }),
  );

  // Safe availability extraction
  const ocularAvailability = manager.availability?.ocular || {
    days: "N/A",
    hours: "N/A",
  };
  const inquiriesAvailability = manager.availability?.inquiries || [];

  return (
    <LandlordLayout
      activeSidebarItem="managers"
      breadcrumbs={[
        { label: "Managers", to: "/landlord/managers" },
        { label: displayName },
      ]}
    >
      <div className="flex w-full flex-col gap-[32px] pt-[16px]">
        {/* Profile */}
        <section className="flex w-full flex-col gap-[13px] rounded-[17px] border border-[#f0f0f0] bg-white p-[34px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Inter',sans-serif] text-[15px] font-bold text-[#666]">
              Manager Profile
            </span>
            <h1 className="font-['Inter',sans-serif] text-[26px] font-bold text-[#2f3136]">
              {displayName}
            </h1>
            <span className="font-['Inter',sans-serif] text-[15px] font-bold text-[#096c5b]">
              {email}
            </span>
          </div>
          <section
            aria-label="Tenant information"
            className="grid w-full gap-x-[48px] gap-y-[24px] py-[4px] md:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start"
          >
            <span className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
              {manager.photoUrl || manager.profilePicture ? (
                <img
                  src={manager.photoUrl || manager.profilePicture}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon
                  icon="solar:user-bold"
                  className="h-[64px] w-[64px]"
                  aria-hidden="true"
                />
              )}
            </span>
            <div className="flex flex-col gap-[16px]">
              {[
                { label: "Name", value: fullName || "N/A" },
                {
                  label: "Contact number",
                  value: manager.contactNumber || "N/A",
                },
                { label: "Home Address", value: manager.homeAddress || "N/A" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-[4px]">
                  <span className="font-['Inter',sans-serif] text-[15px] font-bold text-[#666]">
                    {label}
                  </span>
                  <span className="font-['Inter',sans-serif] text-[15px] font-bold text-black">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[16px]">
              {[
                {
                  label: "Managing Property",
                  value: manager.property || "N/A",
                  teal: true,
                },
                {
                  label: "Employed By",
                  value: manager.employedBy || "N/A",
                  teal: true,
                },
                {
                  label: "Managing Since",
                  value: manager.managingSince || "N/A",
                },
              ].map(({ label, value, teal }) => (
                <div key={label} className="flex flex-col gap-[4px]">
                  <span className="font-['Inter',sans-serif] text-[15px] font-bold text-[#666]">
                    {label}
                  </span>
                  <span
                    className={`font-['Inter',sans-serif] text-[15px] font-bold ${teal ? "text-[#096c5b]" : "text-black"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Availability */}
          <h2 className="font-['Inter',sans-serif] text-[26px] font-bold text-[#2f3136]">
            Availability
          </h2>
          <div className="flex flex-wrap gap-[48px]">
            <div className="flex items-start gap-[12px]">
              <Icon
                icon="solar:clock-circle-bold-duotone"
                className="mt-[2px] h-[28px] w-[28px] shrink-0 text-[#096c5b]"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-[6px]">
                <span className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b]">
                  Ocular Visitation
                </span>
                <span className="font-['Inter',sans-serif] text-[14px] text-[#2f3136]">
                  <b>{ocularAvailability.days}:</b> {ocularAvailability.hours}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-[12px]">
              <Icon
                icon="solar:chat-round-dots-bold-duotone"
                className="mt-[2px] h-[28px] w-[28px] shrink-0 text-[#096c5b]"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-[6px]">
                <span className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.01em] text-[#096c5b]">
                  General Inquiries
                </span>
                {inquiriesAvailability.length > 0 ? (
                  inquiriesAvailability.map((slot: any, idx: number) => (
                    <span
                      key={idx}
                      className="font-['Inter',sans-serif] text-[14px] text-[#2f3136]"
                    >
                      <b>{slot.days}:</b> {slot.hours}
                    </span>
                  ))
                ) : (
                  <span className="font-['Inter',sans-serif] text-[14px] text-[#2f3136]">
                    N/A
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}

          <div className="flex items-center gap-[12px]">
            <h2 className="font-['Inter',sans-serif] text-[26px] font-bold text-[#2f3136]">
              Permissions
            </h2>
            <button
              onClick={() => setUpdateManagerOpen(true)}
              aria-label="Edit permissions"
              className="flex items-center justify-center rounded-full p-[4px] transition-opacity hover:opacity-70"
            >
              <Icon
                icon="solar:pen-bold"
                className="h-[20px] w-[20px] text-[#096c5b]"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="flex flex-col gap-[12px]">
            {permissionsList.map((perm) => (
              <div
                key={perm.label}
                className="flex w-full items-center gap-[12px] rounded-[11px] border border-[#f0f0f0] bg-white px-[16px] py-[14px]"
              >
                <Icon
                  icon={
                    perm.granted
                      ? "solar:check-circle-bold"
                      : "solar:close-circle-bold"
                  }
                  className={`h-[22px] w-[22px] shrink-0 ${perm.granted ? "text-[#096c5b]" : "text-[#e53e3e]"}`}
                  aria-hidden="true"
                />
                <span className="font-['Inter',sans-serif] text-[15px] font-medium text-[#2f3136]">
                  {perm.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <UpdateManager
        isOpen={isUpdateManagerOpen}
        onClose={() => setUpdateManagerOpen(false)}
      />
    </LandlordLayout>
  );
};

export default ViewSpecificManager;
