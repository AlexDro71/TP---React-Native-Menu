import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, FlatList, Pressable,TouchableOpacity } from 'react-native';
import axios from 'axios';
import Plato from '../../components/plato';
import { MenuContext } from '../../hooks/menu-context';
import PlatoDetalle from '../../components/platodetalle';
import { useNavigation } from '@react-navigation/native';

interface Recipe {
  id: number;
  nombre: string;
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
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=9fdf83b34ae64971be5e7263b9f72cbf`
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
  keyExtractor={(item) => item.id.toString()} // Ensure item.id is unique and exists
  renderItem={({ item }) => (
    <View key={item.id.toString()}> {/* Optional: key on the parent View */}
      <Plato plato={item} />

      <View style={styles.actions}>
        {!menu.some((plato: Recipe) => plato.id === item.id) ? (
          <TouchableOpacity onPress={() => addPlato && addPlato(item)} style={styles.button}>
          <Text style={styles.buttonText}>Agregar receta</Text>
        </TouchableOpacity>
        
        ) : (
          <TouchableOpacity onPress={() => removePlato && removePlato(item.id)} style={[styles.button, styles.removeButton]}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleOpenModal(item)} style={styles.button}>
              <Text style={styles.buttonText}>Ver Detalles</Text>
            </TouchableOpacity>
      </View>

      {modalVisible && selectedPlato?.id === item.id && (
        <PlatoDetalle
          visible={modalVisible}
          id={selectedPlato.id}
          onClose={handleCloseModal}
          onAddToMenu={(plato: Recipe) => addPlato && addPlato(plato)}
          onRemoveFromMenu={(platoId: number) => removePlato && removePlato(platoId)}
          menu={menu}
        />
      )}
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
  cardContainer: {
    marginBottom: 10, // Space between cards
    padding: 10, // Inner padding for card content
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
  },
  actions: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space between buttons
    marginTop: 10, // Space between content and buttons
  },
  container: {
    flex: 1,
    padding: 16,
    height: 400,
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
});
