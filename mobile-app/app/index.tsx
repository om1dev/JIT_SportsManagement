import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post("http://192.168.31.8:5000/api/auth/login", {
        college_email: email,
        password: password
      });

      const token = response.data.accessToken;
      await AsyncStorage.setItem("accessToken", token);

      router.push("/home");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sports Slot Booking</Text>

      <TextInput
        style={styles.input}
        placeholder="College Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 40,
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    color: "#ffffff"
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center"
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  }
});
