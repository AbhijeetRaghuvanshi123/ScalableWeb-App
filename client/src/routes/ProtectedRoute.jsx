import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
     return <div className="h-screen flex items-center justify-center"><Loader className="w-8 h-8 text-blue-600" /></div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
