import '../config.js';
import mongoose from 'mongoose';
import { Student, Landlord, User } from '../features/user/user.model.js';
import { Report, ListingReport, UserReport } from '../features/report/report.model.js';
import { HousingFacility } from '../features/facility/facility.model.js';
import { Listing } from '../features/listing/listing.model.js';
import { Unit } from '../features/unit/unit.model.js';
import { Rental } from '../features/rental/rental.model.js';

const SEED_TAG = 'report-test-v1';

const connect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL. Add it to backend/.env.');
  }
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to MongoDB.');
};

const main = async () => {
  await connect();

  await Report.deleteMany({ description: { $regex: SEED_TAG } });
  await Rental.deleteMany({});
  await Unit.deleteMany({ roomNumber: { $regex: SEED_TAG } });
  await Listing.deleteMany({ description: { $regex: SEED_TAG } });
  await HousingFacility.deleteMany({ description: { $regex: SEED_TAG } });
  await Student.deleteMany({ emails: { $in: [`${SEED_TAG}-reporter@test.com`] } });
  await Landlord.deleteMany({ emails: { $in: [`${SEED_TAG}-landlord@test.com`] } });
  console.log('Cleaned up previous seed data.');

  const student = await new Student({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    emails: [`${SEED_TAG}-reporter@test.com`],
    studentNumber: '2024-00001',
    degreeProgram: 'BS Computer Science',
    auth: { google: [`google-${SEED_TAG}-reporter`] },
    status: 'verified',
    verificationStatus: 'approved',
    userType: 'Student',
    documents: [
      { docId: 'valid-id', name: 'Student ID', status: 'accepted', files: ['file1.pdf'] },
      { docId: 'enrollment-cert', name: 'Enrollment Form', status: 'accepted', files: ['file2.pdf'] },
    ],
  }).save();
  console.log(`Created student: ${student.firstName} ${student.lastName} (${student._id})`);

  const landlord = await new Landlord({
    firstName: 'Maria',
    lastName: 'Santos',
    emails: [`${SEED_TAG}-landlord@test.com`],
    auth: { google: [`google-${SEED_TAG}-landlord`] },
    status: 'verified',
    verificationStatus: 'approved',
    userType: 'Landlord',
    documents: [
      { docId: 'valid-id', name: 'Government ID', status: 'accepted', files: ['file1.pdf'] },
      { docId: 'business-permit', name: 'Business Permit', status: 'accepted', files: ['file2.pdf'] },
    ],
  }).save();
  console.log(`Created landlord: ${landlord.firstName} ${landlord.lastName} (${landlord._id})`);

  const facility = await new HousingFacility({
    name: 'Sampaguita Dormitory',
    landlordId: landlord._id,
    managers: [
      {
        userId: landlord._id,
        permissions: {
          manageBuildings: true,
          manageBillings: true,
          deleteBuildings: true,
          deleteListings: true,
          reportUsers: false,
        },
      },
    ],
    location: { text: 'Grove Street, Los Baños, Laguna' },
    type: 'off-campus',
    status: 'approved',
    capacity: 50,
    description: `[${SEED_TAG}] A cozy dormitory near UPLB campus.`,
    media: [
      {
        sourceType: 'external',
        value: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  }).save();
  console.log(`Created facility: ${facility.name} (${facility._id})`);

  const listing = await new Listing({
    facilityId: facility._id,
    landlordId: landlord._id,
    roomType: 'single',
    capacity: 1,
    description: `[${SEED_TAG}] Single room with private bathroom.`,
    tags: {},
    media: [],
  }).save();
  console.log(`Created listing (${listing._id})`);

  const unit = await new Unit({
    listingId: listing._id,
    facilityId: facility._id,
    roomNumber: `${SEED_TAG}-101`,
    capacity: 1,
    price: 5000,
    location: '2nd Floor',
    isAvailable: false,
  }).save();
  console.log(`Created unit: ${unit.roomNumber} (${unit._id})`);

  const rental = await new Rental({
    userId: student._id,
    facilityId: facility._id,
    unitId: unit._id,
    status: 'active',
  }).save();

  unit.currentRentals.push(rental._id);
  await unit.save();
  console.log(`Created active rental for student in ${facility.name}`);

  const reports = [
    {
      userId: student._id,
      listingId: listing._id,
      facilityId: facility._id,
      description: `[${SEED_TAG}] The room was not as described in the photos. The walls have mold and the bathroom sink leaks constantly.`,
      flags: ['Misleading Photos', 'Maintenance Issues'],
      evidence: ['photo-evidence-1.jpg'],
      status: 'pending',
      __t: 'ListingReport',
    },
    {
      userId: student._id,
      userReported: landlord._id,
      description: `[${SEED_TAG}] Landlord is unresponsive to maintenance requests. Reported the leaking sink 2 weeks ago and no action has been taken.`,
      flags: ['Unresponsive', 'Negligence in Duties'],
      evidence: ['chat-screenshot-1.jpg'],
      status: 'pending',
      __t: 'UserReport',
    },
    {
      userId: student._id,
      listingId: listing._id,
      facilityId: facility._id,
      description: `[${SEED_TAG}] The facility does not have proper fire safety equipment. No fire extinguishers visible on any floor.`,
      flags: ['Safety Concern', 'Missing Amenities'],
      evidence: ['facility-photo-1.jpg'],
      status: 'resolved',
      __t: 'ListingReport',
    },
  ];

  const created = await Report.insertMany(reports);
  console.log(`Seeded ${created.length} reports.`);

  console.log('\n✅ Report test seed complete.');
  console.log(`   Facility: ${facility.name}`);
  console.log(`   Reporter: ${student.firstName} ${student.lastName}`);
  console.log(`   3 reports created — view them in the Admin Reports page.`);
};

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
