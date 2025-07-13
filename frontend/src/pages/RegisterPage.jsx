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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
    {error && <p className="text-center text-sm text-red-600 mt-2">{error}</p>}
    {info && <p className="text-center text-sm text-green-600 mt-2">{info}</p>}
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  </div>
</div>

  );
};

export default RegisterPage;
