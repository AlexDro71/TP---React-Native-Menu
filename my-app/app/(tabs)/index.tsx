import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MenuProvider } from '../../hooks/menu-context';  // Ajusta la ruta de importación
import HomeScreen from './HomeScreen';

export default function App() {
  return (
    <MenuProvider>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
});
