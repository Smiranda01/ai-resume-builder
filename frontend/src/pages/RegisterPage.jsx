import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { AuthContext } from '../context/AuthContext';
import { register } from '../api/auth';

const RegisterPage = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleRegister = async ({ name, email, password }) => {
    try {
      const response = await register(name, email, password);
      setInfo(response.message || 'Registration successful!');
      setError('');

      // Optional: redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setInfo('');
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {info && <p style={{ color: 'green' }}>{info}</p>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
