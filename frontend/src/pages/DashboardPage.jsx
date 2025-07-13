// src/pages/DashboardPage.jsx
import React from 'react';
import ResumeCard from '../components/ResumeCard';
import DashboardLayout from '../components/DashboardLayout';
import { useContext, useEffect, useState } from 'react';
import { getUserResumes, deleteResume } from '../api/resumes';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');
 console.log("authData", authData);

  useEffect(() => {
    if (!authData?.user) {
      navigate('/login');
      return;
    }

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (id) => navigate(`/resumes/${id}`);
  const handlePreview = (id) => navigate(`/preview/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm('Delete this resume?')) {
      await deleteResume(id);
      setResumes((prev) => prev.filter(r => r.id !== id));
    }
  };

  return (
    <DashboardLayout>
      {(activeSection) => {
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

        if (activeSection === 'profile') {
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Profile Settings</h2>
              <p className="text-gray-600">User email: {authData?.user?.email}</p>
              {/* Add more fields later */}
            </div>
          );
        }

        return null;
      }}
    </DashboardLayout>
);

};

export default DashboardPage;
