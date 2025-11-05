import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MapView from "react-native-maps";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
    const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  // 🔹 Fetch all shops from backend
  const fetchAllShops = async () => {
    const API_URL = "https://roastroute.onrender.com/api/v1/cafe/"; // your backend endpoint
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching all shops:", error.message);
      Alert.alert("Error", "Failed to load coffee shops.");
      return [];
    }
  };

  // 🔹 Load favorites from AsyncStorage and filter data
  const loadFavorites = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem("favorites");
      const favIds = stored ? JSON.parse(stored) : [];
      setFavorites(favIds);

      const allShops = await fetchAllShops();
      const filtered = allShops.filter((shop: any) => favIds.includes(shop._id));
      setShops(filtered);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  // 🔹 Reload favorites when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleShopPress = (id: string) => {
  navigation.navigate("ShopDetail" as never, { id } as never);
};

const handleListPress = (shop: any) => {
  mapRef.current?.animateToRegion(
    {
      latitude: shop.latitude,
      longitude: shop.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    1000
  );

  handleShopPress(shop._id); // ✅ Pass just the ID
};




  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  if (shops.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>You haven't saved any favorites yet ☕</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
  data={shops}
  keyExtractor={(item) => item._id.toString()}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleListPress(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  name: { fontSize: 16, fontWeight: "bold" },
  address: { color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#777" },
});

export default FavoritesScreen;
