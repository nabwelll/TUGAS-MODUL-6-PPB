import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "../services/api.js";

const AuthContext = createContext(null);

const TOKEN_KEY = "iotwatch_auth_token";
const USER_KEY = "iotwatch_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      const storedUser = await AsyncStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Verify token is still valid
        try {
          await Api.verifyToken(storedToken);
        } catch (error) {
          // Token is invalid or network error occurred
          console.log("Token verification failed:", error.message);
          
          // Check if it's an authentication error vs network error
          const isAuthError = 
            error.message.toLowerCase().includes("401") ||
            error.message.toLowerCase().includes("403") ||
            error.message.toLowerCase().includes("unauthorized") ||
            error.message.toLowerCase().includes("forbidden") ||
            error.message.toLowerCase().includes("token") ||
            error.message.toLowerCase().includes("expired");
          
          if (isAuthError) {
            // Clear invalid token
            await logout();
          }
          // For network errors, keep the token and try again later
        }
      }
    } catch (error) {
      console.error("Failed to load auth:", error);
    } finally {
      setLoading(false);
    }
  }

  async function login(username, password) {
    try {
      const response = await Api.login(username, password);
      const { token: newToken, user: newUser } = response;

      await AsyncStorage.setItem(TOKEN_KEY, newToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
