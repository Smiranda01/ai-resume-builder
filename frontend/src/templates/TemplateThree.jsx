// src/templates/TemplateThree.jsx
import React from 'react';

const TemplateThree = ({ content, previewRef }) => (
  <div
    ref={previewRef}
    className="bg-white text-gray-900 font-serif p-10 leading-relaxed space-y-8 border rounded shadow"
  >
    {/* Header */}
    <header className="text-center space-y-1">
      <h1 className="text-4xl font-bold tracking-wide">{content.name || 'Your Name'}</h1>
      {content.title && <p className="italic text-lg text-gray-600">{content.title}</p>}
      {content.email && <p className="text-sm text-gray-500">{content.email}</p>}
    </header>

    {/* Summary */}
    {content.summary && (
      <section>
        <h2 className="text-2xl font-semibold border-b pb-1">Summary</h2>
        <p className="mt-2 text-gray-800">{content.summary}</p>
      </section>
    )}

    {/* Experience */}
    {content.experience?.length > 0 && (
      <section>
        <h2 className="text-2xl font-semibold border-b pb-1">Experience</h2>
        <div className="space-y-3 mt-2">
          {content.experience.map((exp, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-md">{exp.role} – {exp.company}</h3>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills */}
    {content.skills?.length > 0 && (
      <section>
        <h2 className="text-2xl font-semibold border-b pb-1">Skills</h2>
        <ul className="list-disc list-inside mt-2 text-sm text-gray-800">
          {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
        </ul>
      </section>
    )}

    {/* Education */}
    {content.education?.length > 0 && (
      <section>
        <h2 className="text-2xl font-semibold border-b pb-1">Education</h2>
        <ul className="mt-2 text-sm text-gray-800 space-y-1">
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
        <h2 className="text-2xl font-semibold border-b pb-1">Projects</h2>
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
        <h2 className="text-2xl font-semibold border-b pb-1">Languages</h2>
        <p className="mt-2 text-sm text-gray-800">{content.languages.join(', ')}</p>
      </section>
    )}
  </div>
);

export default TemplateThree;
