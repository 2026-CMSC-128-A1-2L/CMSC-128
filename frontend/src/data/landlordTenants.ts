export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export type SubmittedDocumentKind = 'image' | 'pdf' | 'other';

export type SubmittedDocument = {
  id: string;
  title: string;
  descriptor?: string;
  fileName: string;
  submittedAt: string;
  kind: SubmittedDocumentKind;
};

export type Tenant = {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  photoUrl?: string;
  unit: string;
  dormName: string;
  baseRentFee: string;
  contractDuration: string;
  monthlyDueDate: string;
  modeOfPayment: string;
  billingStatus: PaymentStatus;
  latestBillingItem: string;
  studentCategory: string;
  documents: SubmittedDocument[];
};

export type PendingApplication = {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  photoUrl?: string;
  dormName: string;
  unit: string;
  baseRentFee: string;
  contractDuration: string;
  monthlyDueDate: string;
  modeOfPayment: string;
  submittedOn: string;
  reviewedByManager: boolean;
  studentCategory: string;
  documents: SubmittedDocument[];
};

export const TENANT_COUNT = 132;

export const tenants: Tenant[] = [
  {
    id: 'daphne-dayne',
    fullName: 'CANAPE, DAPHNE',
    displayName: 'Daphne Dayne',
    email: 'dcanape@up.edu.ph',
    contactNumber: '0912 123 1212',
    homeAddress: 'Los Banos Laguna',
    unit: 'One Sapphire Place - 3F1',
    dormName: 'One Sapphire',
    baseRentFee: '5,000.00',
    contractDuration: '04/26 - 4/27',
    monthlyDueDate: '10th of the Month',
    modeOfPayment: 'GCash',
    billingStatus: 'paid',
    latestBillingItem: 'Rent for Mar 2026',
    studentCategory: 'Old UP Student',
    documents: [
      {
        id: 'official-id',
        title: 'Official University ID',
        descriptor: '(For Old UP Students)',
        fileName: 'id.png',
        submittedAt: '02 April 2026',
        kind: 'image',
      },
      {
        id: 'form-5',
        title: 'Form 5',
        descriptor: '(For Old UP Students)',
        fileName: 'form_5.pdf',
        submittedAt: '02 April 2026',
        kind: 'pdf',
      },
    ],
  },
  {
    id: 'liam-larkin',
    fullName: 'LARKIN, LIAM',
    displayName: 'Liam Larkin',
    email: 'llarkin@up.edu.ph',
    contactNumber: '0812 345 6789',
    homeAddress: 'Calamba, Laguna',
    unit: 'Two Emerald Avenue - 2B3',
    dormName: 'Two Emerald',
    baseRentFee: '6,200.00',
    contractDuration: '01/26 - 12/26',
    monthlyDueDate: '5th of the Month',
    modeOfPayment: 'Bank Transfer',
    billingStatus: 'pending',
    latestBillingItem: 'Utilities for Apr 2026',
    studentCategory: 'Old UP Student',
    documents: [
      {
        id: 'official-id',
        title: 'Official University ID',
        descriptor: '(For Old UP Students)',
        fileName: 'id.png',
        submittedAt: '14 January 2026',
        kind: 'image',
      },
      {
        id: 'form-5',
        title: 'Form 5',
        descriptor: '(For Old UP Students)',
        fileName: 'form_5.pdf',
        submittedAt: '14 January 2026',
        kind: 'pdf',
      },
    ],
  },
  {
    id: 'olivia-oconnor',
    fullName: "O'CONNOR, OLIVIA",
    displayName: "Olivia O'Connor",
    email: 'ooconnor@up.edu.ph',
    contactNumber: '0712 999 0011',
    homeAddress: 'Sta. Rosa, Laguna',
    unit: 'Three Ruby Road - 1A2',
    dormName: 'Three Ruby',
    baseRentFee: '4,800.00',
    contractDuration: '08/25 - 07/26',
    monthlyDueDate: '15th of the Month',
    modeOfPayment: 'Cash',
    billingStatus: 'overdue',
    latestBillingItem: 'Internet for Apr 2026',
    studentCategory: 'Old UP Student',
    documents: [
      {
        id: 'official-id',
        title: 'Official University ID',
        descriptor: '(For Old UP Students)',
        fileName: 'id.png',
        submittedAt: '20 July 2025',
        kind: 'image',
      },
      {
        id: 'form-5',
        title: 'Form 5',
        descriptor: '(For Old UP Students)',
        fileName: 'form_5.pdf',
        submittedAt: '20 July 2025',
        kind: 'pdf',
      },
    ],
  },
];

export const pendingApplications: PendingApplication[] = [
  {
    id: 'daphne-dayne',
    fullName: 'CANAPE, DAPHNE',
    displayName: 'Daphne Dayne',
    email: 'dcanape@up.edu.ph',
    contactNumber: '0912 123 1212',
    homeAddress: 'Los Banos, Laguna',
    dormName: 'One Sapphire',
    unit: 'One Sapphire Place',
    baseRentFee: '5,000.00',
    contractDuration: '04/26 - 4/27',
    monthlyDueDate: '10th of the Month',
    modeOfPayment: 'GCash',
    submittedOn: '04/12/26',
    reviewedByManager: true,
    studentCategory: 'Old UP Student',
    documents: [
      {
        id: 'official-id',
        title: 'Official University ID',
        descriptor: '(For Old UP Students)',
        fileName: 'id.png',
        submittedAt: '02 April 2026',
        kind: 'image',
      },
      {
        id: 'form-5',
        title: 'Form 5',
        descriptor: '(For Old UP Students)',
        fileName: 'form_5.pdf',
        submittedAt: '02 April 2026',
        kind: 'pdf',
      },
    ],
  },
  {
    id: 'mateo-ramos',
    fullName: 'RAMOS, MATEO',
    displayName: 'Mateo Ramos',
    email: 'mramos@up.edu.ph',
    contactNumber: '0927 556 8821',
    homeAddress: 'Bay, Laguna',
    dormName: 'One Sapphire',
    unit: 'One Sapphire Place',
    baseRentFee: '5,000.00',
    contractDuration: '04/26 - 4/27',
    monthlyDueDate: '10th of the Month',
    modeOfPayment: 'GCash',
    submittedOn: '04/12/26',
    reviewedByManager: false,
    studentCategory: 'Old UP Student',
    documents: [],
  },
];

export const getTenantById = (id: string) =>
  tenants.find((tenant) => tenant.id === id);

export const getPendingApplicationById = (id: string) =>
  pendingApplications.find((application) => application.id === id);
