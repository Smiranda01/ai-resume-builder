// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import { register } from '../api/auth'; // API function to register a new user
import { useNavigate } from 'react-router-dom'; // Hook to navigate programmatically

const RegisterForm = () => {
  // Form input state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Feedback message state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Router navigation hook
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent full page reload
    setError('');
    setSuccess('');

    try {
      // Call backend register API with user input
      await register(name, email, password);

      // On success, show message and redirect to login after 3 seconds
      setSuccess('Registration successful! Please check your email to activate your account.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      // Show error message if registration fails
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div>
      {/* Error message display */}
      {error && (
        <p className="text-sm text-red-600 text-center mb-2">
          {error}
        </p>
      )}

      {/* Success message display */}
      {success && (
        <p className="text-sm text-green-600 text-center mb-2">
          {success}
        </p>
      )}

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full name field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Your full name"
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Choose a strong password"
          />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
