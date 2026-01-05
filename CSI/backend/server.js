const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Allows frontend to connect
app.use(express.json()); // Parses JSON requests

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
}).catch(error => {
  console.error("❌ Failed to connect to MongoDB:", error);
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  faceData: { type: String, required: true }, // Base64 face encoding
});

const User = mongoose.model("User", UserSchema);

// Multer setup for handling images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/** 
 * @route POST /api/users/register
 * @desc Register a new user
 */
app.post("/api/users/register", upload.single("image"), async (req, res) => {
  try {
    const { username, password } = req.body;
    const imageBuffer = req.file.buffer.toString("base64");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, faceData: imageBuffer });

    await newUser.save();
    res.json({ message: "✅ Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Error registering user", details: err.message });
  }
});

/** 
 * @route POST /api/users/login
 * @desc Login user with face authentication
 */
app.post("/api/users/login", upload.single("image"), async (req, res) => {
  try {
    const { username, password } = req.body;
    const inputImage = req.file.buffer.toString("base64");

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "❌ User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "❌ Incorrect password" });

    if (user.faceData !== inputImage) {
      return res.status(401).json({ error: "❌ Face does not match!" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || "secretKey", {
      expiresIn: "1h",
    });

    res.json({ message: "✅ Login successful!", token });
  } catch (err) {
    res.status(500).json({ error: "❌ Error logging in", details: err.message });
  }
});

/**
 * @route GET /
 * @desc API Health Check
 */
app.get("/", (req, res) => {
  res.json({ message: "🚀 API is running..." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Internal Server Error", error: err.message });
});
