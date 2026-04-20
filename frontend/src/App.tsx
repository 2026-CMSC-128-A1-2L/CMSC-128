import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactUs from './pages/user/ContactUs';
import PageLayout from './pages/utilities/PageLayout';
import TestPage from './pages/utilities/TestPage';
import BookmarksNewUsers from './pages/user/BookmarksNewUsers';
import UserLanding from './pages/user/UserLanding';
import SettingsNotifications from './pages/user/SettingsNotifications';
import LandingMap from './components/LandingMap';
import HomePage from './pages/user/HomePage';

import Login from './pages/utilities/Login';
import DmsSidebar from './components/DmsSidebar';
import Upload from './pages/utilities/Upload';
import DmsLanding from './pages/user/DmsLanding';
import Banner from './components/Banner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<UserLanding />} />
        <Route path="/map" element={<LandingMap />} />
        <Route path="/dmssidebar" element={<DmsSidebar />} />
        <Route path="/banner" element={<Banner />} />

        <Route element={<PageLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />
          <Route path="/settings-notifications" element={<SettingsNotifications />} />
          <Route path="/dms-landing" element={<DmsLanding />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
