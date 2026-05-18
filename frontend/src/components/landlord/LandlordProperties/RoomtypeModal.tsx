import { useEffect, useRef } from 'react';
import { SkeletonBlock } from '../../general/Skeleton';

export type ApiUnit = {
  _id: string;
  roomNumber: string;
  isAvailable: boolean;
  currentRentals?: string[];
  capacity?: number;
  price?: number;
};

export type ApiListing = {
  id: string;
  name: string;
  image?: string;
};

interface RoomtypeModalProps {
  openModal: boolean;
  closeModal: () => void;
  facilityName: string;
  listing: ApiListing;
  units: ApiUnit[];
  isLoadingUnits?: boolean;
}

function RoomtypeModal({
  openModal,
  closeModal,
  facilityName,
  listing,
  units,
  isLoadingUnits,
}: RoomtypeModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      className="top-[50%] left-[50%] -translate-[50%] w-[560px] rounded-2xl p-0 shadow-xl bg-white"
      ref={ref}
      onCancel={closeModal}
    >
      <div className="flex flex-col w-full py-8">
        <div className="flex flex-col items-center text-center px-10 pb-6 gap-1">
          <p className="font-bold text-xl text-gray-200">{facilityName}</p>
          <p className="font-semibold text-sm text-teal-200">{listing.name}</p>
        </div>

        <hr className="border-t-3 border-whitesmoke-300 mx-6" />

        <div className="grid grid-cols-[1fr_1.2fr] items-center px-8 pt-5 pb-2 text-sm font-medium text-gray-100">
          <span>Room Number</span>
          <span className="text-center">Status</span>
        </div>

        <div className="flex flex-col mx-6">
          {isLoadingUnits ? (
            <div className="flex flex-col gap-3 px-2 py-4">
              {['room-a', 'room-b', 'room-c', 'room-d'].map((key) => (
                <div key={key} className="grid grid-cols-[1fr_1.2fr] items-center gap-6 py-2">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="mx-auto h-6 w-24 rounded-full" />
                </div>
              ))}
            </div>
          ) : units.length === 0 ? (
            <div className="px-2 py-6 text-center text-gray-400 text-sm">No rooms found.</div>
          ) : (
            units.map((unit) => (
              <div
                key={unit._id}
                className="grid grid-cols-[1fr_1.2fr] items-center px-2 py-4 border-b border-whitesmoke-300 last:border-0"
              >
                <span className="font-bold text-gray-200">{unit.roomNumber}</span>
                <span
                  className={`text-center font-bold text-sm ${
                    unit.isAvailable ? 'text-teal-200' : 'text-crimson'
                  }`}
                >
                  {unit.isAvailable ? 'Available' : 'Occupied'}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end px-8 pt-6">
          <button
            onClick={closeModal}
            className="cursor-pointer bg-crimson hover:opacity-90 transition-opacity text-white text-sm font-medium px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default RoomtypeModal;
