import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export function CustomSplash() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="thermometer-outline" size={80} color="#2563eb" />
        <Text style={styles.title}>IOTWatch</Text>
        <Text style={styles.subtitle}>Smart Temperature Monitoring</Text>
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#2563eb",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
