import '../config.js';
import mongoose from 'mongoose';
import { User, Student, Landlord } from '../features/user/user.model.js';
import { HousingFacility } from '../features/facility/facility.model.js';
import { Listing } from '../features/listing/listing.model.js';
import { Unit } from '../features/unit/unit.model.js';
import { Rental } from '../features/rental/rental.model.js';

const SEED_TAG = 'tenant-seed-v1';

// ─── Your actual landlord account ───────────────────────────────────────────
const LANDLORD_ID = '6a0572ffc3fbfcb9c578a119';

const connect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL. Add it to backend/.env.');
  }
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to MongoDB.');
};

const seedTenants = async () => {
  // Use existing landlord account
  const landlord = await User.findById(LANDLORD_ID);
  if (!landlord) {
    throw new Error(`Landlord with ID ${LANDLORD_ID} not found in the database.`);
  }
  console.log(`Found landlord: ${landlord.firstName} ${landlord.lastName} (${landlord.emails[0]})`);

  // Clean up previous seed data
  await HousingFacility.deleteMany({ description: { $regex: SEED_TAG } });
  await Rental.deleteMany({ expectedMoveInDate: new Date('2026-04-01') });
  console.log('Cleaned up previous seed data.');

  // Create facility
  const facility = await HousingFacility.create({
    name: 'Kopiko Heights',
    landlordId: landlord._id,
    managers: [
      {
        userId: landlord._id,
        permissions: {
          manageListings: true,
          manageApplications: true,
          manageBillings: true,
          manageBookings: true,
          deleteListings: false,
          reportUsers: false,
        },
      },
    ],
    location: { text: 'Batong Malake, Los Baños, Laguna' },
    type: 'off-campus',
    status: 'approved',
    capacity: 20,
    description: `[${SEED_TAG}] Modern dorm facility near UPLB campus.`,
  });
  console.log(`Created facility: ${facility.name}`);

  // Create listing
  const listing = await Listing.create({
    facilityId: facility._id,
    landlordId: landlord._id,
    roomType: 'single',
    capacity: 1,
    tags: { roomLabel: 'Premium Single' },
    description: 'Air-conditioned single room with study desk',
  });
  console.log(`Created listing: Premium Single`);

  // Create shared listing
  const sharedListing = await Listing.create({
    facilityId: facility._id,
    landlordId: landlord._id,
    roomType: 'shared',
    capacity: 4,
    tags: { roomLabel: 'Economy Shared' },
    description: 'Budget-friendly shared room',
  });
  console.log(`Created listing: Economy Shared`);

  // Tenant data
  const tenantData = [
    {
      firstName: 'Daphne',
      lastName: 'Canape',
      email: 'dcanape@up.edu.ph',
      studentNumber: '202312345',
      address: 'Los Baños, Laguna',
      contact: '09121231212',
    },
    {
      firstName: 'Liam',
      lastName: 'Larkin',
      email: 'llarkin@up.edu.ph',
      studentNumber: '202312346',
      address: 'Calamba, Laguna',
      contact: '08123456789',
    },
    {
      firstName: 'Olivia',
      lastName: 'Oconnor',
      email: 'ooconnor@up.edu.ph',
      studentNumber: '202312347',
      address: 'Sta. Rosa, Laguna',
      contact: '07129990011',
    },
    {
      firstName: 'Marco',
      lastName: 'Reyes',
      email: 'mreyes@up.edu.ph',
      studentNumber: '202312348',
      address: 'Bay, Laguna',
      contact: '09175551234',
    },
    {
      firstName: 'Sofia',
      lastName: 'Cruz',
      email: 'scruz@up.edu.ph',
      studentNumber: '202312349',
      address: 'San Pablo, Laguna',
      contact: '09281234567',
    },
  ];

  for (let i = 0; i < tenantData.length; i++) {
    const t = tenantData[i];
    const isShared = i >= 3;
    const targetListing = isShared ? sharedListing : listing;

    // Create student user
    const student = await Student.create({
      firstName: t.firstName,
      lastName: t.lastName,
      emails: [t.email],
      auth: { google: [`google-seed-tenant-${Date.now()}-${i}`] },
      status: 'verified',
      verificationStatus: 'approved',
      userType: 'Student',
      studentNumber: t.studentNumber,
      address: t.address,
      contact: t.contact,
    });

    // Create unit
    const unit = await Unit.create({
      listingId: targetListing._id,
      facilityId: facility._id,
      roomNumber: `SEED-${Date.now()}-${i}`,
      price: isShared ? 3500 : 5000,
      capacity: isShared ? 4 : 1,
      isAvailable: false,
      currentRentals: [],
    });

    // Create rental
    const rental = await Rental.create({
      userId: student._id,
      facilityId: facility._id,
      unitId: unit._id,
      status: 'active',
      expectedMoveInDate: new Date('2026-04-01'),
      expectedMoveOutDate: new Date('2027-04-01'),
      actualMoveInDate: new Date('2026-04-01'),
    });

    unit.currentRentals.push(rental._id);
    await unit.save();

    console.log(
      `  ✓ Tenant: ${t.firstName} ${t.lastName} → ${unit.roomNumber} (${isShared ? 'shared' : 'single'})`,
    );
  }

  console.log(
    `\nSeeded ${tenantData.length} tenants for landlord: ${landlord.firstName} ${landlord.lastName}`,
  );
  console.log(`Facility: ${facility.name} (ID: ${facility._id})`);
};

const main = async () => {
  await connect();
  console.log('\n--- Seeding Tenants for Kopiko Blanca ---');
  await seedTenants();
  console.log('\n✅ Tenant seed data complete.');
};

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
