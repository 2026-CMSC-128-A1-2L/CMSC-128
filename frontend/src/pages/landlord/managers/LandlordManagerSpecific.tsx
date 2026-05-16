import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import UpdateManager from '../../../components/landlord/LandlordManagerUpdateController';
import { getManagerById } from '../../../data/landlordManagers';

const ViewSpecificManager = () => {
  const { id } = useParams<{ id: string }>();
  const manager = getManagerById(id ?? '');
  const [isUpdateManagerOpen, setUpdateManagerOpen] = useState(false);

  if (!manager) return <Navigate to="/landlord/managers" replace />;

  return (
    <LandlordLayout
      activeSidebarItem="managers"
      breadcrumbs={[
        { label: 'Managers', to: '/landlord/managers' },
        { label: manager.displayName },
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
              {manager.displayName}
            </h1>
            <span className="font-['Inter',sans-serif] text-[15px] font-bold text-[#096c5b]">
              {manager.email}
            </span>
          </div>
          <section
            aria-label="Tenant information"
            className="grid w-full gap-x-[48px] gap-y-[24px] py-[4px] md:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start"
          >
            <span className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
              {manager.photoUrl ? (
                <img
                  src={manager.photoUrl}
                  alt={manager.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon icon="solar:user-bold" className="h-[64px] w-[64px]" aria-hidden="true" />
              )}
            </span>
            <div className="flex flex-col gap-[16px]">
              {[
                { label: 'Name', value: manager.fullName },
                { label: 'Contact number', value: manager.contactNumber },
                { label: 'Home Address', value: manager.homeAddress },
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
                { label: 'Managing Property', value: manager.property, teal: true },
                { label: 'Employed By', value: manager.employedBy, teal: true },
                { label: 'Managing Since', value: manager.managingSince },
              ].map(({ label, value, teal }) => (
                <div key={label} className="flex flex-col gap-[4px]">
                  <span className="font-['Inter',sans-serif] text-[15px] font-bold text-[#666]">
                    {label}
                  </span>
                  <span
                    className={`font-['Inter',sans-serif] text-[15px] font-bold ${teal ? 'text-[#096c5b]' : 'text-black'}`}
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
                  <b>{manager.availability.ocular.days}:</b> {manager.availability.ocular.hours}
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
                {manager.availability.inquiries.map((slot) => (
                  <span
                    key={slot.days}
                    className="font-['Inter',sans-serif] text-[14px] text-[#2f3136]"
                  >
                    <b>{slot.days}:</b> {slot.hours}
                  </span>
                ))}
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
              className="flex items-center justify-center rounded-full p-[4px] transition-opacity hover:opacity-70 cursor-pointer"
            >
              <Icon
                icon="solar:pen-bold"
                className="h-[20px] w-[20px] text-[#096c5b]"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="flex flex-col gap-[12px]">
            {manager.permissions.map((perm) => (
              <div
                key={perm.label}
                className="flex w-full items-center gap-[12px] rounded-[11px] border border-[#f0f0f0] bg-white px-[16px] py-[14px]"
              >
                <Icon
                  icon={perm.granted ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                  className={`h-[22px] w-[22px] shrink-0 ${perm.granted ? 'text-[#096c5b]' : 'text-[#e53e3e]'} cursor-pointer`}
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

      <UpdateManager isOpen={isUpdateManagerOpen} onClose={() => setUpdateManagerOpen(false)} />
    </LandlordLayout>
  );
};

export default ViewSpecificManager;
