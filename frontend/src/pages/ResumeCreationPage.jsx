// src/pages/ResumeCreationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResume } from '../api/resumes';
import ResumeForm from '../components/ResumeForm';

const ResumeCreationPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      await createResume({
        title: formData.title,
        template_id: 1, // You can add a selector later
        content: JSON.stringify(formData),
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create resume');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Resume</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ResumeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ResumeCreationPage;
