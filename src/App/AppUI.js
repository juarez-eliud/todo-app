import React, { useContext } from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoContext } from "../TodoContext";
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
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
      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}
      {/* Se envía el actualizador de estado: setOpenModal */}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
