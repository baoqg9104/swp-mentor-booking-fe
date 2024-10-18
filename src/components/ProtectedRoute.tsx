import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import PuffLoader from "react-spinners/PuffLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { authData, isLoading } = authContext;

  if (isLoading) {
    // You can return a loading spinner or placeholder here
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <PuffLoader color="#ff9000" size={100} />
      </div>
    );
  }

  if (!authData) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(authData.role)) {
    // Redirect to an unauthorized page or show an error message
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
