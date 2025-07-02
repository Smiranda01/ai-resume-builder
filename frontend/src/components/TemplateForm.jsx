// src/components/TemplateForm.jsx

import React, { useState } from 'react';

const TemplateForm = ({ initialData = {}, onSave }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [htmlCode, setHtmlCode] = useState(initialData.html_code || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateData = { name, description, html_code: htmlCode };
    onSave(templateData);  // Call parent save function
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Template Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Template Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Modern Resume Template"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Short description about the template"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">HTML Code</label>
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            className="w-full p-2 border rounded font-mono text-xs"
            placeholder="<html>...</html>"
            rows="10"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Save Template
        </button>
      </form>
    </div>
  );
};

export default TemplateForm;
