import { FunctionComponent, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';
import type { RoomTypeData } from './useBuildingStore';
import AddRoom from './AddRoom';

interface RoomTypeFormValues {
  roomType: string;
  capacity: string;
  about: string;
}

interface RoomTypeItemProps {
  roomType: RoomTypeData;
}

const RoomTypeItem: FunctionComponent<RoomTypeItemProps> = ({ roomType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateRoomType, removeRoomType } = useBuildingStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RoomTypeFormValues>({
    defaultValues: {
      roomType: roomType.roomType,
      capacity: roomType.capacity,
      about: roomType.about,
    },
    mode: 'onChange',
  });

  const watchedRoomType = watch('roomType');

  useEffect(() => {
    const subscription = watch((values) => {
      updateRoomType(roomType.id, {
        roomType: values.roomType ?? '',
        capacity: values.capacity ?? '',
        about: values.about ?? '',
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, roomType.id, updateRoomType]);

  const headerLabel = watchedRoomType || roomType.name || 'Room Type';

  return (
    <div className="w-full rounded-xl border border-whitesmoke overflow-hidden flex flex-col">

      {/* Header */}
      <div className="flex items-center px-4 py-2">
        {!isExpanded && (
          <div className="flex-1 text-left">
            <b className="text-sm text-gray-700">{headerLabel}</b>
          </div>
        )}
        {isExpanded && <div className="flex-1" />}
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="text-sm font-medium leading-6 px-4 py-1"
          style={{ color: isExpanded ? '#dc2626' : '#096C5B' }}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Expanded form */}
      {isExpanded && (
        <div className="flex flex-col px-4 pb-8 gap-6 text-sm text-gray-500 font-inter">

          {/* Room Type + Capacity */}
          <div className="self-stretch flex items-start gap-10">
            <div className="flex-1 flex flex-col items-start gap-3">
              <b className="text-gray-700">Room Type</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-12 rounded-xl bg-aliceblue border border-whitesmoke flex items-center px-4">
                  <input
                    {...register('roomType', { required: 'Room type is required' })}
                    placeholder="e.g. Single, Double..."
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-slategray outline-none font-medium"
                  />
                </div>
                {errors.roomType && (
                  <span className="text-xs text-red-500">{errors.roomType.message}</span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start gap-3">
              <b className="text-gray-700">Capacity</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-12 rounded-xl bg-aliceblue border border-whitesmoke flex items-center px-4">
                  <input
                    {...register('capacity', {
                      required: 'Capacity is required',
                      pattern: { value: /^[0-9]+$/, message: 'Must be a number' },
                    })}
                    placeholder="e.g. 2"
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-slategray outline-none font-medium"
                  />
                </div>
                {errors.capacity && (
                  <span className="text-xs text-red-500">{errors.capacity.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="self-stretch flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-4">
              <b className="text-gray-700">About</b>
              <span className="font-medium text-dimgray">Not required</span>
            </div>
            <textarea
              {...register('about')}
              placeholder="Describe this room type..."
              rows={4}
              className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke py-3 px-4 text-sm text-gray-700 placeholder-slategray outline-none font-medium resize-none"
            />
          </div>

          {/* Add Photos */}
          <div className="self-stretch flex flex-col items-start gap-1">
            <b className="text-gray-700">Add Photos</b>
            <div className="flex items-start flex-wrap gap-2 py-2">
              <div className="h-[100px] w-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Icon icon="material-symbols:add-photo-alternate-outline" className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Add Rooms */}
          <div className="self-stretch flex flex-col items-start gap-4">
            <b className="text-gray-700">Add Rooms</b>
            <AddRoom roomType={roomType} />
          </div>

          {/* Remove room type */}
          <button
            type="button"
            onClick={() => removeRoomType(roomType.id)}
            className="self-end text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
          >
            Remove this room type
          </button>

        </div>
      )}
    </div>
  );
};

export default RoomTypeItem;
