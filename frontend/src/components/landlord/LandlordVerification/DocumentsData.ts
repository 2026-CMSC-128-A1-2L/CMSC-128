export type DocumentSlot = {
  id: 'valid-id' | 'business-permit';
  title: string;
  acceptedHint: string;
  accept: string;
};

export const documents: DocumentSlot[] = [
  {
    id: 'valid-id',
    title: 'Valid ID',
    acceptedHint: '.jpg or .png less than 500KB',
    accept: 'image/png,image/jpeg',
  },
  {
    id: 'business-permit',
    title: 'Business Permit',
    acceptedHint: '.pdf less than 500KB',
    accept: 'application/pdf',
  },
];
