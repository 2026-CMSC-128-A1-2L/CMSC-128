import { FunctionComponent, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useBuildingStore } from './useBuildingStore';
import type { RoomTypeData, RoomData, TagDefinition, TagValue } from './useBuildingStore';

// ─── Predefined tag catalogue ─────────────────────────────────────────────────
// To add more tags: add an entry to the relevant category array.
// boolean tags need no extra config. numeric tags take { min?, max? }.

interface TagCategoryDef {
  category: string;
  icon: string;
  tags: TagDefinition[];
}

const TAG_CATALOGUE: TagCategoryDef[] = [
  {
    category: 'Amenities',
    icon: 'material-symbols:star-outline-rounded',
    tags: [
      {
        _id: 'a1',
        name: 'air_conditioning',
        displayName: 'Air Conditioning',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a2',
        name: 'wifi',
        displayName: 'WiFi',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a3',
        name: 'hot_water',
        displayName: 'Hot Water',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a4',
        name: 'ref',
        displayName: 'Refrigerator',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a5',
        name: 'washing_machine',
        displayName: 'Washing Machine',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a6',
        name: 'tv',
        displayName: 'TV',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a7',
        name: 'kitchen',
        displayName: 'Kitchen Access',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'a8',
        name: 'parking',
        displayName: 'Parking',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
    ],
  },
  {
    category: 'Building Details',
    icon: 'material-symbols:apartment-outline-rounded',
    tags: [
      {
        _id: 'b1',
        name: 'floor_level',
        displayName: 'Floor Level',
        isRequired: false,
        dataType: { name: 'numeric', min: 1, max: 50 },
      },
      {
        _id: 'b2',
        name: 'room_size',
        displayName: 'Room Size (sqm)',
        isRequired: false,
        dataType: { name: 'numeric', min: 5, max: 500 },
      },
      {
        _id: 'b3',
        name: 'bathroom_type',
        displayName: 'Private Bathroom',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'b4',
        name: 'fully_furnished',
        displayName: 'Fully Furnished',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'b5',
        name: 'semi_furnished',
        displayName: 'Semi Furnished',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'b6',
        name: 'balcony',
        displayName: 'Balcony',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'b7',
        name: 'cctv',
        displayName: 'CCTV',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
    ],
  },
  {
    category: 'Rules',
    icon: 'material-symbols:policy-outline-rounded',
    tags: [
      {
        _id: 'r1',
        name: 'no_smoking',
        displayName: 'No Smoking',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'r2',
        name: 'no_pets',
        displayName: 'No Pets',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'r3',
        name: 'no_visitors',
        displayName: 'No Visitors',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'r4',
        name: 'no_cooking',
        displayName: 'No Cooking',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'r5',
        name: 'curfew',
        displayName: 'Curfew',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'r6',
        name: 'gender_female',
        displayName: 'Female Only',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
      {
        _id: 'r7',
        name: 'gender_male',
        displayName: 'Male Only',
        isRequired: false,
        dataType: { name: 'boolean' },
      },
    ],
  },
];

// Flat list for easy lookup
const ALL_TAGS: TagDefinition[] = TAG_CATALOGUE.flatMap((c) => c.tags);

// ─── Numeric value input ──────────────────────────────────────────────────────

const NumericInput: FunctionComponent<{
  tag: TagValue;
  roomTypeId: string;
}> = ({ tag, roomTypeId }) => {
  const { updateTagValue } = useBuildingStore();
  const def = ALL_TAGS.find((t) => t._id === tag.tagId);
  const min = def?.dataType.name === 'numeric' ? def.dataType.min : undefined;
  const max = def?.dataType.name === 'numeric' ? def.dataType.max : undefined;

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-whitesmoke bg-white px-2 dark:bg-[#101111] dark:border-[#343737]"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="number"
        min={min}
        max={max}
        value={(tag.value as number) ?? ''}
        onChange={(e) => updateTagValue(roomTypeId, tag.tagId, Number(e.target.value))}
        placeholder="–"
        className="w-12 bg-transparent text-xs font-semibold text-black outline-none text-center py-1 dark:text-[#d7e0ef]"
      />
    </div>
  );
};

// ─── Single tag chip ──────────────────────────────────────────────────────────

const TagChip: FunctionComponent<{
  def: TagDefinition;
  selected: boolean;
  tagValue?: TagValue;
  roomTypeId: string;
  onToggle: () => void;
}> = ({ def, selected, tagValue, roomTypeId, onToggle }) => {
  const isNumeric = def.dataType.name === 'numeric';

  return (
    <div
      onClick={onToggle}
      className={`flex items-center gap-1.5 rounded-full border text-xs font-semibold cursor-pointer select-none transition-all ${
        selected
          ? 'border-teal-500 bg-teal-50 text-teal-800 pl-2.5 pr-1.5 py-1 dark:border-[#72cbb8] dark:bg-[#12342e] dark:text-[#72cbb8]'
          : 'border-whitesmoke bg-white text-slategray hover:border-gray-300 hover:text-gray-600 px-3 py-1 dark:bg-[#141515] dark:border-[#343737] dark:text-[#a4acba] dark:hover:border-[#45665e] dark:hover:text-[#d7e0ef]'
      }`}
    >
      {selected && (
        <Icon icon="material-symbols:check-rounded" className="w-3 h-3 text-teal-600 shrink-0" />
      )}
      <span>{def.displayName}</span>
      {/* Inline numeric input shown when selected */}
      {selected && isNumeric && tagValue && <NumericInput tag={tagValue} roomTypeId={roomTypeId} />}
      {selected && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="ml-0.5 text-teal-500 hover:text-red-400 transition-colors"
        >
          <Icon icon="material-symbols:close-rounded" className="w-3 h-3" />
        </span>
      )}
    </div>
  );
};

// ─── Tags Section ─────────────────────────────────────────────────────────────

const TagsSection: FunctionComponent<{ roomType: RoomTypeData }> = ({ roomType }) => {
  const { addTag, removeTag, updateTagValue } = useBuildingStore();
  const [activeCategory, setActiveCategory] = useState(TAG_CATALOGUE[0].category);

  const selectedTagIds = new Set(roomType.tags.map((t) => t.tagId));

  const handleToggle = (def: TagDefinition) => {
    if (selectedTagIds.has(def._id)) {
      removeTag(roomType.id, def._id);
    } else {
      addTag(roomType.id, {
        tagId: def._id,
        name: def.name,
        displayName: def.displayName,
        dataType: def.dataType,
        value: def.dataType.name === 'numeric' ? null : true,
      });
    }
  };

  const currentTags = TAG_CATALOGUE.find((c) => c.category === activeCategory)?.tags ?? [];
  const selectedCount = roomType.tags.length;

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <b className="text-black dark:text-[#d7e0ef]">Tags</b>
        {selectedCount > 0 && (
          <span className="text-xs font-semibold bg-teal-100 text-teal-800 rounded-full px-2 py-0.5">
            {selectedCount} selected
          </span>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-1">
        {TAG_CATALOGUE.map((cat) => {
          const catSelectedCount = cat.tags.filter((t) => selectedTagIds.has(t._id)).length;
          const isActive = activeCategory === cat.category;
          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 dark:bg-[#12342e] dark:text-[#72cbb8] dark:border-[#72cbb8]'
                  : 'bg-white text-slategray border border-whitesmoke hover:border-gray-300 dark:bg-[#141515] dark:text-[#a4acba] dark:border-[#343737] dark:hover:border-[#45665e]'
              }`}
            >
              <Icon icon={cat.icon} className="w-3.5 h-3.5" />
              {cat.category}
              {catSelectedCount > 0 && (
                <span
                  className={`rounded-full px-1.5 text-[10px] font-bold ${
                    isActive ? 'bg-teal-200 text-teal-900' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {catSelectedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tag chips for active category */}
      <div className="flex flex-wrap gap-2">
        {currentTags.map((def) => {
          const isSelected = selectedTagIds.has(def._id);
          const tagValue = roomType.tags.find((t) => t.tagId === def._id);
          return (
            <TagChip
              key={def._id}
              def={def}
              selected={isSelected}
              tagValue={tagValue}
              roomTypeId={roomType.id}
              onToggle={() => handleToggle(def)}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoomTypeFormValues {
  roomType: string;
  capacity: string;
  about: string;
}

interface RoomFormValues {
  number: string;
  isAvailable: string; // 'open' | 'occupied'
  current_occupants: string;
}

interface RoomTypeItemProps {
  roomType: RoomTypeData;
}

// ─── Room Entry Row ───────────────────────────────────────────────────────────

const RoomEntry: FunctionComponent<{
  room: RoomData;
  roomTypeId: string;
  index: number;
}> = ({ room, roomTypeId, index }) => {
  const { updateRoom, removeRoom } = useBuildingStore();

  const { register, watch } = useForm<RoomFormValues>({
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
      updateRoom(roomTypeId, room.id, {
        number: values.number ?? '',
        isAvailable: values.isAvailable === 'open',
        current_occupants: parseInt(values.current_occupants ?? '0', 10) || 0,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, roomTypeId, room.id, updateRoom]);

  return (
    <div className="self-stretch flex items-center gap-6">
      {/* Room Number */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
        <div className="relative leading-6 font-medium text-black text-sm dark:text-[#a4acba]">Room Number</div>
        <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 dark:bg-[#1f2022] dark:border-[#343737]">
          <input
            {...register('number', { required: true })}
            placeholder={String(index + 1)}
            className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium leading-6 dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
        <div className="relative leading-6 font-medium text-black text-sm dark:text-[#a4acba]">Availability</div>
        <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 gap-2.5 dark:bg-[#1f2022] dark:border-[#343737]">
          <select
            {...register('isAvailable')}
            className="flex-1 bg-transparent text-sm text-slategray outline-none font-medium leading-6 appearance-none cursor-pointer dark:text-[#d7e0ef]"
          >
            <option value="open">Open</option>
            <option value="occupied">Occupied</option>
          </select>
          <Icon
            icon="mynaui:chevron-down"
            className="w-4 h-4 shrink-0 pointer-events-none text-slategray"
          />
        </div>
      </div>

      {/* Current Occupants */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
        <div className="relative leading-6 font-medium text-black text-sm dark:text-[#a4acba]">Current Occupants</div>
        <div className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke flex items-center py-2 px-4 dark:bg-[#1f2022] dark:border-[#343737]">
          <input
            {...register('current_occupants', {
              pattern: { value: /^[0-9]*$/, message: 'Numbers only' },
            })}
            placeholder="0"
            className="flex-1 bg-transparent text-sm text-slategray outline-none font-medium leading-6 dark:text-[#d7e0ef]"
          />
        </div>
      </div>

      {/* Remove row button */}
      <button
        type="button"
        onClick={() => removeRoom(roomTypeId, room.id)}
        className="mt-6 text-red-400 hover:text-red-600 transition-colors shrink-0"
        title="Remove room"
      >
        <Icon icon="material-symbols:remove-circle-outline" className="w-5 h-5" />
      </button>
    </div>
  );
};

// ─── Rooms Section ────────────────────────────────────────────────────────────

const RoomsSection: FunctionComponent<{ roomType: RoomTypeData }> = ({ roomType }) => {
  const { addRoom } = useBuildingStore();
  const [isExpanded, setIsExpanded] = useState(false);

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
        className="w-full h-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors dark:border-[#343737] dark:hover:bg-[#1f2022] dark:text-[#72cbb8]"
      >
        <Icon icon="material-symbols:add-home-outline" className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-whitesmoke overflow-hidden flex flex-col items-start justify-center py-3 px-8 gap-6 text-sm text-black font-inter dark:border-[#343737] dark:text-[#d7e0ef]">
      {/* Room entry rows */}
      {roomType.rooms.map((room, index) => (
        <RoomEntry key={room.id} room={room} roomTypeId={roomType.id} index={index} />
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

// ─── Main RoomTypeItem ────────────────────────────────────────────────────────

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
    <div className="w-full rounded-xl border border-whitesmoke overflow-hidden flex flex-col dark:border-[#343737] dark:bg-[#101111]">
      {/* Header */}
      <div className="flex items-center px-4 py-2">
        {!isExpanded && (
          <div className="flex-1 text-left">
            <b className="text-sm text-black dark:text-[#d7e0ef]">{headerLabel}</b>
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
        <div className="flex flex-col px-4 pb-8 gap-6 text-sm text-gray-500 font-inter dark:text-[#a4acba]">
          {/* Room Type + Capacity */}
          <div className="self-stretch flex items-start gap-10">
            <div className="flex-1 flex flex-col items-start gap-3">
              <b className="text-black dark:text-[#a4acba]">Room Type</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-12 rounded-xl bg-aliceblue border border-whitesmoke flex items-center px-4 dark:bg-[#1f2022] dark:border-[#343737]">
                  <input
                    {...register('roomType', { required: 'Room type is required' })}
                    placeholder="e.g. Single, Double..."
                    className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
                  />
                </div>
                {errors.roomType && (
                  <span className="text-xs text-red-500">{errors.roomType.message}</span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start gap-3">
              <b className="text-black dark:text-[#a4acba]">Capacity</b>
              <div className="self-stretch flex flex-col gap-1">
                <div className="self-stretch h-12 rounded-xl bg-aliceblue border border-whitesmoke flex items-center px-4 dark:bg-[#1f2022] dark:border-[#343737]">
                  <input
                    {...register('capacity', {
                      required: 'Capacity is required',
                      pattern: { value: /^[0-9]+$/, message: 'Must be a number' },
                    })}
                    placeholder="e.g. 2"
                    className="flex-1 bg-transparent text-sm text-black placeholder-slategray outline-none font-medium dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
                  />
                </div>
                {errors.capacity && (
                  <span className="text-xs text-red-500">{errors.capacity.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <TagsSection roomType={roomType} />

          {/* About */}
          <div className="self-stretch flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-4">
              <b className="text-black dark:text-[#a4acba]">About</b>
              <span className="font-medium text-dimgray dark:text-[#6b7280]">Not required</span>
            </div>
            <textarea
              {...register('about')}
              placeholder="Describe this room type..."
              rows={4}
              className="self-stretch rounded-xl bg-aliceblue border border-whitesmoke py-3 px-4 text-sm text-black placeholder-slategray outline-none font-medium resize-none dark:bg-[#1f2022] dark:border-[#343737] dark:text-[#d7e0ef] dark:placeholder-[#8c95a3]"
            />
          </div>

          {/* Add Photos */}
          <div className="self-stretch flex flex-col items-start gap-1">
            <b className="text-black dark:text-[#72cbb8]">Add Photos</b>
            <div className="flex items-start flex-wrap gap-2 py-2">
              <div className="h-[100px] w-[100px] rounded-xl border border-whitesmoke overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors dark:border-[#343737] dark:hover:bg-[#1f2022]">
                <Icon
                  icon="material-symbols:add-photo-alternate-outline"
                  className="w-8 h-8 text-black dark:text-[#72cbb8]"
                />
              </div>
            </div>
          </div>

          {/* Add Rooms — now a self-contained expandable section */}
          <div className="self-stretch flex flex-col items-start gap-4">
            <b className="text-black dark:text-[#72cbb8]">Add Rooms</b>
            <RoomsSection roomType={roomType} />
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
