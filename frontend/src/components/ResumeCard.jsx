import React from 'react';

// Component that displays a single resume card with title, summary, ATS score, and actions
const ResumeCard = ({ resume, onEdit, onDelete, onPreview }) => {
  // Format the last updated date
  const formattedDate = new Date(resume.updated_at).toLocaleDateString();

  // Access summary and ATS score (if present)
  const summary = resume.content?.summary || 'No summary provided.';
  const atsScore = resume.content?.ATS_score;

  return (
    <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
      <h3 className="text-xl font-semibold text-purple-800">
        {resume.title}
      </h3>

      <p className="text-gray-600 mt-1 italic">
        {summary}
      </p>

      <p className="text-sm text-gray-400 mt-2">
        Last updated: {formattedDate}
      </p>

      {atsScore && (
        <p className="text-green-600 font-medium text-sm mt-2">
          ATS Score: {atsScore}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => onPreview(resume.id)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Preview
        </button>

        <button
          onClick={() => onEdit(resume.id)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(resume.id)}
          className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-md shadow-sm transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
