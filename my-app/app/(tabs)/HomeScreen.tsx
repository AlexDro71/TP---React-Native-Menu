import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { MenuContext } from '../../hooks/menu-context';

export default function HomeScreen() {
  const { menu } = useContext(MenuContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la Home Screen!</Text>
      <Text style={styles.description}>Esta es una pantalla de inicio en React Native.</Text>

      {menu && menu.length > 0 ? (
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.platoContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.platoTitle}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No hay platos en el menú.</Text>
      )}
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  noItemsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  platoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  platoTitle: {
    fontSize: 18,
    color: '#333',
  },
});
