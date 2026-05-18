import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import { FacilityService } from '../../../service/FacilityService';
import { FileService } from '../../../service/FileService';
import { InviteService } from '../../../service/InviteService';
import { ListingService } from '../../../service/ListingService';
import { RentalService } from '../../../service/RentalService';
import { UnitService } from '../../../service/UnitService';
import type { CreateListingBody } from '../../../interface/listing';
import type { CreateUnitBody } from '../../../interface/unit';

// ─── Local types mapped from API responses ─────────────────────────────────

type FacilityListing = {
  id: string;
  name: string;
  roomType: string;
  description?: string;
  tags?: Record<string, string | number | boolean>;
  capacity: number;
  cost: { rent: number; estimatedUtilities: number; securityDeposit: number };
  unitCount: number;
  availableUnitCount: number;
  media: { sourceType: string; value: string }[];
};

type ApiListing = {
  id: string;
  name: string;
  image?: string;
  capacity?: number;
  price?: number;
};

type UnitRental = {
  _id: string;
  status?: string;
  userId?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: string[];
  };
};

type ApiUnit = {
  _id: string;
  roomNumber: string;
  isAvailable: boolean;
  currentRentals?: UnitRental[];
  capacity?: number;
  price?: number;
  location?: string;
};

type FacilityManager = {
  id: string;
  profilePicture?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
};

type FacilityTenant = {
  id: string;
  displayName: string;
  unit: string;
  billingStatus: string;
};

type ApiFacility = {
  id: string;
  name: string;
  location: { text: string; coordinates?: { lat: number; long: number } };
  description: string;
  type: string;
  media: { sourceType: string; value: string }[];
  listings: FacilityListing[];
  managers: FacilityManager[];
  allowVisit: boolean;
  allowTransfer: boolean;
  capacity?: number;
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const R2_PUBLIC_ORIGIN =
  import.meta.env.VITE_R2_PUBLIC_URL ?? 'https://pub-7a3284e84ae04648a8ef605ba34cb54a.r2.dev';

const addKeyCandidates = (candidates: Set<string>, key: string) => {
  const normalizedKey = key.replace(/^\/+/, '');
  if (!normalizedKey) return;

  candidates.add(`/api/files/public?key=${encodeURIComponent(normalizedKey)}`);
  candidates.add(`${R2_PUBLIC_ORIGIN.replace(/\/+$/, '')}/${normalizedKey}`);

  if (normalizedKey.startsWith('atlas/')) {
    const withoutAtlas = normalizedKey.replace(/^atlas\//, '');
    candidates.add(`/api/files/public?key=${encodeURIComponent(withoutAtlas)}`);
    candidates.add(`${R2_PUBLIC_ORIGIN.replace(/\/+$/, '')}/${withoutAtlas}`);
  } else {
    const withAtlas = `atlas/${normalizedKey}`;
    candidates.add(`/api/files/public?key=${encodeURIComponent(withAtlas)}`);
    candidates.add(`${R2_PUBLIC_ORIGIN.replace(/\/+$/, '')}/${withAtlas}`);
  }
};

const getMediaCandidates = (media: { sourceType?: string; value: string } | string) => {
  const value = typeof media === 'string' ? media : media.value;
  const candidates = new Set<string>();

  if (!value) return [];

  if (value.startsWith('http')) {
    candidates.add(value);
    try {
      const parsedUrl = new URL(value);
      addKeyCandidates(candidates, parsedUrl.pathname);
    } catch {
      // Keep the original URL if parsing fails.
    }
  } else {
    addKeyCandidates(candidates, value);
  }

  return [...candidates];
};

const FallbackImage = ({
  candidates,
  alt,
  className,
}: {
  candidates: string[];
  alt: string;
  className: string;
}) => {
  const [index, setIndex] = useState(0);
  const src = candidates[index];

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setIndex((current) => Math.min(current + 1, candidates.length - 1))}
    />
  );
};

const formatManagerName = (m: FacilityManager) =>
  [m.firstName, m.middleName, m.lastName].filter(Boolean).join(' ');

// ─── Sub-components ────────────────────────────────────────────────────────

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

const TextField = ({
  text,
  id,
  className,
  value,
}: {
  text: string;
  id: string;
  className: string;
  value: string;
}) => (
  <div className={`${className} flex flex-col gap-3 min-w-0 cursor-pointer`}>
    <label htmlFor={id} className="truncate">
      <b>{text}</b>
    </label>
    <input
      className="w-full rounded-xl bg-aliceblue border-whitesmoke-200 border-solid border py-4 px-4 text-slategray font-medium"
      id={id}
      value={value}
      disabled
      readOnly
    />
  </div>
);

