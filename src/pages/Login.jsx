import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}