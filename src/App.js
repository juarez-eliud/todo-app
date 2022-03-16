import React, { useState } from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { CreateTodoButton } from "./CreateTodoButton";

const defaultTodos = [
  { text: "a", completed: true },
  { text: "b", completed: true },
  { text: "c", completed: false },
  { text: "d", completed: false },
];

function App() {
  const [todos, setTodos] = useState(defaultTodos);
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
    const todoIndex = todos.findIndex(todo => todo.text === text);
    /* No se puede entrar a editar el estado direcamente, si se hace así 
    React no podrá hacer re-render, se tienen que enviar los cambios al estado mediante las función
    set que cada estado tiene */
    const newTodos = [...todos];

    //Actualizando estado
    newTodos[todoIndex].completed = true;
    //Other way
    // newTodos[todoIndex] = { text: todos[todoIndex].text, completed: true }
    setTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);  
    const newTodos = [...todos];
    /* Una analogía referente al método splice es sacar una rebanada de pan
    se indica desde donde se va a empezar a cortar y cuantas tajadas se van a sacar */
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  }

  return (
    <React.Fragment>
      <TodoCounter completedTodos={completedTodos} totalTodos={totalTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo) => (
          // Se puede optimizar el envió del text y completed en el TodoItem utilizando el spread operator
          // <TodoItem key={todo.text} {...todo} />
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
        {/* Otra alternativa: */}
        {/* {todos.map((todo, index) => (
          <TodoItem text={todo.text} key={index} />
        ))} */}
      </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
