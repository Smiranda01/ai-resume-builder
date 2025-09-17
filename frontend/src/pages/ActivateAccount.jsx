import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Component responsible for activating a user's account using a token from the URL
const ActivateAccount = () => {
  // Get the token from the URL using react-router
  const { token } = useParams();

  // Track the current status: 'Verifying...', 'success', or 'error'
  const [status, setStatus] = useState('Verifying...');

  // useEffect runs once on mount, attempts to activate the account using the token
  useEffect(() => {
    const activate = async () => {
      try {
        // Send GET request to backend with activation token
        const res = await axios.get(`https://resumebuilder.santiagocloudlab.com/api/auth/activate/${token}`);
        setStatus('success'); // Mark as successful if no error
      } catch (error) {
        setStatus('error'); // Mark as error if the request fails
      }
    };

    activate();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Account Activation</h2>

        {/* Display loading message while verifying */}
        {status === 'Verifying...' && (
          <p className="text-gray-600">Verifying your account...</p>
        )}

        {/* Show success message and link to login */}
        {status === 'success' && (
          <>
            <p className="text-green-600 font-medium mb-4">
              Your account has been activated successfully!
            </p>
            <Link
              to="/login"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Go to Login
            </Link>
          </>
        )}

        {/* Show error if activation fails */}
        {status === 'error' && (
          <p className="text-red-600 font-medium">
            Invalid or expired activation link.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
