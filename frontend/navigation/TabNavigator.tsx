import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FinderStackNavigator from './FinderStackNavigator';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesStackNavigator from './FavoritesStackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Finder" 
        component={FinderStackNavigator}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} /> }}
      />
     <Tab.Screen 
  name="Favorites" 
  component={FavoritesStackNavigator}
  options={{ tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} /> }}
/>

      
    </Tab.Navigator>
  );
}
