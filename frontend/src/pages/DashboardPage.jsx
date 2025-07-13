// src/pages/DashboardPage.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ResumeCard from '../components/ResumeCard';
import DashboardLayout from '../components/DashboardLayout';
import { getUserResumes, deleteResume } from '../api/resumes';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  // Access authentication data and logout function
  const { authData, logout } = useContext(AuthContext);

  // Router navigation hook
  const navigate = useNavigate();

  // Local state to store resumes and potential error messages
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');

  // On mount, redirect if no user is authenticated
  useEffect(() => {
    if (!authData?.user) {
      navigate('/login');
      return;
    }

    // Fetch resumes for the current user
    const fetchResumes = async () => {
      try {
        const userResumes = await getUserResumes(authData.user.id);
        setResumes(userResumes);
      } catch (err) {
        setError(err.message || 'Failed to fetch resumes');
      }
    };

    fetchResumes();
  }, [authData, navigate]);

  // Logs out the user and redirects to login
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation handlers for resume actions
  const handleEdit = (id) => navigate(`/resumes/${id}`);
  const handlePreview = (id) => navigate(`/preview/${id}`);

  // Delete handler with confirmation prompt
  const handleDelete = async (id) => {
    if (window.confirm('Delete this resume?')) {
      await deleteResume(id);
      setResumes((prev) => prev.filter(r => r.id !== id));
    }
  };

  return (
    // Wrap the page in the DashboardLayout component
    <DashboardLayout>
      {(activeSection) => {
        // Dashboard tab content
        if (activeSection === 'dashboard') {
          return (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-700">
                  Welcome, {authData?.user?.name}!
                </h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded border border-purple-300 text-purple-700 hover:bg-purple-100 transition"
                >
                  Logout
                </button>
              </div>

              <div className="space-y-6">
                {resumes.length === 0 ? (
                  <p className="text-gray-600">No resumes yet. Create one!</p>
                ) : (
                  resumes.map((resume) => (
                    <ResumeCard
                      key={resume.id}
                      resume={resume}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onPreview={handlePreview}
                    />
                  ))
                )}
              </div>
            </>
          );
        }

        // Create Resume tab content
        if (activeSection === 'create') {
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-700">Create New Resume</h2>
              <p className="text-gray-600">Choose a template to begin your resume:</p>
              <button
                onClick={() => navigate('/templates')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm transition"
              >
                Browse Templates
              </button>
            </div>
          );
        }

        // Profile tab content
        if (activeSection === 'profile') {
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Profile Settings</h2>
              <p className="text-gray-600">User email: {authData?.user?.email}</p>
              {/* Add more fields here later like change password, name, etc. */}
            </div>
          );
        }

        // Fallback if unknown section
        return null;
      }}
    </DashboardLayout>
  );
};

export default DashboardPage;
