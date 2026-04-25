import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoomData {
  id: string;
  number: string;
  isAvailable: boolean;
  current_occupants: number;
  user_occupant: string[]; // array of occupant user IDs
}

export interface RoomTypeData {
  id: string;
  name: string;
  roomType: string;
  capacity: string;
  tags: string[];
  about: string;
  photos: File[];
  rooms: RoomData[]; // changed from string[] to RoomData[]
}

export interface BuildingInformationData {
  id: string;
  name: string;
  typeOfBuilding: string;
  location: string;
  about: string;
  photos: File[];
  roomTypes: RoomTypeData[];
  managers: string[];
}

interface BuildingStore {
  buildingInfo: BuildingInformationData;

  // Building-level actions
  setBuildingInfo: (data: Partial<BuildingInformationData>) => void;
  reset: () => void;

  // Room type actions
  addRoomType: () => void;
  updateRoomType: (id: string, data: Partial<RoomTypeData>) => void;
  removeRoomType: (id: string) => void;

  // Room actions (scoped to a parent room type by roomTypeId)
  addRoom: (roomTypeId: string) => void;
  updateRoom: (roomTypeId: string, roomId: string, data: Partial<RoomData>) => void;
  removeRoom: (roomTypeId: string, roomId: string) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultRoom = (): RoomData => ({
  id: crypto.randomUUID(),
  number: '',
  isAvailable: true,
  current_occupants: 0,
  user_occupant: [],
});

const defaultRoomType = (): RoomTypeData => ({
  id: crypto.randomUUID(),
  name: '',
  roomType: '',
  capacity: '',
  tags: [],
  about: '',
  photos: [],
  rooms: [],
});

const defaultState: BuildingInformationData = {
  id: crypto.randomUUID(),
  name: '',
  typeOfBuilding: '',
  location: '',
  about: '',
  photos: [],
  roomTypes: [{ ...defaultRoomType(), name: '2 Pax Room' }],
  managers: [],
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuildingStore = create<BuildingStore>((set) => ({
  buildingInfo: defaultState,

  // ── Building ──────────────────────────────────────────────────────────────

  setBuildingInfo: (data) =>
    set((state) => ({
      buildingInfo: { ...state.buildingInfo, ...data },
    })),

  reset: () => set({ buildingInfo: defaultState }),

  // ── Room Types ────────────────────────────────────────────────────────────

  addRoomType: () =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: [...state.buildingInfo.roomTypes, defaultRoomType()],
      },
    })),

  updateRoomType: (id, data) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === id ? { ...rt, ...data } : rt
        ),
      },
    })),

  removeRoomType: (id) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.filter((rt) => rt.id !== id),
      },
    })),

  // ── Rooms (nested inside a RoomType) ─────────────────────────────────────

  addRoom: (roomTypeId) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === roomTypeId
            ? { ...rt, rooms: [...rt.rooms, defaultRoom()] }
            : rt
        ),
      },
    })),

  updateRoom: (roomTypeId, roomId, data) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === roomTypeId
            ? {
              ...rt,
              rooms: rt.rooms.map((room) =>
                room.id === roomId ? { ...room, ...data } : room
              ),
            }
            : rt
        ),
      },
    })),

  removeRoom: (roomTypeId, roomId) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === roomTypeId
            ? { ...rt, rooms: rt.rooms.filter((room) => room.id !== roomId) }
            : rt
        ),
      },
    })),
}));
