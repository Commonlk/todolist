import React from "react";
import { Button } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";

const User = () => {
  const { setAuthenticated, setToken } = useAuthContext();

  const logout = () => {
    setAuthenticated(false);
    setToken(null);
  };

  return (
    <div>
      <Button onClick={logout}>LOGOUT</Button>
    </div>
  );
};

export default User;
