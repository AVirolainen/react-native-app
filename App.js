import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen'
import PlayField from './components/PlayField'


const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="PlayField" options={{ headerShown: false }} component={PlayField} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;


