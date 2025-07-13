import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/activate/${token}`);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    activate();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Account Activation</h2>

        {status === 'Verifying...' && (
          <p className="text-gray-600">Verifying your account...</p>
        )}

        {status === 'success' && (
          <>
            <p className="text-green-600 font-medium mb-4">Your account has been activated successfully!</p>
            <Link
              to="/login"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Go to Login
            </Link>
          </>
        )}

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
