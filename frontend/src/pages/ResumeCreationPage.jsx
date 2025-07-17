// src/pages/ResumeCreationPage.jsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createResume } from '../api/resumes';
import ResumeForm from '../components/ResumeForm';

const ResumeCreationPage = () => {
  // Hook to navigate after successful creation
  const navigate = useNavigate();

  // Get the template ID from the URL
  const { templateId } = useParams();

  // State to store and show error messages
  const [error, setError] = useState('');

  // Handle form submission from ResumeForm
  const handleSubmit = async (formData) => {
    try {
      await createResume({
        title: formData.title,
        template_id: Number(templateId) || 1, 
        content: JSON.stringify(formData),
      });

      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create resume');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Resume</h1>

      {/* Display any error message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Render the shared ResumeForm component */}
      <ResumeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ResumeCreationPage;
