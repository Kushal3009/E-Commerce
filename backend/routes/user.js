const express = require("express");
const router = express.Router();
const { userValidationRules } = require("../middleware/validationMiddleware.js");
const { createUser, login } = require("../controller/user.js");
const authenticateToken = require("../middleware/checkAuth.js");

// Use POST for creating users
router.post("/createUser", userValidationRules(), createUser);
router.post("/login", login);

// Route to check authentication
router.get("/check-auth", authenticateToken, (req, res) => {
  res.status(200).json({ message: "User is authenticated", user: req.user });
});

// Route to logout
router.get("/logout", authenticateToken, (req, res) => {
    console.log("inside logout");
    try {
      console.log("inside logout try block");
    res.clearCookie("token"); // Clear the token cookie with a path
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
