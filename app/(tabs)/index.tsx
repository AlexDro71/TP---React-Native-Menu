import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from '@/app/menu-context'; // Ajustado según la nueva configuración
import MenuScreen from '@/app/screens/menu'; // Ajustado según la nueva configuración

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
