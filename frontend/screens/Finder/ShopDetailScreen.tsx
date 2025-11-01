import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ShopDetailScreen = () => {
  const route = useRoute();
  const { id }: any = route.params;
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // 🔹 Fetch shop details
  const fetchShopDetails = async () => {
    const API_URL = `https://roastroute.onrender.com/api/v1/cafe/${id}`; 
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setShop(response.data);
    } catch (error: any) {
      console.error("Error fetching shop:", error.message);
      Alert.alert("Error", "Failed to load coffee shop details.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Check if already in favorites
  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const favArray = JSON.parse(favorites);
        setIsFavorite(favArray.includes(id));
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  // 🔹 Add to favorites
  const addToFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      if (!favorites.includes(id)) {
        const updated = [...favorites, id];
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
        setIsFavorite(true);
        Alert.alert("Added!", `${shop?.name} has been added to favorites.`);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Alert.alert("Error", "Something went wrong while saving.");
    }
  };

  useEffect(() => {
    fetchShopDetails();
    checkIfFavorite();
  }, []);

  if (loading || !shop) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading shop details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{shop.name}</Text>
      <Text style={styles.address}>{shop.address}</Text>
      <Text style={styles.detail}>⭐ Rating: {shop.rating}</Text>
      <Text style={styles.detail}>☕ Specialty: {shop.specialty}</Text>

      <TouchableOpacity
        style={[styles.button, isFavorite ? styles.disabledButton : {}]}
        disabled={isFavorite}
        onPress={addToFavorites}
      >
        <Text style={styles.buttonText}>
          {isFavorite ? "Already in Favorites" : "Add to Favorites"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#3C6E71",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShopDetailScreen;
