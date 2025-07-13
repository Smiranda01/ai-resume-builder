// src/components/ResumeForm.jsx

import React, { useState } from 'react';

// ResumeForm component handles resume input, editing, and submission
const ResumeForm = ({ initialData = {}, onSubmit }) => {
  // Helper to ensure initial arrays are properly handled
  const emptyArrayIfMissing = (val) => Array.isArray(val) ? val : [];

  // Form state initialized from `initialData` or defaults
  const [form, setForm] = useState({
    name: initialData.name || '',
    title: initialData.title || '',
    email: initialData.email || '',
    summary: initialData.summary || '',
    skills: emptyArrayIfMissing(initialData.skills),
    experience: emptyArrayIfMissing(initialData.experience),
    education: emptyArrayIfMissing(initialData.education),
    projects: emptyArrayIfMissing(initialData.projects),
    languages: emptyArrayIfMissing(initialData.languages),
  });

  // Error state for basic required field validation
  const [errors, setErrors] = useState({});

  // Handles input field changes for simple string values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles skill list input by splitting on commas
  const handleSkillsChange = (e) => {
    setForm({ ...form, skills: e.target.value.split(',').map(s => s.trim()) });
  };

  // Validates required fields (name and title)
  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Name is required';
    if (!form.title) err.title = 'Title is required';
    return err;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name field */}
      <div>
        <label className="block font-medium">Name*</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Title field */}
      <div>
        <label className="block font-medium">Title*</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* Email field */}
      <div>
        <label className="block font-medium">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* Summary field */}
      <div>
        <label className="block font-medium">Summary</label>
        <textarea name="summary" value={form.summary} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* Skills field */}
      <div>
        <label className="block font-medium">Skills (comma separated)</label>
        <input value={form.skills.join(', ')} onChange={handleSkillsChange} className="w-full p-2 border rounded" />
      </div>

      {/* Experience entries */}
      <div>
        <label className="block font-medium">Experience</label>
        {form.experience.map((exp, idx) => (
          <div key={idx} className="space-y-1 mb-3">
            <input
              placeholder="Company"
              value={exp.company || ''}
              onChange={(e) => {
                const updated = [...form.experience];
                updated[idx].company = e.target.value;
                setForm({ ...form, experience: updated });
              }}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Role"
              value={exp.role || ''}
              onChange={(e) => {
                const updated = [...form.experience];
                updated[idx].role = e.target.value;
                setForm({ ...form, experience: updated });
              }}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={exp.description || ''}
              onChange={(e) => {
                const updated = [...form.experience];
                updated[idx].description = e.target.value;
                setForm({ ...form, experience: updated });
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        {/* Add Experience button */}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              experience: [...form.experience, { company: '', role: '', description: '' }],
            })
          }
          className="text-sm text-blue-600"
        >
          + Add Experience
        </button>
      </div>

      {/* Education entries */}
      <div>
        <label className="block font-medium">Education</label>
        {form.education.map((edu, idx) => (
          <div key={idx} className="space-y-1 mb-3">
            <input
              placeholder="Institution"
              value={edu.institution || ''}
              onChange={(e) => {
                const updated = [...form.education];
                updated[idx].institution = e.target.value;
                setForm({ ...form, education: updated });
              }}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Degree"
              value={edu.degree || ''}
              onChange={(e) => {
                const updated = [...form.education];
                updated[idx].degree = e.target.value;
                setForm({ ...form, education: updated });
              }}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Year"
              value={edu.year || ''}
              onChange={(e) => {
                const updated = [...form.education];
                updated[idx].year = e.target.value;
                setForm({ ...form, education: updated });
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        {/* Add Education button */}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              education: [...form.education, { institution: '', degree: '', year: '' }],
            })
          }
          className="text-sm text-blue-600"
        >
          + Add Education
        </button>
      </div>

      {/* Projects */}
      <div>
        <label className="block font-medium">Projects</label>
        {form.projects.map((proj, idx) => (
          <div key={idx} className="space-y-1 mb-3">
            <input
              placeholder="Project Name"
              value={proj.name || ''}
              onChange={(e) => {
                const updated = [...form.projects];
                updated[idx].name = e.target.value;
                setForm({ ...form, projects: updated });
              }}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Project Description"
              value={proj.description || ''}
              onChange={(e) => {
                const updated = [...form.projects];
                updated[idx].description = e.target.value;
                setForm({ ...form, projects: updated });
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        {/* Add Project button */}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              projects: [...form.projects, { name: '', description: '' }],
            })
          }
          className="text-sm text-blue-600"
        >
          + Add Project
        </button>
      </div>

      {/* Languages field */}
      <div>
        <label className="block font-medium">Languages (comma separated)</label>
        <input
          value={form.languages.join(', ')}
          onChange={(e) =>
            setForm({
              ...form,
              languages: e.target.value.split(',').map((lang) => lang.trim()),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default ResumeForm;
