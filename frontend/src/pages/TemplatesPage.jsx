// src/pages/TemplatesPage.jsx

import React, { useEffect, useState, useContext } from 'react';
import { getAllTemplates, deleteTemplate } from '../api/templates';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';

const TemplatesPage = () => {
  // Get current user and token from AuthContext
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to store template list and error messages
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');

  // Check if the logged-in user is an admin
  const isAdmin = authData?.user?.role === 'admin';
  const token = authData?.token;

  // Fetch templates when page loads
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authData?.user) {
      navigate('/login');
      return;
    }

    // Load all templates from the backend
    const fetchTemplates = async () => {
      try {
        const templateList = await getAllTemplates();
        setTemplates(templateList);
      } catch (err) {
        setError(err.message || 'Failed to fetch templates');
      }
    };

    fetchTemplates();
  }, [authData, navigate]);

  // Called when user clicks "Use Template"
  const handleSelectTemplate = (templateId) => {
    navigate(`/resume/input/${templateId}`);
  };

  // Admin-only: Edit button handler
  const handleEditTemplate = (templateId) => {
    navigate(`/templates/edit/${templateId}`);
  };

  // Admin-only: Delete button handler
  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteTemplate(templateId, token);
        // Remove deleted template from UI
        setTemplates((prev) => prev.filter((t) => t.id !== templateId));
      } catch (err) {
        setError(err.message || 'Failed to delete template');
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header and Create button for admins */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-purple-700">Choose a Template</h1>
        {isAdmin && (
          <button
            onClick={() => navigate('/templates/new')}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow-sm transition"
          >
            + Create New Template
          </button>
        )}
      </div>

      {/* Show error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display list of templates or fallback if none */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {templates.length === 0 ? (
          <p className="text-gray-600">No templates available yet.</p>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="h-full">
              <TemplateCard
                template={template}
                onSelect={handleSelectTemplate}
                onEdit={handleEditTemplate}
                onDelete={handleDeleteTemplate}
                isAdmin={isAdmin}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
