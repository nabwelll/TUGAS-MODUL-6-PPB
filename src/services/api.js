import { BACKEND_URL } from "./config.js";

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

async function request(path, options = {}) {
  if (!BACKEND_URL) {
    throw new Error("BACKEND_URL is not set in app.json");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

export const Api = {
  getSensorReadings(page = 1, limit = 20) {
    const qs = `?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(
      limit
    )}`;
    return request(`/api/readings${qs}`);
  },
  getThresholds() {
    return request("/api/thresholds");
  },
  createThreshold(payload) {
    return request("/api/thresholds", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  login(username, password) {
    return request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },
  async verifyToken(token) {
    const previousToken = authToken;
    setAuthToken(token);
    try {
      const result = await request("/api/auth/verify");
      return result;
    } catch (error) {
      setAuthToken(previousToken);
      throw error;
    }
  },
};
