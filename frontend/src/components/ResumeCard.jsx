// src/components/ResumeCard.jsx

import React from 'react';

const ResumeCard = ({ resume, onEdit, onDelete, onPreview }) => {
  return (
    <div className="border rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{resume.title || "Untitled Resume"}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Last updated: {new Date(resume.updated_at).toLocaleDateString() || "N/A"}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onPreview(resume.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Preview
        </button>
        <button
          onClick={() => onEdit(resume.id)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(resume.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
