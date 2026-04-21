import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactUs from './pages/user/ContactUs';
import PageLayout from './pages/utilities/PageLayout';
import TestPage from './pages/utilities/TestPage';
import BookmarksNewUsers from './pages/user/BookmarksNewUsers';
import UserLanding from './pages/user/UserLanding';
import UnitDetails from './pages/user/UnitDetails';
import SettingsNotifications from './pages/user/SettingsNotifications';
import LandingMap from './components/LandingMap';
import CurrentDorm from './pages/CurrentDorm';
import ContractInformation from './pages/ContractInformation';
import HomePage from './pages/user/HomePage';
import RateAndReview from './pages/RateAndReview';
import RateAndReviewForm from './pages/RateAndReviewWithForms';
import RateAndReviewUpload from './pages/RateAndReviewWithUploads';
import TermsOfUse from './pages/TermsOfUse';
import Finance from './pages/user/Finance';
import MyCalendar from './pages/MyCalendar';


import Login from './pages/utilities/Login';
import Upload from './pages/utilities/Upload';
import DmsLanding from './pages/user/DmsLanding';

import SettingsPreferences from './pages/user/SettingsPreferences';
import SubmitReceipt from './components/SubmitReceipt';
import PaymentMethods from './components/PaymentMethods';
import FinancePopup from './components/FinancePopup';

// Admin Side
import Analytics from './pages/admin/analytics';
import Reports from './pages/admin/reports';
import Announcement from './pages/admin/announcement';
import Applications from './pages/admin/applications';
import Listings from './pages/admin/listings';
import Messages from './pages/admin/messages';
import DormCard from './components/DormCard';
import DmsSidebar from './components/DmsSidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<UserLanding />} />
        <Route path="/map" element={<LandingMap />} />
        <Route path="/dormcard" element={<DormCard />} />
        <Route path="/submit-receipt" element={<SubmitReceipt />} />
        <Route path="/paymentmethods" element={<PaymentMethods />} />
        <Route path="/financepopup" element={<FinancePopup children={undefined} />} />
        <Route path="/" element={<UserLanding />} />

        <Route element={<PageLayout />}>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dmssidebar" element={<DmsSidebar />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />
          <Route path="/unit" element={<UnitDetails />} />
          <Route path="/settings-notifications" element={<SettingsNotifications />} />
          <Route path="/dms-landing" element={<DmsLanding />} />
          <Route path="/current-dorm" element={<CurrentDorm />} />
          <Route path="/contract-information" element={<ContractInformation />} />
          <Route path="/ratereview" element={<RateAndReview />} />
          <Route path="/ratereviewform" element={<RateAndReviewForm />} />
          <Route path="/ratereviewupload" element={<RateAndReviewUpload />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/mycalendar" element={<MyCalendar />} />


          {/* Admin Routes */}
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/announce" element={<Announcement />} />
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/listings" element={<Listings />} />
          <Route path="/admin/messages" element={<Messages />} />
        </Route>
        <Route path="/settings/preferences" element={<SettingsPreferences />} />
      </Routes>
    </Router>
  );
}

export default App;
