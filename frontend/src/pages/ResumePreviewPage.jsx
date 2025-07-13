// src/pages/ResumePreviewPage.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeById } from '../api/resumes';
import { generateFeedback } from '../api/feedback';
import { AuthContext } from '../context/AuthContext';

const ResumePreviewPage = () => {
  // Get resume ID from route
  const { id } = useParams();

  // Used to redirect to AI preview page
  const navigate = useNavigate();

  // Access current user auth info (optional here)
  const { authData } = useContext(AuthContext);

  // State for resume data and possible errors
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  // Fetch resume details on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id);

        // If resume content is stored as string, parse it to object
        const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
        setResume({ ...data, content });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResume();
  }, [id]);

  // Handle "Enhance with AI" button click
  const handleEnhance = async () => {
    try {
      const response = await generateFeedback(resume.id, resume.content);

      // Navigate to AI preview page with both original and enhanced content
      navigate(`/ai-preview/${resume.id}`, {
        state: {
          aiContent: response.resume_json,
          original: resume.content,
        },
      });
    } catch (err) {
      alert('Failed to generate AI feedback: ' + err.message);
    }
  };

  // Error or loading states
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!resume) return <p className="text-center">Loading resume...</p>;

  const { content } = resume;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* AI enhancement trigger */}
      <button
        onClick={handleEnhance}
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        ✨ Enhance with AI
      </button>

      {/* Resume content display */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 space-y-6 text-gray-800">
        <header>
          <h1 className="text-3xl font-bold text-purple-700">{content.name || 'No Name Provided'}</h1>
          {content.title && <p className="text-lg text-gray-600">{content.title}</p>}
          {content.email && <p className="text-sm text-gray-500 mt-1">{content.email}</p>}
        </header>

        {content.summary && (
          <section>
            <h2 className="text-xl font-semibold mb-1">Summary</h2>
            <p className="text-gray-700">{content.summary}</p>
          </section>
        )}

        {content.skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-1">Skills</h2>
            <ul className="list-disc list-inside text-gray-700">
              {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
            </ul>
          </section>
        )}

        {content.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-1">Experience</h2>
            {content.experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="font-bold text-md">{exp.role} at {exp.company}</h3>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {content.education?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-1">Education</h2>
            {content.education.map((edu, idx) => (
              <p key={idx} className="text-gray-700">
                <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
              </p>
            ))}
          </section>
        )}

        {content.projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-1">Projects</h2>
            {content.projects.map((proj, idx) => (
              <div key={idx} className="mb-2">
                <p><strong>{proj.name}</strong>: {proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {content.languages?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-1">Languages</h2>
            <p>{content.languages.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreviewPage;
