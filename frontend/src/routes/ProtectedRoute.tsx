import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { UserTypeType } from 'shared';

const UserTypeRoute = (types: UserTypeType[]) => () => {
  // biome-ignore lint/correctness/useHookAtTopLevel: inner function is the actual function
  const location = useLocation();
  // biome-ignore lint/correctness/useHookAtTopLevel: inner function is the actual function
  const store = useAuthStore();

  if (!store.user?.userType || !types.includes(store.user.userType)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const AdminRoute = UserTypeRoute(['Admin']);
export const ManagerRoute = UserTypeRoute(['Manager', 'Landlord']);
export const LandlordRoute = UserTypeRoute(['Landlord']);
export const StudentRoute = UserTypeRoute(['Student']);

export const AuthenticatedRoute = () => {
  const location = useLocation();
  const store = useAuthStore();

  if (!store.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
