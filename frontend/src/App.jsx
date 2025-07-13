// Import React and required hooks
import React, { useContext } from 'react';
// Import router components for navigation and route management
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import authentication context to manage user sessions
import { AuthProvider, AuthContext } from './context/AuthContext';

// Import page components
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

// App is the main component wrapping the entire frontend in AuthProvider and Router
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

// AppRoutes handles conditional routing based on authentication state
const AppRoutes = () => {
  // Retrieve auth state and loading status from AuthContext
  const { authData, loading } = useContext(AuthContext);

  // Show a temporary loading UI while checking auth status
  if (loading) {
    return <div className="text-center p-8">Loading...</div>; // Optional: replace with spinner
  }

  // Determine if user is authenticated
  const isAuthenticated = !!authData?.user;

  return (
    <Routes>
      {/* Public Routes: Login/Register/Activation */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />}
      />
      <Route path="/activate/:token" element={<ActivateAccount />} />

      {/* Protected Routes: Require authentication */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/templates"
        element={isAuthenticated ? <TemplatesPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/resume/input/:templateId"
        element={isAuthenticated ? <ResumeCreationPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/resumes/:id"
        element={isAuthenticated ? <ResumeEditorPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/preview/:id"
        element={isAuthenticated ? <ResumePreviewPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/ai-preview/:id"
        element={isAuthenticated ? <AIReviewPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/templates/edit/:id"
        element={isAuthenticated ? <TemplateEditPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/templates/new"
        element={isAuthenticated ? <CreateTemplatePage /> : <Navigate to="/login" />}
      />

      {/* Default Route: Redirect to dashboard or login */}
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />

      {/* Catch-all Route: Redirect to root */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
