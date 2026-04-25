import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoomTypeData {
  id: string;
  name: string;
  roomType: string;
  capacity: string;
  tags: string[];
  about: string;
  photos: File[];
  rooms: string[];
}

export interface BuildingInformationData {
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
  setBuildingInfo: (data: Partial<BuildingInformationData>) => void;
  addRoomType: () => void;
  updateRoomType: (id: string, data: Partial<RoomTypeData>) => void;
  removeRoomType: (id: string) => void;
  reset: () => void;
}

// ─── Default state ────────────────────────────────────────────────────────────

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

  setBuildingInfo: (data) =>
    set((state) => ({
      buildingInfo: { ...state.buildingInfo, ...data },
    })),

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

  reset: () => set({ buildingInfo: defaultState }),
}));
