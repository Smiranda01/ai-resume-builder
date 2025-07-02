// src/components/ResumeForm.jsx

import React, { useState } from 'react';

const ResumeForm = ({ initialData = {}, onSave }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [summary, setSummary] = useState(initialData.summary || '');
  const [experience, setExperience] = useState(initialData.experience || '');
  const [education, setEducation] = useState(initialData.education || '');
  const [skills, setSkills] = useState(initialData.skills || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const resumeData = { title, summary, experience, education, skills };
    onSave(resumeData); // Call the parent save function
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Resume Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Frontend Developer Resume"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Brief summary about yourself"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Experience</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your work experience"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Education</label>
          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your education history"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Skills</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="List your skills separated by commas"
            rows="2"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Save Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
