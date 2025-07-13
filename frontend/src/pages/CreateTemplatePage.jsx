import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTemplate } from '../api/templates';
import { AuthContext } from '../context/AuthContext';

const CreateTemplatePage = () => {
  // Form state for the new template
  const [template, setTemplate] = useState({
    name: '',
    description: '',
    html_code: '',
  });

  // State to display error messages
  const [error, setError] = useState('');

  // Access authenticated user (for token)
  const { authData } = useContext(AuthContext);

  // Router navigation hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send template to backend with token
      await createTemplate(template, authData.token);

      // Redirect to templates page after successful creation
      navigate('/templates');
    } catch (err) {
      // Set error if creation fails
      setError(err.message || 'Failed to create template');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Create New Template</h1>

      {/* Show any error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name input */}
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

        {/* Description input */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={template.description}
            onChange={(e) => setTemplate({ ...template, description: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* HTML code input */}
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

        {/* Submit button */}
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
