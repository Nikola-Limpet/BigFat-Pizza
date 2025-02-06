import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, token } = useSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;