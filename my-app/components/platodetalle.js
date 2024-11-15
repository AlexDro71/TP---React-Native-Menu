import React from 'react';
import { View, Text, Button, Image, StyleSheet, Modal } from 'react-native';

const PlatoDetalle = ({ visible, onClose, plato, onAddToMenu, onRemoveFromMenu, menu }) => {
  if (!plato) return null;

  const isInMenu = menu?.some((item) => item.id === plato.id) || false;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{plato.title}</Text>
          <Image source={{ uri: plato.image }} style={styles.modalImage} />
          <Text style={styles.modalText}>HealthScore: {plato.healthScore}</Text>
          <Text style={styles.modalText}>Precio: ${plato.pricePerServing.toFixed(2)}</Text>
          <Text style={styles.modalText}>Vegano: {plato.vegetarian ? 'Sí' : 'No'}</Text>

          <View style={styles.buttonContainer}>
            {isInMenu ? (
              <Button title="Eliminar del Menú" color="red" onPress={() => onRemoveFromMenu(plato.id)} />
            ) : (
              <Button title="Agregar al Menú" color="green" onPress={() => onAddToMenu(plato)} />
            )}
          </View>

          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 250,
    height: 150,
    borderRadius: 12,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444',
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlatoDetalle;
