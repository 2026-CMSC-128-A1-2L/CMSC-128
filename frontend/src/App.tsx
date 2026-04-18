import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactUs from './pages/ContactUs';
import PageLayout from './pages/PageLayout';
import TestPage from './pages/TestPage';
import BookmarksNewUsers from './pages/BookmarksNewUsers';

import Login from './pages/Login';
import Upload from './pages/Upload';
import Analytics from './pages/admin/analytics';
import Reports from './pages/admin/reports';
import Announcement from './pages/admin/announcement';
import Applications from './pages/admin/applications';
import Listings from './pages/admin/listings';
import Messages from './pages/admin/messages';

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />

          {/* Admin Routes */}
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/announce" element={<Announcement />} />
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/listings" element={<Listings />} />
          <Route path="/admin/messages" element={<Messages />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
