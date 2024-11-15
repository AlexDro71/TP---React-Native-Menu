import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { MenuContext } from '../../hooks/menu-context';

export default function HomeScreen() {
  const { menu, totalPrice, averageHealthScore } = useContext(MenuContext);
  console.log(totalPrice, averageHealthScore)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      

      {/* Mostrar el acumulativo de precio y promedio de HealthScore */}
      <Text style={styles.stats}>Total del Precio del Menú: ${totalPrice.toFixed(2)}</Text>
      <Text style={styles.stats}>Promedio de HealthScore: {averageHealthScore.toFixed(1)}</Text>

      {menu && menu.length > 0 ? (
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.platoContainer}>
              <Text style={styles.platoTitle}>{item.title}</Text>
              <Image source={{ uri: item.image }} style={styles.image} />
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
  stats: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
  },
  noItemsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  platoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    width: 500,
    height: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    alignItems: 'center',
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginRight: 12,
  },
  platoTitle: {
    fontSize: 32,
    color: '#00000',
    textAlign: 'center',
    marginBottom: 20
  },
});
