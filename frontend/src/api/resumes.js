// src/api/resumes.js

const BASE_URL = "http://localhost:5000/api/resumes";

// Helper to include auth header
const authHeaders = () => {
  const token = JSON.parse(localStorage.getItem("authData"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get all resumes for the logged-in user
export const getUserResumes = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      headers: authHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resumes");
    }

    return await response.json(); // Array of resumes
  } catch (error) {
    throw error;
  }
};

// Get a specific resume by ID (for edit/preview)
export const getResumeById = async (resumeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`, {
      headers: authHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resume");
    }

    return await response.json(); // Resume object
  } catch (error) {
    throw error;
  }
};

// Create a new resume
export const createResume = async (resumeData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create resume");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Update an existing resume
export const updateResume = async (resumeId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update resume");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Delete a resume
export const deleteResume = async (resumeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete resume");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
