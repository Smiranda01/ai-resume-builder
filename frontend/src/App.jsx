// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';  
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppRoutes = () => {
    const { authData } = React.useContext(AuthContext);
  
    return (
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={authData?.user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/templates" element={authData?.user ? <Templates /> : <Navigate to="/login" replace />} />
      
        {/* Default Redirects */}
        <Route path="/" element={<Navigate to={authData?.user ? "/dashboard" : "/login"} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  };
  

export default App;
