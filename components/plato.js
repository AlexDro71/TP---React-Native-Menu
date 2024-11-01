import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { MenuContext } from '../context/MenuContext';

const Plato = ({ plato }) => {
  const { menu, removePlato } = useContext(MenuContext);

  // Verificar si el plato ya está en el menú
  const isInMenu = menu.some(item => item.id === plato.id);

  return (
    <View style={styles.container}>
      {/* Imagen y título del plato */}
      <Image source={{ uri: plato.image }} style={styles.image} />
      <Text style={styles.title}>{plato.title}</Text>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <Button title="Ver Detalles" onPress={() => { /* Acción futura de ver detalles */ }} />
        
        {/* Mostrar botón "Eliminar" solo si el plato está en el menú */}
        {isInMenu && (
          <Button title="Eliminar" color="red" onPress={() => removePlato(plato.id)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Plato;