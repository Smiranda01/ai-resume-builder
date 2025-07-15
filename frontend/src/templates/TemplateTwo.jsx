// src/templates/TemplateTwo.jsx
import React from 'react';

const TemplateTwo = ({ content, previewRef }) => (
  <div ref={previewRef} className="flex bg-white text-gray-800 border rounded-md shadow-lg overflow-hidden">
    {/* Sidebar */}
    <aside className="w-1/3 bg-gray-900 text-white p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{content.name || 'Your Name'}</h1>
        {content.title && <p className="text-sm italic">{content.title}</p>}
        {content.email && <p className="text-sm mt-1">{content.email}</p>}
      </div>

      {content.skills?.length > 0 && (
        <div>
          <h2 className="text-md font-semibold border-b border-gray-700 pb-1">Skills</h2>
          <ul className="list-disc list-inside text-sm mt-1">
            {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
          </ul>
        </div>
      )}

      {content.languages?.length > 0 && (
        <div>
          <h2 className="text-md font-semibold border-b border-gray-700 pb-1">Languages</h2>
          <p className="text-sm mt-1">{content.languages.join(', ')}</p>
        </div>
      )}
    </aside>

    {/* Main Content */}
    <main className="w-2/3 p-6 space-y-6">
      {content.summary && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1">Summary</h2>
          <p className="text-sm mt-1">{content.summary}</p>
        </section>
      )}

      {content.experience?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1">Experience</h2>
          {content.experience.map((exp, idx) => (
            <div key={idx} className="mt-2">
              <h3 className="font-bold">{exp.role} at {exp.company}</h3>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {content.education?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1">Education</h2>
          {content.education.map((edu, idx) => (
            <p key={idx} className="text-sm mt-1">
              <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
            </p>
          ))}
        </section>
      )}

      {content.projects?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1">Projects</h2>
          {content.projects.map((proj, idx) => (
            <div key={idx} className="mt-2">
              <strong>{proj.name}</strong>: <span className="text-sm">{proj.description}</span>
            </div>
          ))}
        </section>
      )}
    </main>
  </div>
);

export default TemplateTwo;
