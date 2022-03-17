import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { CreateTodoButton } from "../CreateTodoButton";

function AppUI({
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  searchedTodos,
  completeTodo,
  deleteTodo,
}) {
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

export { AppUI };
