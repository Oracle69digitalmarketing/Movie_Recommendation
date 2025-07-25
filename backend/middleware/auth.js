const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config(); // Load environment variables from .env file

// Middleware to verify JWT token
module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization'); // Get the Authorization header
if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
}

const tokenParts = authHeader.split(' ');
if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token format is not valid (Expected: Bearer TOKEN)' });
}
const token = tokenParts[1]; // This is the actual JWT token

console.log('AUTH MIDDLEWARE - Received Token for verification:', token);
  console.log('AUTH MIDDLEWARE - JWT_SECRET being used:', process.env.JWT_SECRET);

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
       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the extracted token here

req.user = { id: decoded.userId }; // Assign the actual user ID from the token payload to req.user.id

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};




