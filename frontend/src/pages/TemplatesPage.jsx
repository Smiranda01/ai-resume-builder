import React, { useEffect, useState, useContext } from 'react';
import { getAllTemplates, deleteTemplate } from '../api/templates';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';

const TemplatesPage = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');

  const isAdmin = authData?.user?.role === 'admin';
  const token = authData?.token;

  useEffect(() => {
    if (!authData?.user) {
      navigate('/login');
      return;
    }

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

  const handleSelectTemplate = (templateId) => {
    navigate(`/resume/input/${templateId}`);
  };

  const handleEditTemplate = (templateId) => {
    navigate(`/templates/edit/${templateId}`);
  };

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        console.log("Calling deleteTemplate with token:", token);
        await deleteTemplate(templateId, token);
        setTemplates((prev) => prev.filter((t) => t.id !== templateId));
      } catch (err) {
        setError(err.message || 'Failed to delete template');
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
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
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

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
