// src/api/feedback.js

const BASE_URL = "http://localhost:5000/api/feedback";  


// Shared auth header helper
const authHeaders = () => {
  const token = JSON.parse(localStorage.getItem("authData"))?.token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const generateFeedback = async (resume_id, input) => {
  const payload = { resume_id, input };
  console.log("[Sending to OpenAI]", payload);

  try {
    const response = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("[Response from OpenAI]", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to generate feedback");
    }

    return data;
  } catch (error) {
    console.error("[Feedback API Error]", error.message);
    throw error;
  }
};