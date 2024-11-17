import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import Plato from '../../components/plato';
import { MenuContext } from '../../hooks/menu-context';
import PlatoDetalle from '../../components/platodetalle';
import { useNavigation } from '@react-navigation/native';

interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  pricePerServing: number;
  vegetarian: boolean;
}

export default function TabTwoScreen() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlato, setSelectedPlato] = useState<Recipe | null>(null);

  const { menu, addPlato, removePlato } = useContext(MenuContext);
  const navigation = useNavigation();

  const handleSearch = async () => {
    Keyboard.dismiss();
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=84bfa556615c41f1b97139d65459c333`
      );
      console.log(response.data);
      setResult(response.data.results);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const handleOpenModal = (plato: Recipe) => {
    setSelectedPlato(plato);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlato(null);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Buscar receta"
            value={query}
            onChangeText={setQuery}
          />
          <View style={styles.boton}>
            <Button title="Buscar" onPress={handleSearch} />
          </View>
        </View>
      </Pressable>

      <View style={styles.content}>
   
  {result.length > 0 ? (
    result.map((item) => (
      <FlatList
      data={result}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Plato plato={item} />
          <View style={styles.actions}>
            {!menu.some((plato: Recipe) => plato.id === item.id) ? (
              <Button title="Agregar receta" onPress={() => addPlato && addPlato(item)} />
            ) : (
              <Button title="Eliminar" color="red" onPress={() => removePlato && removePlato(item.id)} />
            )}
            <Button
              title="Ver Detalles"
              onPress={() => handleOpenModal(item)}
            />
          </View>
    
          {/* Render the modal for the current item if it's selected */}
         
            <PlatoDetalle
              visible={modalVisible}
              id={item.id}
              onClose={handleCloseModal}
              onAddToMenu={addPlato(item)}
              onRemoveFromMenu={removePlato(item.id)}
              menu={menu}
            />
         
        </View>
      )}
      ListEmptyComponent={<Text style={styles.noResults}>No se encontraron resultados.</Text>}
    />
    ))
  ) : (
    <Text style={styles.noResults}>No se encontraron resultados.</Text>
  )}
</View>


     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
  },
  boton: {
    backgroundColor: 'lime',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'gray',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultsContainer: {
    marginTop: 16,
  },
  noResults: {
    marginTop: 16,
    textAlign: 'center',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
