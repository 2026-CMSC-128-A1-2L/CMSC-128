import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoomData {
  id: string;
  number: string;
  isAvailable: boolean;
  current_occupants: number;
  user_occupant: string[];
}

export interface RoomTypeData {
  id: string;
  name: string;
  roomType: string;
  capacity: string;
  tags: string[];
  about: string;
  images: string[];
  rooms: RoomData[];
}

export interface ManagerPermissions {
  deleteBuildings: boolean;
  deleteListings: boolean;
  manageBuildings: boolean;
  manageBillings: boolean;
  acceptOcularVisits: boolean;
  reportUsers: boolean;
}

export interface ManagerData {
  email: string;
  checkboxes: ManagerPermissions;
}

export interface PaymentMethodData {
  name: string;
  accountNumber: string; // GCash number or bank account number
  qrImage: string;       // object URL of uploaded QR image
}

export interface PaymentData {
  enabled: boolean;
  gcash: PaymentMethodData | null;
  bank: PaymentMethodData | null;
}

export interface BuildingInformationData {
  id: string;
  name: string;
  typeOfBuilding: string;
  location: string;
  about: string;
  images: string[];
  roomTypes: RoomTypeData[];
  managers: ManagerData[];
  payment: PaymentData;
}

interface BuildingStore {
  buildingInfo: BuildingInformationData;

  setBuildingInfo: (data: Partial<BuildingInformationData>) => void;
  setPayment: (data: Partial<PaymentData>) => void;
  reset: () => void;

  addRoomType: () => void;
  updateRoomType: (id: string, data: Partial<RoomTypeData>) => void;
  removeRoomType: (id: string) => void;

  addRoom: (roomTypeId: string) => void;
  updateRoom: (roomTypeId: string, roomId: string, data: Partial<RoomData>) => void;
  removeRoom: (roomTypeId: string, roomId: string) => void;

  addManager: (manager: ManagerData) => void;
  removeManager: (email: string) => void;
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
  images: [],
  rooms: [],
});

const defaultPayment: PaymentData = {
  enabled: false,
  gcash: null,
  bank: null,
};

const defaultState: BuildingInformationData = {
  id: crypto.randomUUID(),
  name: '',
  typeOfBuilding: '',
  location: '',
  about: '',
  images: [],
  roomTypes: [{ ...defaultRoomType(), name: '2 Pax Room' }],
  managers: [],
  payment: defaultPayment,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuildingStore = create<BuildingStore>((set) => ({
  buildingInfo: defaultState,

  setBuildingInfo: (data) =>
    set((state) => ({
      buildingInfo: { ...state.buildingInfo, ...data },
    })),

  setPayment: (data) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        payment: { ...state.buildingInfo.payment, ...data },
      },
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

  // ── Rooms ─────────────────────────────────────────────────────────────────

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

  // ── Managers ──────────────────────────────────────────────────────────────

  addManager: (manager) =>
    set((state) => {
      const exists = state.buildingInfo.managers.some((m) => m.email === manager.email);
      if (exists) return state;
      return {
        buildingInfo: {
          ...state.buildingInfo,
          managers: [...state.buildingInfo.managers, manager],
        },
      };
    }),

  removeManager: (email) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        managers: state.buildingInfo.managers.filter((m) => m.email !== email),
      },
    })),
}));
