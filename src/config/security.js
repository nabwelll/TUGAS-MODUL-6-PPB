// Security configuration
// Centralized security settings for consistency across the application

const JWT_SECRET = process.env.JWT_SECRET || "ppb-iot-watch-secret-key-2024";

// Validate JWT_SECRET in production
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  WARNING: JWT_SECRET not set in environment. Using default secret.");
  console.warn("⚠️  This is NOT secure for production! Set JWT_SECRET in .env file.");
  
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production environment");
  }
}

// Rate limiting configuration
export const RATE_LIMITS = {
  // Login endpoint - prevent brute force attacks
  AUTH: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_ATTEMPTS: 5, // 5 attempts per window
  },
  // General API endpoints
  API: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // 100 requests per window
  },
};

// JWT configuration
export const JWT_CONFIG = {
  SECRET: JWT_SECRET,
  EXPIRY: "24h",
};

// Bcrypt configuration
export const BCRYPT_ROUNDS = 10;

export default {
  RATE_LIMITS,
  JWT_CONFIG,
  BCRYPT_ROUNDS,
};
