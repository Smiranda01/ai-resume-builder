import React, { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', data);
      alert("Registration successful");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}