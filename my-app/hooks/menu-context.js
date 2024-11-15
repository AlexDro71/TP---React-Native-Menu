import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  const API_KEY = '84bfa556615c41f1b97139d65459c333';

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

        const responses = await Promise.all(requests);
        const newMenu = responses.map(response => response.data);
        setMenu(newMenu);
      } catch (error) {
        console.error("Error al obtener los datos de las recetas:", error);
      }
    };

    if (selectedIds.length > 0) {
      fetchMenuData();
    } else {
      setMenu([]); // Si no hay selectedIds, vacía el menú
    }
  }, [selectedIds]); // Dependemos de selectedIds, no de menu para evitar el bucle infinito

  useEffect(() => {
    const newTotalPrice = menu.reduce(
      (acc, plato) => {
        const pricePerServing = plato.pricePerServing || 0;
        const servings = plato.servings || 0;
        return acc + pricePerServing * servings;
      },
      0
    );

    const newAverageHealthScore = menu.length ? menu.reduce((acc, plato) => acc + (plato.healthScore || 0), 0) / menu.length : 0;

    setTotalPrice(newTotalPrice);
    setAverageHealthScore(newAverageHealthScore);
  }, [menu]);

  const addPlato = (plato) => {
    setMenu((prevMenu) => [...prevMenu, plato]);
    setSelectedIds((prevIds) => [...prevIds, plato.id]); // Añadir el id del plato a selectedIds
  };

  const removePlato = (id) => {
    setMenu((prevMenu) => prevMenu.filter((plato) => plato.id !== id));
    setSelectedIds((prevIds) => prevIds.filter((idItem) => idItem !== id)); // Eliminar el id de selectedIds
  };

  return (
    <MenuContext.Provider
      value={{
        menu,
        selectedIds,
        totalPrice,
        averageHealthScore,
        addPlato,
        removePlato,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
