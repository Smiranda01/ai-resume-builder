// src/pages/ResumePreviewPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResumeById } from '../api/resumes';

const ResumePreviewPage = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id);

        let content = {};
        try {
          content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
        } catch (e) {
          console.error('Failed to parse resume content:', e);
        }

        setResume({
          ...data,
          content,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResume();
  }, [id]);

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!resume) return <p className="text-center">Loading resume...</p>;

  const { content } = resume;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{content.name || 'No Name Provided'}</h1>
      {content.title && <p className="mb-2"><strong>Title:</strong> {content.title}</p>}
      {content.email && <p className="mb-2"><strong>Email:</strong> {content.email}</p>}
      {content.summary && <p className="mb-2"><strong>Summary:</strong> {content.summary}</p>}
      {content.skills?.length > 0 && (
        <p className="mb-2"><strong>Skills:</strong> {content.skills.join(', ')}</p>
      )}

      {content.experience?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {content.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <p><strong>{exp.role}</strong> at {exp.company}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {content.education?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {content.education.map((edu, idx) => (
            <p key={idx}>{edu.degree} - {edu.institution} ({edu.year})</p>
          ))}
        </div>
      )}

      {content.projects?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          {content.projects.map((proj, idx) => (
            <p key={idx}><strong>{proj.name}</strong>: {proj.description}</p>
          ))}
        </div>
      )}

      {content.languages?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Languages</h2>
          <p>{content.languages.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreviewPage;
