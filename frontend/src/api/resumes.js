// src/api/resumes.js

const BASE_URL = "http://localhost:5000/api/resumes";  // Backend resumes API

// Get all resumes created by a specific user
export const getUserResumes = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resumes");
    }
    const data = await response.json();
    return data;  // Array of resumes
  } catch (error) {
    throw error;
  }
};

// Get a specific resume by ID (for editing)
export const getResumeById = async (resumeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resume");
    }
    const data = await response.json();
    return data;  // Single resume object
  } catch (error) {
    throw error;
  }
};

// Create a new resume
export const createResume = async (resumeData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resumeData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create resume");
    }

    const data = await response.json();
    return data;  // Created resume object
  } catch (error) {
    throw error;
  }
};

// Update an existing resume
export const updateResume = async (resumeId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update resume");
    }

    const data = await response.json();
    return data;  // Updated resume object
  } catch (error) {
    throw error;
  }
};

// Delete a resume
export const deleteResume = async (resumeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete resume");
    }

    const data = await response.json();
    return data;  // { message: "Resume deleted successfully" }
  } catch (error) {
    throw error;
  }
};
