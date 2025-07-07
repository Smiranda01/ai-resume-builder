import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      setAuthData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  const login = async ({ email, password }) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const token = res.data.token;

    // Decode the token
    const decoded = jwtDecode(token);
    const user = {
      id: decoded.id,
      role: decoded.role,
      email: email
    };

    const authPayload = { token, user };

    setAuthData(authPayload);
    localStorage.setItem('authData', JSON.stringify(authPayload));

    console.log("✅ Logged in successfully:", authPayload); // for debugging
    return true;
  } catch (err) {
    console.error('❌ Login failed:', err);
    return false;
  }
  };

  const logout = () => {
  localStorage.removeItem('token');
  setAuthData(null);
};


  return (
  <AuthContext.Provider value={{ authData, setAuthData, logout, login, loading }}>
    {children}
  </AuthContext.Provider>
);
};

