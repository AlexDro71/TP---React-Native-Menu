import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuContext } from '../hooks/menu-context';

const Plato = ({ plato }) => {
  const navigation = useNavigation();
  const { menu, addPlato, removePlato } = useContext(MenuContext) || {};

  // Verificar si el plato ya está en el menú
  const isInMenu = menu ? menu.some(item => item.id === plato.id) : false;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.title}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: plato.image }} style={styles.image} />
      </View>

      <View style={styles.actions}>
        {!isInMenu ? (
          <Button title="Agregar receta" onPress={() => addPlato && addPlato(plato)} />
        ) : (
          <>
            <Button
              title="Ver Detalles"
              onPress={() => navigation.navigate('Detalles', { plato })}
            />
            <Button title="Eliminar" color="red" onPress={() => removePlato && removePlato(plato.id)} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: 325,
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
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
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
