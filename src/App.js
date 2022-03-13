import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { CreateTodoButton } from "./CreateTodoButton";

const todos = [
  { text: "a", completed: true },
  { text: "b", completed: true },
  { text: "c", completed: true },
  { text: "d", completed: false },
];

function App() {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.text} text={todo.text} />
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
