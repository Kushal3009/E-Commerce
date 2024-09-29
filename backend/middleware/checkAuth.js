const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token; // Ensure you're correctly accessing cookies

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid' }); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token verification failed' }); // Forbidden
    }

    req.userId = decoded.id; // Store user ID in request object
    next();
  });
};


module.exports = authenticateToken;
