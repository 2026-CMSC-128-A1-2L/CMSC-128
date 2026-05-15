import '../config.js';
import mongoose from 'mongoose';
import { User } from '../features/user/user.model.js';
import { Report } from '../features/report/report.model.js';
import { HousingFacility } from '../features/facility/facility.model.js';

async function main() {
  await mongoose.connect(process.env.MONGO_URL!);

  const applicants = await User.find({ verificationStatus: 'submitted' }).select(
    'firstName lastName userType verificationStatus documents',
  );
  console.log('=== VERIFICATION APPLICANTS (Applications page) ===');
  for (const a of applicants) {
    console.log(
      `  ${a.firstName} ${a.lastName} (${a.userType}) - ${a.verificationStatus} - ${a.documents.length} doc(s)`,
    );
  }

  const reports = await Report.find().select('description status userId');
  console.log(`\n=== REPORTS (Reports page) === [${reports.length} total]`);
  for (const r of reports) {
    const typeLabel = (r as any).__t ?? 'Report';
    console.log(`  [${typeLabel}] ${r.status} - ${r.description.substring(0, 80)}...`);
  }

  const facilities = await HousingFacility.find({ status: 'submitted' }).select('name status');
  console.log(`\n=== SUBMITTED FACILITIES (Listings page) === [${facilities.length} total]`);
  for (const f of facilities) {
    console.log(`  ${f.name} - ${f.status}`);
  }

  await mongoose.disconnect();
}

main();
