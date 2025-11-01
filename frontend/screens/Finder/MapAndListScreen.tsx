import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const MapAndListScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  // 🔹 Get user location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Using default Los Angeles location.");
          setLocation({
            coords: { latitude: 34.052235, longitude: -118.243683 },
          });
        } else {
          const userLoc = await Location.getCurrentPositionAsync({});
          setLocation(userLoc);
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setLocation({
          coords: { latitude: 34.052235, longitude: -118.243683 },
        });
      }
    })();
  }, []);

  
  const fetchCoffeeShops = async () => {
    const API_URL = "https://roastroute.onrender.com/api/v1/cafe/"; 
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setShops(response.data);
    } catch (error: any) {
      console.error("Error fetching coffee shops:", error.message);
      Alert.alert("Error", "Unable to fetch coffee shops. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffeeShops();
  }, []);

  // 🔹 Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCoffeeShops();
    setRefreshing(false);
  };

  // Handle navigation 
  const handleShopPress = (shop: any) => {
    navigation.navigate("ShopDetail" as never, { id: shop._id } as never);
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
    handleShopPress(shop);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading coffee shops...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
        >
          {shops.map((shop) => (
            <Marker
              key={shop._id}
              coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
              title={shop.name}
              description={shop.address}
              onCalloutPress={() => handleShopPress(shop)}
            />
          ))}
        </MapView>
      )}

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
  style={styles.list}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: Dimensions.get("window").height * 0.45 },
  list: { flex: 1, backgroundColor: "#fff" },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  name: { fontSize: 16, fontWeight: "bold" },
  address: { color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MapAndListScreen;
