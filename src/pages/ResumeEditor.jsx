import React, { useState } from 'react';
import api from '../services/api';

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    education: '',
    experience: '',
    skills: '',
    summary: ''
  });

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleAIEnhance = async () => {
    try {
      const res = await api.post('/ai', resumeData);
      setResumeData({ ...resumeData, summary: res.data.suggestedSummary });
    } catch (err) {
      console.error(err);
      alert('AI enhancement failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Resume Editor</h2>
      {['name', 'education', 'experience', 'skills', 'summary'].map((field) => (
        <div key={field} className="mb-3">
          <label className="form-label text-capitalize">{field}</label>
          <textarea
            className="form-control"
            name={field}
            rows="2"
            onChange={handleChange}
            value={resumeData[field]}
          />
        </div>
      ))}
      <button className="btn btn-outline-primary" onClick={handleAIEnhance}>
        Enhance Summary with AI
      </button>
    </div>
  );
};

export default ResumeEditor;
