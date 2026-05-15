import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import { BUILDINGS } from '../../../data/buildings';
import type { Building } from '../../../data/buildings';
import RoomtypeModal from '../../../components/landlord/LandlordProperties/RoomtypeModal';
import React from 'react';

const Button = ({
  text,
  children,
  onClick,
}: {
  text: string;
  children?: React.ReactElement;
  onClick?: React.MouseEventHandler;
}) => (
  <button
    type="button"
    className="cursor-pointer rounded-xl border-teal border-solid border flex items-center justify-center py-2 px-4 gap-2 hover:text-whitesmoke-200 hover:bg-teal"
    onClick={onClick}
  >
    <b>{text}</b>
    {children}
  </button>
);

const ListingCard = ({
  facilityName,
  listingName,
  image,
  setModal,
}: {
  facilityName: string;
  listingName: string;
  image?: string;
  onClick?: React.MouseEventHandler;
  setModal?: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`relative bg-aliceblue border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start text-left text-black font-inter transition-all duration-300 w-full sm:w-66 ${isExpanded ? 'h-fit rounded-num-16 shadow-sm' : 'h-56 rounded-[15.31px]'}`}
    >
      <img
        className="w-full h-30 object-cover cursor-pointer"
        src={image}
        alt={facilityName}
        onClick={() => setModal?.(true)}
      />
      <div className="w-full flex flex-col py-2 px-3 gap-2">
        <b className="w-full text-num-16">{listingName}</b>
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:scale-125 transition-transform"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isExpanded ? 'bi:chevron-compact-up' : 'bi:chevron-compact-down'}
              className="w-6 h-6 text-teal"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const TextField = ({
  text,
  id,
  className,
  value,
  disabled,
}: {
  text: string;
  id: string;
  className: string;
  value: string;
  disabled?: boolean;
}) => (
  <div className={`${className} flex flex-col gap-3 min-w-0`}>
    <label htmlFor={id} className="truncate">
      <b>{text}</b>
    </label>
    <input
      className="w-full rounded-xl bg-aliceblue border-whitesmoke-200 border-solid border py-4 px-4 text-slategray font-medium"
      id={id}
      value={value}
      disabled={disabled}
      readOnly
    />
  </div>
);

const ManagerList = ({ managers }: { managers: Building['managers'] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Managers</b>
    <div className="self-stretch flex flex-col gap-2 text-sm text-black">
      {managers.map((m, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2.5">
          <div className="font-medium">{m.name}</div>
          <div className="font-medium text-dimgray">{m.availability}</div>
        </div>
      ))}
    </div>
  </div>
);

const TenantList = ({ tenants }: { tenants: Building['tenants'] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Tenants</b>
    <div className="self-stretch flex flex-col gap-2 text-sm text-black">
      {tenants.map((t, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2.5">
          <div className="font-medium">{t.name}</div>
          <div className="font-medium text-dimgray">{t.roomNumber}</div>
        </div>
      ))}
    </div>
  </div>
);

const AddListingCard = () => (
  <div className="w-full sm:w-66 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-num-10 bg-silver-100 border-silver-200 border-dashed border-2 flex flex-col items-center justify-center py-4 px-8 text-center text-teal h-56">
    <div className="flex flex-col items-center gap-4">
      <Icon icon="material-symbols:add-rounded" className="w-15 h-15" />
      <div className="flex flex-col items-center gap-1">
        <b>Add New Listing</b>
        <div className="text-sm font-medium text-dimgray">
          Add a new listing/room type under this building
        </div>
      </div>
    </div>
  </div>
);

const BuildingInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [modal, setModal] = useState(false);

  const building: Building | undefined =
    (location.state as Building) ?? BUILDINGS.find((b) => b.id === id);

  if (!building) {
    return (
      <LandlordLayout
        activeSidebarItem="properties"
        breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }]}
      >
        <div className="flex items-center justify-center h-64 text-gray-500">
          Building not found.
        </div>
      </LandlordLayout>
    );
  }

  const {
    name,
    buildingType,
    status,
    capacity,
    address,
    about,
    photos,
    roomTypes,
    rooms,
    managers,
    tenants,
  } = building;
  const pendingRooms = roomTypes.filter((r) => r.status === 'pending');
  const approvedRooms = roomTypes.filter((r) => r.status === 'approved');

  return (
    <LandlordLayout
      activeSidebarItem="properties"
      breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }, { label: name }]}
    >
      <div className="w-full flex flex-col items-start gap-5 text-dimgray font-inter">
        {/* Page header */}
        <div className="w-full flex flex-wrap items-center gap-5 sm:gap-10 text-2xl text-gray border-b-2 border-b-whitesmoke py-4">
          <b className="truncate">{name}</b>
          <div className="flex items-center gap-4 text-sm text-teal flex-wrap">
            <Button text="Edit Details" onClick={() => navigate(`/landlord/properties/edit/${id}`)}>
              <Icon icon="iconamoon:edit" className="w-5 h-5" />
            </Button>
            <Button text="View As Student" onClick={() => {}}>
              <Icon icon="iconamoon:eye-light" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col gap-5 py-2.5 px-2.5">
          <div className="text-lg text-teal font-bold">Building Information</div>

          {/* Fields row 1 — stack on mobile */}
          <div className="w-full flex flex-col gap-4 text-sm text-dimgray">
            <div className="w-full flex flex-col md:flex-row items-start gap-4">
              <TextField disabled className="w-full md:flex-4" text="Name" id="name" value={name} />
              <TextField
                disabled
                className="w-full md:flex-3"
                text="Type of Building"
                id="building-type"
                value={buildingType}
              />
              <TextField
                disabled
                className="w-full md:flex-2"
                text="Status"
                id="status"
                value={status}
              />
              <TextField
                disabled
                className="w-full md:flex-1"
                text="Capacity"
                id="capacity"
                value={capacity.toString()}
              />
            </div>
            <TextField disabled className="w-full" text="Location" id="location" value={address} />
          </div>

          {/* About */}
          <div className="flex flex-col gap-2.5">
            <b>About</b>
            <div className="w-full rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border py-3 px-4 text-sm text-slategray leading-6 font-medium whitespace-pre-wrap break-words">
              {about}
            </div>
          </div>

          {/* Photos */}
          <div className="flex flex-col gap-2.5 p-2.5">
            <b>Photos</b>
            <div className="flex flex-wrap gap-2.5">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="h-25 w-25 rounded-num-12 border-whitesmoke-200 border-solid border overflow-hidden shrink-0"
                >
                  <img
                    src={photo}
                    alt={`${name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <b>Room Types</b>
              <div className="w-full flex flex-wrap gap-4">
                {approvedRooms.map((listing) => (
                  <React.Fragment key={listing.id}>
                    <ListingCard
                      facilityName={name}
                      listingName={listing.name}
                      image={listing.image}
                      setModal={setModal}
                    />
                    <RoomtypeModal openModal={modal} closeModal={() => setModal(false)}>
                      <div className="flex flex-col w-full gap-4">
                        <div className="flex flex-col items-center">
                          <p className="font-bold">{name}</p>
                          <p>{listing.name}</p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-center text-sm">
                            <thead>
                              <tr>
                                <th className="p-2">Room Number</th>
                                <th className="p-2">Current Occupants</th>
                                <th className="p-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rooms
                                .filter((r) => r.roomType === listing.name)
                                .map((room) => (
                                  <tr key={room.id}>
                                    <td className="p-2">{room.roomNumber}</td>
                                    <td className="p-2">
                                      {
                                        tenants.filter((t) => t.roomNumber === room.roomNumber)
                                          .length
                                      }
                                    </td>
                                    <td className="p-2">{listing.status}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <p className="font-bold">Tenants</p>
                          <div className="flex flex-col gap-1 text-sm">
                            {rooms
                              .filter((r) => r.roomType === listing.name)
                              .map((room) =>
                                tenants
                                  .filter((t) => t.roomNumber === room.roomNumber)
                                  .map((tenant) => <span key={tenant.name}>{tenant.name}</span>),
                              )}
                          </div>
                        </div>
                      </div>
                    </RoomtypeModal>
                  </React.Fragment>
                ))}
                <AddListingCard />
              </div>
            </div>

            {pendingRooms.length > 0 && (
              <div className="flex flex-col gap-3 text-dimgray">
                <b>Pending</b>
                <div className="flex flex-wrap gap-4 text-black">
                  {pendingRooms.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      facilityName={name}
                      listingName={listing.name}
                      image={listing.image}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <ManagerList managers={managers} />
          <TenantList tenants={tenants} />
        </div>
      </div>
    </LandlordLayout>
  );
};

export default BuildingInfo;
