import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { MenuContext } from '../hooks/menu-context';

const Plato = ({ plato }) => {
  const { menu, addPlato, removePlato } = useContext(MenuContext) || {};
  const menuContext = useContext(MenuContext);
  console.log(menuContext);

 

  const isInMenu = menu ? menu.some(item => item.id === plato.id) : false;

  const handleAddToMenu = () => {
    addPlato(plato);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.title}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: plato.image }} style={styles.image} />
      </View>

      <View style={styles.actions}>
        {isInMenu ? (
          <>
            <Button title="Ver Detalles" onPress={() => { /* Acción futura de ver detalles */ }} />
            <Button title="Eliminar" color="red" onPress={() => removePlato && removePlato(plato.id)} />
          </>
        ) : (
          <Button title="Agregar Receta" color="green" onPress={handleAddToMenu} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: 325,  // Ajustar el padding para mejor presentación
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    alignItems: 'center',  // Centrar la imagen horizontalmente
    marginBottom: 10,  // Espacio entre la imagen y el título
  },
  image: {
    width: 300,  // Asegúrate de que la imagen ocupe el 100% del contenedor
    height: 200,    // Ajusta la altura según sea necesario
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});

export default Plato;
