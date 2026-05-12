import '../config.js';
import mongoose from 'mongoose';
import { HousingFacility } from '../features/facility/facility.model.js';
import { Listing } from '../features/listing/listing.model.js';
import { Review } from '../features/review/review.model.js';
import { Tag } from '../features/tag/tag.model.js';
import { Unit } from '../features/unit/unit.model.js';
import { Student } from '../features/user/user.model.js';

const SEED_SOURCE = 'facility-listings-seed-v1';

const sampleImages = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
];

const tagDefinitions = [
  {
    name: 'layout',
    displayName: 'Layout',
    isRequired: false,
    dataType: { name: 'enum', values: ['studio', 'one-bedroom', 'two-bedroom', 'dorm-room'] },
  },
  {
    name: 'floorAreaSqm',
    displayName: 'Floor Area',
    isRequired: false,
    dataType: { name: 'numeric', min: 1, max: 200 },
  },
  {
    name: 'floorLevel',
    displayName: 'Floor Level',
    isRequired: false,
    dataType: { name: 'numeric', min: 1, max: 50 },
  },
  {
    name: 'bathroom',
    displayName: 'Bathroom',
    isRequired: false,
    dataType: { name: 'enum', values: ['private', 'shared'] },
  },
  {
    name: 'furnishing',
    displayName: 'Furnishing',
    isRequired: false,
    dataType: { name: 'enum', values: ['basic', 'semi-furnished', 'furnished'] },
  },
  {
    name: 'genderPolicy',
    displayName: 'Gender Policy',
    isRequired: false,
    dataType: { name: 'enum', values: ['any', 'female-only', 'male-only'] },
  },
  {
    name: 'leaseTerm',
    displayName: 'Lease Term',
    isRequired: false,
    dataType: { name: 'enum', values: ['1-sem', '2-sem', '1-year'] },
  },
  {
    name: 'moveInPolicy',
    displayName: 'Move-in Policy',
    isRequired: false,
    dataType: { name: 'enum', values: ['immediate', 'next-month', 'semester-start'] },
  },
  {
    name: 'nearCampus',
    displayName: 'Near Campus',
    isRequired: false,
    dataType: { name: 'boolean' },
  },
  { name: 'hasWifi', displayName: 'Wi-Fi', isRequired: false, dataType: { name: 'boolean' } },
  { name: 'hasKitchen', displayName: 'Kitchen', isRequired: false, dataType: { name: 'boolean' } },
  {
    name: 'hasAircon',
    displayName: 'Air Conditioning',
    isRequired: false,
    dataType: { name: 'boolean' },
  },
  { name: 'hasLaundry', displayName: 'Laundry', isRequired: false, dataType: { name: 'boolean' } },
  { name: 'hasCctv', displayName: 'CCTV', isRequired: false, dataType: { name: 'boolean' } },
  {
    name: 'hasStudyDesk',
    displayName: 'Study Desk',
    isRequired: false,
    dataType: { name: 'boolean' },
  },
  {
    name: 'hasRefrigerator',
    displayName: 'Refrigerator',
    isRequired: false,
    dataType: { name: 'boolean' },
  },
  {
    name: 'securityGuard',
    displayName: 'Security Guard',
    isRequired: false,
    dataType: { name: 'boolean' },
  },
  {
    name: 'visitorPolicy',
    displayName: 'Visitor Policy',
    isRequired: false,
    dataType: {
      name: 'enum',
      values: ['day-visits-only', 'no-overnight-visitors', 'landlord-approval-required'],
    },
  },
  {
    name: 'smokingPolicy',
    displayName: 'Smoking Policy',
    isRequired: false,
    dataType: { name: 'enum', values: ['no-smoking-inside-building', 'outdoor-smoking-area-only'] },
  },
  {
    name: 'petsPolicy',
    displayName: 'Pets Policy',
    isRequired: false,
    dataType: { name: 'enum', values: ['no-pets-allowed', 'small-pets-with-approval'] },
  },
  {
    name: 'curfew',
    displayName: 'Curfew',
    isRequired: false,
    dataType: { name: 'enum', values: ['none', '10-pm', '11-pm'] },
  },
  {
    name: 'paymentPolicy',
    displayName: 'Payment Policy',
    isRequired: false,
    dataType: {
      name: 'enum',
      values: ['1-month-advance-1-month-deposit', '1-month-advance-2-month-deposit'],
    },
  },
  {
    name: 'roomLabel',
    displayName: 'Room Label',
    isRequired: false,
    dataType: {
      name: 'enum',
      values: ['Studio Single', 'One Bedroom', 'Two Bedroom Shared', 'Four-Person Dorm Room'],
    },
  },
  {
    name: 'seedSource',
    displayName: 'Seed Source',
    isRequired: false,
    dataType: { name: 'enum', values: [SEED_SOURCE] },
  },
] as const;

