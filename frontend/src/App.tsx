import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PageLayout from "./pages/PageLayout";
import TestPage from "./pages/TestPage";
import PendingApplicationPage1b from "./pages/PendingApplicationPage1b";

function App() {

  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/pendingapplication1b" element={<PendingApplicationPage1b />} />
        </Routes>
      </PageLayout>
    </Router>

  );
}

export default App;
