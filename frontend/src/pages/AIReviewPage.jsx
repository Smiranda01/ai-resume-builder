// src/pages/AIReviewPage.jsx
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateResume } from '../api/resumes';

const AIReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { aiContent, original } = location.state || {};

  if (!aiContent || !original) {
    return <p className="text-center text-red-600">Missing AI feedback or original resume data.</p>;
  }

  const handleApply = async () => {
    try {
      await updateResume(id, {
        title: aiContent.title || 'Untitled Resume',
        content: aiContent
      });
      alert('AI suggestions applied successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to apply suggestions: ' + err.message);
    }
  };
  
  const handleDiscard = () => {
  navigate(`/preview/${resume.id}`); // Go back to regular preview
    };

  const renderSection = (content) => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{content.name}</h1>
      <p><strong>Title:</strong> {content.title}</p>
      <p><strong>Email:</strong> {content.email}</p>
      <p><strong>Summary:</strong> {content.summary}</p>
      <p><strong>Skills:</strong> {content.skills?.join(', ')}</p>

      {content.experience?.length > 0 && (
        <div>
          <h2 className="font-semibold">Experience</h2>
          {content.experience.map((exp, idx) => (
            <div key={idx}>
              <p><strong>{exp.role}</strong> at {exp.company}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {content.education?.length > 0 && (
        <div>
          <h2 className="font-semibold">Education</h2>
          {content.education.map((edu, idx) => (
            <p key={idx}>{edu.degree} - {edu.institution} ({edu.year})</p>
          ))}
        </div>
      )}

      {content.projects?.length > 0 && (
        <div>
          <h2 className="font-semibold">Projects</h2>
          {content.projects.map((proj, idx) => (
            <p key={idx}><strong>{proj.name}</strong>: {proj.description}</p>
          ))}
        </div>
      )}

      {content.languages?.length > 0 && (
        <div>
          <h2 className="font-semibold">Languages</h2>
          <p>{content.languages.join(', ')}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Original Resume</h2>
          {renderSection(original)}
        </div>

        <div className="w-full lg:w-1/2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">AI-Enhanced Resume</h2>
          {renderSection(aiContent)}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleApply}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          ✅ Apply Suggestions
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          🚫 Discard
        </button>
      </div>
    </div>
  );
};

export default AIReviewPage;
