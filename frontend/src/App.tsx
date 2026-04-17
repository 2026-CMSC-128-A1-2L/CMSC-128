import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/user/ContactUs";
import PageLayout from "./pages/utilities/PageLayout";
import TestPage from "./pages/utilities/TestPage";
import BookmarksNewUsers from "./pages/user/BookmarksNewUsers";
import UserLanding from "./pages/user/UserLanding";
import LandingMap from "./components/LandingMap";

import Login from "./pages/utilities/Login";
import Upload from "./pages/utilities/Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<UserLanding />} />
        <Route path="/map" element={<LandingMap />} />

        <Route element={<PageLayout />}>
          <Route path="/" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
