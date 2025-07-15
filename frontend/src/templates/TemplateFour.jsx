// src/templates/TemplateFour.jsx
import React from 'react';

const TemplateFour = ({ content, previewRef }) => (
  <div
    ref={previewRef}
    className="grid grid-cols-2 gap-6 p-10 bg-white border rounded-lg text-gray-800 shadow"
  >
    {/* Header (Full Width) */}
    <div className="col-span-2 text-center space-y-1">
      <h1 className="text-3xl font-bold">{content.name || 'Your Name'}</h1>
      {content.title && <p className="text-md text-gray-600">{content.title}</p>}
      {content.email && <p className="text-sm text-gray-500">{content.email}</p>}
    </div>

    {/* Summary */}
    {content.summary && (
      <div className="col-span-2">
        <h2 className="text-xl font-semibold border-b pb-1">Summary</h2>
        <p className="text-sm mt-2">{content.summary}</p>
      </div>
    )}

    {/* Skills */}
    {content.skills?.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold border-b pb-1">Skills</h2>
        <ul className="list-disc list-inside text-sm mt-2">
          {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
        </ul>
      </div>
    )}

    {/* Languages */}
    {content.languages?.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold border-b pb-1">Languages</h2>
        <p className="text-sm mt-2">{content.languages.join(', ')}</p>
      </div>
    )}

    {/* Experience */}
    {content.experience?.length > 0 && (
      <div className="col-span-2">
        <h2 className="text-xl font-semibold border-b pb-1">Experience</h2>
        <div className="space-y-3 mt-2">
          {content.experience.map((exp, idx) => (
            <div key={idx}>
              <h3 className="font-bold">{exp.role} at {exp.company}</h3>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {content.education?.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold border-b pb-1">Education</h2>
        <ul className="text-sm mt-2 space-y-1">
          {content.education.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Projects */}
    {content.projects?.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold border-b pb-1">Projects</h2>
        <ul className="text-sm mt-2 space-y-1">
          {content.projects.map((proj, idx) => (
            <li key={idx}>
              <strong>{proj.name}</strong>: {proj.description}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default TemplateFour;
