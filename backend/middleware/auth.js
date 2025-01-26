const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "thisismysecretkey";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD =
  "$2b$10$YtfljJEUTjcv1mGOPrJHhe6QKJKJfO3rM9GRtz6xEG0EieFucLA3m";

// Middleware to verify the token
function verifyUser(request, response, next) {
  const token = request.headers["authorization"];
  if (!token) {
    return response.status(403).json({
      error: true,
      message: "Token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json({
      error: true,
      message: "Invalid Token",
    });
  }
}

// Login route for admin-only access
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required values" });
  }

  try {
    // Check if the provided email matches admin email
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password with stored admin password
    const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for admin
    const token = jwt.sign({ user_id: "admin", role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = {
  verifyUser,
  authRoutes: router,
};
