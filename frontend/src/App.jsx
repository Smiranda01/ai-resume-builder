import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TemplatesPage from './pages/TemplatesPage';
import ActivateAccount from './pages/ActivateAccount';
import ResumePreviewPage from './pages/ResumePreviewPage';
import ResumeEditorPage from './pages/ResumeEditorPage';
import ResumeCreationPage from './pages/ResumeCreationPage';

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/activate/:token" element={<ActivateAccount />} />
      <Route path="/dashboard" element={authData?.user ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/templates" element={authData?.user ? <TemplatesPage /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={authData?.user ? '/dashboard' : '/login'} />} />
      <Route path="/resume/input/:templateId" element={authData?.user ? <ResumeCreationPage /> : <Navigate to="/login" />} />
      <Route path="/resumes/:id" element={authData?.user ? <ResumeEditorPage /> : <Navigate to="/login" />}/>
      <Route path="/preview/:id" element={authData?.user ? <ResumePreviewPage /> : <Navigate to="/login" />}
/>
    </Routes>
  );
};

export default App;
