import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageLayout from './pages/utilities/PageLayout';
import UserLanding from './pages/UserLanding';

import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import landlordRoutes from './routes/landlordRoutes';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (!isInitialized) {
    return 'loading';
  } else {
    console.log(user);
  }

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
