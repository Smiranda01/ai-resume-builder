import React from 'react';

// TemplateCard component displays a single resume template with actions
// Props:
// - template: the template data object
// - onSelect: function to call when user selects the template
// - onEdit: function to call when admin clicks "Edit"
// - onDelete: function to call when admin clicks "Delete"
// - isAdmin: boolean to show/hide admin controls
const TemplateCard = ({ template, onSelect, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="flex flex-col justify-between h-full border rounded-xl p-6 shadow bg-white hover:shadow-md transition">
      
      {/* Main content: name and description */}
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-purple-800 mb-2">
          {template.name}
        </h3>

        <p className="text-gray-600 text-sm">
          {template.description || "No description provided."}
        </p>
      </div>

      {/* Action buttons for both users and admins */}
      <div className="flex flex-wrap gap-2 mt-6">
        <button
          onClick={() => onSelect(template.id)}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded"
        >
          Use Template
        </button>

        {/* Only show edit/delete buttons if user is an admin */}
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(template.id)}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-sm px-3 py-1.5 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(template.id)}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm px-3 py-1.5 rounded"
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
