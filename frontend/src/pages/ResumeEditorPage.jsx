// src/pages/ResumeEditorPage.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeById, updateResume } from '../api/resumes';
import ResumeForm from '../components/ResumeForm';
import { AuthContext } from '../context/AuthContext';

const ResumeEditorPage = () => {
  // Extract resume ID from route parameters
  const { id } = useParams();

  // For navigation after saving changes
  const navigate = useNavigate();

  // Get auth data from context (could be used for permission checks)
  const { authData } = useContext(AuthContext);

  // Local state for resume data and error messages
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  // Load resume details on component mount
  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await getResumeById(id);
        setResume(data); // Store fetched resume
      } catch (err) {
        setError(err.message); // Show error if fetch fails
      }
    };

    loadResume();
  }, [id]);

  // Handle form submission to update the resume
  const handleSubmit = async (formData) => {
    try {
      const { title, ...rest } = formData;

      // Send update request with form data and original template_id
      await updateResume(id, {
        title,
        template_id: resume.template_id || 1,
        content: JSON.stringify(rest),
      });

      // Redirect to dashboard after saving
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // Render loading or error states
  if (error) return <p className="text-red-600">{error}</p>;
  if (!resume) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>

      {/* Pass current resume content as initial values to ResumeForm */}
      <ResumeForm
        initialData={{
          ...resume.content,
          title: resume.title,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResumeEditorPage;
