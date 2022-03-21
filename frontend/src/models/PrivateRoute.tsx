import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

interface Props {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
  const { authenticated } = useAuthContext();

  return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
