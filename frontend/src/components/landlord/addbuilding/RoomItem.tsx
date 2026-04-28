import { type FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';
import type { RoomData } from './useBuildingStore';

interface RoomFormValues {
  number: string;
  isAvailable: string;
  current_occupants: string;
}

interface RoomItemProps {
  room: RoomData;
  roomTypeId: string;
  index: number;
  capacity: string;
}

const RoomItem: FunctionComponent<RoomItemProps> = ({ room, roomTypeId, index, capacity }) => {
  const { updateRoom, removeRoom } = useBuildingStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RoomFormValues>({
    defaultValues: {
      number: room.number || String(index + 1),
      isAvailable: room.isAvailable ? 'open' : 'occupied',
      current_occupants: String(room.current_occupants),
    },
    mode: 'onChange',
  });

  // Sync every change → zustand
  useEffect(() => {
    const subscription = watch((values) => {
      // Enforce the max capacity on the store level as well
      let occupants = parseInt(values.current_occupants ?? '0', 10) || 0;
      const maxCapacity = parseInt(capacity, 10) || 0;
      if (occupants > maxCapacity) {
        occupants = maxCapacity;
      }

      updateRoom(roomTypeId, room.id, {
        number: values.number ?? '',
        isAvailable: values.isAvailable === 'open',
        current_occupants: occupants,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, roomTypeId, room.id, updateRoom, capacity]);

  return (
    <div className="self-stretch flex items-center gap-2">
      {/* Room Number */}
      <div className="flex-1 flex flex-col items-center justify-start gap-2.5">
        <div className="relative leading-6 font-medium text-black text-sm">Room Number</div>
        <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-1">
          <input
            {...register('number', { required: true })}
            placeholder={String(index + 1)}
            className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium leading-6"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="flex-1 flex flex-col items-center justify-start gap-2.5">
        <div className="relative leading-6 font-medium text-black text-sm">Availability</div>
        <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-1 gap-2.5">
          <select
            {...register('isAvailable')}
            className="flex-1 bg-transparent text-sm text-black outline-none font-medium leading-6 appearance-none cursor-pointer"
          >
            <option value="open">Open</option>
            <option value="occupied">Occupied</option>
          </select>
<<<<<<< HEAD
          <Icon
            icon="mynaui:chevron-down"
            className="w-4 h-4 shrink-0 pointer-events-none text-slategray"
          />
=======
          <Icon icon="mynaui:chevron-down" className="w-4 h-4 shrink-0 pointer-events-none text-black" />
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
        </div>
      </div>

      {/* Current Occupants */}
      <div className="flex-1 flex flex-col items-center justify-start gap-2.5">
        <div className="relative leading-6 font-medium text-black text-sm">Current Occupants</div>
        <div className="self-stretch flex flex-col gap-1">
          <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-1">
            <input
              {...register('current_occupants', {
                pattern: { value: /^[0-9]*$/, message: 'Numbers only' },
                validate: (value) => {
                  const parsedValue = parseInt(value, 10) || 0;
                  const maxCapacity = parseInt(capacity, 10) || 0;
                  return parsedValue <= maxCapacity || `Max capacity is ${maxCapacity}`;
                },
              })}
              placeholder="0"
              className="flex-1 bg-transparent text-sm text-black outline-none font-medium leading-6"
            />
          </div>
          {/* Display validation error if user exceeds capacity */}
          {errors.current_occupants && (
            <span className="text-xs text-red-500">{errors.current_occupants.message}</span>
          )}
        </div>
      </div>

      {/* Remove row button */}
      <button
        type="button"
        onClick={() => removeRoom(roomTypeId, room.id)}
        className="mt-[34px] text-red-400 hover:text-red-600 transition-colors shrink-0"
        title="Remove room"
      >
        <Icon icon="typcn:minus" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RoomItem;
