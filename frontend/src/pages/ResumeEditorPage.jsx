// src/pages/ResumeEditorPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeById, updateResume } from '../api/resumes';
import ResumeForm from '../components/ResumeForm';

const ResumeEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await getResumeById(id);
        setResume(data); // content is already parsed by backend
      } catch (err) {
        setError(err.message);
      }
    };

    loadResume();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const { title, ...rest } = formData; // separate title

      await updateResume(id, {
        
        title, // top-level field
        template_id: resume.template_id || 1,
        content: JSON.stringify(rest), // everything else
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!resume) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>
      <ResumeForm
        initialData={{
          ...resume.content,
          title: resume.title // inject title for consistent form structure
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResumeEditorPage;
