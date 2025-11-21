import { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useMqttSensor } from "../hooks/useMqttSensor.js";
import { Api } from "../services/api.js";
import { DataTable } from "../components/DataTable.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeableScreen } from "../components/SwipeableScreen.js";

export function MonitoringScreen() {
  const { temperature, timestamp, connectionState, error: mqttError } = useMqttSensor();
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReadings = useCallback(
    async (pageToFetch = page) => {
      setLoading(true);
      setApiError(null);
      try {
        const result = await Api.getSensorReadings(pageToFetch, limit);
        setReadings(result?.data ?? []);
        setPage(result?.page ?? pageToFetch);
        setTotalPages(result?.totalPages ?? 1);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [limit, page]
  );

  useFocusEffect(
    useCallback(() => {
      fetchReadings(page);
    }, [fetchReadings])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchReadings();
    } finally {
      setRefreshing(false);
    }
  }, [fetchReadings]);

  function goNext() {
    if (page < totalPages) {
      fetchReadings(page + 1);
    }
  }

  function goPrev() {
    if (page > 1) {
      fetchReadings(page - 1);
    }
  }

  return (
    <SwipeableScreen>
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Realtime Temperature</Text>
        <View style={styles.valueRow}>
          <Text style={styles.temperatureText}>
            {typeof temperature === "number" ? `${temperature.toFixed(2)}°C` : "--"}
          </Text>
        </View>
        <Text style={styles.metaText}>MQTT status: {connectionState}</Text>
        {timestamp && (
          <Text style={styles.metaText}>
            Last update: {new Date(timestamp).toLocaleString()}
          </Text>
        )}
        {mqttError && <Text style={styles.errorText}>MQTT error: {mqttError}</Text>}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Triggered Readings History</Text>
        {loading && <ActivityIndicator />}
      </View>
      {apiError && <Text style={styles.errorText}>Failed to load history: {apiError}</Text>}
      <DataTable
        columns={[
          {
            key: "recorded_at",
            title: "Timestamp",
            render: (value) => (value ? new Date(value).toLocaleString() : "--"),
          },
          {
            key: "temperature",
            title: "Temperature (°C)",
            render: (value) =>
              typeof value === "number" ? `${Number(value).toFixed(2)}` : "--",
          },
          {
            key: "threshold_value",
            title: "Threshold (°C)",
            render: (value) =>
              typeof value === "number" ? `${Number(value).toFixed(2)}` : "--",
          },
        ]}
        data={readings}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.paginationRow}>
        <Button title="Sebelumnya" onPress={goPrev} disabled={page <= 1 || loading} />
        <Text style={styles.pageText}>{`Halaman ${page} / ${totalPages}`}</Text>
        <Button title="Berikutnya" onPress={goNext} disabled={page >= totalPages || loading} />
      </View>
    </ScrollView>
    </SafeAreaView>
    </SwipeableScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#ff7a59",
  },
  metaText: {
    marginTop: 8,
    color: "#555",
  },
  errorText: {
    marginTop: 8,
    color: "#c82333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  pageText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
