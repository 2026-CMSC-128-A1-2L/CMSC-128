import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoomData {
  id: string;
  number: string;
  isAvailable: boolean;
  current_occupants: number;
  user_occupant: string[];
}

// Mirrors the backend Tag schema's dataType discriminator
export type TagDataType =
  | { name: 'enum'; values: string[] }
  | { name: 'numeric'; min?: number; max?: number }
  | { name: 'boolean' };

// A tag definition fetched from the backend
export interface TagDefinition {
  _id: string;
  name: string;
  displayName: string;
  isRequired: boolean;
  dataType: TagDataType;
}

// A tag that has been selected and assigned a value for a specific room type
export interface TagValue {
  tagId: string; // references TagDefinition._id
  name: string; // snapshot of TagDefinition.name
  displayName: string; // snapshot of TagDefinition.displayName
  dataType: TagDataType; // snapshot for rendering the right input
  value: string | boolean | number | null; // the assigned value
}

export interface RoomTypeData {
  id: string;
  name: string;
  roomType: string;
  capacity: string;
  price: string;
  tags: TagValue[]; // was string[]
  about: string;
  images: string[];
  imageFiles: File[];
  rooms: RoomData[];
}

export interface BuildingCoordinates {
  lat: number;
  long: number;
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
  accountNumber: string;
  qrImage: string;
}

export interface PaymentData {
  enabled: boolean;
  gcash: PaymentMethodData | null;
  bank: PaymentMethodData | null;
}

// Stores the uploaded file object + display metadata
export interface RequirementItem {
  id: string;
  label: string;
  file: File | null;
  fileKey: string | null;
  date: string | null;
}

export interface BuildingInformationData {
  id: string;
  name: string;
  typeOfBuilding: string;
  location: string;
  locationCoordinates: BuildingCoordinates;
  about: string;
  images: string[];
  imageFiles: File[];
  roomTypes: RoomTypeData[];
  managers: ManagerData[];
  payment: PaymentData;
  requirements: RequirementItem[];
  allowPasalo: boolean;
  allowOcularVisit: boolean;
}

interface BuildingStore {
  buildingInfo: BuildingInformationData;

  setBuildingInfo: (data: Partial<BuildingInformationData>) => void;
  setPayment: (data: Partial<PaymentData>) => void;
  updateRequirement: (id: string, file: File | null, date: string | null, fileKey?: string | null) => void;
  reset: () => void;

  addRoomType: () => void;
  updateRoomType: (id: string, data: Partial<RoomTypeData>) => void;
  removeRoomType: (id: string) => void;

  addRoom: (roomTypeId: string) => void;
  updateRoom: (roomTypeId: string, roomId: string, data: Partial<RoomData>) => void;
  removeRoom: (roomTypeId: string, roomId: string) => void;

  // Tag actions (scoped to a parent room type by roomTypeId)
  addTag: (roomTypeId: string, tag: TagValue) => void;
  updateTagValue: (roomTypeId: string, tagId: string, value: TagValue['value']) => void;
  removeTag: (roomTypeId: string, tagId: string) => void;

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
  price: '',
  tags: [],
  about: '',
  images: [],
  imageFiles: [],
  rooms: [],
});

const defaultPayment: PaymentData = {
  enabled: false,
  gcash: null,
  bank: null,
};

const defaultRequirements: RequirementItem[] = [
  { id: 'valid_id', label: 'Valid ID', file: null, fileKey: null, date: null },
  { id: 'business_permit', label: 'Business Permit', file: null, fileKey: null, date: null },
  { id: 'dti_registration', label: 'DTI Business Name Registration', file: null, fileKey: null, date: null },
  { id: 'bir_cert', label: 'BIR Certificate of Registration', file: null, fileKey: null, date: null },
  { id: 'tenancy_contract', label: 'Tenancy Contract Template', file: null, fileKey: null, date: null },
];

export const DEFAULT_BUILDING_COORDINATES: BuildingCoordinates = {
  lat: 14.1653,
  long: 121.241,
};

const createDefaultState = (): BuildingInformationData => ({
  id: crypto.randomUUID(),
  name: '',
  typeOfBuilding: '',
  location: '',
  locationCoordinates: DEFAULT_BUILDING_COORDINATES,
  about: '',
  images: [],
  imageFiles: [],
  roomTypes: [{ ...defaultRoomType(), name: '2 Pax Room' }],
  managers: [],
  payment: defaultPayment,
  requirements: defaultRequirements.map((req) => ({ ...req })),
  allowPasalo: false,
  allowOcularVisit: false,
});

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuildingStore = create<BuildingStore>((set) => ({
  buildingInfo: createDefaultState(),

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

  // Updates a single requirement's file and date by id
  updateRequirement: (id, file, date, fileKey = null) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        requirements: state.buildingInfo.requirements.map((req) =>
          req.id === id ? { ...req, file, date, fileKey } : req,
        ),
      },
    })),

  reset: () => set({ buildingInfo: createDefaultState() }),

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
          rt.id === id ? { ...rt, ...data } : rt,
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
          rt.id === roomTypeId ? { ...rt, rooms: [...rt.rooms, defaultRoom()] } : rt,
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
                rooms: rt.rooms.map((room) => (room.id === roomId ? { ...room, ...data } : room)),
              }
            : rt,
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
            : rt,
        ),
      },
    })),

  // ── Tags (scoped to a RoomType) ───────────────────────────────────────────

  addTag: (roomTypeId, tag) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === roomTypeId
            ? // Prevent duplicate tag IDs
              rt.tags.some((t) => t.tagId === tag.tagId)
              ? rt
              : { ...rt, tags: [...rt.tags, tag] }
            : rt,
        ),
      },
    })),

  updateTagValue: (roomTypeId, tagId, value) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === roomTypeId
            ? {
                ...rt,
                tags: rt.tags.map((t) => (t.tagId === tagId ? { ...t, value } : t)),
              }
            : rt,
        ),
      },
    })),

  removeTag: (roomTypeId, tagId) =>
    set((state) => ({
      buildingInfo: {
        ...state.buildingInfo,
        roomTypes: state.buildingInfo.roomTypes.map((rt) =>
          rt.id === roomTypeId ? { ...rt, tags: rt.tags.filter((t) => t.tagId !== tagId) } : rt,
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
