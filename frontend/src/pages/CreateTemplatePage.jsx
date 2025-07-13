import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTemplate } from '../api/templates';
import { AuthContext } from '../context/AuthContext';

const CreateTemplatePage = () => {
  const [template, setTemplate] = useState({ name: '', description: '', html_code: '' });
  const [error, setError] = useState('');
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTemplate(template, authData.token);
      navigate('/templates');
    } catch (err) {
      setError(err.message || 'Failed to create template');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Create New Template</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={template.name}
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={template.description}
            onChange={(e) => setTemplate({ ...template, description: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
        <label className="block text-sm font-medium">HTML Code</label>
        <textarea
            value={template.html_code}
            onChange={(e) => setTemplate({ ...template, html_code: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
            rows={10}
            required
        />
        </div>


        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-sm"
        >
          Create Template
        </button>
      </form>
    </div>
  );
};

export default CreateTemplatePage;
