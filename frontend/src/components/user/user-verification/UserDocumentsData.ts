export type UserDocumentSlot = {
  id: 'university-id' | 'form-5' | 'notice-of-admission';
  title: string;
  subtitle: string;
  acceptedHint: string;
  accept: string;
};

export const userDocuments: UserDocumentSlot[] = [
  {
    id: 'university-id',
    title: 'Official University ID',
    subtitle: '(For Old UP Students)',
    acceptedHint: '.jpg or .png less than 500KB',
    accept: 'image/png,image/jpeg',
  },
  {
    id: 'form-5',
    title: 'Form 5',
    subtitle: '(For Old UP Students)',
    acceptedHint: '.pdf less than 500KB',
    accept: 'application/pdf',
  },
  {
    id: 'notice-of-admission',
    title: 'Notice of Admission',
    subtitle: '(For Incoming Freshman UP Students)',
    acceptedHint: '.pdf less than 500KB',
    accept: 'application/pdf',
  },
];
