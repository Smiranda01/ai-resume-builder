// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    // On page load, try to restore auth data from localStorage
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Whenever authData changes, store it in localStorage
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
