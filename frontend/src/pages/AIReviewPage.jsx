// src/pages/AIReviewPage.jsx

import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateResume } from '../api/resumes';
import TemplateOne from '../templates/TemplateOne';
import TemplateTwo from '../templates/TemplateTwo';
import TemplateThree from '../templates/TemplateThree';
import TemplateFour from '../templates/TemplateFour';
import TemplateFive from '../templates/TemplateFive';
import TemplateSix from '../templates/TemplateSix';

const AIReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { aiContent, original, template_id } = location.state || {};

  if (!aiContent || !original) {
    return <p className="text-center text-red-600">Missing AI feedback or original resume data.</p>;
  }

  const handleApply = async () => {
    try {
      await updateResume(id, {
        title: aiContent.title || 'Untitled Resume',
        content: aiContent,
        template_id: template_id,
      });
      alert('AI suggestions applied successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to apply suggestions: ' + err.message);
    }
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  const renderTemplate = (content, ref) => {
    switch (template_id) {
      case 1:
        return <TemplateOne content={content} previewRef={ref} />;
      case 2:
        return <TemplateTwo content={content} previewRef={ref} />;
      case 3:
        return <TemplateThree content={content} previewRef={ref} />;
      case 4:
        return <TemplateFour content={content} previewRef={ref} />;
      case 5:
        return <TemplateFive content={content} previewRef={ref} />;
      case 6:
        return <TemplateSix content={content} previewRef={ref} />;
      default:
        return <p className="text-gray-600">No template matched.</p>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Original resume column */}
        <div className="w-full lg:w-1/2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Original Resume</h2>
          {renderTemplate(original)}
        </div>

        {/* AI-enhanced resume column */}
        <div className="w-full lg:w-1/2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">AI-Enhanced Resume</h2>
          {renderTemplate(aiContent)}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleApply}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          ✅ Apply Suggestions
        </button>
        <button
          onClick={handleDiscard}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          🚫 Discard
        </button>
      </div>
    </div>
  );
};

export default AIReviewPage;