const listingTemplates = [
  {
    label: 'Studio Single',
    roomType: 'single' as const,
    capacity: 1,
    basePrice: 8500,
    description: 'Private studio-style room for students who prefer a quiet solo space.',
    tags: {
      layout: 'studio',
      furnishing: 'semi-furnished',
      bathroom: 'private',
      genderPolicy: 'any',
      seedSource: SEED_SOURCE,
    },
  },
  {
    label: 'One Bedroom',
    roomType: 'single' as const,
    capacity: 1,
    basePrice: 7000,
    description: 'One-bedroom listing with study space and basic appliances.',
    tags: {
      layout: 'one-bedroom',
      furnishing: 'furnished',
      bathroom: 'shared',
      genderPolicy: 'any',
      seedSource: SEED_SOURCE,
    },
  },
  {
    label: 'Two Bedroom Shared',
    roomType: 'double' as const,
    capacity: 2,
    basePrice: 5200,
    description: 'Two-person shared room suited for classmates or friends.',
    tags: {
      layout: 'two-bedroom',
      furnishing: 'semi-furnished',
      bathroom: 'shared',
      genderPolicy: 'any',
      seedSource: SEED_SOURCE,
    },
  },
  {
    label: 'Four-Person Dorm Room',
    roomType: 'shared' as const,
    capacity: 4,
    basePrice: 3800,
    description: 'Budget-friendly shared dorm room with individual beds and lockers.',
    tags: {
      layout: 'dorm-room',
      furnishing: 'basic',
      bathroom: 'shared',
      genderPolicy: 'any',
      seedSource: SEED_SOURCE,
    },
  },
];

const connect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error(
      'Missing MONGO_URL. Add it to backend/.env or pass it before running the seed.',
    );
  }

  await mongoose.connect(process.env.MONGO_URL);
};

const seedTags = async () => {
  await Promise.all(
    tagDefinitions.map((tag) => Tag.updateOne({ name: tag.name }, { $set: tag }, { upsert: true })),
  );
};

const uniqueRoomNumber = (facilityIndex: number, listingIndex: number, unitIndex: number) => {
  const floor = listingIndex + 2;
  const room = unitIndex + 1;
  return `SEED-${facilityIndex + 1}${floor}${room.toString().padStart(2, '0')}`;
};

