export type Permission = {
  label: string;
  granted: boolean;
};

export type AvailabilitySlot = {
  days: string;
  hours: string;
};

export type Manager = {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  photoUrl?: string;
  property: string;
  employedBy: string;
  managingSince: string;
  availability: {
    ocular: AvailabilitySlot;
    inquiries: AvailabilitySlot[];
  };
  permissions: Permission[];
};

export type Property = {
  id: string;
  name: string;
  managerIds: string[];
};

export const managers: Manager[] = [
  {
    id: 'daphne-dayne',
    fullName: 'CANAPE, DAPHNE',
    displayName: 'Daphne Dayne',
    email: 'dcanape@up.edu.ph',
    contactNumber: '0936 315 4342',
    homeAddress: 'Los Banos Laguna',
    property: 'One Sapphire',
    employedBy: 'Quevin Custodio',
    managingSince: 'April 2024',
    availability: {
      ocular: { days: 'Mon - Wed', hours: '8:00 AM - 5:00 PM' },
      inquiries: [
        { days: 'Mon - Fri', hours: '8:00 AM - 5:00 PM' },
        { days: 'Sat - Sun', hours: '9:00 AM - 3:00 PM' },
      ],
    },
    permissions: [
      { label: 'Property Management', granted: true },
      { label: 'Manage Billings and Financials', granted: true },
      { label: 'Tenants and Occupants Management', granted: false },
    ],
  },
  {
    id: 'aj-decastro',
    fullName: 'DE CASTRO, AJ',
    displayName: 'AJ De Castro',
    email: 'ajdecastro@gmail.com',
    contactNumber: '0917 000 0000',
    homeAddress: 'Quezon City',
    property: 'Two Sapphire',
    employedBy: 'Quevin Custodio',
    managingSince: 'January 2025',
    availability: {
      ocular: { days: 'Thu - Fri', hours: '9:00 AM - 4:00 PM' },
      inquiries: [
        { days: 'Mon - Fri', hours: '9:00 AM - 5:00 PM' },
      ],
    },
    permissions: [
      { label: 'Property Management', granted: true },
      { label: 'Manage Billings and Financials', granted: false },
      { label: 'Tenants and Occupants Management', granted: true },
    ],
  },
];

export const properties: Property[] = [
  { id: 'one-sapphire', name: 'One Sapphire Place', managerIds: ['daphne-dayne', 'aj-decastro'] },
  { id: 'two-sapphire', name: 'Two Sapphire Place', managerIds: ['aj-decastro'] },
  { id: 'three-sapphire', name: 'Three Sapphire Place', managerIds: [] },
];

export const getManagerById = (id: string) =>
  managers.find((m) => m.id === id);