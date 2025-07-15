// Import the JSON Web Token library
const jwt = require('jsonwebtoken');

// Middleware to authenticate users using JWT
const authMiddleware = (req, res, next) => {
  
  // Read the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract the token from the header (remove "Bearer " prefix)
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token is invalid or expired
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Export the middleware function to be used in route protection
module.exports = authMiddleware;