const ManagerList = ({ managers }: { managers: FacilityManager[] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Managers</b>
    {managers.length === 0 ? (
      <p className="text-sm text-dimgray">No managers assigned.</p>
    ) : (
      <div className="self-stretch flex flex-col gap-2 text-sm text-black">
        {managers.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-2.5">
            <div className="font-medium">{formatManagerName(m)}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const TenantList = ({ tenants }: { tenants: FacilityTenant[] }) => (
  <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 gap-2.5">
    <b>Tenants</b>
    {tenants.length === 0 ? (
      <p className="text-sm text-dimgray">No active tenants.</p>
    ) : (
      <div className="self-stretch flex flex-col gap-2 text-sm text-black">
        {tenants.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-2.5">
            <div className="font-medium">{t.displayName}</div>
            <div className="font-medium text-dimgray">{t.unit}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AddListingCard = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full sm:w-66 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-num-10 bg-silver-100 border-silver-200 border-dashed border-2 flex flex-col items-center justify-center py-4 px-8 text-center text-teal h-56 cursor-pointer transition-opacity hover:opacity-80"
  >
    <div className="flex flex-col items-center gap-4">
      <Icon icon="material-symbols:add-rounded" className="w-15 h-15" />
      <div className="flex flex-col items-center gap-1">
        <b>Add New Listing</b>
        <div className="text-sm font-medium text-dimgray">
          Add a new listing/room type under this building
        </div>
      </div>
    </div>
  </button>
);

// ─── ListingCard ───────────────────────────────────────────────────────────

const ListingCard = ({
  facilityName,
  listing,
  onOpen,
}: {
  facilityName: string;
  listing: FacilityListing;
  onOpen: (listing: ApiListing) => void;
}) => {
  const imageCandidates =
    listing.media.length > 0
      ? getMediaCandidates(listing.media[0])
      : ['https://placehold.co/264x144?text=No+image'];
  const image = imageCandidates[0];

  return (
    <div className="relative h-56 w-66 overflow-hidden rounded-[15.31px] border border-solid border-whitesmoke bg-white text-left text-black font-inter shadow-sm transition-shadow duration-200 hover:shadow-lg">
      <button
        type="button"
        className="flex h-full w-full cursor-pointer flex-col items-start border-0 bg-transparent p-0 text-left"
        onClick={() =>
          onOpen({
            id: listing.id,
            name: listing.name,
            image,
            capacity: listing.capacity,
            price:
              listing.cost.rent ||
              (typeof listing.tags?.monthly_price === 'number' ? listing.tags.monthly_price : undefined),
          })
        }
      >
        <FallbackImage candidates={imageCandidates} alt={listing.name} className="h-36 w-full object-cover" />
        <div className="flex w-full flex-1 flex-col px-3 py-1.5">
          <b className="w-full truncate text-num-14 leading-5 text-black">{listing.name}</b>
          <div className="mt-1 flex w-full items-center gap-1 text-left text-num-10 font-semibold text-dimgray">
            <Icon icon="ri:door-open-line" className="h-3.5 w-3.5 shrink-0 text-[#096c5b]" />
            <div className="min-w-0 flex-1 truncate">
              {listing.availableUnitCount}/{listing.unitCount} available
            </div>
          </div>
          {listing.cost.rent > 0 && (
            <div className="text-num-10 font-semibold text-dimgray">
              ₱{listing.cost.rent.toLocaleString()}/mo
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

const getRentalTenantName = (rental: UnitRental) =>
  [
    rental.userId?.firstName,
    rental.userId?.middleName,
    rental.userId?.lastName,
  ]
    .filter(Boolean)
    .join(' ') || 'Student';

const getRentalTenantEmail = (rental: UnitRental) => rental.userId?.emails?.[0] ?? 'No email listed';

const ListingManagementModal = ({
  facilityId,
  facilityName,
  listing,
  units,
  isLoadingUnits,
  onClose,
  onCreateUnit,
  onInviteStudent,
  onRemoveTenant,
}: {
  facilityId: string;
  facilityName: string;
  listing: ApiListing;
  units: ApiUnit[];
  isLoadingUnits?: boolean;
  onClose: () => void;
  onCreateUnit: (data: CreateUnitBody) => Promise<void>;
  onInviteStudent: (unitId: string, email: string) => Promise<void>;
  onRemoveTenant: (rentalId: string) => Promise<void>;
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(units[0]?._id ?? null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [unitForm, setUnitForm] = useState({
    roomNumber: '',
    capacity: String(listing.capacity ?? 1),
    price: listing.price ? String(listing.price) : '',
    location: '',
  });
  const [actionError, setActionError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (!selectedUnitId && units[0]?._id) setSelectedUnitId(units[0]._id);
    if (selectedUnitId && !units.some((unit) => unit._id === selectedUnitId)) {
      setSelectedUnitId(units[0]?._id ?? null);
    }
  }, [selectedUnitId, units]);

  const selectedUnit = units.find((unit) => unit._id === selectedUnitId) ?? null;
  const activeRentals = selectedUnit?.currentRentals?.filter((rental) => rental.status !== 'ended') ?? [];

  const runAction = async (action: () => Promise<void>) => {
    setActionError(null);
    setIsWorking(true);
    try {
      await action();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Action failed.');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8">
      <button type="button" className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-whitesmoke px-7 py-5">
          <div>
            <p className="text-sm font-semibold text-[#64748b]">{facilityName}</p>
            <h2 className="text-2xl font-bold text-[#096c5b]">{listing.name}</h2>
          </div>
          <button type="button" onClick={onClose} className="cursor-pointer text-[#64748b] hover:text-[#2f3136]">
            <Icon icon="material-symbols:close-rounded" className="h-6 w-6" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[280px_1fr] overflow-hidden">
          <div className="overflow-y-auto border-r border-whitesmoke bg-[#f8fbfa] p-5">
            <div className="mb-3 flex items-center justify-between">
              <b className="text-sm text-[#2f3136]">Units</b>
              <span className="text-xs font-semibold text-[#64748b]">{units.length}</span>
            </div>
            {isLoadingUnits ? (
              <p className="py-6 text-center text-sm font-medium text-[#64748b]">Loading units...</p>
            ) : units.length === 0 ? (
              <p className="py-6 text-center text-sm font-medium text-[#64748b]">No units yet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {units.map((unit) => (
                  <button
                    key={unit._id}
                    type="button"
                    onClick={() => setSelectedUnitId(unit._id)}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors ${
                      selectedUnitId === unit._id
                        ? 'border-[#096c5b] bg-white text-[#096c5b]'
                        : 'border-whitesmoke bg-white text-[#2f3136] hover:border-[#9ccfc5]'
                    }`}
                  >
                    <div className="font-bold">Room {unit.roomNumber}</div>
                    <div className="mt-1 text-xs font-semibold text-[#64748b]">
                      {(unit.currentRentals?.length ?? 0)}/{unit.capacity ?? 0} tenants ·{' '}
                      {unit.isAvailable ? 'Available' : 'Occupied'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-y-auto p-6">
            {selectedUnit ? (
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl border border-whitesmoke bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#2f3136]">Room {selectedUnit.roomNumber}</h3>
                      <p className="mt-1 text-sm font-medium text-[#64748b]">
                        Capacity {selectedUnit.capacity ?? 0} · ₱{(selectedUnit.price ?? 0).toLocaleString()}/mo
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${selectedUnit.isAvailable ? 'bg-teal-50 text-[#096c5b]' : 'bg-red-50 text-red-600'}`}>
                      {selectedUnit.isAvailable ? 'Available' : 'Occupied'}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-whitesmoke bg-white p-5">
                  <b className="text-sm text-[#2f3136]">Tenants</b>
                  {activeRentals.length === 0 ? (
                    <p className="mt-3 text-sm font-medium text-[#64748b]">No tenants currently reside in this unit.</p>
                  ) : (
                    <div className="mt-3 flex flex-col gap-3">
                      {activeRentals.map((rental) => (
                        <div key={rental._id} className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fbfa] px-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#2f3136]">{getRentalTenantName(rental)}</p>
                            <p className="truncate text-xs font-semibold text-[#64748b]">{getRentalTenantEmail(rental)}</p>
                            <a className="mt-1 inline-block text-xs font-bold text-[#096c5b] hover:underline" href={`mailto:${getRentalTenantEmail(rental)}`}>
                              Message
                            </a>
                          </div>
                          <button
                            type="button"
                            disabled={isWorking}
                            onClick={() => runAction(() => onRemoveTenant(rental._id))}
                            className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-60"
                          >
                            Remove tenant
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-whitesmoke bg-white p-5">
                  <b className="text-sm text-[#2f3136]">Invite student to this unit</b>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={inviteEmail}
                      onChange={(event) => setInviteEmail(event.target.value)}
                      placeholder="student@up.edu.ph"
                      className="min-w-0 flex-1 rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none"
                    />
                    <button
                      type="button"
                      disabled={isWorking || !inviteEmail.trim()}
                      onClick={() =>
                        runAction(async () => {
                          await onInviteStudent(selectedUnit._id, inviteEmail.trim());
                          setInviteEmail('');
                        })
                      }
                      className="cursor-pointer rounded-xl bg-[#096c5b] px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="rounded-2xl border border-whitesmoke p-8 text-center text-sm font-medium text-[#64748b]">
                Select or create a unit to manage tenants.
              </p>
            )}

            <div className="mt-5 rounded-2xl border border-whitesmoke bg-white p-5">
              <b className="text-sm text-[#2f3136]">Create new unit</b>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Room number" value={unitForm.roomNumber} onChange={(event) => setUnitForm((form) => ({ ...form, roomNumber: event.target.value }))} />
                <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Capacity" type="number" min={1} value={unitForm.capacity} onChange={(event) => setUnitForm((form) => ({ ...form, capacity: event.target.value }))} />
                <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Monthly price" type="number" min={1} value={unitForm.price} onChange={(event) => setUnitForm((form) => ({ ...form, price: event.target.value }))} />
                <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Location in building" value={unitForm.location} onChange={(event) => setUnitForm((form) => ({ ...form, location: event.target.value }))} />
              </div>
              <button
                type="button"
                disabled={isWorking || !unitForm.roomNumber.trim() || !unitForm.price}
                onClick={() =>
                  runAction(async () => {
                    await onCreateUnit({
                      listingId: listing.id,
                      roomNumber: unitForm.roomNumber.trim(),
                      capacity: Number(unitForm.capacity) || listing.capacity || 1,
                      currentOccupancy: 0,
                      price: Number(unitForm.price) || 1,
                      location: unitForm.location.trim() || undefined,
                      isAvailable: true,
                    });
                    setUnitForm({
                      roomNumber: '',
                      capacity: String(listing.capacity ?? 1),
                      price: listing.price ? String(listing.price) : '',
                      location: '',
                    });
                  })
                }
                className="mt-3 cursor-pointer rounded-xl bg-[#096c5b] px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
              >
                Create unit
              </button>
            </div>

            {actionError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{actionError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddListingModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (body: CreateListingBody, files: File[]) => Promise<void>;
}) => {
  const [form, setForm] = useState({
    name: '',
    roomType: 'shared' as CreateListingBody['roomType'],
    capacity: '1',
    price: '',
    description: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? []);
    setFiles((current) => [...current, ...nextFiles]);
    setPreviews((current) => [...current, ...nextFiles.map((file) => URL.createObjectURL(file))]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8">
      <button type="button" className="absolute inset-0 cursor-pointer" onClick={onClose} />
      <form
        className="relative z-10 flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-2xl"
        onSubmit={async (event) => {
          event.preventDefault();
          setError(null);
          setIsSubmitting(true);
          try {
            await onSubmit(
              {
                tags: {
                  ...(form.name.trim() ? { roomLabel: form.name.trim() } : {}),
                  monthly_price: Number.parseFloat(form.price) || 1,
                },
                roomType: form.roomType,
                capacity: Number(form.capacity) || 1,
                isPrivate: false,
                allowVisit: true,
                allowTransfer: true,
                description: form.description.trim(),
                mediaUrls: [],
              },
              files,
            );
          } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Could not create listing.');
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-[#64748b]">New room type</p>
            <h2 className="text-2xl font-bold text-[#096c5b]">Add Listing</h2>
          </div>
          <button type="button" onClick={onClose} className="cursor-pointer text-[#64748b] hover:text-[#2f3136]">
            <Icon icon="material-symbols:close-rounded" className="h-6 w-6" />
          </button>
        </div>

        <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Listing name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
        <select className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" value={form.roomType} onChange={(event) => setForm((current) => ({ ...current, roomType: event.target.value as CreateListingBody['roomType'] }))}>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="shared">Shared</option>
        </select>
        <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Capacity per unit" type="number" min={1} value={form.capacity} onChange={(event) => setForm((current) => ({ ...current, capacity: event.target.value }))} />
        <input className="rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Monthly price" type="number" min={1} value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
        <textarea className="min-h-[110px] rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-medium text-[#2f3136] outline-none" placeholder="Description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />

        <div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-whitesmoke bg-aliceblue px-4 py-3 text-sm font-bold text-[#096c5b]">
            <Icon icon="material-symbols:add-photo-alternate-outline" className="h-5 w-5" />
            Add photos
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
          </label>
          {previews.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {previews.map((preview, index) => (
                <img key={`${preview}-${index}`} src={preview} alt={`Listing preview ${index + 1}`} className="h-20 w-20 rounded-xl object-cover" />
              ))}
            </div>
          )}
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" disabled={isSubmitting || !form.name.trim() || !form.price} className="cursor-pointer rounded-xl bg-[#096c5b] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
          {isSubmitting ? 'Creating...' : 'Create listing'}
        </button>
      </form>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────

const BuildingInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const facilityStatus: string | undefined = (location.state as any)?.facilityStatus;
  const facilityCapacity: number | undefined = (location.state as any)?.facilityCapacity;

  const [facility, setFacility] = useState<ApiFacility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tenants, setTenants] = useState<FacilityTenant[]>([]);

  const [selectedListing, setSelectedListing] = useState<ApiListing | null>(null);
  const [modalUnits, setModalUnits] = useState<ApiUnit[]>([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const [unitCache, setUnitCache] = useState<Record<string, ApiUnit[]>>({});
  const [isAddListingOpen, setAddListingOpen] = useState(false);

  const refreshFacility = useCallback(async () => {
    if (!id) return;
    const facilityRes = await FacilityService.getFacility(id);
    setFacility(facilityRes.data as ApiFacility);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [facilityRes, tenantsRes] = await Promise.all([
          FacilityService.getFacility(id),
          FacilityService.getTenants(),
        ]);
        if (!cancelled) {
          setFacility(facilityRes.data as ApiFacility);
          const facilityTenants = (tenantsRes as any[]).filter(
            (t: any) => t.facilityId?.toString() === id,
          );
          setTenants(
            facilityTenants.map((t: any) => ({
              id: t.id,
              displayName: t.displayName,
              unit: t.unit,
              billingStatus: t.billingStatus,
            })),
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load facility.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const openListingModal = useCallback(
    async (listing: ApiListing) => {
      setSelectedListing(listing);
      if (unitCache[listing.id]) {
        setModalUnits(unitCache[listing.id]);
        return;
      }
      setIsLoadingUnits(true);
      try {
        const res = await UnitService.getUnitsByListing(listing.id);
        const units: ApiUnit[] = (res.data ?? []).map((u: any) => ({
          _id: u._id,
          roomNumber: u.roomNumber,
          isAvailable: u.isAvailable,
          currentRentals: u.currentRentals ?? [],
          capacity: u.capacity,
          price: u.price,
          location: u.location,
        }));
        setUnitCache((prev) => ({ ...prev, [listing.id]: units }));
        setModalUnits(units);
      } catch {
        setModalUnits([]);
      } finally {
        setIsLoadingUnits(false);
      }
    },
    [unitCache],
  );

  const refreshListingUnits = useCallback(
    async (listingId: string) => {
      const res = await UnitService.getUnitsByListing(listingId);
      const units: ApiUnit[] = (res.data ?? []).map((u: any) => ({
        _id: u._id,
        roomNumber: u.roomNumber,
        isAvailable: u.isAvailable,
        currentRentals: u.currentRentals ?? [],
        capacity: u.capacity,
        price: u.price,
        location: u.location,
      }));
      setUnitCache((prev) => ({ ...prev, [listingId]: units }));
      setModalUnits(units);
      await refreshFacility();
    },
    [refreshFacility],
  );

  const handleCreateListing = useCallback(
    async (body: CreateListingBody, files: File[]) => {
      if (!id) return;
      const uploadedFiles = await Promise.all(files.map(FileService.uploadFile));
      await ListingService.createListing(id, {
        ...body,
        mediaUrls: uploadedFiles.map((file) => file.key),
      });
      setAddListingOpen(false);
      await refreshFacility();
    },
    [id, refreshFacility],
  );

  const handleCreateUnit = useCallback(
    async (body: CreateUnitBody) => {
      await UnitService.createUnit(body.listingId, body);
      await refreshListingUnits(body.listingId);
    },
    [refreshListingUnits],
  );

  const handleInviteStudent = useCallback(
    async (unitId: string, email: string) => {
      if (!id) return;
      await InviteService.inviteStudent({ facilityId: id, unitId, email });
    },
    [id],
  );

  const handleRemoveTenant = useCallback(
    async (rentalId: string) => {
      if (!selectedListing) return;
      await RentalService.moveOut(rentalId, {
        actualMoveOutDate: new Date().toISOString().slice(0, 10) as unknown as Date,
      });
      await refreshListingUnits(selectedListing.id);
    },
    [refreshListingUnits, selectedListing],
  );

  const closeModal = useCallback(() => {
    setSelectedListing(null);
    setModalUnits([]);
  }, []);

  if (isLoading) {
    return (
      <LandlordLayout
        activeSidebarItem="properties"
        breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }]}
      >
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading facility...
        </div>
      </LandlordLayout>
    );
  }

  if (error || !facility) {
    return (
      <LandlordLayout
        activeSidebarItem="properties"
        breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }]}
      >
        <div className="flex items-center justify-center h-64 text-gray-500">
          {error ?? 'Facility not found.'}
        </div>
      </LandlordLayout>
    );
  }

  const totalUnits = facility.listings.reduce((sum, l) => sum + l.unitCount, 0);
  const capacity = facility.capacity ?? facilityCapacity ?? totalUnits;

  const statusLabel = facilityStatus
    ? facilityStatus === 'approved'
      ? 'Active'
      : facilityStatus.charAt(0).toUpperCase() + facilityStatus.slice(1)
    : '—';

  const photos = facility.media.map(getMediaCandidates);

  return (
    <LandlordLayout
      activeSidebarItem="properties"
      breadcrumbs={[
        { label: 'Properties', to: '/landlord/properties' },
        { label: facility.name },
      ]}
    >
      {selectedListing && id && (
        <ListingManagementModal
          facilityId={id}
          facilityName={facility.name}
          listing={selectedListing}
          units={modalUnits}
          isLoadingUnits={isLoadingUnits}
          onClose={closeModal}
          onCreateUnit={handleCreateUnit}
          onInviteStudent={handleInviteStudent}
          onRemoveTenant={handleRemoveTenant}
        />
      )}
      {isAddListingOpen && (
        <AddListingModal onClose={() => setAddListingOpen(false)} onSubmit={handleCreateListing} />
      )}

      <div className="w-full flex flex-col items-start gap-5 text-dimgray font-inter">
        <div className="w-full flex flex-wrap items-center gap-5 sm:gap-10 text-2xl text-gray border-b-2 border-b-whitesmoke py-4">
          <b className="truncate">{facility.name}</b>
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
              <TextField className="w-full md:flex-4" text="Name" id="name" value={facility.name} />
              <TextField
                className="w-full md:flex-3"
                text="Type of Building"
                id="building-type"
                value={facility.type}
              />
              <TextField
                className="w-full md:flex-2"
                text="Status"
                id="status"
                value={statusLabel}
              />
              <TextField
                className="w-full md:flex-1"
                text="Capacity"
                id="capacity"
                value={capacity.toString()}
              />
            </div>
            <TextField
              className="w-full"
              text="Location"
              id="location"
              value={facility.location.text}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <b>About</b>
            <div className="w-full rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border py-3 px-4 text-sm text-slategray leading-6 font-medium whitespace-pre-wrap break-words">
              {facility.description}
            </div>
          </div>

          {photos.length > 0 && (
            <div className="flex flex-col gap-2.5 p-2.5">
              <b>Photos</b>
              <div className="flex flex-wrap gap-2.5">
                {photos.map((candidates, index) => (
                  <div
                    key={`${candidates[0]}-${index}`}
                    className="h-25 w-25 rounded-num-12 border-whitesmoke-200 border-solid border overflow-hidden shrink-0"
                  >
                    <FallbackImage
                      candidates={candidates}
                      alt={`${facility.name} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <b>Room Types</b>
              <div className="w-full flex flex-wrap gap-4">
                {facility.listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    facilityName={facility.name}
                    listing={listing}
                    onOpen={openListingModal}
                  />
                ))}
                <AddListingCard onClick={() => setAddListingOpen(true)} />
              </div>
            </div>
          </div>

          <ManagerList managers={facility.managers} />
          <TenantList tenants={tenants} />
        </div>
      </div>
    </LandlordLayout>
  );
};

export default BuildingInfo;
