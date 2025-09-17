// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { resendActivationEmail } from '../api/auth'; // API call to resend activation email

// LoginForm component expects an `onSubmit` prop which handles login logic
const LoginForm = ({ onSubmit }) => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error messages and feedback
  const [error, setError] = useState('');
  const [activationError, setActivationError] = useState(false); // Flag if account is not verified
  const [resendSuccess, setResendSuccess] = useState(''); // Message shown after resending email

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setActivationError(false);
    setResendSuccess('');

    try {
      const success = await onSubmit({ email, password });

      // If login fails show a generic error
      if (!success) setError('Login failed');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      console.log('🪵 Login error:', message);

      if (message.toLowerCase().includes('verify your email')) {
        setActivationError(true);
      } else {
        setError(message);
      }
    }
  };

  // Handles click on "Resend activation email" button
  const handleResendActivation = async () => {
    try {
      await resendActivationEmail(email); // API call
      setResendSuccess('Activation email has been resent! Please check your inbox.');
    } catch (err) {
      setError(err.message || 'Failed to resend activation email');
    }
  };

  return (
    // Login form container
    <form
      className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Show general error if login fails */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Show success message if activation email was resent */}
      {resendSuccess && <p className="text-sm text-green-600">{resendSuccess}</p>}

      {/* Email input field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password input field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
      </div>

      {/* Activation warning + resend option */}
      {activationError && (
        <div className="text-sm text-yellow-600">
          Your account is not activated.
          <button
            type="button"
            onClick={handleResendActivation}
            className="text-indigo-600 hover:underline font-medium ml-1"
          >
            Resend activation email
          </button>
        </div>
      )}

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
