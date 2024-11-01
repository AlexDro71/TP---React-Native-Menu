import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]); // Información de los platos en el menú
  const [selectedIds, setSelectedIds] = useState([]); // Array de IDs de platos seleccionados
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  const API_KEY = '1e2d6c96cba04ad3a24dc520531c3f7c';

  // Función para actualizar los datos del menú cada vez que cambia `selectedIds`
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const requests = selectedIds.map(id =>
          axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
              apiKey: API_KEY,
              includeNutrition: false,
              addWinePairing: false,
              addTasteData: false,
            },
          })
        );

        // Hacer todas las solicitudes en paralelo y actualizar el menú con la data obtenida
        const responses = await Promise.all(requests);
        const newMenu = responses.map(response => response.data);

        // Actualizar el estado del menú con la información obtenida de cada receta
        setMenu(newMenu);
      } catch (error) {
        console.error("Error al obtener los datos de las recetas:", error);
      }
    };

    if (selectedIds.length > 0) {
      fetchMenuData();
    } else {
      setMenu([]);
    }
  }, [selectedIds]);

  // Actualizar el precio total y el promedio de HealthScore cada vez que cambia el menú
  useEffect(() => {
    const newTotalPrice = menu.reduce(
      (acc, plato) => acc + plato.pricePerServing * plato.servings,
      0
    );
    const newAverageHealthScore = menu.length
      ? menu.reduce((acc, plato) => acc + plato.healthScore, 0) / menu.length
      : 0;

    setTotalPrice(newTotalPrice);
    setAverageHealthScore(newAverageHealthScore);
  }, [menu]);

  // Función para agregar o eliminar un ID de la lista de IDs seleccionados
  const toggleSelectedId = (id) => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(existingId => existingId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <MenuContext.Provider value={{
      menu,
      selectedIds,
      totalPrice,
      averageHealthScore,
      toggleSelectedId
    }}>
      {children}
    </MenuContext.Provider>
  );
};