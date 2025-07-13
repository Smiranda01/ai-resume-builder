// Middleware to restrict access to admin-only routes

module.exports = (req, res, next) => {
  // Check if the authenticated user exists and has the admin role
  if (req.user && req.user.role === 'admin') {
    // User is an admin, proceed to the next middleware or controller
    next();
  } else {
    // User is not an admin, block access with a 403 Forbidden response
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
