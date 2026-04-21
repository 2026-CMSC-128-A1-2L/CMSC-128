import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< landlord
import ContactUs from './pages/user/ContactUs';
import PageLayout from './pages/utilities/PageLayout';
import TestPage from './pages/utilities/TestPage';
import BookmarksNewUsers from './pages/user/BookmarksNewUsers';
import UserLanding from './pages/user/UserLanding';
import UnitDetails from './pages/user/UnitDetails';
import SettingsNotifications from './pages/user/SettingsNotifications';
import CurrentDorm from './pages/CurrentDorm';
import ContractInformation from './pages/ContractInformation';
import HomePage from './pages/user/HomePage';
import RateAndReview from './pages/RateAndReview';
import RateAndReviewForm from './pages/RateAndReviewWithForms';
import RateAndReviewUpload from './pages/RateAndReviewWithUploads';
import Login from './pages/utilities/Login';
import DmsSidebar from './components/DmsSidebar';
import Upload from './pages/utilities/Upload';
import DmsLanding from './pages/user/DmsLanding';
import Analytics from './pages/admin/analytics';
import Reports from './pages/admin/reports';
import Announcement from './pages/admin/announcement';
import Applications from './pages/admin/applications';
import Listings from './pages/admin/listings';
import Messages from './pages/admin/messages';
import LandlordProfile from './pages/landlord/profile/LandlordProfile';
import LandlordProfileVerification from './pages/landlord/profile/LandlordProfileVerification';
import LandlordDashboard from './pages/landlord/LandlordDashboard';
import LandlordMessages from './pages/landlord/LandlordMessages';
import LandlordProperties from './pages/landlord/LandlordProperties';
import LandlordManagers from './pages/landlord/LandlordManagers';
import LandlordTenants from './pages/landlord/LandlordTenants';
import LandlordVisits from './pages/landlord/LandlordVisits';
import LandlordFinance from './pages/landlord/LandlordFinance';
import LandlordSettings from './pages/landlord/LandlordSettings';
import LandlordNewListing from './pages/landlord/LandlordNewListing';
=======
import PageLayout from './pages/utilities/PageLayout';
import UserLanding from './pages/user/UserLanding';

import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import landlordRoutes from './routes/landlordRoutes';
>>>>>>> develop

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< landlord
        <Route path="/" element={<UserLanding />} />
        <Route path="/landlord/profile" element={<LandlordProfile />} />
        <Route path="/landlord/profile/verification" element={<LandlordProfileVerification />} />
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/landlord/messages" element={<LandlordMessages />} />
        <Route path="/landlord/properties" element={<LandlordProperties />} />
        <Route path="/landlord/properties/new" element={<LandlordNewListing />} />
        <Route path="/landlord/managers" element={<LandlordManagers />} />
        <Route path="/landlord/tenants" element={<LandlordTenants />} />
        <Route path="/landlord/visits" element={<LandlordVisits />} />
        <Route path="/landlord/finance" element={<LandlordFinance />} />
        <Route path="/landlord/settings" element={<LandlordSettings />} />
        <Route element={<PageLayout />}>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dmssidebar" element={<DmsSidebar />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/announce" element={<Announcement />} />
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/listings" element={<Listings />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/unit" element={<UnitDetails />} />
          <Route path="/settings-notifications" element={<SettingsNotifications />} />
          <Route path="/dms-landing" element={<DmsLanding />} />
          <Route path="/current-dorm" element={<CurrentDorm />} />
          <Route path="/contract-information" element={<ContractInformation />} />
          <Route path="/ratereview" element={<RateAndReview />} />
          <Route path="/ratereviewform" element={<RateAndReviewForm />} />
          <Route path="/ratereviewupload" element={<RateAndReviewUpload />} />
=======
        {/* under page layout??? */}
        <Route path="/"               element={<UserLanding />} />
        <Route path="/landing"        element={<UserLanding />} />

        <Route element={<PageLayout />}>
          {userRoutes}
          {adminRoutes}
          {landlordRoutes}
>>>>>>> develop
        </Route>
      </Routes>
    </Router>
  );
}

export default App;