import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create the authentication context
export const AuthContext = createContext();

// AuthProvider supplies authentication state and functions to the entire app
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // Stores user and token
  const [loading, setLoading] = useState(true);   // Indicates if auth is initializing

  // On initial load, check if authData exists in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  // Sync changes to authData with localStorage
  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  // Logs in the user and stores token and user data
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = res.data.token;
      const user = res.data.user;

      const authPayload = { token, user };
      setAuthData(authPayload);
      localStorage.setItem('authData', JSON.stringify(authPayload));

      console.log("Logged in successfully:", authPayload);
      return true;
    } catch (err) {
      const backendMessage = err.response?.data?.message || 'Login failed';
      console.error('Login failed:', backendMessage);
      throw new Error(backendMessage);
    }
  };


  // Logs out the user by clearing stored token and state
  const logout = () => {
    localStorage.removeItem('token');
    setAuthData(null);
  };

  // Provide auth-related values and functions to children
  return (
    <AuthContext.Provider value={{ authData, setAuthData, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
