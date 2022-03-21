import { createContext, useContext, useEffect, useState } from "react";
import agent from "../api/agent";

interface IAuthContext {
  token: string;
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: "",
  authenticated: false,
  setAuthenticated() {},
  setToken() {},
});

const AuthProvider = (props: any) => {
  const [token, setToken] = useState<string | null>(
    window.localStorage.getItem("token")
  );
  const [authenticated, setAuthenticated] = useState(
    !!window.localStorage.getItem("user")
  );

  useEffect(() => {
    const loggedInUser = async () => {
      const user = await agent.Account.current();

      if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
        setAuthenticated(true);
      }
    };

    if (token) {
      window.localStorage.setItem("token", token);
      if (!authenticated) loggedInUser();
    } else {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, authenticated, setToken, setAuthenticated }}
      {...props}
    />
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
