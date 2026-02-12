import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
  try {
    const res = await axios.get("http://192.168.31.8:5000/api/games");
    console.log("Games response:", res.data);
    setGames(res.data);
  } catch (err) {
    console.log("Error fetching games", err);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Games</Text>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/slots?gameName=${item.name}`)
            }
          >
            <Text style={styles.gameName}>{item.name}</Text>
            <Text style={styles.players}>
              Max Players: {item.max_players}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No games found</Text>
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
  gameName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  players: {
    color: "#94a3b8",
    marginTop: 4
  },
  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 50
  }
});
