import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/user/ContactUs";
import PageLayout from "./pages/utilities/PageLayout";
import TestPage from "./pages/utilities/TestPage";
import BookmarksNewUsers from "./pages/user/BookmarksNewUsers";
import UserLanding from "./pages/user/UserLanding";
import LandingMap from "./components/LandingMap";
import UnitDetails from "./pages/user/UnitDetails";
import PropertyTabs from "./components/unitdetails/PropertyTabs";

import Login from "./pages/utilities/Login";
import Upload from "./pages/utilities/Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLanding />} />
        <Route path="/map" element={<LandingMap />} />
        <Route path="/test-tab" element={<PropertyTabs />} />

        <Route element={<PageLayout />}>

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />
          <Route path="/unit" element={<UnitDetails />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
