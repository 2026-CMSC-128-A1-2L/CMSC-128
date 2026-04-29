import sapphire from "../../assets/sapphire.jpg";
import s1 from "../../assets/sample1.jpg";
import s2 from "../../assets/sample2.jpg";
import s3 from "../../assets/sample3.jpg";
import s4 from "../../assets/sample4.jpg";
import s5 from "../../assets/sample5.jpg";

import sapphire2 from "../../assets/sapphire1.jpg";

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
  id: string;
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
    id: "one-sapphire",
    name: "One Sapphire Place",
    address: "10247 Ruby St, Los Baños, Laguna",
    totalUnits: 24,
    occupiedUnits: 24,
    income: "89,400.00",
    outstanding: "12,600.00",
    status: "Active",
    month: "MAR",
    img: sapphire,
    url: "/landlord/properties/1",
    buildingType: "Dormitory",
    capacity: 24,
    about:
      "One Sapphire Place is a fully air-conditioned dormitory located near the University of the Philippines Los Baños campus. It offers a safe and conducive environment for students with 24/7 security, high-speed Wi-Fi, and modern amenities.",
    photos: [s1, s2, s3],
    roomTypes: [
      { id: "10", name: "2 Pax - Aircon", image: s1, status: "approved" },
      { id: "11", name: "2 Pax - Non-Aircon", image: s2, status: "approved" },
      { id: "12", name: "1 Pax", image: s3, status: "pending" },
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
    id: "emerald-heights",
    name: "Emerald Heights",
    address: "Agapita St., Los Baños, Laguna",
    totalUnits: 15,
    occupiedUnits: 12,
    income: "45,000.00",
    outstanding: "5,000.00",
    status: "Active",
    month: "MAR",
    img: sapphire2,
    url: "/landlord/properties/2",
    buildingType: "Apartment",
    capacity: 15,
    about:
      "Emerald Heights is a modern apartment building offering spacious rooms with complete furnishings. Strategically located along Agapita St., residents enjoy easy access to public transport, wet market, and commercial establishments.",
    photos: [s4, s3],
    roomTypes: [
      { id: "20", name: "Studio Unit", image: s4, status: "approved" },
      { id: "21", name: "1BR Unit", image: s3, status: "pending" },
    ],
    managers: [{ name: "Lorna Diaz", availability: "Mon–Sun" }],
    tenants: [
      { name: "Diego Lim", roomNumber: "101" },
      { name: "Eva Ong", roomNumber: "102" },
    ],
  },
];
