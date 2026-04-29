import dorm from "../../assets/one_sapphire.png";

export type RoomType = {
  id: string;
  name: string;
  image: string;
  status: "pending" | "approved";
};

export type Manager = {
  name: string;
  availability: string;
};

export type Tenant = {
  name: string;
  roomNumber: string;
};

export type Building = {
  id: number;
  // PropertiesCard fields
  name: string;
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  income: string;
  outstanding: string;
  status: "Active" | "Inactive";
  month: string;
  img: string;
  url: string;
  // BuildingInfo fields
  buildingType: string;
  capacity: number;
  about: string;
  photos: string[];
  roomTypes: RoomType[];
  managers: Manager[];
  tenants: Tenant[];
};

export const BUILDINGS: Building[] = [
  {
    id: 1,
    name: "One Sapphire Place",
    address: "10247 Ruby St, Los Baños, Laguna",
    totalUnits: 24,
    occupiedUnits: 24,
    income: "89,400.00",
    outstanding: "12,600.00",
    status: "Active",
    month: "MAR",
    img: dorm,
    url: "/landlord/properties/1",
    buildingType: "Dormitory",
    capacity: 24,
    about:
      "One Sapphire Place is a fully air-conditioned dormitory located near the University of the Philippines Los Baños campus. It offers a safe and conducive environment for students with 24/7 security, high-speed Wi-Fi, and modern amenities.",
    photos: [dorm, dorm, dorm],
    roomTypes: [
      { id: "10", name: "2 Pax - Aircon", image: dorm, status: "approved" },
      { id: "11", name: "2 Pax - Non-Aircon", image: dorm, status: "approved" },
      { id: "12", name: "1 Pax", image: dorm, status: "pending" },
    ],
    managers: [
      { name: "Maria Santos", availability: "Mon–Fri" },
      { name: "Jose Reyes", availability: "Sat–Sun" },
    ],
    tenants: [
      { name: "Ana Cruz", roomNumber: "1A" },
      { name: "Ben Torres", roomNumber: "1B" },
      { name: "Carla Vega", roomNumber: "2A" },
    ],
  },
  {
    id: 2,
    name: "Emerald Heights",
    address: "Agapita St., Los Baños, Laguna",
    totalUnits: 15,
    occupiedUnits: 12,
    income: "45,000.00",
    outstanding: "5,000.00",
    status: "Active",
    month: "MAR",
    img: dorm,
    url: "/landlord/properties/2",
    buildingType: "Apartment",
    capacity: 15,
    about:
      "Emerald Heights is a modern apartment building offering spacious rooms with complete furnishings. Strategically located along Agapita St., residents enjoy easy access to public transport, wet market, and commercial establishments.",
    photos: [dorm, dorm],
    roomTypes: [
      { id: "20", name: "Studio Unit", image: dorm, status: "approved" },
      { id: "21", name: "1BR Unit", image: dorm, status: "pending" },
    ],
    managers: [{ name: "Lorna Diaz", availability: "Mon–Sun" }],
    tenants: [
      { name: "Diego Lim", roomNumber: "101" },
      { name: "Eva Ong", roomNumber: "102" },
    ],
  },
];
