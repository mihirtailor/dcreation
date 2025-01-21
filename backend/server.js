const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { verifyUser, authRoutes } = require("./routes/auth");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Protected admin route
app.get("/admin", verifyUser, (req, res) => {
  res.send("Protected route for admin");
});

// Use the authentication routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
