  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, StyleSheet, Keyboard, FlatList, Pressable } from 'react-native';
  import axios from 'axios';
  import Plato from '../../components/plato';

  type Recipe = {
    id: number;
    title: string;
    image: string;
  };

  export default function TabTwoScreen() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<Recipe[]>([]);

    const handleSearch = async () => {
      // Cerrar el teclado al presionar el botón de búsqueda
      Keyboard.dismiss();
      
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=1e2d6c96cba04ad3a24dc520531c3f7c`
        );
        console.log(response.data);
        setResult(response.data.results);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    };

    return (
      <View style={styles.container}>
        {/* Envuelve solo el área de búsqueda en TouchableWithoutFeedback */}
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

        {/* FlatList para mostrar los resultados */}
        <View style={styles.content}>
        <FlatList

          data={result}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Plato plato={item} />
          )}
          ListEmptyComponent={<Text style={styles.noResults}>No se encontraron resultados.</Text>}
          contentContainerStyle={styles.resultsContainer}
        />
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
      color: 'white',
      textDecorationColor: 'white',
      backgroundColor: 'blue',
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
