import { type FunctionComponent, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import {
  DEFAULT_BUILDING_COORDINATES,
  useBuildingStore,
  type ManagerPermissions,
  type TagValue,
} from './useBuildingStore';
import type {
  RoomData,
  RoomTypeData,
  ManagerData,
  PaymentMethodData,
  RequirementItem,
} from './useBuildingStore';
import { FacilityService } from '../../../service/FacilityService';
import { FileService } from '../../../service/FileService';
import { ListingService } from '../../../service/ListingService';
import { UnitService } from '../../../service/UnitService';
import type { CreateFacilityBody } from '../../../interface/facility';
import type { CreateListingBody } from '../../../interface/listing';
import type { CreateUnitBody } from '../../../interface/unit';
import FallbackImage from '../../general/FallbackImage';

// ─── Props ────────────────────────────────────────────────────────────────────

interface BuildingSubmitProps {
  onPrevClick: () => void;
  mode?: 'create' | 'edit';
  facilityId?: string;
}

// ─── Read-only Field ──────────────────────────────────────────────────────────

const ReadOnlyField: FunctionComponent<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex-1 flex flex-col items-start gap-3">
    <b className="relative text-num-14 text-[#5f6368] dark:text-[#a4acba]">{label}</b>
    <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-4 text-left text-num-14 text-[#64748b] dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef]">
      <span className="font-medium leading-6">{value || '—'}</span>
    </div>
  </div>
);

type FacilityType = CreateFacilityBody['type'];
type RoomType = CreateListingBody['roomType'];
type ManagerApiPermissions = CreateFacilityBody['managers'][number]['permissions'];

const backendFacilityTypes = new Set<FacilityType>(['on-campus', 'off-campus', 'partner housing']);

const toFacilityType = (value: string): FacilityType => {
  if (backendFacilityTypes.has(value as FacilityType)) {
    return value as FacilityType;
  }

  if (value === 'mixed') return 'partner housing';
  return 'off-campus';
};

const toRoomType = (value: string): RoomType => {
  const normalized = value.trim().toLowerCase();

  if (normalized.includes('single') || normalized.includes('solo') || normalized.includes('1')) {
    return 'single';
  }

  if (normalized.includes('double') || normalized.includes('2')) {
    return 'double';
  }

  return 'shared';
};

const toTagMap = (tags: TagValue[]): CreateListingBody['tags'] =>
  tags.reduce<CreateListingBody['tags']>((acc, tag) => {
    if (tag.value !== null && tag.value !== '') {
      acc[tag.name] = tag.value;
    }
    return acc;
  }, {});

const toManagerPermissions = (permissions: ManagerPermissions): ManagerApiPermissions => ({
  deleteBuildings: permissions.deleteBuildings ?? false,
  deleteListings: permissions.deleteListings,
  manageBuildings: permissions.manageBuildings,
  manageBillings: permissions.manageBillings,
  acceptOcularVisits: permissions.acceptOcularVisits,
  reportUsers: permissions.reportUsers,
});

const getPositiveNumberFromTags = (tags: TagValue[], nameParts: string[], fallback: number) => {
  const tag = tags.find(
    (candidate) =>
      typeof candidate.value === 'number' &&
      nameParts.some((part) => candidate.name.toLowerCase().includes(part)),
  );

  if (typeof tag?.value === 'number' && tag.value > 0) return tag.value;
  return fallback;
};

const toPositiveMoney = (value: string, fallback = 1) => {
  const amount = Number.parseFloat(value);
  return Number.isFinite(amount) && amount > 0 ? amount : fallback;
};

const getResponseId = (response: unknown): string | null => {
  if (!response || typeof response !== 'object') return null;

  const candidate = response as {
    id?: unknown;
    _id?: unknown;
    data?: {
      id?: unknown;
      _id?: unknown;
    };
  };

  const id = candidate.data?.id ?? candidate.data?._id ?? candidate.id ?? candidate._id;
  return typeof id === 'string' ? id : null;
};

// ─── Requirement Row ──────────────────────────────────────────────────────────

const RequirementRow: FunctionComponent<{ req: RequirementItem }> = ({ req }) => {
  const isUploaded = !!req.file || !!req.fileKey;
  const fileName = req.file?.name ?? req.fileKey?.split('/').pop() ?? '';
  return (
    <div className="self-stretch rounded-2xl bg-white border border-[#e5e7eb] flex items-center py-4 px-6 gap-4 shadow-sm dark:bg-[#141515] dark:border-[#343737]">
      {/* Status icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUploaded ? 'bg-[#d8f5ef]' : 'bg-red-50'
        }`}
      >
        <Icon
          icon={isUploaded ? 'material-symbols:check-rounded' : 'material-symbols:close-rounded'}
          className={`w-4 h-4 ${isUploaded ? 'text-[#096c5b]' : 'text-red-500'}`}
        />
      </div>

      {/* Label + filename */}
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-bold text-[#1f2937] dark:text-[#d7e0ef]">{req.label}</span>
        {isUploaded ? (
          <span className="text-xs text-[#64748b] font-medium truncate">
            {fileName} {req.date ? `· Submitted: ${req.date}` : ''}
          </span>
        ) : (
          <span className="text-xs italic text-[#64748b]">Not uploaded</span>
        )}
      </div>

      {/* Badge */}
      <span
        className={`text-xs font-semibold rounded-2xl px-3 py-1 shrink-0 ${
          isUploaded ? 'text-[#096c5b] bg-[#d8f5ef]' : 'text-red-600 bg-red-50'
        }`}
      >
        {isUploaded ? 'Uploaded' : 'Missing'}
      </span>
    </div>
  );
};

// ─── Room Row ─────────────────────────────────────────────────────────────────

const RoomRow: FunctionComponent<{ room: RoomData; index: number }> = ({ room, index }) => (
  <div className="self-stretch flex items-center gap-6">
    <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
      <div className="text-sm font-medium text-black leading-6 dark:text-[#a4acba]">Room Number</div>
      <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-[#64748b] font-medium dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef]">
        {room.number || String(index + 1)}
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
      <div className="text-sm font-medium text-black leading-6 dark:text-[#a4acba]">Availability</div>
      <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-[#64748b] font-medium dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef]">
        {room.isAvailable ? 'Open' : 'Occupied'}
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
      <div className="text-sm font-medium text-black leading-6 dark:text-[#a4acba]">Current Occupants</div>
      <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-[#64748b] font-medium dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef]">
        {room.current_occupants}
      </div>
    </div>
  </div>
);

// ─── Room Type Block ──────────────────────────────────────────────────────────

const RoomTypeBlock: FunctionComponent<{ roomType: RoomTypeData }> = ({ roomType }) => (
  <div className="w-full rounded-xl border border-whitesmoke flex flex-col overflow-hidden dark:border-[#343737]">
    <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-whitesmoke dark:bg-[#141515] dark:border-[#343737]">
      <b className="text-sm text-[#1f2937] dark:text-[#d7e0ef]">{roomType.roomType || roomType.name || 'Room Type'}</b>
      {roomType.capacity && (
        <span className="ml-3 text-xs font-medium text-[#64748b] bg-aliceblue px-2 py-0.5 rounded-full border border-whitesmoke">
          Capacity: {roomType.capacity}
        </span>
      )}
      {roomType.price && (
        <span className="ml-2 text-xs font-medium text-[#64748b] bg-aliceblue px-2 py-0.5 rounded-full border border-whitesmoke">
          ₱{Number(roomType.price).toLocaleString()}/mo
        </span>
      )}
    </div>
    <div className="flex flex-col px-4 py-4 gap-5">
      {roomType.about && (
        <div className="flex flex-col gap-1">
          <b className="text-xs text-[#5f6368]">About</b>
          <p className="text-sm text-[#64748b] font-medium leading-6">{roomType.about}</p>
        </div>
      )}
      {roomType.images && roomType.images.length > 0 && (
        <div className="flex flex-col gap-2">
          <b className="text-xs text-[#5f6368]">Photos</b>
          <div className="flex items-start flex-wrap gap-2">
            {roomType.images.map((src, i) => (
              <FallbackImage
                key={i}
                media={src}
                alt={`Room type photo ${i + 1}`}
                className="h-[80px] w-[80px] rounded-xl object-cover border border-whitesmoke"
              />
            ))}
          </div>
        </div>
      )}
      {roomType.rooms.length > 0 ? (
        <div className="flex flex-col gap-3">
          <b className="text-xs text-[#5f6368]">Rooms</b>
          {roomType.rooms.map((room, i) => (
            <RoomRow key={room.id} room={room} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#64748b] italic">No rooms added.</p>
      )}
    </div>
  </div>
);

// ─── Payment Method Block ─────────────────────────────────────────────────────

const PaymentMethodBlock: FunctionComponent<{
  title: string;
  accountLabel: string;
  data: PaymentMethodData;
}> = ({ title, accountLabel, data }) => (
  <div className="flex-1 flex flex-col gap-3">
    <span className="text-sm font-bold text-[#334155] tracking-wide dark:text-[#a4acba]">{title}</span>
    <div className="rounded-2xl bg-aliceblue border border-whitesmoke flex flex-col py-5 px-6 gap-5 dark:bg-[#141515] dark:border-[#343737]">
      <div className="flex items-start gap-8">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-slategray">Name</span>
          <span className="text-sm font-bold text-[#1f2937] truncate dark:text-[#d7e0ef]">{data.name || '—'}</span>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-slategray">{accountLabel}</span>
          <span className="text-sm font-bold text-[#1f2937] truncate dark:text-[#d7e0ef]">
            {data.accountNumber || '—'}
          </span>
        </div>
      </div>
      {data.qrImage ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-[#64748b]">QR Code</span>
          <img
            src={data.qrImage}
            alt="QR"
            className="h-[120px] w-[120px] rounded-xl object-cover border border-whitesmoke"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#64748b]">QR Code</span>
          <span className="text-xs italic text-[#64748b]">No QR uploaded.</span>
        </div>
      )}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const isPersistedId = (value: string) => /^[a-f\d]{24}$/i.test(value);

const isExistingMediaValue = (value: string) => value.length > 0 && !value.startsWith('blob:');

const BuildingSubmit: FunctionComponent<BuildingSubmitProps> = ({
  onPrevClick,
  mode = 'create',
  facilityId: editFacilityId,
}) => {
  const { buildingInfo, reset } = useBuildingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { payment, requirements } = buildingInfo;

  const uploadedCount = requirements.filter((r) => r.file !== null || r.fileKey !== null).length;
  const allUploaded = uploadedCount === requirements.length;

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const buildingMedia = await Promise.all(buildingInfo.imageFiles.map(FileService.uploadFile));
      const facilityPayload: CreateFacilityBody = {
        name: buildingInfo.name.trim(),
        description: buildingInfo.about.trim(),
        type: toFacilityType(buildingInfo.typeOfBuilding),
        location: {
          text: buildingInfo.location.trim(),
          coordinates: buildingInfo.locationCoordinates ?? DEFAULT_BUILDING_COORDINATES,
        },
        managers: buildingInfo.managers.map((manager) => ({
          email: manager.email,
          permissions: toManagerPermissions(manager.checkboxes),
        })),
        isAcceptingApplications: true,
        isPrivate: false,
        allowVisit: buildingInfo.allowOcularVisit,
        allowTransfer: buildingInfo.allowPasalo,
        documents: buildingInfo.requirements
          .filter((requirement) => requirement.fileKey)
          .map((requirement) => ({
            docId: requirement.id,
            name: requirement.label,
            files: [requirement.fileKey as string],
          })),
        mediaUrls: buildingMedia.map((file) => file.key),
      };

      const createdFacility =
        mode === 'edit' && editFacilityId
          ? await FacilityService.updateFacility(editFacilityId, {
              ...facilityPayload,
              mediaUrls: [
                ...buildingInfo.images.filter(isExistingMediaValue),
                ...buildingMedia.map((file) => file.key),
              ],
            })
          : await FacilityService.createFacility(facilityPayload);
      const facilityId =
        mode === 'edit' && editFacilityId ? editFacilityId : getResponseId(createdFacility);

      if (!facilityId) {
        throw new Error('The facility was created but the response did not include an id.');
      }

      for (const roomType of buildingInfo.roomTypes) {
        const roomTypeMedia = await Promise.all(roomType.imageFiles.map(FileService.uploadFile));
        const capacity = Number.parseInt(roomType.capacity, 10) || 1;
        const monthlyPrice = getPositiveNumberFromTags(
          roomType.tags,
          ['price', 'rent', 'monthly', 'cost'],
          toPositiveMoney(roomType.price),
        );
        const listingPayload: CreateListingBody = {
          tags: {
            ...toTagMap(roomType.tags),
            monthly_price: monthlyPrice,
          },
          roomType: toRoomType(roomType.roomType || roomType.name),
          capacity,
          isPrivate: false,
          allowVisit: buildingInfo.allowOcularVisit,
          allowTransfer: buildingInfo.allowPasalo,
          description: roomType.about.trim() || buildingInfo.about.trim(),
          mediaUrls:
            mode === 'edit'
              ? [
                  ...roomType.images.filter(isExistingMediaValue),
                  ...roomTypeMedia.map((file) => file.key),
                ]
              : roomTypeMedia.map((file) => file.key),
        };

        const createdListing =
          mode === 'edit' && isPersistedId(roomType.id)
            ? await ListingService.updateListing(roomType.id, listingPayload)
            : await ListingService.createListing(facilityId, listingPayload);
        const listingId = getResponseId(createdListing);

        if (!listingId && !(mode === 'edit' && isPersistedId(roomType.id))) {
          throw new Error(`The listing for ${roomType.roomType || roomType.name} was created without an id.`);
        }

        const rooms = roomType.rooms.length > 0 ? roomType.rooms : [null];
        for (const [index, room] of rooms.entries()) {
          if (mode === 'edit' && isPersistedId(roomType.id) && !room) continue;

          const unitPayload: CreateUnitBody = {
            listingId: listingId ?? roomType.id,
            roomNumber: room?.number.trim() || `${roomType.roomType || roomType.name || 'Room'} ${index + 1}`,
            capacity,
            currentOccupancy: room?.current_occupants ?? 0,
            price: monthlyPrice,
            location: buildingInfo.location.trim(),
            isAvailable: room?.isAvailable ?? true,
          };

          await UnitService.createUnit(listingId ?? roomType.id, unitPayload);
        }
      }

      reset();
      navigate(`/landlord/properties/${facilityId}`);
    } catch (error) {
      console.error('Failed to submit building:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not submit this building. Please review the details and try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [buildingInfo, editFacilityId, mode, navigate, reset]);

  return (
    <>
      <div className="relative w-full flex flex-col items-start justify-center gap-2.5 text-center text-num-18 text-teal-200 font-inter">
        <div className="w-[880px] flex flex-col items-start">
          <div className="w-[880px] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-8 px-12 gap-3 dark:bg-[#101111] dark:border-[#343737]">
            {/* Review Banner */}
            <div className="self-stretch rounded-xl bg-lightcyan border border-teal-100 flex items-center px-4 py-3 gap-3 text-left mb-2 dark:bg-[#12342e] dark:border-[#24463f]">
              <Icon
                icon="material-symbols:info-outline"
                className="w-5 h-5 text-teal-600 shrink-0"
              />
              <p className="text-sm font-medium text-teal-700 dark:text-[#72cbb8]">
                Please review all information carefully before {mode === 'edit' ? 'saving changes' : 'submitting'}.
              </p>
            </div>

            {/* ── Requirements ── */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <div className="self-stretch flex items-center justify-between">
                <b className="relative tracking-num--0_01 text-[#096c5b] dark:text-[#72cbb8]">Building Requirements</b>
                {/* Upload progress badge */}
                <span
                  className={`text-xs font-semibold rounded-full px-3 py-1 ${
                    allUploaded ? 'bg-[#d8f5ef] text-[#096c5b]' : 'bg-red-50 text-red-600'
                  }`}
                >
                  {uploadedCount} / {requirements.length} uploaded
                </span>
              </div>
              <div className="self-stretch flex flex-col gap-3">
                {requirements.map((req) => (
                  <RequirementRow key={req.id} req={req} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="self-stretch h-px bg-whitesmoke my-2 dark:bg-[#343737]" />

            {/* Building Info */}
            <div className="self-stretch flex flex-col items-start gap-6">
              <b className="relative tracking-num--0_01">Building Information</b>
              <div className="self-stretch flex flex-col items-start gap-5 text-left">
                <div className="self-stretch flex items-start gap-10">
                  <ReadOnlyField label="Name" value={buildingInfo.name} />
                  <ReadOnlyField label="Type of Building" value={buildingInfo.typeOfBuilding} />
                </div>
                <ReadOnlyField label="Location" value={buildingInfo.location} />
                <ReadOnlyField
                  label="Coordinates"
                  value={`${buildingInfo.locationCoordinates.lat.toFixed(6)}, ${buildingInfo.locationCoordinates.long.toFixed(6)}`}
                />
              </div>
            </div>

            {/* About */}
            <div className="self-stretch flex flex-col items-start py-num-10 px-0 gap-2.5 text-left">
              <b className="relative tracking-num--0_01">About</b>
              <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] py-3 px-4 text-left text-num-14 text-[#64748b] font-medium min-h-[120px] dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef]">
                {buildingInfo.about || (
                  <span className="italic text-[#64748b]">No description provided.</span>
                )}
              </div>
            </div>

            {/* Photos */}
            <div className="self-stretch flex flex-col items-start p-num-10 gap-2.5">
              <b className="relative tracking-num--0_01">Photos</b>
              {buildingInfo.images && buildingInfo.images.length > 0 ? (
                <div className="self-stretch flex items-start flex-wrap gap-2 py-2">
                  {buildingInfo.images.map((src, index) => (
                    <FallbackImage
                      key={index}
                      media={src}
                      alt={`Building photo ${index + 1}`}
                      className="h-[100px] w-[100px] rounded-num-12 object-cover border border-whitesmoke"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#64748b] italic py-2">No photos uploaded.</p>
              )}
            </div>

            {/* Room Types */}
            <div className="self-stretch flex flex-col items-start p-num-10 gap-2.5">
              <b className="relative tracking-num--0_01">Room Types</b>
              <div className="self-stretch flex flex-col gap-3 text-left">
                {buildingInfo.roomTypes.length > 0 ? (
                  buildingInfo.roomTypes.map((rt) => <RoomTypeBlock key={rt.id} roomType={rt} />)
                ) : (
                  <p className="text-sm text-[#64748b] italic">No room types added.</p>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <b className="relative tracking-num--0_01">Payment Methods</b>
              {!payment.enabled ? (
                <p className="text-sm text-[#64748b] italic">Cashless payment not enabled.</p>
              ) : (
                <div className="self-stretch flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                    <span className="text-xs font-semibold text-teal-700">
                      Cashless Payment Enabled
                    </span>
                  </div>
                  <div className="self-stretch grid grid-cols-2 gap-5">
                    {payment.gcash && payment.gcash.name ? (
                      <PaymentMethodBlock
                        title="GCash"
                        accountLabel="GCash Number"
                        data={payment.gcash}
                      />
                    ) : (
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-bold text-[#334155] dark:text-[#a4acba]">GCash</span>
                        <div className="rounded-2xl bg-aliceblue border border-whitesmoke py-5 px-6">
                          <p className="text-sm text-[#64748b] italic">Not set up.</p>
                        </div>
                      </div>
                    )}
                    {payment.bank && payment.bank.name ? (
                      <PaymentMethodBlock
                        title="Bank Transfer"
                        accountLabel="Account Number"
                        data={payment.bank}
                      />
                    ) : (
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-bold text-[#334155] dark:text-[#a4acba]">Bank Transfer</span>
                        <div className="rounded-2xl bg-aliceblue border border-whitesmoke py-5 px-6">
                          <p className="text-sm text-[#64748b] italic">Not set up.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Building Policies ── */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <b className="relative tracking-num--0_01 text-[#096c5b] dark:text-[#72cbb8]">Building Policies</b>
              <div className="self-stretch grid grid-cols-2 gap-4">
                {/* Allow Pasalo */}
                <div
                  className={`rounded-2xl border flex items-center py-4 px-5 gap-4 ${
                    buildingInfo.allowPasalo
                      ? 'bg-[#edf7f5] border-[#bdeee4]'
                      : 'bg-white border-[#e5e7eb]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      buildingInfo.allowPasalo ? 'bg-[#d8f5ef]' : 'bg-[#f1f5f9]'
                    }`}
                  >
                    <Icon
                      icon="material-symbols:swap-horiz-rounded"
                      className={`w-4 h-4 ${buildingInfo.allowPasalo ? 'text-[#096c5b]' : 'text-[#7b8794]'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-[#1f2937] dark:text-[#d7e0ef]">Allow Pasalo</span>
                    <span className="text-xs font-medium text-slategray">
                      Lease transfer allowed
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 ${
                      buildingInfo.allowPasalo
                        ? 'bg-[#d8f5ef] text-[#096c5b]'
                        : 'bg-[#f1f5f9] text-[#7b8794]'
                    }`}
                  >
                    {buildingInfo.allowPasalo ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                {/* Allow Ocular Visit */}
                <div
                  className={`rounded-2xl border flex items-center py-4 px-5 gap-4 ${
                    buildingInfo.allowOcularVisit
                      ? 'bg-[#edf7f5] border-[#bdeee4]'
                      : 'bg-white border-[#e5e7eb]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      buildingInfo.allowOcularVisit ? 'bg-[#d8f5ef]' : 'bg-[#f1f5f9]'
                    }`}
                  >
                    <Icon
                      icon="material-symbols:visibility-outline-rounded"
                      className={`w-4 h-4 ${buildingInfo.allowOcularVisit ? 'text-[#096c5b]' : 'text-[#7b8794]'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-[#1f2937] dark:text-[#d7e0ef]">Allow Ocular Visit</span>
                    <span className="text-xs font-medium text-slategray">
                      In-person visits allowed
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 ${
                      buildingInfo.allowOcularVisit
                        ? 'bg-[#d8f5ef] text-[#096c5b]'
                        : 'bg-[#f1f5f9] text-[#7b8794]'
                    }`}
                  >
                    {buildingInfo.allowOcularVisit ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Managers */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <b className="relative tracking-num--0_01">Managers</b>
              {buildingInfo.managers.length > 0 ? (
                <div className="self-stretch flex flex-col gap-3">
                  {buildingInfo.managers.map((m: ManagerData) => (
                    <div
                      key={m.email}
                      className="self-stretch rounded-2xl bg-aliceblue border border-whitesmoke flex flex-col py-5 px-6 gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                          <Icon
                            icon="material-symbols:person-outline-rounded"
                            className="w-4 h-4 text-teal-700"
                          />
                        </div>
                        <span className="text-sm font-bold text-[#1f2937] dark:text-[#d7e0ef]">{m.email}</span>
                      </div>
                      <div className="w-full h-px bg-whitesmoke" />
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-[#64748b]">Permissions</span>
                        {Object.values(m.checkboxes).some(Boolean) ? (
                          <div className="flex flex-wrap gap-2">
                            {(Object.entries(m.checkboxes) as [string, boolean][])
                              .filter(([, enabled]) => enabled)
                              .map(([key]) => (
                                <span
                                  key={key}
                                  className="text-xs font-semibold bg-white border border-whitesmoke text-[#334155] rounded-full px-3 py-1 dark:bg-[#141515] dark:border-[#343737] dark:text-[#a4acba]"
                                >
                                  {key
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, (s) => s.toUpperCase())}
                                </span>
                              ))}
                          </div>
                        ) : (
                          <span className="text-xs italic text-[#64748b]">
                            No permissions granted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#64748b] italic">No managers invited.</p>
              )}
            </div>
          </div>
        </div>

        {/* Back / Submit */}
        {submitError && (
          <div className="w-[880px] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-700">
            {submitError}
          </div>
        )}

        <div className="w-[903px] overflow-hidden flex items-center justify-center py-0 px-num-10 box-border gap-2.5 text-num-14 text-[#5f6368]">
          <div
            className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer"
            onClick={onPrevClick}
          >
            <b className="relative">Back</b>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-[45px] flex items-center justify-center py-2 px-8 gap-2.5 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            style={{ background: isSubmitting ? '#55746e' : '#1a5c50' }}
          >
            <b className="relative">
              {isSubmitting ? (mode === 'edit' ? 'Saving...' : 'Submitting...') : mode === 'edit' ? 'Save Changes' : 'Submit'}
            </b>
            <Icon
              icon={
                isSubmitting
                  ? 'line-md:loading-twotone-loop'
                  : 'material-symbols:check-circle-outline-rounded'
              }
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

    </>
  );
};

export default BuildingSubmit;
