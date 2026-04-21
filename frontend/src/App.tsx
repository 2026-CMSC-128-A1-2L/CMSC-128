import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import TestPage from "./pages/TestPage";
import SettingsSecurity from "./pages/SettingsSecurity";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactUs />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/settingsSecurity" element={<SettingsSecurity />} />
      </Routes>
    </Router>

  );
}

export default App;
