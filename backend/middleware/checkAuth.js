// middleware/checkAuth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  if (!req.cookies) return res.sendStatus(400); // Bad Request

  const token = req.cookies.token;

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