const main = async () => {
  await connect();
  await seedTags();

  const facilities = await HousingFacility.find({ status: 'approved' }).limit(10).lean();

  if (facilities.length === 0) {
    throw new Error('No approved housing facilities found. Create or approve a facility first.');
  }

  const existingSeededListings = await Listing.find({ 'tags.seedSource': SEED_SOURCE }).select(
    '_id',
  );
  const existingSeededListingIds = existingSeededListings.map((listing) => listing._id);

  await Unit.deleteMany({ listingId: { $in: existingSeededListingIds } });
  await Review.deleteMany({ description: { $regex: SEED_SOURCE } });
  await Listing.deleteMany({ 'tags.seedSource': SEED_SOURCE });

  const reviewUsers = await Student.find().limit(3);

  let totalListings = 0;
  let totalUnits = 0;

  for (const [facilityIndex, facility] of facilities.entries()) {
    const templatesForFacility = listingTemplates.slice(0, 2 + (facilityIndex % 3));
    const listingPreview = [];
    let facilityCapacity = 0;

    for (const [listingIndex, template] of templatesForFacility.entries()) {
      const image = sampleImages[(facilityIndex + listingIndex) % sampleImages.length];
      const listing = await Listing.create({
        facilityId: facility._id,
        landlordId: facility.landlordId,
        roomType: template.roomType,
        capacity: template.capacity,
        description: `${template.description} Seeded for ${facility.name}.`,
        tags: {
          ...template.tags,
          roomLabel: template.label,
          nearCampus: facilityIndex % 2 === 0,
          hasWifi: true,
          hasKitchen: listingIndex % 2 === 0,
          hasAircon: listingIndex % 2 === 0,
          hasLaundry: facilityIndex % 2 === 1,
          hasCctv: true,
          hasStudyDesk: template.capacity <= 2,
          hasRefrigerator: listingIndex % 3 === 0,
          securityGuard: facilityIndex % 2 === 0,
          floorAreaSqm: 14 + template.capacity * 5 + listingIndex,
          floorLevel: listingIndex + 2,
          leaseTerm: listingIndex % 2 === 0 ? '1-year' : '2-sem',
          moveInPolicy: listingIndex % 2 === 0 ? 'semester-start' : 'immediate',
          visitorPolicy:
            template.capacity > 2 ? 'no-overnight-visitors' : 'landlord-approval-required',
          smokingPolicy: 'no-smoking-inside-building',
          petsPolicy: listingIndex % 3 === 0 ? 'small-pets-with-approval' : 'no-pets-allowed',
          curfew: facilityIndex % 2 === 0 ? '11-pm' : '10-pm',
          paymentPolicy:
            template.capacity > 1
              ? '1-month-advance-1-month-deposit'
              : '1-month-advance-2-month-deposit',
        },
        media: [{ sourceType: 'external', value: image }],
        qualityAvg: 4 + (listingIndex % 3) * 0.2,
        comfortAvg: 3.8 + (listingIndex % 3) * 0.25,
        environmentAvg: 4.1 + (facilityIndex % 3) * 0.15,
        reviewCount: 3 + listingIndex + facilityIndex,
      });

      const unitsForListing = 2 + ((facilityIndex + listingIndex) % 3);
      const unitPreview = [];

      for (let unitIndex = 0; unitIndex < unitsForListing; unitIndex += 1) {
        const unitPrice = template.basePrice + facilityIndex * 250 + unitIndex * 300;
        const unit = await Unit.create({
          listingId: listing._id,
          facilityId: facility._id,
          roomNumber: uniqueRoomNumber(facilityIndex, listingIndex, unitIndex),
          currentRentals: [],
          capacity: template.capacity,
          price: unitPrice,
          location: `${listingIndex + 2}F - ${template.label}`,
          isAvailable: unitIndex !== unitsForListing - 1,
        });

        facilityCapacity += template.capacity;
        totalUnits += 1;
        unitPreview.push({
          unitId: unit._id,
          roomNumber: unit.roomNumber,
          price: unit.price,
          capacity: unit.capacity,
          isAvailable: unit.isAvailable,
        });
      }

      await Promise.all(
        reviewUsers.slice(0, 2 + (listingIndex % 2)).map((user, reviewIndex) =>
          Review.create({
            userId: user._id,
            listingId: listing._id,
            facilityId: facility._id,
            ratings: {
              quality: 4 + ((reviewIndex + listingIndex) % 2),
              comfort: 4,
              environment: 4 + (facilityIndex % 2),
            },
            description: `${SEED_SOURCE}: ${
              reviewIndex === 0
                ? 'Clean space, responsive landlord, and convenient location for classes.'
                : 'Good value for the price. The room type matched what was advertised.'
            }`,
            status: 'approved',
            media: [],
          }),
        ),
      );

      totalListings += 1;
      listingPreview.push({
        listingId: listing._id,
        roomLabel: template.label,
        roomType: listing.roomType,
        capacity: listing.capacity,
        description: listing.description,
        tags: listing.tags instanceof Map ? Object.fromEntries(listing.tags) : listing.tags,
        media: listing.media,
        units: unitPreview,
      });
    }

    await HousingFacility.collection.updateOne(
      { _id: facility._id },
      {
        $set: {
          listings: listingPreview,
          capacity: facilityCapacity,
          media:
            facility.media && facility.media.length > 0
              ? facility.media
              : [
                  {
                    sourceType: 'external',
                    value: sampleImages[facilityIndex % sampleImages.length],
                  },
                ],
          updatedAt: new Date(),
        },
      },
    );
  }

  console.log(
    `Seeded ${totalListings} listings and ${totalUnits} units for ${facilities.length} facilities.`,
  );
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
