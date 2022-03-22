import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
// {provider, consumer}
const TodoContext = React.createContext();

function TodoProvider(props) {
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
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
