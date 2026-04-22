import BookmarksNewUsers from '../pages/user/BookmarksNewUsers';
import UserLanding from '../pages/user/UserLanding';
import UnitDetails from '../pages/user/UnitDetails';
import DmsLanding from '../pages/user/DmsLanding';
import SettingsNotifications from '../pages/user/SettingsNotifications';
import SettingsGen from '../pages/user/SettingsGen';
import SettingsSecurity from '../pages/user/SettingsSecurity';
import SettingsPreferences from '../pages/user/SettingsPreferences';
import HomePage from '../pages/user/HomePage';
import Finance from '../pages/user/Finance';
import ContactUs from '../pages/user/ContactUs';
import CurrentDorm from '../pages/user/ProfileSwitcher/CurrentDorm';
import ContractInformation from '../pages/user/ProfileSwitcher/ContractInformation';
import RateAndReview from '../pages/user/ProfileSwitcher/RateAndReview';
import RateAndReviewForm from '../pages/user/ProfileSwitcher/RateAndReviewWithForms';
import RateAndReviewUpload from '../pages/user/ProfileSwitcher/RateAndReviewWithUploads';
import TermsOfUse from '../pages/TermsOfUse';
import MyCalendar from '../pages/MyCalendar';
import ProfileSwitcher from '../pages/user/ProfileSwitcher/ProfileSwitcher';
import UserVerif from '../pages/user/ProfileSwitcher/UserVerif';
import { Route } from 'react-router-dom';

const userRoutes = [
  <Route key="home" path="/home" element={<HomePage />} />,
  <Route key="contact" path="/contact-us" element={<ContactUs />} />,
  <Route key="bookmark" path="/bookmark" element={<BookmarksNewUsers />} />,
  <Route key="unit" path="/unit" element={<UnitDetails />} />,
  // <Route key="settings" path="/settings" element={<Settings />} />,
  // <Route key="settings" path="/settings">
  //   <Route key="general" path="/settings/general" element={<SettingsGen />} />
  //   <Route key="security" path="/settings/security" element={<SettingsSecurity />} />
  //   <Route key="preferences" path="/settings/preferences" element={<SettingsPreferences />} />
  //   <Route key="notifs" path="/settings/notifications" element={<SettingsNotifications />} />
  // </Route>,
  <Route key="dms-landing" path="/direct-messages" element={<DmsLanding />} />,
  <Route key="current-dorm" path="/current-dorm" element={<CurrentDorm />} />,
  <Route key="contract" path="/contract-information" element={<ContractInformation />} />,
  <Route key="ratereview" path="/rate-review" element={<RateAndReview />} />,
  <Route key="ratereviewform" path="/rate-review-form" element={<RateAndReviewForm />} />,
  <Route key="ratereviewupload" path="/rate-review-upload" element={<RateAndReviewUpload />} />,
  <Route key="terms" path="/terms-of-use" element={<TermsOfUse />} />,
  <Route key="finance" path="/finance" element={<Finance />} />,
  <Route key="mycalendar" path="/my-calendar" element={<MyCalendar />} />,
  <Route key="profile-switcher" path="/profile-switcher" element={<ProfileSwitcher />} />,
  <Route key="verification" path="/verification" element={<UserVerif />} />

];

export default userRoutes;
