import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PageLayout from './pages/utilities/PageLayout';
import UserLanding from './pages/UserLanding';
import ErrorPage from './pages/general/ErrorPage';

import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import landlordRoutes from './routes/landlordRoutes';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { SkeletonBlock } from './components/general/Skeleton';

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
  return (
    <Routes>
      <Route path="/" element={<LandingRoute />} />

      <Route element={<PageLayout />}>
        {userRoutes}
        {adminRoutes}
        {landlordRoutes}
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen flex-col gap-8 bg-white p-8 dark:bg-[#0f1010]">
        <SkeletonBlock className="h-14 w-48 rounded-2xl" />
        <div className="flex flex-1 flex-col gap-6">
          <SkeletonBlock className="h-12 w-full rounded-2xl" />
          <SkeletonBlock className="h-[260px] w-full rounded-2xl" />
          <div className="grid gap-4 md:grid-cols-3">
            <SkeletonBlock className="h-40 rounded-2xl" />
            <SkeletonBlock className="h-40 rounded-2xl" />
            <SkeletonBlock className="h-40 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
