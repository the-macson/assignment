import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!token) {
      if (location.pathname === "/login" || location.pathname === "/register")
        return;
      navigate("/login");
    }
  }, [token, navigate]);
  const [auth, setAuth] = useState(token);
  const [userRole, setUserRole] = useState(role);
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth(token);
    navigate("/");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
