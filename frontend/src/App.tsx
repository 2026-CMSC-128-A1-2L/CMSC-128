import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

import PageLayout from './pages/utilities/PageLayout';
import UserLanding from './pages/user/UserLanding';

import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import landlordRoutes from './routes/landlordRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* under page layout??? */}
        <Route path="/" element={<UserLanding />} />
        <Route path="/landing" element={<UserLanding />} />

        <Route element={<PageLayout />}>
          {userRoutes}
          {adminRoutes}
          {landlordRoutes}

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
