// src/pages/Templates.jsx

import React, { useEffect, useState, useContext } from 'react';
import { getAllTemplates } from '../api/templates';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';

const Templates = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.length === 0 ? (
          <p className="text-gray-600">No templates available yet.</p>
        ) : (
          templates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelectTemplate}
              isAdmin={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Templates;
