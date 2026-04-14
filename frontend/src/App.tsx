import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PageLayout from "./pages/PageLayout";
import TestPage from "./pages/TestPage";

function App() {

  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </PageLayout>
    </Router>

  );
}

export default App;
