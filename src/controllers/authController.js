import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "ppb-iot-watch-secret-key-2024";

// Simple in-memory user store (in production, use a database)
const users = [
  {
    id: 1,
    username: "admin",
    password: "$2a$10$X5JKvv5W5v5v5v5v5v5v5.5v5v5v5v5v5v5v5v5v5v5v5", // hashed "admin123"
    name: "Administrator",
    email: "admin@iotwatch.com",
  },
];

// Pre-hash the default password
const defaultPasswordHash = bcrypt.hashSync("admin123", 10);
users[0].password = defaultPasswordHash;

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
