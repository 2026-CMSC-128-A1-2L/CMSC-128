import Analytics from '../pages/admin/analytics';
import Reports from '../pages/admin/reports';
import Announcement from '../pages/admin/announcement';
import Applications from '../pages/admin/applications';
import Listings from '../pages/admin/listings';
import Messages from '../pages/admin/messages';
import { Route } from 'react-router-dom';

const adminRoutes = [
  <Route key="analytics" path="/admin/analytics" element={<Analytics />} />,
  <Route key="reports" path="/admin/reports" element={<Reports />} />,
  <Route key="announce" path="/admin/announce" element={<Announcement />} />,
  <Route key="applications" path="/admin/applications" element={<Applications />} />,
  <Route key="listings" path="/admin/listings" element={<Listings />} />,
  <Route key="messages" path="/admin/messages" element={<Messages />} />,
];

export default adminRoutes;
