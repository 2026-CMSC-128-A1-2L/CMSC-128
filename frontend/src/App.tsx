import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactUs from './pages/user/ContactUs';
import PageLayout from './pages/utilities/PageLayout';
import TestPage from './pages/utilities/TestPage';
import BookmarksNewUsers from './pages/user/BookmarksNewUsers';
import UserLanding from './pages/user/UserLanding';
import SettingsNotifications from './pages/user/SettingsNotifications';
import LandingMap from './components/LandingMap';
import HomePage from './pages/user/HomePage';
import Finance from './pages/user/Finance';

import Login from './pages/utilities/Login';
import DormCard from './components/DormCard';
import Upload from './pages/utilities/Upload';
import DmsLanding from './pages/user/DmsLanding';
import SubmitReceipt from './components/SubmitReceipt';
import PaymentMethods from './components/PaymentMethods';
import FinancePopup from './components/FinancePopup';

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

        <Route element={<PageLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />
          <Route path="/settings-notifications" element={<SettingsNotifications />} />
          <Route path="/dms-landing" element={<DmsLanding />} />
          <Route path="/finance" element={<Finance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
