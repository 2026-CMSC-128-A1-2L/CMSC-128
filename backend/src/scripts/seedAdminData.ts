import '../config.js';
import mongoose from 'mongoose';
import { User, Student, Landlord } from '../features/user/user.model.js';
import { Report, ListingReport, UserReport } from '../features/report/report.model.js';
import { HousingFacility } from '../features/facility/facility.model.js';
import { Listing } from '../features/listing/listing.model.js';

const SEED_TAG = 'admin-seed-v1';

const connect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL. Add it to backend/.env.');
  }
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to MongoDB.');
};

// ---------------------------------------------------------------------------
// 1. Seed ~30 users with verificationStatus: 'submitted' (for Applications page)
// ---------------------------------------------------------------------------
const seedVerificationApplicants = async () => {
  await User.deleteMany({ 'address': { $regex: SEED_TAG } });

  const applicants: any[] = [];
  
  for (let i = 1; i <= 30; i++) {
    const isStudent = i % 3 !== 0; // 2/3 students, 1/3 landlords
    const userType = isStudent ? 'Student' : 'Landlord';
    
    const docs = isStudent 
      ? [
          { docId: 'valid-id', name: 'Student ID', status: 'pending', files: [`file-seed-std-id-${i}`] },
          { docId: 'enrollment-cert', name: 'Certificate of Enrollment', status: 'pending', files: [`file-seed-std-cert-${i}`] },
        ]
      : [
          { docId: 'valid-id', name: 'Valid Government ID', status: 'pending', files: [`file-seed-lld-id-${i}`] },
          { docId: 'business-permit', name: 'Business Permit', status: 'pending', files: [`file-seed-lld-permit-${i}`] },
        ];

    applicants.push({
      firstName: `Applicant${i}`,
      lastName: `Seed${i}`,
      emails: [`applicant${i}@example.com`],
      address: `Test Location ${i} [${SEED_TAG}]`,
      contact: `0917${i.toString().padStart(7, '0')}`,
      userType: userType,
      status: 'unverified',
      verificationStatus: 'submitted',
      studentNumber: isStudent ? `2024${i.toString().padStart(5, '0')}` : undefined,
      auth: { google: [`google-seed-app-${i}`] },
      documents: docs,
    });
  }

  const created = await User.insertMany(applicants);
  console.log(`Seeded ${created.length} verification applicants.`);
  return created;
};

// ---------------------------------------------------------------------------
// 2. Seed ~30 Reports (for Reports page)
// ---------------------------------------------------------------------------
const seedReports = async (seededUsers: any[]) => {
  await Report.deleteMany({ description: { $regex: SEED_TAG } });

  const existingStudents = await Student.find({ status: 'verified' }).limit(5);
  const existingLandlords = await Landlord.find().limit(5);
  const existingListings = await Listing.find().limit(5);

  const reports: any[] = [];
  const reporters = [...existingStudents, ...seededUsers].slice(0, 15);
  const reportees = [...existingLandlords, ...seededUsers.reverse()].slice(0, 15);

  for (let i = 1; i <= 30; i++) {
    const isListingReport = i % 2 === 0 && existingListings.length > 0;
    
    if (isListingReport) {
      const listing = existingListings[i % existingListings.length];
      reports.push({
        userId: reporters[i % reporters.length]?._id ?? seededUsers[0]._id,
        listingId: listing._id,
        facilityId: listing.facilityId,
        description: `[${SEED_TAG}] Listing Report #${i} - Detailed description of the issue with the property.`,
        flags: ['Misleading Photos', 'Maintenance Issues'],
        evidence: [],
        status: 'pending',
        __t: 'ListingReport',
      });
    } else {
      reports.push({
        userId: reporters[i % reporters.length]?._id ?? seededUsers[0]._id,
        userReported: reportees[i % reportees.length]?._id ?? seededUsers[1]._id,
        description: `[${SEED_TAG}] User Report #${i} - Detailed description of the behavioral or financial issue.`,
        flags: ['Late Payment', 'Unresponsive'],
        evidence: [],
        status: 'pending',
        __t: 'UserReport',
      });
    }
  }

  const created = await Report.insertMany(reports);
  console.log(`Seeded ${created.length} reports.`);
};

// ---------------------------------------------------------------------------
// 3. Seed ~30 Facilities with status 'submitted' (for Listings Review)
// ---------------------------------------------------------------------------
const seedSubmittedFacilities = async () => {
  await HousingFacility.deleteMany({ description: { $regex: SEED_TAG } });

  let landlord = await Landlord.findOne();
  if (!landlord) {
    landlord = await Landlord.create({
      firstName: 'Seed',
      lastName: 'Landlord',
      emails: ['seed.landlord@example.com'],
      auth: { google: ['google-seed-landlord'] },
      status: 'verified',
      verificationStatus: 'approved',
      userType: 'Landlord',
    });
  }

  const facilities: any[] = [];
  for (let i = 1; i <= 30; i++) {
    facilities.push({
      name: `Test Facility ${i}`,
      landlordId: landlord._id,
      managers: [{ userId: landlord._id, permissions: { manageListings: true, manageApplications: true, manageBillings: true, manageBookings: true, deleteListings: false, reportUsers: false } }],
      location: { text: `Street ${i}, Los Baños, Laguna` },
      type: i % 2 === 0 ? 'off-campus' : 'partner housing',
      status: 'submitted',
      capacity: 10 + i,
      description: `[${SEED_TAG}] Facility description for test property ${i}. Great amenities and location.`,
      media: [{ sourceType: 'external', value: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80' }],
      documents: [
        { docId: 'business-permit', name: 'Business Permit', status: 'pending', files: [`file-fac-permit-${i}`] },
        { docId: 'fire-safety', name: 'Fire Safety Certificate', status: 'pending', files: [`file-fac-fire-${i}`] },
      ],
    });
  }

  const created = await HousingFacility.insertMany(facilities);
  console.log(`Seeded ${created.length} submitted facilities.`);
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const main = async () => {
  await connect();
  console.log('\n--- Seeding Verification Applicants ---');
  const seededUsers = await seedVerificationApplicants();
  console.log('\n--- Seeding Reports ---');
  await seedReports(seededUsers);
  console.log('\n--- Seeding Submitted Facilities ---');
  await seedSubmittedFacilities();
  console.log('\n✅ Admin seed data complete.');
};

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
