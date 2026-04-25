import { FunctionComponent, useState } from 'react';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';
import type { RoomTypeData } from './useBuildingStore';
import RoomItem from './RoomItem';

interface AddRoomProps {
  roomType: RoomTypeData;
}

const AddRoom: FunctionComponent<AddRoomProps> = ({ roomType }) => {
  const { addRoom } = useBuildingStore();
  const [isExpanded, setIsExpanded] = useState(roomType.rooms.length > 0);

  // First click expands and adds an initial room entry if there are none
  const handleAddClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      if (roomType.rooms.length === 0) {
        addRoom(roomType.id);
      }
    } else {
      addRoom(roomType.id);
    }
  };

  if (!isExpanded) {
    return (
      <div
        onClick={handleAddClick}
        className="w-full h-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <Icon icon="material-symbols:add-home-outline" className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-whitesmoke overflow-hidden flex flex-col items-start justify-center py-3 px-8 gap-6 text-sm text-black font-inter">

      {/* Room entry rows */}
      {roomType.rooms.map((room, index) => (
        <RoomItem
          key={room.id}
          room={room}
          roomTypeId={roomType.id}
          index={index}
          capacity={roomType.capacity}
        />
      ))}

      {/* Add More Rooms */}
      <div
        onClick={() => addRoom(roomType.id)}
        className="self-stretch overflow-hidden flex items-center justify-center py-2.5 px-2.5 gap-4 cursor-pointer hover:opacity-70 transition-opacity text-slategray"
      >
        <b className="relative">Add More Rooms</b>
        <Icon icon="material-symbols:add-rounded" className="w-4 h-4" />
      </div>

    </div>
  );
};

export default AddRoom;
