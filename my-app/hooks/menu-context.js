import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);
  let vegan = 0;
  let nonVegan = 0;
  menu.map(plato => {
    if (plato.vegan === true) { // Usar comparación estricta
    vegan++;
  } else if (plato.vegan === false) { // Usar comparación estricta
    nonVegan++;
  }
  });


  const API_KEY = "3c980922330a4e258cf12abcb9af3d1e";

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
  }, [selectedIds]);

  useEffect(() => {
    const newTotalPrice = menu.reduce((acc, plato) => {
      const pricePerServing = plato.pricePerServing || 0;
      const servings = plato.servings || 0;
      return acc + pricePerServing * servings;
    }, 0);

    const newAverageHealthScore = menu.length
      ? menu.reduce((acc, plato) => acc + (plato.healthScore || 0), 0) /
        menu.length
      : 0;

    setTotalPrice(newTotalPrice);
    setAverageHealthScore(newAverageHealthScore);
  }, [menu]);

  const addPlato = (plato) => {

    console.log("v count", vegan)
    console.log("nv count", nonVegan)
    if (menu.length >= 4) {
      console.warn("No puedes agregar más de 4 platos.");
      return;
    }
    if(vegan >= 2 ){
      
      console.warn("Se supero el maximo de platos veganos")
      return;
    }
    if(nonVegan >= 2 ){
      console.warn("Se supero el maximo de platos no veganos")
      return;
    }
   
    setMenu((prevMenu) => [...prevMenu, plato]);
    setSelectedIds((prevIds) => [...prevIds, plato.id]);
  };

  const removePlato = (id) => {
    const platoToRemove = menu.find((plato) => plato.id === id);

    if (platoToRemove) {
      setMenu((prevMenu) => prevMenu.filter((plato) => plato.id !== id));
      setSelectedIds((prevIds) => prevIds.filter((idItem) => idItem !== id));
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
