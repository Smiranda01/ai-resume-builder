// src/api/resumes.js

// Base URL for all resume-related API endpoints
const BASE_URL = "http://localhost:5000/api/resumes";

// Helper function to retrieve the user's JWT token from localStorage and build the auth headers
const authHeaders = () => {
  const token = JSON.parse(localStorage.getItem("authData"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


// Fetches all resumes belonging to the currently logged-in user.
export const getUserResumes = async () => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      headers: authHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resumes");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetches a specific resume by its ID (used for edit/preview)
export const getResumeById = async (resumeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${resumeId}`, {
      headers: authHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resume");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Creates a new resume and stores it in the database.
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

//Updates an existing resume.

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

//Deletes a resume by its ID.

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
