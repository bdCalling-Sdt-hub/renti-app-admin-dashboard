import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const user = {
    email: "",
  };

  if (user.email) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
