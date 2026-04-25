import { FunctionComponent, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';
import type { RoomData, RoomTypeData } from './useBuildingStore';
import ListingsSuccess from './ListingsSuccess';

// ─── Props ────────────────────────────────────────────────────────────────────

interface BuildingSubmitProps {
  onPrevClick: () => void;
}

// ─── Read-only Field ──────────────────────────────────────────────────────────

const ReadOnlyField: FunctionComponent<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex-1 flex flex-col items-start gap-3">
    <b className="relative text-num-14 text-dimgray">{label}</b>
    <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-3 px-4 text-left text-num-14 text-slategray">
      <span className="font-medium leading-6">{value || <span className="italic text-gray-300">—</span>}</span>
    </div>
  </div>
);

// ─── Room Row (read-only) ─────────────────────────────────────────────────────

const RoomRow: FunctionComponent<{ room: RoomData; index: number }> = ({ room, index }) => (
  <div className="self-stretch flex items-center gap-6">
    <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
      <div className="text-sm font-medium text-black leading-6">Room Number</div>
      <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-slategray font-medium">
        {room.number || String(index + 1)}
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
      <div className="text-sm font-medium text-black leading-6">Availability</div>
      <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-slategray font-medium">
        {room.isAvailable ? 'Open' : 'Occupied'}
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
      <div className="text-sm font-medium text-black leading-6">Current Occupants</div>
      <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-slategray font-medium">
        {room.current_occupants}
      </div>
    </div>
  </div>
);

// ─── Room Type Block (read-only) ──────────────────────────────────────────────

