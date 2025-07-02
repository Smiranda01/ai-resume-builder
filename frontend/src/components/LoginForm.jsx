// src/components/LoginForm.jsx

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { login, resendActivationEmail } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activationError, setActivationError] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setActivationError(false);
    setResendSuccess('');

    try {
      const data = await login(email, password);
      setAuthData(data);  // Save token and user info globally
      navigate('/dashboard');  // Redirect to dashboard
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('verify your email')) {
        setActivationError(true);
      } else {
        setError(err.message || 'Login failed');
      }
    }
  };

  const handleResendActivation = async () => {
    try {
      await resendActivationEmail(email);
      setResendSuccess('Activation email has been resent! Please check your inbox.');
    } catch (err) {
      setError(err.message || 'Failed to resend activation email');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {resendSuccess && <p className="text-green-500 text-sm mb-4">{resendSuccess}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="Your password"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      {/* Show Resend Activation Option */}
      {activationError && (
        <div className="mt-6 text-center">
          <p className="text-yellow-500 mb-2">Your account is not activated.</p>
          <button
            onClick={handleResendActivation}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Resend Activation Email
          </button>
        </div>
      )}

      {/* Link to Register Page */}
      <p className="text-sm text-center mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
