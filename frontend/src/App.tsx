import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

const getSignedInDestination = (user: ReturnType<typeof useAuthStore.getState>['user']) => {
  if (!user) return '/';
  if (user.status === 'setup') return '/registration';
  if (user.userType === 'Landlord' || user.userType === 'Manager') return '/landlord-homepage';
  if (user.userType === 'Admin') return '/admin/applications';
  return '/home';
};

function LandingRoute() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to={getSignedInDestination(user)} replace />;
  }

  return <UserLanding />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingRoute />} />

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
