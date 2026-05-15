import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import { BUILDINGS } from '../../../data/buildings';
import type { Building } from '../../../data/buildings';

import RoomtypeModal from '../../../components/landlord/LandlordProperties/RoomtypeModal'
import React from 'react';
// ─── Sub-components ───────────────────────────────────────────────────────────

const Button = (props: {
  text: string;
  children?: React.ReactElement;
  onClick?: React.MouseEventHandler;
}) => {
  const { text, children, onClick } = props;
  return (
    <button
      type="button"
      className="cursor-pointer rounded-xl border-teal border-solid border flex items-center justify-center py-2 px-4 gap-2 hover:text-whitesmoke-200 hover:bg-teal"
      onClick={onClick}
    >
      <b>{text}</b>
      {children}
    </button>
  );
};

const ListingCard = (props: { facilityName: string; listingName: string; image?: string; onClick?: React.MouseEventHandler; setModal?:any}) => {
  const { facilityName, listingName, image,setModal } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative bg-aliceblue border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start text-left text-black font-inter transition-all duration-300
        ${isExpanded ? 'w-66 h-fit rounded-num-16 shadow-sm' : 'w-66 h-56 rounded-[15.31px]'}`}
    >
      <img className="w-66 h-30 object-cover cursor-pointer" src={image} alt={facilityName} onClick={()=>{
                        console.log("printame")
                        setModal(true)
                      }} />
      <div className="w-full flex flex-col py-2 px-3 gap-2">
        <div className="w-full flex flex-col items-start gap-0">
          <div className="w-full h-fit flex items-start gap-1">
            <b className="w-full relative flex items-center text-num-16">{listingName}</b>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-1">
          <div className="w-full h-fit flex justify-center items-end">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:scale-125 transition-transform flex items-center justify-center"
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
    </div>
  );
};

const TextField = (props: {
  text: string;
  id: string;
  className: string;
  value: string;
  disabled?: boolean;
}) => {
  const { id, text, className, value, disabled } = props;
  return (
    <div className={`${className} flex flex-col gap-3`}>
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
};

const ManagerList = (props: { managers: Building['managers'] }) => (
  <div className="self-stretch h-38 overflow-hidden shrink-0 flex flex-col items-start py-2.5 px-0 box-border gap-2.5">
    <div className="self-stretch flex items-center">
      <b className="relative tracking-num--0_01">Managers</b>
    </div>
    <div className="self-stretch flex flex-col items-start gap-2 text-left text-[0.875rem] text-black">
      <table>
        {props.managers.map((manager, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: list is static
          <div key={index} className="self-stretch flex items-center gap-2.5">
            <div className="w-90 relative leading-6 font-medium flex items-center shrink-0">
              {manager.name}
            </div>
            <div className="relative leading-6 font-medium">{manager.availability}</div>
          </div>
        ))}
      </table>
    </div>
  </div>
);

const TenantList = (props: { tenants: Building['tenants'] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 px-0 gap-2.5">
    <div className="self-stretch flex items-center">
      <b className="relative tracking-num--0_01">Tenants</b>
    </div>
    <div className="self-stretch flex flex-col items-start gap-2 text-left text-[0.875rem] text-black">
      <table>
        {props.tenants.map((tenant, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: list is static
          <div key={index} className="self-stretch flex items-center gap-2.5">
            <div className="w-90 relative leading-6 font-medium flex items-center shrink-0">
              {tenant.name}
            </div>
            <div className="relative leading-6 font-medium">{tenant.roomNumber}</div>
          </div>
        ))}
      </table>
    </div>
  </div>
);

const AddListingCard = () => (
  <div className="self-stretch w-66 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-num-10 bg-silver-100 border-silver-200 border-dashed border-2 box-border flex flex-col items-center justify-center py-4 px-8 text-center text-teal">
    <div className="w-44 flex flex-col items-center gap-4">
      <Icon icon="material-symbols:add-rounded" className="w-15 h-15" />
      <div className="flex flex-col items-center gap-1">
        <b>Add New Listing</b>
        <div className="text-sm leading-6 font-medium text-dimgray">
          Add a new listing/room type under this building
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BuildingInfo = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const [modal, setModal] = useState(false);
  /**
   * Prefer data passed via navigation state (from PropertiesCard click).
   * Fall back to looking up by URL param so direct /landlord/properties/:id
   * links still work (e.g. refresh, shared link).
   */
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
      <div className="w-full h-fit flex flex-col items-start gap-8 text-dimgray font-inter pr-20">
        <div className="w-full flex flex-col items-start justify-center">
          {/* Page header */}
          <div className="w-full flex py-4 items-center gap-10 text-2xl text-gray border-b-2 border-b-whitesmoke">
            <b>{name}</b>
            <div className="flex items-center gap-4 text-center text-sm text-teal">
              <Button
                text="Edit Details"
                onClick={() => navigate(`/landlord/properties/edit/${id}`)}
              >
                <Icon icon="iconamoon:edit" className="w-5 h-5" />
              </Button>
              <Button text="View As Student" onClick={() => {}}>
                <Icon icon="iconamoon:eye-light" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="self-stretch flex flex-col gap-6 pl-2 py-6">
            <div className="text-lg text-teal font-bold">Building Information</div>

            {/* Fields row 1 */}
            <div className="w-full flex flex-col gap-4 text-sm text-dimgray">
              <div className="w-full flex items-start gap-4">
                <TextField disabled className="flex-4" text="Name" id="name" value={name} />
                <TextField
                  disabled
                  className="flex-3"
                  text="Type of Building"
                  id="building-type"
                  value={buildingType}
                />
                <TextField disabled className="flex-2" text="Status" id="status" value={status} />
                <TextField
                  disabled
                  className="flex-1"
                  text="Capacity"
                  id="capacity"
                  value={capacity.toString()}
                />
              </div>

              {/* Fields row 2 */}
              <div className="w-full flex items-start gap-4">
                <TextField
                  disabled
                  className="flex-1"
                  text="Location"
                  id="location"
                  value={address}
                />
              </div>
            </div>

            {/* About */}
            <div className="min-h-40 flex flex-col items-start py-2.5 px-0 box-border gap-2.5 text-dimgray">
              <b>About</b>
              <textarea
                disabled
                readOnly
                value={about}
                className="self-stretch flex-1 rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border flex flex-col items-start py-3 px-4 text-left text-sm text-slategray leading-6 font-medium"
              />
            </div>

            {/* Photos */}
            <div className="flex flex-col p-2.5 gap-2.5">
              <b>Photos</b>
              <div className="flex flex-wrap gap-2.5">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="max-h-25 max-w-25 rounded-num-12 border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0"
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
            <div className="self-stretch flex flex-col items-start justify-center gap-8">
              <div className="flex flex-col items-start gap-4">
                <b className="relative tracking-num--0_01">Room Types</b>
                <div className="w-full flex items-center justify-between gap-4 text-left text-black" 
                      >
                  {approvedRooms.map((listing) => (
                      <>
                      <ListingCard
                        key={listing.id}
                        facilityName={name}
                        listingName={listing.name}
                        image={listing.image}
                        setModal={setModal}
                      />

                    <RoomtypeModal
                    key={listing.id}
                    openModal={modal}
                    closeModal={() => setModal(false)}
                    >
                      <div className='flex flex-col w-full'>
                        <div className='flex mx-auto flex-col w-fit'>
                          <p>{name}</p>
                          <p>{listing.name}</p>
                          
                        </div>
                        {/* list out all rooms of the current room type */}
                        <div className='grid grid-cols-3 mx-auto text-center'>
                        <p>Room Number</p> <p>Current Occupants</p>  <p>Status</p>
                        {rooms.filter((room)=>room.roomType===listing.name).map((room)=>(
                          
                          <React.Fragment key={room.id}>
                            <p>{room.roomNumber}</p>
                            {/* get count of all occupants per room */}
                            <p>{tenants.filter((tenant)=>tenant.roomNumber===room.roomNumber).length}</p>
                            {/* get first item that appears when filtering for roomType object associated with the room */}
                            <p>{listing.status}</p>

                          </React.Fragment>
                        ))}
                        </div>
                        {/* get all occupants in that room type */}
                        {
                          <div>
                            <p>Tenants</p>
                          <div>{
                            rooms.filter((room)=>room.roomType===listing.name).map((room)=>(
                              <React.Fragment key={room.id}>
                                {tenants.filter((tenant)=>tenant.roomNumber===room.roomNumber).map((tenant)=>(
                                  <React.Fragment key={tenant.name}>
                                  {tenant.name}
                                  </React.Fragment>
                                ))}
                              </React.Fragment>
                            ))
                          }</div>

                          </div>
                        
                        }
                      </div>
                      
                    </RoomtypeModal>
                    </>
                      
                  ))}
                  <AddListingCard />
                </div>
              </div>

              {pendingRooms.length > 0 && (
                <div className="flex flex-col items-start justify-center gap-3 text-left text-dimgray">
                  <b>Pending</b>
                  <div className="flex items-center gap-4 text-black">
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
      </div>
    </LandlordLayout>
  );
};

export default BuildingInfo;
