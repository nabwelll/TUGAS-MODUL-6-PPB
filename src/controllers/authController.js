import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "ppb-iot-watch-secret-key-2024";

if (!process.env.JWT_SECRET) {
  console.warn("⚠️  WARNING: JWT_SECRET not set in environment. Using default secret.");
  console.warn("⚠️  This is NOT secure for production! Set JWT_SECRET in .env file.");
  
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production environment");
  }
}

// Simple in-memory user store for demonstration purposes only
// ⚠️ IMPORTANT: In production, users should be stored in a secure database
// with passwords loaded from environment variables or secure configuration
// Note: Password is pre-hashed to avoid blocking event loop at startup
const users = [
  {
    id: 1,
    username: "admin",
    // Password: "admin123" (pre-hashed with bcrypt, 10 rounds)
    // This is for demo/development only - never hardcode credentials in production!
    password: "$2a$10$Msh8r.bQDvwkCwi3VcsDBOiE4zFyj9bpnyNXLcomYjVeJOtFOhNnK",
    name: "Administrator",
    email: "admin@iotwatch.com",
  },
];

export const AuthController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      // Find user
      const user = users.find((u) => u.username === username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, username: user.username, name: user.name },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async verify(req, res) {
    // Token is already verified by middleware
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        name: req.user.name,
      },
    });
  },
};
