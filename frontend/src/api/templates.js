// src/api/templates.js

const BASE_URL = "http://localhost:5000/api/templates";  // Backend templates API

// Get all available templates (for users and admins)
export const getAllTemplates = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch templates");
    }
    const data = await response.json();
    return data;  // Array of templates
  } catch (error) {
    throw error;
  }
};

// Get a specific template by ID (optional, usually not used)
export const getTemplateById = async (templateId) => {
  try {
    const response = await fetch(`${BASE_URL}/${templateId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch template");
    }
    const data = await response.json();
    return data;  // Template object
  } catch (error) {
    throw error;
  }
};

// Create a new template (admin)
export const createTemplate = async (templateData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(templateData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create template");
    }

    const data = await response.json();
    return data;  // Created template
  } catch (error) {
    throw error;
  }
};

// Update an existing template (admin)
export const updateTemplate = async (templateId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${templateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update template");
    }

    const data = await response.json();
    return data;  // Updated template
  } catch (error) {
    throw error;
  }
};

// Delete a template (admin)
export const deleteTemplate = async (templateId) => {
  try {
    const response = await fetch(`${BASE_URL}/${templateId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete template");
    }

    const data = await response.json();
    return data;  // { message: "Template deleted successfully" }
  } catch (error) {
    throw error;
  }
};
