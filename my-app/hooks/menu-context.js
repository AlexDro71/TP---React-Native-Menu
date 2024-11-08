// menu-context.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  const API_KEY = '1e2d6c96cba04ad3a24dc520531c3f7c';

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
      setMenu([]);
    }
  }, [selectedIds]);

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

  const toggleSelectedId = (id) => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(existingId => existingId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Función para agregar un plato al menú
  const addPlato = (plato) => {
    setMenu(prevMenu => [...prevMenu, plato]);
  };

  const removePlato = (id) => {
    setMenu(prevMenu => prevMenu.filter(plato => plato.id !== id));
  };

  return (
    <MenuContext.Provider value={{
      menu,
      selectedIds,
      totalPrice,
      averageHealthScore,
      toggleSelectedId,
      addPlato,
      removePlato
    }}>
      {children}
    </MenuContext.Provider>
  );
};
