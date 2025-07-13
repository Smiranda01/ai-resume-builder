const BASE_URL = "http://localhost:5000/api/templates";  // Or use process.env

// Get all templates
export const getAllTemplates = async () => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch templates");
  }
  return res.json();
};

// Get a template by ID
export const getTemplateById = async (templateId) => {
  const res = await fetch(`${BASE_URL}/${templateId}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch template");
  }
  return res.json();
};

// Create a new template (admin only)
export const createTemplate = async (templateData, token) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(templateData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create template");
  }

  return res.json();
};

// Update a template (admin only)
export const updateTemplate = async (templateId, updatedData, token) => {
  const res = await fetch(`${BASE_URL}/${templateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update template");
  }

  return res.json();
};

// Delete a template (admin only)
export const deleteTemplate = async (templateId, token) => {
  const res = await fetch(`${BASE_URL}/${templateId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete template");
  }
};
