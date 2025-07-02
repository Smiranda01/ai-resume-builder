// src/api/feedback.js

const BASE_URL = "http://localhost:5000/api/feedback";  // Backend feedback API

// Generate AI-powered feedback for a resume
export const generateFeedback = async (userId, resumeId, inputData) => {
  try {
    const response = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        resume_id: resumeId,
        input: inputData
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate AI feedback");
    }

    const data = await response.json();
    return data;  // { feedback_id, resume_json, ai_response_raw }
  } catch (error) {
    throw error;
  }
};
