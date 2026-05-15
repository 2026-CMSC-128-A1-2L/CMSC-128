import { FunctionComponent, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';
import type {
  RoomData,
  RoomTypeData,
  ManagerData,
  PaymentMethodData,
  RequirementItem,
} from './useBuildingStore';
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
      <span className="font-medium leading-6">{value || '—'}</span>
    </div>
  </div>
);

// ─── Requirement Row ──────────────────────────────────────────────────────────

const RequirementRow: FunctionComponent<{ req: RequirementItem }> = ({ req }) => {
  const isUploaded = !!req.file;
  return (
    <div className="self-stretch rounded-2xl bg-aliceblue border border-whitesmoke flex items-center py-4 px-6 gap-4">
      {/* Status icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUploaded ? 'bg-teal-100' : 'bg-red-100'
        }`}
      >
        <Icon
          icon={isUploaded ? 'material-symbols:check-rounded' : 'material-symbols:close-rounded'}
          className={`w-4 h-4 ${isUploaded ? 'text-teal-700' : 'text-red-500'}`}
        />
      </div>

      {/* Label + filename */}
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-bold text-gray-700">{req.label}</span>
        {isUploaded ? (
          <span className="text-xs text-slategray font-medium truncate">
            {req.file!.name} · Submitted: {req.date}
          </span>
        ) : (
          <span className="text-xs italic text-gray-300">Not uploaded</span>
        )}
      </div>

      {/* Badge */}
      <span
        className={`text-xs font-semibold rounded-2xl px-3 py-1 shrink-0 ${
          isUploaded ? 'text-slate-500 bg-slate-100' : 'text-red-600 bg-red-100'
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

// ─── Room Type Block ──────────────────────────────────────────────────────────

const RoomTypeBlock: FunctionComponent<{ roomType: RoomTypeData }> = ({ roomType }) => (
  <div className="w-full rounded-xl border border-whitesmoke flex flex-col overflow-hidden">
    <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-whitesmoke">
      <b className="text-sm text-gray-700">{roomType.roomType || roomType.name || 'Room Type'}</b>
      {roomType.capacity && (
        <span className="ml-3 text-xs font-medium text-slategray bg-aliceblue px-2 py-0.5 rounded-full border border-whitesmoke">
          Capacity: {roomType.capacity}
        </span>
      )}
    </div>
    <div className="flex flex-col px-4 py-4 gap-5">
      {roomType.about && (
        <div className="flex flex-col gap-1">
          <b className="text-xs text-dimgray">About</b>
          <p className="text-sm text-slategray font-medium leading-6">{roomType.about}</p>
        </div>
      )}
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
      {roomType.rooms.length > 0 ? (
        <div className="flex flex-col gap-3">
          <b className="text-xs text-dimgray">Rooms</b>
          {roomType.rooms.map((room, i) => (
            <RoomRow key={room.id} room={room} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-300 italic">No rooms added.</p>
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
    <span className="text-sm font-bold text-gray-600 tracking-wide">{title}</span>
    <div className="rounded-2xl bg-aliceblue border border-whitesmoke flex flex-col py-5 px-6 gap-5">
      <div className="flex items-start gap-8">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-slategray">Name</span>
          <span className="text-sm font-bold text-gray-800 truncate">{data.name || '—'}</span>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-slategray">{accountLabel}</span>
          <span className="text-sm font-bold text-gray-800 truncate">
            {data.accountNumber || '—'}
          </span>
        </div>
      </div>
      {data.qrImage ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-slategray">QR Code</span>
          <img
            src={data.qrImage}
            alt="QR"
            className="h-[120px] w-[120px] rounded-xl object-cover border border-whitesmoke"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slategray">QR Code</span>
          <span className="text-xs italic text-gray-300">No QR uploaded.</span>
        </div>
      )}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BuildingSubmit: FunctionComponent<BuildingSubmitProps> = ({ onPrevClick }) => {
  const { buildingInfo } = useBuildingStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const { payment, requirements } = buildingInfo;

  const uploadedCount = requirements.filter((r) => r.file !== null).length;
  const allUploaded = uploadedCount === requirements.length;

  const handleSubmit = useCallback(() => {
    // Log all data including requirements (file metadata only — File objects can't be JSON serialised)
    const loggable = {
      ...buildingInfo,
      requirements: buildingInfo.requirements.map((r) => ({
        id: r.id,
        label: r.label,
        fileName: r.file?.name ?? null,
        fileSize: r.file?.size ?? null,
        date: r.date,
      })),
    };
    console.log('=== Final Building Submission ===');
    console.log(JSON.stringify(loggable, null, 2));
    setShowSuccess(true);
  }, [buildingInfo]);

  const handleContinue = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <>
      <div className="relative w-full flex flex-col items-start justify-center gap-2.5 text-center text-num-18 text-teal-200 font-inter">
        <div className="w-[880px] flex flex-col items-start">
          <div className="w-[880px] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-8 px-12 gap-3">
            {/* Review Banner */}
            <div className="self-stretch rounded-xl bg-lightcyan border border-teal-100 flex items-center px-4 py-3 gap-3 text-left mb-2">
              <Icon
                icon="material-symbols:info-outline"
                className="w-5 h-5 text-teal-600 shrink-0"
              />
              <p className="text-sm font-medium text-teal-700">
                Please review all information carefully before submitting. You cannot edit after
                submission.
              </p>
            </div>

            {/* ── Requirements ── */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <div className="self-stretch flex items-center justify-between">
                <b className="relative tracking-num--0_01">Building Requirements</b>
                {/* Upload progress badge */}
                <span
                  className={`text-xs font-semibold rounded-full px-3 py-1 ${
                    allUploaded ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-600'
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
            <div className="self-stretch h-px bg-whitesmoke my-2" />

            {/* Building Info */}
            <div className="self-stretch flex flex-col items-start gap-6">
              <b className="relative tracking-num--0_01">Building Information</b>
              <div className="self-stretch flex flex-col items-start gap-5 text-left">
                <div className="self-stretch flex items-start gap-10">
                  <ReadOnlyField label="Name" value={buildingInfo.name} />
                  <ReadOnlyField label="Type of Building" value={buildingInfo.typeOfBuilding} />
                </div>
                <ReadOnlyField label="Location" value={buildingInfo.location} />
              </div>
            </div>

            {/* About */}
            <div className="self-stretch flex flex-col items-start py-num-10 px-0 gap-2.5 text-left">
              <b className="relative tracking-num--0_01">About</b>
              <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] py-3 px-4 text-left text-num-14 text-slategray font-medium min-h-[120px]">
                {buildingInfo.about || (
                  <span className="italic text-gray-300">No description provided.</span>
                )}
              </div>
            </div>

            {/* Photos */}
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

            {/* Room Types */}
            <div className="self-stretch flex flex-col items-start p-num-10 gap-2.5">
              <b className="relative tracking-num--0_01">Room Types</b>
              <div className="self-stretch flex flex-col gap-3 text-left">
                {buildingInfo.roomTypes.length > 0 ? (
                  buildingInfo.roomTypes.map((rt) => <RoomTypeBlock key={rt.id} roomType={rt} />)
                ) : (
                  <p className="text-sm text-gray-300 italic">No room types added.</p>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <b className="relative tracking-num--0_01">Payment Methods</b>
              {!payment.enabled ? (
                <p className="text-sm text-gray-300 italic">Cashless payment not enabled.</p>
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
                        <span className="text-sm font-bold text-gray-600">GCash</span>
                        <div className="rounded-2xl bg-aliceblue border border-whitesmoke py-5 px-6">
                          <p className="text-sm text-gray-300 italic">Not set up.</p>
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
                        <span className="text-sm font-bold text-gray-600">Bank Transfer</span>
                        <div className="rounded-2xl bg-aliceblue border border-whitesmoke py-5 px-6">
                          <p className="text-sm text-gray-300 italic">Not set up.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Building Policies ── */}
            <div className="self-stretch flex flex-col items-start py-4 px-0 gap-4">
              <b className="relative tracking-num--0_01">Building Policies</b>
              <div className="self-stretch grid grid-cols-2 gap-4">
                {/* Allow Pasalo */}
                <div
                  className={`rounded-2xl border flex items-center py-4 px-5 gap-4 ${
                    buildingInfo.allowPasalo
                      ? 'bg-teal-50 border-teal-200'
                      : 'bg-aliceblue border-whitesmoke'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      buildingInfo.allowPasalo ? 'bg-teal-100' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      icon="material-symbols:swap-horiz-rounded"
                      className={`w-4 h-4 ${buildingInfo.allowPasalo ? 'text-teal-700' : 'text-gray-400'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-gray-700">Allow Pasalo</span>
                    <span className="text-xs font-medium text-slategray">
                      Lease transfer allowed
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 ${
                      buildingInfo.allowPasalo
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {buildingInfo.allowPasalo ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                {/* Allow Ocular Visit */}
                <div
                  className={`rounded-2xl border flex items-center py-4 px-5 gap-4 ${
                    buildingInfo.allowOcularVisit
                      ? 'bg-teal-50 border-teal-200'
                      : 'bg-aliceblue border-whitesmoke'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      buildingInfo.allowOcularVisit ? 'bg-teal-100' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      icon="material-symbols:visibility-outline-rounded"
                      className={`w-4 h-4 ${buildingInfo.allowOcularVisit ? 'text-teal-700' : 'text-gray-400'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-sm font-bold text-gray-700">Allow Ocular Visit</span>
                    <span className="text-xs font-medium text-slategray">
                      In-person visits allowed
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 ${
                      buildingInfo.allowOcularVisit
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-400'
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
                        <span className="text-sm font-bold text-gray-800">{m.email}</span>
                      </div>
                      <div className="w-full h-px bg-whitesmoke" />
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-slategray">Permissions</span>
                        {Object.values(m.checkboxes).some(Boolean) ? (
                          <div className="flex flex-wrap gap-2">
                            {(Object.entries(m.checkboxes) as [string, boolean][])
                              .filter(([, enabled]) => enabled)
                              .map(([key]) => (
                                <span
                                  key={key}
                                  className="text-xs font-semibold bg-white border border-whitesmoke text-gray-600 rounded-full px-3 py-1"
                                >
                                  {key
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, (s) => s.toUpperCase())}
                                </span>
                              ))}
                          </div>
                        ) : (
                          <span className="text-xs italic text-gray-300">
                            No permissions granted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 italic">No managers invited.</p>
              )}
            </div>
          </div>
        </div>

        {/* Back / Submit */}
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

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative shadow-2xl rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <ListingsSuccess onConfirmContainerClick={handleContinue} />
          </div>
        </div>
      )}
    </>
  );
};

export default BuildingSubmit;
