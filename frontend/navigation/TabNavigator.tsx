import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FinderStackNavigator from './FinderStackNavigator';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

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
        component={FavoritesScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="star" color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
