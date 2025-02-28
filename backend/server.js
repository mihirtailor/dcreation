const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { verifyUser, authRoutes } = require("./middleware/auth");
const contactRoutes = require("./routes/contact");
const uploadRoutes = require("./routes/upload");
const servicesRoutes = require("./routes/services");
const portfolioRoutes = require("./routes/portfolio");
const { sequelize } = require("./connection");

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
app.use("/api", uploadRoutes);
app.use("/api", contactRoutes);
app.use("/api", servicesRoutes);
app.use("/api", portfolioRoutes);
const PORT = process.env.PORT || 5000;

sequelize
    .sync()
    .then(() => {
        console.log("Database tables created!");
    })
    .catch((err) => {
        console.log("Error:", err);
    });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
