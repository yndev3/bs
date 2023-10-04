import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem("isAuthenticated", value.toString());
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, setAuth, isLoading, setIsLoading }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
