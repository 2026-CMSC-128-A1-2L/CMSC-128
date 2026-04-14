import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PageLayout from "./pages/PageLayout";
import TestPage from "./pages/TestPage";

import Login from './pages/Login';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
