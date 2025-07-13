// src/pages/RegisterPage.jsx

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { AuthContext } from '../context/AuthContext';
import { register } from '../api/auth';

const RegisterPage = () => {
  // Access auth data in case redirection or pre-login logic is needed later
  const { authData } = useContext(AuthContext);

  // React Router hook to redirect after registration
  const navigate = useNavigate();

  // State for error and info messages
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  // Handle submission of registration form
  const handleRegister = async ({ name, email, password }) => {
    try {
      // Attempt to register user via API
      const response = await register(name, email, password);

      // Show success message if no error thrown
      setInfo(response.message || 'Registration successful!');
      setError('');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      // Show error message if registration failed
      setInfo('');
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>

        {/* Show error or success messages */}
        {error && <p className="text-center text-sm text-red-600 mt-2">{error}</p>}
        {info && <p className="text-center text-sm text-green-600 mt-2">{info}</p>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {/* Pass registration handler to the form */}
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
