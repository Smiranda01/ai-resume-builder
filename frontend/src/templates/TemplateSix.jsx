// src/templates/TemplateSix.jsx
import React from 'react';

const TemplateSix = ({ content, previewRef }) => (
  <div
    ref={previewRef}
    className="p-10 bg-white border-2 border-gray-800 text-gray-900 font-sans rounded-md space-y-8 shadow-xl"
  >
    {/* Header */}
    <header className="text-center space-y-1">
      <h1 className="text-3xl font-bold uppercase tracking-wider">{content.name || 'Your Name'}</h1>
      {content.title && <p className="text-md italic text-gray-700">{content.title}</p>}
      {content.email && <p className="text-sm text-gray-500">{content.email}</p>}
    </header>

    {/* Summary */}
    {content.summary && (
      <section>
        <h2 className="text-xl font-semibold uppercase text-gray-800 border-b pb-1">Professional Summary</h2>
        <p className="text-sm mt-2">{content.summary}</p>
      </section>
    )}

    {/* Experience */}
    {content.experience?.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold uppercase text-gray-800 border-b pb-1">Experience</h2>
        <div className="space-y-3 mt-2">
          {content.experience.map((exp, idx) => (
            <div key={idx}>
              <h3 className="font-bold">{exp.role}</h3>
              <p className="italic text-gray-700">{exp.company}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills */}
    {content.skills?.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold uppercase text-gray-800 border-b pb-1">Skills</h2>
        <ul className="list-disc list-inside text-sm mt-2">
          {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
        </ul>
      </section>
    )}

    {/* Education */}
    {content.education?.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold uppercase text-gray-800 border-b pb-1">Education</h2>
        <ul className="text-sm mt-2 space-y-1">
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
        <h2 className="text-xl font-semibold uppercase text-gray-800 border-b pb-1">Projects</h2>
        <ul className="text-sm mt-2 space-y-1">
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
        <h2 className="text-xl font-semibold uppercase text-gray-800 border-b pb-1">Languages</h2>
        <p className="text-sm mt-2">{content.languages.join(', ')}</p>
      </section>
    )}
  </div>
);

export default TemplateSix;
