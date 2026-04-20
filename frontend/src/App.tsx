import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactUs from './pages/ContactUs';
import PageLayout from './pages/PageLayout';
import TestPage from './pages/TestPage';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactUs />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
      </Routes>
    </Router>
  );
}

export default App;
