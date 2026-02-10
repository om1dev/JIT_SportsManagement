import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get("http://192.168.31.8:5000/api/games");
      setGames(res.data);
    } catch (err) {
      console.log("Error fetching games");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Games</Text>

      <FlatList
        data={games}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/slots?gameId=${item.id}&gameName=${item.name}`)}
          >
            <Text style={styles.gameName}>{item.name}</Text>
            <Text style={styles.players}>
              Max Players: {item.max_players}
            </Text>
          </TouchableOpacity>
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
  gameName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  players: {
    color: "#94a3b8"
  }
});
