import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "./Loading";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  return loading ? (
    <div className="flex justify-center items-center h-[75vh] w-full">
      <Spinner />
    </div>
  ) : (
    <>
      {user?._id ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
