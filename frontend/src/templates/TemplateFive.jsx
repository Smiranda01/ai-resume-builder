// src/templates/TemplateFive.jsx
import React from 'react';

const TemplateFive = ({ content, previewRef }) => (
  <div
    ref={previewRef}
    className="bg-gradient-to-tr from-pink-100 to-white text-gray-900 p-10 rounded-xl shadow-lg space-y-8"
  >
    {/* Header */}
    <header className="text-center space-y-1">
      <h1 className="text-4xl font-extrabold text-pink-700">{content.name || 'Your Name'}</h1>
      {content.title && <p className="text-lg text-gray-600 italic">{content.title}</p>}
      {content.email && <p className="text-sm text-gray-500">{content.email}</p>}
    </header>

    {/* Summary */}
    {content.summary && (
      <section>
        <h2 className="text-xl font-bold text-pink-600 border-b border-pink-200 pb-1">Summary</h2>
        <p className="text-sm mt-2">{content.summary}</p>
      </section>
    )}

    {/* Experience */}
    {content.experience?.length > 0 && (
      <section>
        <h2 className="text-xl font-bold text-pink-600 border-b border-pink-200 pb-1">Experience</h2>
        <div className="space-y-3 mt-2">
          {content.experience.map((exp, idx) => (
            <div key={idx}>
              <h3 className="font-semibold">{exp.role} at {exp.company}</h3>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills */}
    {content.skills?.length > 0 && (
      <section>
        <h2 className="text-xl font-bold text-pink-600 border-b border-pink-200 pb-1">Skills</h2>
        <ul className="list-disc list-inside text-sm mt-2 text-gray-800">
          {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
        </ul>
      </section>
    )}

    {/* Education */}
    {content.education?.length > 0 && (
      <section>
        <h2 className="text-xl font-bold text-pink-600 border-b border-pink-200 pb-1">Education</h2>
        <ul className="mt-2 text-sm space-y-1">
          {content.education.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* Projects */}
    {content.projects?.length > 0 && (
      <section>
        <h2 className="text-xl font-bold text-pink-600 border-b border-pink-200 pb-1">Projects</h2>
        <ul className="mt-2 space-y-1 text-sm text-gray-800">
          {content.projects.map((proj, idx) => (
            <li key={idx}>
              <strong>{proj.name}</strong>: {proj.description}
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* Languages */}
    {content.languages?.length > 0 && (
      <section>
        <h2 className="text-xl font-bold text-pink-600 border-b border-pink-200 pb-1">Languages</h2>
        <p className="text-sm mt-2">{content.languages.join(', ')}</p>
      </section>
    )}
  </div>
);

export default TemplateFive;
