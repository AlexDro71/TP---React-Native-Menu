import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Button } from 'react-native';
import { MenuContext } from '../../hooks/menu-context';
import PlatoDetalle from '../../components/platodetalle';

interface Plato {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  vegetarian: boolean;
}

export default function HomeScreen() {
  const { menu, totalPrice, averageHealthScore, addPlato, removePlato } = useContext(MenuContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlato, setSelectedPlato] = useState<Plato | null>(null);

  const handleOpenModal = (item: Plato) => {
    setSelectedPlato(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlato(null);
  };

  const handleAddToMenu = (item: Plato) => {
    if (addPlato) addPlato(item);
    handleCloseModal();
  };

  const handleRemoveFromMenu = (itemId: number) => {
    if (removePlato) removePlato(itemId);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>

      <Text style={styles.stats}>Total del Precio del Menú: ${totalPrice?.toFixed(2) || '0.00'}</Text>
      <Text style={styles.stats}>Promedio de HealthScore: {averageHealthScore?.toFixed(1) || '0.0'}</Text>

      {menu?.length > 0 ? (
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.platoContainer}>
              <Text style={styles.platoTitle}>{item.title}</Text>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.buttonContainer}>
                <Button
                  title="Eliminar"
                  color="red"
                  onPress={() => handleRemoveFromMenu(item.id)}
                />
                <Button
                  title="Ver Detalle"
                  color="blue"
                  onPress={() => handleOpenModal(item)}
                />
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No hay platos en el menú.</Text>
      )}

      {modalVisible && selectedPlato && (
        <PlatoDetalle
          visible={modalVisible}
          plato={selectedPlato}
          onClose={handleCloseModal}
          onAddToMenu={handleAddToMenu}
          onRemoveFromMenu={handleRemoveFromMenu}
          menu={menu}
        />
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
    flex: 1,
    padding: 10,
    width: 325,
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  platoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
