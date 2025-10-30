import { createStackNavigator } from '@react-navigation/stack';
import MapAndListScreen from '../screens/Finder/MapAndListScreen';
import ShopDetailScreen from '../screens/Finder/ShopDetailScreen';

const Stack = createStackNavigator();

export default function FinderStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MapAndList" component={MapAndListScreen} options={{ title: 'Finder' }} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}
