import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import ShopDetailScreen from "../screens/Finder/ShopDetailScreen";

const Stack = createStackNavigator();

export default function FavoritesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
  name="FavoritesList"
  component={FavoritesScreen}
  options={{ headerShown: false }}   // 👈 Hides duplicate header
/>

      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ title: "Details" }} />
    </Stack.Navigator>
  );
}
