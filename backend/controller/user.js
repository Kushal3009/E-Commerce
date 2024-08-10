const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const User = require("../models/User.js");
const { createHmac, randomBytes } = require("crypto");
const secret = process.env.SECRET;

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Generate a random salt
    const salt = randomBytes(10).toString("hex");

    // Hash the password with the salt
    const hash = createHmac("sha256", secret)
      .update(password + salt)
      .digest("hex");

    // Create new user with hashed password and salt
    const user = new User({ username, email, password: hash, salt });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Does not Exist" });
    }

    // Retrieve the salt and hashed password from the database
    const { salt, password: hashedPassword } = user;

    // Hash the provided password with the salt
    const hash = createHmac("sha256", secret)
      .update(password + salt)
      .digest("hex");

    // Compare the hashed password with the stored hashed password
    if (hash === hashedPassword) {
      const payload = {
        user: user.username,
      }
      const token = jwt.sign(payload,secret)
      res.cookie('token',token)
      return res.status(200).json({ message: "Login successful",username: user.username});
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createUser,
  login,
};
