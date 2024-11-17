import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);
  const [veganCount, setVeganCount] = useState(0); // Contador de platos veganos

  const API_KEY = "9fdf83b34ae64971be5e7263b9f72cbf";

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const requests = selectedIds.map((id) =>
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
        const newMenu = responses.map((response) => response.data);

        // Contar la cantidad de platos veganos en el nuevo menú
        const newVeganCount = newMenu.filter((plato) => plato.vegan).length;

        setMenu(newMenu);
        setVeganCount(newVeganCount); // Actualizar el conteo vegano
      } catch (error) {
        console.error("Error al obtener los datos de las recetas:", error);
      }
    };

    if (selectedIds.length > 0) {
      fetchMenuData();
    } else {
      setMenu([]); // Si no hay selectedIds, vacía el menú
      setVeganCount(0); // Reiniciar el contador vegano
    }
  }, [selectedIds]);

  useEffect(() => {
    const newTotalPrice = menu.reduce((acc, plato) => {
      const pricePerServing = plato.pricePerServing || 0;
      const servings = plato.servings || 0;
      return acc + pricePerServing * servings;
    }, 0);

    const newAverageHealthScore = menu.length
      ? menu.reduce((acc, plato) => acc + (plato.healthScore || 0), 0) / menu.length
      : 0;

    setTotalPrice(newTotalPrice);
    setAverageHealthScore(newAverageHealthScore);
  }, [menu]);

  const addPlato = (plato) => {
    if (menu.length >= 4) {
      console.warn("No puedes agregar más de 4 platos.");
      return;
    }

    if (plato.vegan && veganCount >= 2) {
      console.warn("Ya tienes el límite de 2 platos veganos.");
      return;
    }

    if (!plato.vegan && menu.length - veganCount >= 2) {
      console.warn("Ya tienes el límite de 2 platos no veganos.");
      return;
    }

    setMenu((prevMenu) => [...prevMenu, plato]);
    setSelectedIds((prevIds) => [...prevIds, plato.id]);
    if (plato.vegan) {
      setVeganCount((prevVeganCount) => prevVeganCount + 1);
    }
  };

  const removePlato = (id) => {
    const platoToRemove = menu.find((plato) => plato.id === id);

    if (platoToRemove) {
      setMenu((prevMenu) => prevMenu.filter((plato) => plato.id !== id));
      setSelectedIds((prevIds) => prevIds.filter((idItem) => idItem !== id));
      if (platoToRemove.vegan) {
        setVeganCount((prevVeganCount) => prevVeganCount - 1);
      }
    }
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
