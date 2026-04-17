import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PageLayout from "./pages/PageLayout";
import TestPage from "./pages/TestPage";
import RateAndReview from "./pages/RateAndReview";
import RateAndReviewForm from "./pages/RateAndReviewWithForms";

function App() {

  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/ratereview" element={<RateAndReview />} />
          <Route path="/ratereviewform" element={<RateAndReviewForm />} />
        </Routes>
      </PageLayout>
    </Router>

  );
}

export default App;
