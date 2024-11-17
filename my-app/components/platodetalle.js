import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = '84bfa556615c41f1b97139d65459c333'; // Asegúrate de reemplazar esto con tu API Key

const PlatoDetalle = ({ visible, onClose, id, onAddToMenu, onRemoveFromMenu, menu }) => {
  const [plato, setPlato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && id) {
      setLoading(true);
      axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: API_KEY,
          includeNutrition: false,
          addWinePairing: false,
          addTasteData: false,
        },
      })
      .then((response) => {
        setPlato(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar los datos del plato');
        setLoading(false);
      });
    }
  }, [visible, id]);

  if (!visible) return null;

  if (loading) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{error}</Text>
            <Button title="Cerrar" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  }

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
