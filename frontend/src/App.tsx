import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageLayout from './pages/utilities/PageLayout';
import UserLanding from './pages/user/UserLanding';

import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import landlordRoutes from './routes/landlordRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* under page layout??? */}
        <Route path="/" element={<UserLanding />} />

        <Route element={<PageLayout />}>
          {userRoutes}
          {adminRoutes}
          {landlordRoutes}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
