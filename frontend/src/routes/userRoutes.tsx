import BookmarksNewUsers from '../pages/user/bookmarks/BookmarksNewUsers';
import UnitDetails from '../pages/user/home/UnitDetails';
import DmsLanding from '../pages/user/messages/DmsLanding';
import Filter from '../components/user/Filter/FilterTab';
import HomePage from '../pages/user/home/HomePage';
import Finance from '../pages/user/finance/Finance';
import ContactUs from '../pages/user/info/ContactUs';
import CurrentDorm from '../pages/user/profile/current_dorm/CurrentDorm';
import ContractInformation from '../pages/user/profile/current_dorm/ContractInformation';
import RateAndReview from '../pages/user/profile/current_dorm/RateAndReview';
import RateAndReviewForm from '../pages/user/profile/current_dorm/RateAndReviewWithForms';
import RateAndReviewUpload from '../pages/user/profile/current_dorm/RateAndReviewWithUploads';
import TermsOfUse from '../pages/user/info/TermsOfUse';
import MyCalendar from '../pages/user/calendar/MyCalendar';
import ProfileSwitcher from '../pages/user/profile/ProfileSwitcher';
import Report from '../pages/user/profile/current_dorm/Report';
import LeaseTransfer from '../pages/user/profile/current_dorm/LeaseTransfer';
import FinalizedApplicationPage1a from '../pages/user/profile/current_dorm/FinalizedApplicationPage1a';
import { Route } from 'react-router-dom';

import Settings from '../pages/user/setting/Settings';
import TestPage from '../pages/utilities/TestPage';
import Registration from '../pages/Registration';
// import { StudentRoute } from './ProtectedRoute';
/* <Route key="student-route" element={<StudentRoute />}> */
/*   <Route key="home" path="/home" element={<HomePage />} /> */
/* </Route>, */

const userRoutes = [
  <Route key="home" path="/home" element={<HomePage />} />,
  <Route key="test" path="/test" element={<TestPage />} />,
  <Route key="filter" path="/filter" element={<Filter />} />,
  <Route key="contact" path="/contact-us" element={<ContactUs />} />,
  <Route key="bookmark" path="/bookmark" element={<BookmarksNewUsers />} />,
  <Route key="unit" path="/unit" element={<UnitDetails />} />,
  <Route key="dms-landing" path="/direct-messages" element={<DmsLanding />} />,
  <Route key="current-dorm" path="/current-dorm" element={<CurrentDorm />} />,
  <Route key="contract" path="/contract-information" element={<ContractInformation />} />,
  <Route key="ratereview" path="/rate-review" element={<RateAndReview />} />,
  <Route key="report" path="/report-dorm" element={<Report />} />,
  <Route key="leasetransfer" path="/lease-transfer" element={<LeaseTransfer />} />,
  <Route key="ratereviewform" path="/rate-review-form" element={<RateAndReviewForm />} />,
  <Route key="ratereviewupload" path="/rate-review-upload" element={<RateAndReviewUpload />} />,
  <Route key="terms" path="/terms-of-use" element={<TermsOfUse />} />,
  <Route key="finance" path="/finance" element={<Finance />} />,
  <Route key="mycalendar" path="/my-calendar" element={<MyCalendar />} />,
  <Route key="profile-switcher" path="/profile-switcher" element={<ProfileSwitcher />} />,
  <Route key="settings" path="/settings" element={<Settings />} />,
  <Route key="pendingapplication" path="/finappli" element={<FinalizedApplicationPage1a />} />,

  <Route key="registration" path="/registration" element={<Registration />} />,
];

export default userRoutes;
