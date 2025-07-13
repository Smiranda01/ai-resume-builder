// Base URL for authentication-related API endpoints
const BASE_URL = "http://localhost:5000/api/auth";

// Function to register a new user
export const register = async (name, email, password) => {
  try {
    // Send registration data to backend
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    // Handle non-OK responses with specific message
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    // Return confirmation data from backend
    const data = await response.json();
    return data;
  } catch (error) {
    // Propagate error to calling logic
    throw error;
  }
};

// Function to activate a user's account via token
export const activateAccount = async (token) => {
  try {
    // Call backend activation endpoint using token from email
    const response = await fetch(`${BASE_URL}/activate/${token}`, {
      method: "GET"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Activation failed");
    }

    // Return activation success message
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to resend activation email for unverified accounts
export const resendActivationEmail = async (email) => {
  try {
    // Send email to backend to trigger resend
    const response = await fetch(`${BASE_URL}/resend-activation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Resend failed");
    }

    // Return success message
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
