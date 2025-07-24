const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Middleware to verify JWT token
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token'); // Or 'Authorization' header like 'Bearer TOKEN'

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // Example if using 'Bearer TOKEN' format:
    // const tokenParts = token.split(' ');
    // if (tokenParts[0] !== 'Bearer') {
    //     return res.status(401).json({ msg: 'Invalid token format' });
    // }
    // const actualToken = tokenParts[1];

    // Ensure you have JWT_SECRET in your backend's .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user information to the request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

