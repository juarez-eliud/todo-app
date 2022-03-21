import React, { useState, useEffect } from "react";
import { AppUI } from "./AppUI";

/* const defaultTodos = [
  { text: "a", completed: true },
  { text: "b", completed: true },
  { text: "c", completed: false },
  { text: "d", completed: false },
]; */

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

function App() {
  /* Para que pueda funcionar el custom hook debe retornar la propiedad (item) y la función (saveItem)
  Para renombrar las propiedades del objeto se hace mediante el símbolo de dos puntos (:) */
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = useState("");
  const completedTodos = todos.filter((todo) => todo.completed).length;
  // Other way, bang bang operator:
  // const [completedTodos] = todos.filter(todo => !!todo.completed);
  const totalTodos = todos.length;

  //Filtering todos
  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchedText = searchValue.toLowerCase();
      return todoText.includes(searchedText);
    });
  }

  //Other way
  // searchedTodos = !searchValue.length?todos:todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()));

  //const todosFiltered = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()));
  /* Queda mucho más compacto y no es necesario hacer la validación inicial del largo
  puesto que include si le pasas una cadena vacía te muestra todos. */

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    /* No se puede entrar a editar el estado direcamente, si se hace así 
    React no podrá hacer re-render, se tienen que enviar los cambios al estado mediante las función
    set que cada estado tiene */
    const newTodos = [...todos];

    //Actualizando estado
    newTodos[todoIndex].completed = true;
    //Other way
    // newTodos[todoIndex] = { text: todos[todoIndex].text, completed: true }
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    /* Una analogía referente al método splice es sacar una rebanada de pan
    se indica desde donde se va a empezar a cortar y cuantas tajadas se van a sacar */
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <AppUI
      loading={loading}
      error={error}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
