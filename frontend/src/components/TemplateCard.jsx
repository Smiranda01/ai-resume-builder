// src/components/TemplateCard.jsx

import React from 'react';

const TemplateCard = ({ template, onSelect, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="border rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{template.description || "No description provided."}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSelect(template.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Use Template
        </button>

        {/* Admin actions */}
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(template.id)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(template.id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
