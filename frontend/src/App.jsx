import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivateAccount from './pages/ActivateAccount';
import DashboardPage from './pages/DashboardPage';
import TemplatesPage from './pages/TemplatesPage';
import ResumeCreationPage from './pages/ResumeCreationPage';
import ResumeEditorPage from './pages/ResumeEditorPage';
import ResumePreviewPage from './pages/ResumePreviewPage';
import AIReviewPage from './pages/AIReviewPage';
import TemplateEditPage from './pages/TemplateEditPage';
import CreateTemplatePage from './pages/CreateTemplatePage';

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
  const { authData, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>; // Optional: add spinner or splash screen
  }

  const isAuthenticated = !!authData?.user;

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/activate/:token" element={<ActivateAccount />} />

      <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/templates" element={isAuthenticated ? <TemplatesPage /> : <Navigate to="/login" />} />
      <Route path="/resume/input/:templateId" element={isAuthenticated ? <ResumeCreationPage /> : <Navigate to="/login" />} />
      <Route path="/resumes/:id" element={isAuthenticated ? <ResumeEditorPage /> : <Navigate to="/login" />} />
      <Route path="/preview/:id" element={isAuthenticated ? <ResumePreviewPage /> : <Navigate to="/login" />} />
      <Route path="/ai-preview/:id" element={isAuthenticated ? <AIReviewPage /> : <Navigate to="/login" />} />
      <Route path="/templates/edit/:id" element={isAuthenticated ? <TemplateEditPage /> : <Navigate to="/login" />} />
      <Route path="/templates/new" element={isAuthenticated ? <CreateTemplatePage /> : <Navigate to="/login" />} />


      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
