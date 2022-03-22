import React, { useContext, useState } from "react";
import { TodoContext } from "../TodoContext";
import './TodoForm.css'
function TodoForm() {
  const [newTodoValue, setNewTodoValue] = useState("");
  const { addTodo, setOpenModal } = useContext(TodoContext);

  const onChangeText = (event) => {
    setNewTodoValue(event.target.value);
  };
  const onCancel = (event) => {
    setOpenModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label> Name To do:</label>
      <textarea
        value={newTodoValue}
        onChange={onChangeText}
        placeholder="Todo"
      />
      <div className="TodoForm-buttonContainer">
        <button type="button" className="TodoForm-button TodoForm-button--cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">Add</button>
      </div>
    </form>
  );
}

export { TodoForm };
