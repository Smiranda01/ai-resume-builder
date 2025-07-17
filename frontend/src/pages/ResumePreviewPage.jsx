// src/pages/ResumePreviewPage.jsx

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeById } from '../api/resumes';
import { generateFeedback } from '../api/feedback';
import { updateResume } from '../api/resumes';
import { AuthContext } from '../context/AuthContext';
import TemplateOne from '../templates/TemplateOne';
import TemplateTwo from '../templates/TemplateTwo';
import TemplateThree from '../templates/TemplateThree';
import TemplateFour from '../templates/TemplateFour';
import TemplateFive from '../templates/TemplateFive';
import TemplateSix from '../templates/TemplateSix';
import html2pdf from 'html2pdf.js';


const ResumePreviewPage = () => {
  // Get resume ID from route
  const { id } = useParams();

  // Used to redirect to AI preview page
  const navigate = useNavigate();

  // Access current user auth info (optional here)
  const { authData } = useContext(AuthContext);

  // State for resume data and possible errors
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const previewRef = useRef(null);

  // Fetch resume details on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id);

        // If resume content is stored as string, parse it to object
        const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
        setResume({ ...data, content });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResume();
  }, [id]);

  // Handle "Enhance with AI" button click
  const handleEnhance = async () => {
    try {
      const response = await generateFeedback(resume.id, resume.content);

      // Navigate to AI preview page with both original and enhanced content
      navigate(`/ai-preview/${resume.id}`, {
        state: {
        aiContent: response.resume_json,
        original: resume.content,
        template_id: resume.template_id
      }
      });
    } catch (err) {
      alert('Failed to generate AI feedback: ' + err.message);
    }
  };

  const handleDownloadPDF = () => {
    const element = previewRef.current;

    // Temporarily apply both classes for clean export
    element.classList.add('print-pdf', 'no-frame');

    const opt = {
      margin: 0.4,
      filename: `${resume.title}_resume.pdf`,
      image: { type: 'png', quality: 1 }, // Use PNG for sharper edges and text
      html2canvas: {
        scale: 3,       // Higher scale = higher resolution
        useCORS: true,  // If using web fonts or external assets
        logging: false  // Disable for production
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    };
    console.log(element.classList);
    html2pdf().set(opt).from(element).save().then(() => {
      // Remove both classes after download
      element.classList.remove('print-pdf', 'no-frame');
    });
  };

  const handleTemplateChange = async (e) => {
  const newTemplateId = parseInt(e.target.value);

  try {
    const updated = {
      ...resume,
      template_id: newTemplateId,
      content: resume.content, // ensure content remains consistent
      title: resume.title,     // backend requires title
    };

    await updateResume(resume.id, updated);
    setResume((prev) => ({ ...prev, template_id: newTemplateId }));
  } catch (err) {
    alert('Failed to change template: ' + err.message);
  }
  };

  const handleDownloadDOCX = () => {
  const token = JSON.parse(localStorage.getItem("authData"))?.token;

  fetch(`http://localhost:5000/api/resumes/${resume.id}/download-docx`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${resume.title}_resume.docx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => alert('Download failed: ' + err.message));

      console.log()
  };



  // Error or loading states
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!resume) return <p className="text-center">Loading resume...</p>;

  const { content } = resume;

  return (
  <div className="p-8 max-w-4xl mx-auto">
    {/* AI enhancement trigger */}
    <button
      onClick={handleEnhance}
      className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      ✨ Enhance with AI
    </button>
    <button
      onClick={handleDownloadPDF}
      className="mb-6 ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Download as PDF
    </button>
    <button
    onClick={handleDownloadDOCX}
      className="mb-6 ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Download as DOCX
    </button>

    <div className="mb-6">
      <label htmlFor="templateSelector" className="block text-sm font-medium text-gray-700 mb-1">
        Choose a Template
      </label>
      <select
        id="templateSelector"
        value={resume.template_id}
        onChange={handleTemplateChange}
        className="border rounded p-2"
      >
        <option value={1}>Modern Professional</option>
        <option value={7}>Left Sidebar</option>
        <option value={8}>Classic Elegance</option>
        <option value={9}>Minimalist Grid</option>
        <option value={10}>Creative Designer</option>
        <option value={11}>Executive Impact</option>
      </select>
    </div>


    {/* Dynamic Resume Template Rendering */}
    {resume.template_id === 1 && <TemplateOne content={content} previewRef={previewRef} />}
    {resume.template_id === 7 && <TemplateTwo content={content} previewRef={previewRef} />}
    {resume.template_id === 8 && <TemplateThree content={content} previewRef={previewRef} />}
    {resume.template_id === 9 && <TemplateFour content={content} previewRef={previewRef} />}
    {resume.template_id === 10 && <TemplateFive content={content} previewRef={previewRef} />}
    {resume.template_id === 11 && <TemplateSix content={content} previewRef={previewRef} />}
  </div>
);

};

export default ResumePreviewPage;
