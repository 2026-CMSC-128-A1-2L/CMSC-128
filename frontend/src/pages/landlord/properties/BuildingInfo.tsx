import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';

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

const ListingCard = (props: { facilityName: string; listingName: string; image?: string }) => {
  const { facilityName, listingName, image } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative bg-aliceblue border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start text-left text-black font-inter transition-all duration-300
        ${isExpanded ? 'w-66 h-fit rounded-num-16 shadow-sm' : 'w-66 h-56 rounded-[15.31px]'}`}
    >
      <img className="w-66 h-30 object-cover" src={image} alt={facilityName} />

      <div className="w-full flex flex-col py-2 px-3 gap-2">
        {/* title + rating + price */}
        <div className="w-full flex flex-col items-start gap-0">
          <div className="w-full h-fit flex items-start gap-1">
            <b className="w-full relative flex items-center text-num-16">{listingName}</b>
          </div>
        </div>

        {/* location + expanded details + chevron */}
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
      />
    </div>
  );
};

type Manager = {
  name: string;
  availability: string;
};

const ManagerList = (props: { managers: Manager[] }) => (
  <div className="self-stretch h-[9.5rem] overflow-hidden shrink-0 flex flex-col items-start py-[0.625rem] px-[0rem] box-border gap-[0.625rem]">
    <div className="self-stretch flex items-center">
      <b className="relative tracking-num--0_01">Managers</b>
    </div>
    <div className="self-stretch flex flex-col items-start gap-[0.5rem] text-left text-[0.875rem] text-black">
      <table>
        {props.managers.map((manager, index) => {
          const { name, availability } = manager;

          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="self-stretch flex items-center gap-[0.625rem]">
              <div className="w-[22.5rem] relative leading-[1.5rem] font-medium flex items-center shrink-0">
                {name}
              </div>
              <div className="relative leading-[1.5rem] font-medium">{availability}</div>
            </div>
          );
        })}
      </table>
    </div>
  </div>
);

type Tenant = {
  name: string;
  roomNumber: string;
};

const TenantList = (props: { tenants: Tenant[] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.625rem] px-[0rem] gap-[0.625rem]">
    <div className="self-stretch flex items-center">
      <b className="relative tracking-num--0_01">Tenants</b>
    </div>
    <div className="self-stretch flex flex-col items-start gap-[0.5rem] text-left text-[0.875rem] text-black">
      <table>
        {props.tenants.map((tenant, index) => {
          const { name, roomNumber } = tenant;

          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="self-stretch flex items-center gap-[0.625rem]">
              <div className="w-[22.5rem] relative leading-[1.5rem] font-medium flex items-center shrink-0">
                {name}
              </div>
              <div className="relative leading-[1.5rem] font-medium">{roomNumber}</div>
            </div>
          );
        })}
      </table>
    </div>
  </div>
);

type BuildingInformation = {
  name: string;
  buildingType: string;
  status: string;
  capacity: number;
  location: string;
  about: string;
  photos: string[];
  roomTypes: {
    id: string;
    name: string;
    image: string;
    status: 'pending' | 'approved';
  }[];
  managers: Manager[];
  tenants: Tenant[];
};

const AddListingCard = () => (
  <div className="self-stretch w-66 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-num-10 bg-silver-100 border-silver-200 border-dashed border-2 box-border flex flex-col items-center justify-center py-4 px-8 text-center text-teal">
    {/* TODO: fix link */}
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

const BuildingInfo = () => {
  const [data, _setData] = useState<BuildingInformation>({
    name: 'Two Sapphire Place',
    buildingType: 'maganda',
    status: 'Active',
    capacity: 72,
    location: 'Aa',
    about: 'lorem ipsum bla bla type shi '.repeat(20),
    photos: ['hi', 'hello', 'whar'],
    roomTypes: [
      {
        id: '10',
        name: '2 Pax - Aircon',
        image: 'bye',
        status: 'pending',
      },
      {
        id: '11',
        name: '2 Pax - Non-Aircon',
        image: 'bye',
        status: 'approved',
      },
      {
        id: '12',
        name: '1 Pax',
        image: 'bye',
        status: 'approved',
      },
    ],
    managers: [
      { name: 'qj', availability: 'mon-thurs' },
      { name: 'qj', availability: 'mon-thurs' },
    ],
    tenants: [
      { name: 'qj', roomNumber: '3A' },
      { name: 'qj', roomNumber: '3B' },
    ],
  });

  const {
    name,
    buildingType,
    status,
    capacity,
    location,
    about,
    photos,
    roomTypes,
    managers,
    tenants,
  } = data;

  const pendingRooms = roomTypes.filter((x) => x.status === 'pending');
  const approvedRooms = roomTypes.filter((x) => x.status === 'approved');

  const navigate = useNavigate();
  return (
    <LandlordLayout
      activeSidebarItem={'properties'}
      breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }, { label: name }]}
    >
      <div className="w-full h-fit flex flex-col items-start gap-8 text-dimgray font-inter pr-20">
        <div className="w-full flex flex-col items-start justify-center">
          <div className="w-full flex py-4 items-center gap-10 text-2xl text-gray border-b-2 border-b-whitesmoke">
            <b>{name}</b>
            <div className="flex items-center gap-4 text-center text-sm text-teal">
              {/* TODO: correct navigation */}
              <Button text="Edit Details" onClick={() => navigate('/')}>
                <Icon icon="iconamoon:edit" className="w-5 h-5" />
              </Button>
              <Button text="View As Student" onClick={() => {}}>
                <Icon icon="iconamoon:eye-light" className="w-5 h-5"></Icon>
              </Button>
            </div>
          </div>
          <div className="self-stretch flex flex-col gap-6 pl-2 py-6">
            <div className="text-lg text-teal font-bold">Building Information</div>
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
                  id="Capacity"
                  value={capacity.toString()}
                />
              </div>
              <div className="w-full flex items-start gap-4">
                <TextField
                  disabled
                  className="flex-1"
                  text="Location"
                  id="location"
                  value={location}
                />
              </div>
            </div>
            <div className="min-h-40 flex flex-col items-start py-2.5 px-0 box-border gap-2.5 text-dimgray">
              <b>About</b>
              <textarea
                disabled
                className="self-stretch flex-1 rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border flex flex-col items-start py-3 px-4 text-left text-sm text-slategray leading-6 font-medium"
              >
                {about}
              </textarea>
            </div>
            <div className="flex flex-col p-2.5 gap-2.5">
              <b>Photos</b>
              <div className="flex flex-wrap gap-2.5">
                {photos.map((_x, index) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    className="min-h-25 min-w-25 rounded-num-12 border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-2.5"
                  ></div>
                ))}
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-center gap-[2rem]">
              <div className="flex flex-col items-start gap-4">
                <b className="relative tracking-num--0_01">Room Types</b>
                <div className="w-full flex items-center justify-between gap-4 text-left text-black">
                  {approvedRooms.map((listing) => {
                    const { id, name: listingName, image } = listing;
                    return (
                      <ListingCard
                        key={id}
                        facilityName={name}
                        listingName={listingName}
                        image={image}
                      />
                    );
                  })}
                  <AddListingCard />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-3 text-left text-dimgray">
                <b>Pending</b>
                <div className="flex items-center gap-4 text-black">
                  {pendingRooms.map((listing) => {
                    const { id, name: listingName, image } = listing;
                    return (
                      <ListingCard
                        key={id}
                        facilityName={name}
                        listingName={listingName}
                        image={image}
                      />
                    );
                  })}
                </div>
              </div>
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
