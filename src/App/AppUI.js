import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoContext } from "../TodoContext";
function AppUI() {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoContext.Consumer>
        {/* Render props, value from TodoContext.Provider */}
        {({ error, loading, searchedTodos, completeTodo, deleteTodo }) => (
          <TodoList>
            {error && <p> Hubo un error</p>}
            {loading && <p>Loading...</p>}
            {!loading && !searchedTodos.length && <p>Crea tu primer todo</p>}
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
        )}
      </TodoContext.Consumer>
      <CreateTodoButton />
    </React.Fragment>
  );
}

export { AppUI };
