import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    if (success) {
      navigate('/dashboard'); // Redirect after login
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
