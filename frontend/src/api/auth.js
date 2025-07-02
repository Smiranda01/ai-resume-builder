// src/api/auth.js
const BASE_URL = "http://localhost:5000/api/auth";  // Backend auth API


// Function to login user
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;  // { token, user }
  } catch (error) {
    throw error;
  }
};

// Function to register new user
export const register = async (name, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })  // Correct JSON format!
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  

// Function to activate user account
export const activateAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/activate/${token}`, {
      method: "GET"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Activation failed");
    }

    const data = await response.json();
    return data;  // { message: "Account activated" }
  } catch (error) {
    throw error;
  }
};

// Function to resend activation email
export const resendActivationEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/resend-activation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Resend failed");
    }

    const data = await response.json();
    return data;  // { message: "Activation email resent" }
  } catch (error) {
    throw error;
  }
};
