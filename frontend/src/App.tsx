import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PageLayout from './pages/utilities/PageLayout';
import UserLanding from './pages/UserLanding';
import ErrorPage from './pages/general/ErrorPage';

import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import landlordRoutes from './routes/landlordRoutes';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

// ... your other imports

function AnimatedRoutes() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<UserLanding />} />

        <Route element={<PageLayout />}>
          {userRoutes}
          {adminRoutes}
          {landlordRoutes}
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (!isInitialized) return 'loading';

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
