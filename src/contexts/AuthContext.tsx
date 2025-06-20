import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType, User, LoginCredentials } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const savedToken = localStorage.getItem("jwt_token");
  const savedUser = localStorage.getItem("user_data");
  useEffect(() => {
    if (savedToken) {
      setToken(savedToken);
      setUser({ name: savedUser });
    }
  }, [savedToken]);

  const login = (token: string, user: string) => {
    setToken(token);
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_data", user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
