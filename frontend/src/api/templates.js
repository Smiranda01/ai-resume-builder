// Base URL for resume template API
const BASE_URL = "https://resumebuilder.santiagocloudlab.com/api/templates"; 

// Fetches all available resume templates (public endpoint).
export const getAllTemplates = async () => {
  const res = await fetch(`${BASE_URL}`);
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch templates");
  }

  return res.json();
};

//Fetches a single resume template by its ID (used in preview/edit).
export const getTemplateById = async (templateId) => {
  const res = await fetch(`${BASE_URL}/${templateId}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch template");
  }

  return res.json();
};

//Creates a new resume template (admin-only route).
export const createTemplate = async (templateData, token) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Auth header for protected route
    },
    body: JSON.stringify(templateData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create template");
  }

  return res.json();
};

//Updates an existing template (admin-only route).
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

// Deletes a template by ID (admin-only route)
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
