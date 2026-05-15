import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import React from 'react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import RoomtypeModal from '../../../components/landlord/LandlordProperties/RoomtypeModal';
import { BUILDINGS } from '../../../data/buildings';
import type { Building, Room, RoomType, Tenant } from '../../../data/buildings';

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
  listing,
  rooms,
  tenants,
}: {
  facilityName: string;
  listingName: string;
  image?: string;
  listing: RoomType;
  rooms: Room[];
  tenants: Tenant[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roomCount = rooms.filter((room) => room.roomType === listing.name).length;

  return (
    <div
      className="relative h-56 w-66 overflow-hidden rounded-[15.31px] border border-solid border-whitesmoke bg-white text-left text-black font-inter shadow-sm transition-shadow duration-200 hover:shadow-lg"
    >
      <RoomtypeModal
        openModal={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        name={facilityName}
        rooms={rooms}
        tenants={tenants}
        listing={listing}
      />
      <button
        type="button"
        className="flex h-full w-full cursor-pointer flex-col items-start border-0 bg-transparent p-0 text-left"
        onClick={() => setIsModalOpen(true)}
      >
        <img className="h-36 w-full object-cover" src={image} alt={facilityName} />

        <div className="flex w-full flex-1 flex-col px-3 py-1.5">
          <b className="w-full truncate text-num-14 leading-5 text-black">{listingName}</b>
          <div className="mt-1 flex w-full items-center gap-1 text-left text-num-10 font-semibold text-dimgray">
            <Icon icon="ri:door-open-line" className="h-3.5 w-3.5 shrink-0 text-[#096c5b]" />
            <div className="min-w-0 flex-1 truncate">
              {roomCount} room{roomCount === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </button>
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
      {managers.map((manager, index) => (
        <div key={`${manager.name}-${index}`} className="flex flex-wrap items-center gap-2.5">
          <div className="font-medium">{manager.name}</div>
          <div className="font-medium text-dimgray">{manager.availability}</div>
        </div>
      ))}
    </div>
  </div>
);

const TenantList = ({ tenants }: { tenants: Building['tenants'] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Tenants</b>
    <div className="self-stretch flex flex-col gap-2 text-sm text-black">
      {tenants.map((tenant, index) => (
        <div key={`${tenant.name}-${index}`} className="flex flex-wrap items-center gap-2.5">
          <div className="font-medium">{tenant.name}</div>
          <div className="font-medium text-dimgray">{tenant.roomNumber}</div>
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
  const pendingRooms = roomTypes.filter((roomType) => roomType.status === 'pending');
  const approvedRooms = roomTypes.filter((roomType) => roomType.status === 'approved');

  return (
    <LandlordLayout
      activeSidebarItem="properties"
      breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }, { label: name }]}
    >
      <div className="w-full flex flex-col items-start gap-5 text-dimgray font-inter">
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

        <div className="w-full flex flex-col gap-5 py-2.5 px-2.5">
          <div className="text-lg text-teal font-bold">Building Information</div>

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

          <div className="flex flex-col gap-2.5">
            <b>About</b>
            <div className="w-full rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border py-3 px-4 text-sm text-slategray leading-6 font-medium whitespace-pre-wrap break-words">
              {about}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 p-2.5">
            <b>Photos</b>
            <div className="flex flex-wrap gap-2.5">
              {photos.map((photo, index) => (
                <div
                  key={`${photo}-${index}`}
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

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <b>Room Types</b>
              <div className="w-full flex flex-wrap gap-4">
                {approvedRooms.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    facilityName={name}
                    listingName={listing.name}
                    image={listing.image}
                    listing={listing}
                    rooms={rooms}
                    tenants={tenants}
                  />
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
                      listing={listing}
                      rooms={rooms}
                      tenants={tenants}
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
