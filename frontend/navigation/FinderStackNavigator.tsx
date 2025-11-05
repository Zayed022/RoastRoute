import { createStackNavigator } from '@react-navigation/stack';
import MapAndListScreen from '../screens/Finder/MapAndListScreen';
import ShopDetailScreen from '../screens/Finder/ShopDetailScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';

const Stack = createStackNavigator();

export default function FinderStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MapAndList" component={MapAndListScreen}  options={{ headerShown: false }}  />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} /> 
    </Stack.Navigator>
  );
}
