import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './frontend/navigation/TabNavigator';

function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;
