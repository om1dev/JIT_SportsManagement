import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("Token:", token);

    const res = await axios.get(
      "http://192.168.31.8:5000/api/bookings/my",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Bookings response:", res.data);

    setBookings(res.data);
  } catch (err) {
    console.log("Error fetching bookings", err);
  }
};


  const getStatusColor = (status: string) => {
    if (status === "approved") return "#22c55e";
    if (status === "rejected") return "#ef4444";
    return "#facc15"; // pending
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.game}>{item.game_name}</Text>

            <Text style={styles.time}>
              {item.day_of_week} — {item.start_time} to {item.end_time}
            </Text>

            <Text
              style={[
                styles.status,
                { color: getStatusColor(item.status) }
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No bookings yet
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold"
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12
  },
  game: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  time: {
    color: "#94a3b8",
    marginTop: 4
  },
  status: {
    marginTop: 8,
    fontWeight: "bold"
  },
  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 50
  }
});
