import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainView from './assets/view/MainView';
import OrderView from './assets/view/OrderView';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainView} />
        <Stack.Screen name="Order" component={OrderView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}