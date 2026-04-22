import LandlordHomepage from '../pages/LandlordHomepage';
import { Route } from 'react-router-dom';

const landlordRoutes = [
  <Route key="landlord-home" path="/landlord-homepage" element={<LandlordHomepage />} />,
];

export default landlordRoutes;
