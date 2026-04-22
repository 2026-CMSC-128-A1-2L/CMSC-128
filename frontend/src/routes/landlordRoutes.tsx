import LandlordHomepage from "../pages/LandlordHomepage";
import LandlordProfile from "../pages/landlord/profile/LandlordProfile";
import LandlordProfileVerification from "../pages/landlord/profile/LandlordProfileVerification";
import LandlordDashboard from "../pages/landlord/LandlordDashboard";
import LandlordMessages from "../pages/landlord/LandlordMessages";
import LandlordProperties from "../pages/landlord/LandlordProperties";
import LandlordManagers from "../pages/landlord/LandlordManagers";
import LandlordTenants from "../pages/landlord/LandlordTenants";
import LandlordVisits from "../pages/landlord/LandlordVisits";
import LandlordFinance from "../pages/landlord/LandlordFinance";
import LandlordSettings from "../pages/landlord/LandlordSettings";
import LandlordNewListing from "../pages/landlord/LandlordNewListing";
import { Route } from "react-router-dom";

const landlordRoutes = [
  <Route
    key="landlord-home"
    path="/landlord-homepage"
    element={<LandlordHomepage />}
  />,
  <Route
    key="landlord-profile"
    path="/landlord/profile"
    element={<LandlordProfile />}
  />,
  <Route
    key="landlord-profile-verification"
    path="/landlord/profile/verification"
    element={<LandlordProfileVerification />}
  />,
  <Route
    key="landlord-dashboard"
    path="/landlord/dashboard"
    element={<LandlordDashboard />}
  />,
  <Route
    key="landlord-messages"
    path="/landlord/messages"
    element={<LandlordMessages />}
  />,
  <Route
    key="landlord-properties"
    path="/landlord/properties"
    element={<LandlordProperties />}
  />,
  <Route
    key="landlord-properties-new"
    path="/landlord/properties/new"
    element={<LandlordNewListing />}
  />,
  <Route
    key="landlord-managers"
    path="/landlord/managers"
    element={<LandlordManagers />}
  />,
  <Route
    key="landlord-tenants"
    path="/landlord/tenants"
    element={<LandlordTenants />}
  />,
  <Route
    key="landlord-visits"
    path="/landlord/visits"
    element={<LandlordVisits />}
  />,
  <Route
    key="landlord-finance"
    path="/landlord/finance"
    element={<LandlordFinance />}
  />,
  <Route
    key="landlord-settings"
    path="/landlord/settings"
    element={<LandlordSettings />}
  />,
];

export default landlordRoutes;
