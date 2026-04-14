import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PageLayout from "./pages/PageLayout";
import TestPage from "./pages/TestPage";
import SettingsGen from "./pages/SettingsGen";

function App() {

  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/settings" element={<SettingsGen />}/>
        </Routes>
      </PageLayout>
    </Router>

  );
}

export default App;
