// src/pages/ActivateAccount.jsx
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
        setStatus('✅ Account activated! You can now log in.');
      } catch (error) {
        setStatus('❌ Invalid or expired activation link.');
      }
    };

    activate();
  }, [token]);

  return (
    <div>
      <h2>Account Activation</h2>
      <p>{status}</p>
      {status.startsWith('✅') && <Link to="/login">Go to Login</Link>}
    </div>
  );
};

export default ActivateAccount;
