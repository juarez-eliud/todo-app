import { useState, useEffect } from "react";

// Custom Hook
function useLocalStorage(itemName, initialValue) {
  //Simulando obtener datos de API
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);
  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        //Actualizando estado
        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 3000);
  });

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };
  /* Si se tienen muchos estados en el custom React Hook no es recomendable 
    retornar un arreglo con todas las propiedades sino más bien un objeto. */
  return { item, saveItem, loading, error };
}

export { useLocalStorage };