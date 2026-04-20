import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/user/ContactUs";
import PageLayout from "./pages/utilities/PageLayout";
import TestPage from "./pages/utilities/TestPage";
import BookmarksNewUsers from "./pages/user/BookmarksNewUsers";
import UserLanding from "./pages/user/UserLanding";
import UnitDetails from "./pages/user/UnitDetails";
import SettingsNotifications from './pages/user/SettingsNotifications';
import HomePage from './pages/user/HomePage';
import RateAndReview from "./pages/RateAndReview";
import RateAndReviewForm from "./pages/RateAndReviewWithForms";
import RateAndReviewUpload from "./pages/RateAndReviewWithUploads";

import Login from './pages/utilities/Login';
import DmsSidebar from './components/DmsSidebar';
import Upload from './pages/utilities/Upload';
import DmsLanding from './pages/user/DmsLanding';
import Report from "./pages/user/Report";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLanding />} />

        <Route element={<PageLayout />}>

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dmssidebar" element={<DmsSidebar />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bookmark" element={<BookmarksNewUsers />} />
          <Route path="/unit" element={<UnitDetails />} />
          <Route path="/settings-notifications" element={<SettingsNotifications />} />
          <Route path="/dms-landing" element={<DmsLanding />} />
          <Route path="/ratereview" element={<RateAndReview />} />
          <Route path="/ratereviewform" element={<RateAndReviewForm />} />
          <Route path="/ratereviewupload" element={<RateAndReviewUpload />} />

          
          <Route path="/report" element={<Report />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
