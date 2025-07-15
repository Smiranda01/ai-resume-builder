import React from 'react';

const TemplateOne = ({ content, previewRef }) => (
  <div
    ref={previewRef}
    className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 space-y-6 text-gray-800"
  >
    <header className="break-inside-avoid">
      <h1 className="text-3xl font-bold text-purple-700">{content.name || 'No Name Provided'}</h1>
      {content.title && <p className="text-lg text-gray-600">{content.title}</p>}
      {content.email && <p className="text-sm text-gray-500 mt-1">{content.email}</p>}
    </header>

    {content.summary && (
      <section className="break-inside-avoid">
        <h2 className="text-xl font-semibold mb-1">Summary</h2>
        <p className="text-gray-700">{content.summary}</p>
      </section>
    )}

    {content.skills?.length > 0 && (
      <section className="break-inside-avoid">
        <h2 className="text-xl font-semibold mb-1">Skills</h2>
        <ul className="list-disc list-inside text-gray-700">
          {content.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
        </ul>
      </section>
    )}

    {content.experience?.length > 0 && (
      <section className="break-inside-avoid">
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
      <section className="break-inside-avoid">
        <h2 className="text-xl font-semibold mb-1">Education</h2>
        {content.education.map((edu, idx) => (
          <p key={idx} className="text-gray-700">
            <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
          </p>
        ))}
      </section>
    )}

    {content.projects?.length > 0 && (
      <section className="break-inside-avoid">
        <h2 className="text-xl font-semibold mb-1">Projects</h2>
        {content.projects.map((proj, idx) => (
          <div key={idx} className="mb-2">
            <p><strong>{proj.name}</strong>: {proj.description}</p>
          </div>
        ))}
      </section>
    )}

    {content.languages?.length > 0 && (
      <section className="break-inside-avoid">
        <h2 className="text-xl font-semibold mb-1">Languages</h2>
        <p>{content.languages.join(', ')}</p>
      </section>
    )}
  </div>
);

export default TemplateOne;
