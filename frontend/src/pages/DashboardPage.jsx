import React, { useEffect, useState, useContext } from 'react';
import { getUserResumes, deleteResume } from '../api/resumes';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ResumeCard from '../components/ResumeCard';

const Dashboard = () => {
  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');

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

  const handleCreateNew = () => {
    navigate('/templates');
  };

  const handleEdit = (resumeId) => {
    navigate(`/resumes/${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(resumeId);
        setResumes(resumes.filter(r => r.id !== resumeId));
      } catch (err) {
        alert(err.message || 'Failed to delete resume');
      }
    }
  };

  const handlePreview = (resumeId) => {
    navigate(`/preview/${resumeId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={handleCreateNew}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create New Resume
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.length === 0 ? (
          <p className="text-gray-600">No resumes found. Create your first one!</p>
        ) : (
          resumes.map(resume => (
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
    </div>
  );
};

export default Dashboard;