const RoomTypeBlock: FunctionComponent<{ roomType: RoomTypeData }> = ({ roomType }) => (
  <div className="w-full rounded-xl border border-whitesmoke flex flex-col overflow-hidden">
    {/* Header */}
    <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-whitesmoke">
      <b className="text-sm text-gray-700">{roomType.roomType || roomType.name || 'Room Type'}</b>
      {roomType.capacity && (
        <span className="ml-3 text-xs font-medium text-slategray bg-aliceblue px-2 py-0.5 rounded-full border border-whitesmoke">
          Capacity: {roomType.capacity}
        </span>
      )}
    </div>

    <div className="flex flex-col px-4 py-4 gap-5">
      {/* About */}
      {roomType.about && (
        <div className="flex flex-col gap-1">
          <b className="text-xs text-dimgray">About</b>
          <p className="text-sm text-slategray font-medium leading-6">{roomType.about}</p>
        </div>
      )}

      {/* Images */}
      {roomType.images && roomType.images.length > 0 && (
        <div className="flex flex-col gap-2">
          <b className="text-xs text-dimgray">Photos</b>
          <div className="flex items-start flex-wrap gap-2">
            {roomType.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Room type photo ${i + 1}`}
                className="h-[80px] w-[80px] rounded-xl object-cover border border-whitesmoke"
              />
            ))}
          </div>
        </div>
      )}

      {/* Rooms */}
      {roomType.rooms.length > 0 && (
        <div className="flex flex-col gap-3">
          <b className="text-xs text-dimgray">Rooms</b>
          {roomType.rooms.map((room, i) => (
            <RoomRow key={room.id} room={room} index={i} />
          ))}
        </div>
      )}

      {roomType.rooms.length === 0 && (
        <p className="text-xs text-gray-300 italic">No rooms added.</p>
      )}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BuildingSubmit: FunctionComponent<BuildingSubmitProps> = ({ onPrevClick }) => {
  const { buildingInfo } = useBuildingStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = useCallback(() => {
    // Log final collated data before submitting
    console.log('=== Final Building Submission ===');
    console.log(JSON.stringify(buildingInfo, null, 2));
    setShowSuccess(true);
  }, [buildingInfo]);

  const handleContinue = useCallback(() => {
    setShowSuccess(false);
    // Navigate away or reset — wire up as needed
  }, []);

  return (
    <>
      <div className="relative w-full flex flex-col items-start justify-center gap-2.5 text-center text-num-18 text-teal-200 font-inter">
        <div className="w-[880px] flex flex-col items-start">
          <div className="w-[880px] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-8 px-12 gap-3">

            {/* ── Review Banner ── */}
            <div className="self-stretch rounded-xl bg-lightcyan border border-teal-100 flex items-center px-4 py-3 gap-3 text-left mb-2">
              <Icon icon="material-symbols:info-outline" className="w-5 h-5 text-teal-600 shrink-0" />
              <p className="text-sm font-medium text-teal-700">
                Please review all information carefully before submitting. You cannot edit after submission.
              </p>
            </div>

            {/* ── Building Information ── */}
            <div className="self-stretch flex flex-col items-start gap-6">
              <div className="self-stretch flex items-center">
                <b className="relative tracking-num--0_01">Building Information</b>
              </div>
              <div className="self-stretch flex flex-col items-start gap-5 text-left">

                {/* Name + Type */}
                <div className="self-stretch flex items-start gap-10">
                  <ReadOnlyField label="Name" value={buildingInfo.name} />
                  <ReadOnlyField label="Type of Building" value={buildingInfo.typeOfBuilding} />
                </div>

                {/* Location */}
                <ReadOnlyField label="Location" value={buildingInfo.location} />
              </div>
            </div>

            {/* ── About ── */}
            <div className="self-stretch flex flex-col items-start py-num-10 px-0 gap-2.5 text-left">
              <b className="relative tracking-num--0_01">About</b>
              <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] py-3 px-4 text-left text-num-14 text-slategray font-medium min-h-[120px]">
                {buildingInfo.about || <span className="italic text-gray-300">No description provided.</span>}
              </div>
            </div>

            {/* ── Photos ── */}
            <div className="self-stretch flex flex-col items-start p-num-10 gap-2.5">
              <b className="relative tracking-num--0_01">Photos</b>
              {buildingInfo.images && buildingInfo.images.length > 0 ? (
                <div className="self-stretch flex items-start flex-wrap gap-2 py-2">
                  {buildingInfo.images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Building photo ${index + 1}`}
                      className="h-[100px] w-[100px] rounded-num-12 object-cover border border-whitesmoke"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 italic py-2">No photos uploaded.</p>
              )}
            </div>

            {/* ── Room Types ── */}
            <div className="self-stretch flex flex-col items-start p-num-10 gap-2.5">
              <b className="relative tracking-num--0_01">Room Types</b>
              <div className="self-stretch flex flex-col gap-3 text-left">
                {buildingInfo.roomTypes.length > 0 ? (
                  buildingInfo.roomTypes.map((rt) => (
                    <RoomTypeBlock key={rt.id} roomType={rt} />
                  ))
                ) : (
                  <p className="text-sm text-gray-300 italic">No room types added.</p>
                )}
              </div>
            </div>

            {/* ── Managers ── */}
            <div className="self-stretch flex flex-col items-start p-num-10 gap-2.5">
              <b className="relative tracking-num--0_01">Managers</b>
              {buildingInfo.managers.length > 0 ? (
                <div className="self-stretch flex flex-col gap-2">
                  {buildingInfo.managers.map((m, i) => (
                    <div key={i} className="rounded-num-12 bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 text-sm text-slategray font-medium">
                      {m}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 italic">No managers invited.</p>
              )}
            </div>

          </div>
        </div>

        {/* ── Back / Submit ── */}
        <div className="w-[903px] overflow-hidden flex items-center justify-center py-0 px-num-10 box-border gap-2.5 text-num-14 text-dimgray">
          <div
            className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer"
            onClick={onPrevClick}
          >
            <b className="relative">Back</b>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-[45px] flex items-center justify-center py-2 px-8 gap-2.5 text-white cursor-pointer"
            style={{ background: '#1a5c50' }}
          >
            <b className="relative">Submit</b>
            <Icon icon="material-symbols:check-circle-outline-rounded" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* ── Success Popup ── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative shadow-2xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ListingsSuccess onConfirmContainerClick={handleContinue} />
          </div>
        </div>
      )}
    </>
  );
};

export default BuildingSubmit;
