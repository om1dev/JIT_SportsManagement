import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SlotsScreen() {
  const { gameName } = useLocalSearchParams();
  const [slots, setSlots] = useState<any[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await axios.get("http://192.168.31.8:5000/api/slots");

      // filter slots by selected game
      const filtered = res.data.filter(
        (slot: any) => slot.game_name === gameName
      );

      setSlots(filtered);
    } catch (err) {
      console.log("Error fetching slots", err);
    }
  };

  const bookSlot = async (slotId: number) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      const res = await axios.post(
        "http://192.168.31.8:5000/api/bookings",
        { slot_id: slotId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Alert.alert("Success", res.data.message);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Booking failed"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gameName} Slots</Text>

      <FlatList
        data={slots}
        keyExtractor={(item: any) => item.slot_id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.time}>
              {item.day_of_week} — {item.start_time} to {item.end_time}
            </Text>

            <Text style={styles.info}>
              Allowed: {item.allowed_year} / {item.allowed_section}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => bookSlot(item.slot_id)}
            >
              <Text style={styles.buttonText}>Book Slot</Text>
            </TouchableOpacity>
          </View>
        )}
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
    borderRadius: 8,
    marginBottom: 10
  },
  time: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5
  },
  info: {
    color: "#94a3b8",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 6,
    alignItems: "center"
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  }
});
