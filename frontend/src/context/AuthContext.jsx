import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login: save user + tokens
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.access) {
      localStorage.setItem("token", userData.access);
    }
  };

  // Logout: clear everything
  const logout = () => {

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("logged out")
    navigate("/", { replace: true });

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
