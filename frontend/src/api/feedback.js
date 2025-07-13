// src/api/feedback.js

// Base URL for feedback-related endpoints
const BASE_URL = "http://localhost:5000/api/feedback";

// Helper function to attach authentication headers using token stored in localStorage
const authHeaders = () => {
  const token = JSON.parse(localStorage.getItem("authData"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Attach JWT token in Authorization header
  };
};

// Sends resume content to backend which relays it to OpenAI for feedback generation.
export const generateFeedback = async (resume_id, input) => {
  const payload = { resume_id, input };

  console.log("[Sending to OpenAI]", payload); // Debug log for development

  try {
    const response = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("[Response from OpenAI]", data); // Debug log for development

    // Throw error if request was not successful
    if (!response.ok) {
      throw new Error(data.message || "Failed to generate feedback");
    }

    return data; // Return the structured AI feedback 
  } catch (error) {
    console.error("[Feedback API Error]", error.message);
    throw error; // Propagate error to frontend UI for display
  }
};
