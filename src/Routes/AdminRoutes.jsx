import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLaoding] = useAdmin();
  const location = useLocation();
  const isAdminAdmin = isAdmin.admin;

  if (loading || isAdminLaoding) {
    return <div className=" loading loading-dots loading-lg"></div>;
  }
  if (user && isAdminAdmin) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default AdminRoutes;
