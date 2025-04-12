import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="d-flex flex-column gap-2">
        <Link to="/editor" className="btn btn-outline-primary">Edit Resume</Link>
        <Link to="/resume" className="btn btn-outline-success">View Resume</Link>
        <Link to="/templates" className="btn btn-outline-info">Manage Templates</Link>
        <Link to="/profile" className="btn btn-outline-warning">Profile Settings</Link>
        <Link to="/admin" className="btn btn-outline-secondary">Admin Panel</Link>
      </div>
    </div>
  );
}