import LandlordHomepage from "../pages/landlord/dashboard/LandlordHomepage";
import LandlordProfile from "../pages/landlord/profile/LandlordProfile";
import LandlordProfileVerification from "../pages/landlord/profile/verification/LandlordProfileVerification";
import LandlordVerif from "../pages/landlord/profile/verification/LandlordVerif";
import LandlordDashboard from "../pages/landlord/dashboard/LandlordDashboard";
import LandlordMessages from "../pages/landlord/messages/LandlordMessages";
import LandlordProperties from "../pages/landlord/properties/LandlordProperties";
import LandlordManagers from "../pages/landlord/managers/LandlordManagers";
import LandlordTenants from "../pages/landlord/tenants/LandlordTenants";
import LandlordVisits from "../pages/landlord/visits/LandlordVisits";
import LandlordFinance from "../pages/landlord/finance/LandlordFinance";
import LandlordSettings from "../pages/landlord/settings/LandlordSettings";
import LandlordNewListing from "../pages/landlord/properties/LandlordNewListing";
import AddBuilding from "../pages/landlord/properties/AddBuilding";
import BuildingInfo from "../pages/landlord/properties/BuildingInfo";
import LandlordTenantDetail from "../pages/landlord/tenants/LandlordTenantDetail";
import LandlordUnvalidatedApplications from "../pages/landlord/tenants/LandlordUnvalidatedApplications";
import LandlordUnvalidatedTenantDetail from "../pages/landlord/tenants/LandlordUnvalidatedTenantDetail";

import { Route } from "react-router-dom";
import LandlordPropertyFinance from "../pages/landlord/finance/LandlordPropertyFinance";

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
    element={<LandlordVerif />} //modified from <LandlordProfileVerification />
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
    key="landlord-properties-building-info"
    path="/landlord/properties/building-info"
    element={<BuildingInfo />}
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
    key="landlord-property-finance"
    path="/landlord/finance/property/:propertyId"
    element={<LandlordPropertyFinance />}
  />,
  <Route
    key="landlord-settings"
    path="/landlord/settings"
    element={<LandlordSettings />}
  />,

  <Route
    key="landlord-add-building"
    path="/landlord/add-building"
    element={<AddBuilding />}
  />,


  <Route
    key="landlord-tenants-unvalidated"
    path="/landlord/tenants/unvalidated"
    element={<LandlordUnvalidatedApplications />}
  />,
  <Route
    key="landlord-tenants-unvalidated-tenantId"
    path="/landlord/tenants/unvalidated/:tenantId"
    element={<LandlordUnvalidatedTenantDetail />}
  />,
  <Route
    key="landlord-tenants-detail"
    path="/landlord/tenants/:tenantId"
    element={<LandlordTenantDetail />}
  />,
];

export default landlordRoutes;
