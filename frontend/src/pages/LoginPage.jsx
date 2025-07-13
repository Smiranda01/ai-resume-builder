// src/pages/LoginPage.jsx

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  // Get the login function from AuthContext
  const { login } = useContext(AuthContext);

  // Local state to track login errors
  const [error, setError] = useState('');

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle form submission from LoginForm component
  const handleLogin = async (credentials) => {
    const success = await login(credentials);

    // If login is successful, redirect to dashboard
    if (success) {
      navigate('/dashboard');
    } else {
      // Show error message if login fails
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            create an account
          </a>
        </p>
      </div>

      {/* Login form container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {/* Pass handleLogin as the submit handler */}
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
