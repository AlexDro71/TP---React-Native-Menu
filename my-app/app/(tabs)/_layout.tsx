import React from 'react';
import { Tabs } from 'expo-router';
import { MenuProvider } from '@/hooks/menu-context'; // Importa el MenuProvider
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <MenuProvider> {/* Envuelve tus pantallas con MenuProvider */}
      <Tabs   
        screenOptions={{
          tabBarActiveTintColor: Colors['dark'].tint, // Color del icono activo
          tabBarInactiveTintColor: '#888', // Color del icono inactivo
          tabBarStyle: styles.tabBar, // Estilo de la barra de pestañas
          tabBarLabelStyle: styles.tabBarLabel, // Estilo del texto de la pestaña
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Recetas',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'book' : 'book-outline'}
                color={color}
                size={24} // Tamaño del ícono
              />
            ),
          }}
        />
        <Tabs.Screen
          name="buscar"
          options={{
            title: 'Buscar',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'search' : 'search-outline'}
                color={color}
                size={24} // Tamaño del ícono
              />
            ),
          }}
        />
      </Tabs>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f9fa', // Color de fondo de la barra de pestañas
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60, // Altura de la barra de pestañas
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12, // Tamaño del texto de la pestaña
    fontWeight: '600', // Peso del texto de la pestaña
  },
});
