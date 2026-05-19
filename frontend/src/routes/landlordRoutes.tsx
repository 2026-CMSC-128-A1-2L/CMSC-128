import LandlordHomepage from '../pages/landlord/dashboard/LandlordHomepage';
import LandlordDashboard from '../pages/landlord/dashboard/LandlordHomepage';
import LandlordMessages from '../pages/landlord/messages/LandlordMessages';
import LandlordProperties from '../pages/landlord/properties/LandlordProperties';
import LandlordManagers from '../pages/landlord/managers/LandlordManagersList';
import LandlordTenants from '../pages/landlord/tenants/LandlordTenants';
import LandlordVisits from '../pages/landlord/visits/LandlordVisits';
import LandlordFinance from '../pages/landlord/finance/LandlordFinance';
import LandlordSettings from '../pages/landlord/settings/LandlordSettings';
import LandlordNewListing from '../pages/landlord/properties/LandlordNewListing';
import AddBuilding from '../pages/landlord/properties/AddBuilding';
import BuildingInfo from '../pages/landlord/properties/BuildingInfo';
import LandlordTenantDetail from '../pages/landlord/tenants/LandlordTenantDetail';
import LandlordUnvalidatedApplications from '../pages/landlord/tenants/LandlordUnvalidatedApplications';
import LandlordUnvalidatedTenantDetail from '../pages/landlord/tenants/LandlordUnvalidatedTenantDetail';
import LandlordManagersSpecific from '../pages/landlord/managers/LandlordManagerSpecific';
import LandlordProfileSwitcher from '../pages/landlord/profile/ProfileSwitcherLandlord';

import { Route } from 'react-router-dom';
import LandlordPropertyFinance from '../pages/landlord/finance/LandlordPropertyFinance';
import EditBuilding from '../pages/landlord/properties/EditBuilding';
import BuildingStudentPreview from '../pages/landlord/properties/BuildingStudentPreview';

const landlordRoutes = [
  <Route key="landlord-home" path="/landlord-homepage" element={<LandlordHomepage />} />,
  <Route key="landlord-profile" path="/landlord/profile" element={<LandlordProfileSwitcher />} />,
  <Route
    key="landlord-profile-verification"
    path="/landlord/profile/verification"
    element={<LandlordProfileSwitcher initialTab="verification" />}
  />,
  <Route
    key="landlord-profile-switcher"
    path="/landlord/profile/switcher"
    element={<LandlordProfileSwitcher />}
  />,
  <Route key="landlord-dashboard" path="/landlord/dashboard" element={<LandlordDashboard />} />,
  <Route key="landlord-messages" path="/landlord/messages" element={<LandlordMessages />} />,
  <Route key="landlord-properties" path="/landlord/properties" element={<LandlordProperties />} />,

  <Route
    key="landlord-properties-new"
    path="/landlord/properties/new"
    element={<LandlordNewListing />}
  />,
  <Route
    key="landlord-properties-edit"
    path="/landlord/properties/edit/:propertyId"
    element={<EditBuilding />}
  />,
  <Route
    key="landlord-properties-building-info"
    path="/landlord/properties/:id"
    element={<BuildingInfo />}
  />,
  <Route
    key="landlord-properties-building-student-preview"
    path="/landlord/properties/:id/student-preview"
    element={<BuildingStudentPreview />}
  />,
  <Route key="landlord-managers" path="/landlord/managers" element={<LandlordManagers />} />,
  <Route key="landlord-tenants" path="/landlord/tenants" element={<LandlordTenants />} />,
  <Route key="landlord-visits" path="/landlord/visits" element={<LandlordVisits />} />,
  <Route
    key="landlord-property-finance"
    path="/landlord/finance/property/:propertyId"
    element={<LandlordPropertyFinance />}
  />,
  <Route key="landlord-finance" path="/landlord/finance" element={<LandlordFinance />} />,
  <Route key="landlord-settings" path="/landlord/settings" element={<LandlordSettings />} />,
  <Route key="landlord-add-building" path="/landlord/add-building" element={<AddBuilding />} />,
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
  <Route
    key="landlord-managers-detail"
    path="/landlord/managers/:id"
    element={<LandlordManagersSpecific />}
  />,
];

export default landlordRoutes;
