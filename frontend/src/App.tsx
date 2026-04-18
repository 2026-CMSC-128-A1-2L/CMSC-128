import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PageLayout from "./pages/PageLayout";
import TestPage from "./pages/TestPage";
import BookmarksNewUsers from "./pages/BookmarksNewUsers";

import Login from './pages/Login';
import Upload from './pages/Upload';
import Analytics from "./pages/admin/analytics";

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
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
