import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickButton = () => {
    // Toggle button
    /*  Todos las funciones actualizadoras de estado permiten
    enviar el valor directamente a actualizar y también una función 
    que devuelve el estado anterior (prevSate), por lo que se puede retornar
    el estado anterior pero con algún cambio */
    props.setOpenModal((prevState) => !prevState);
  };

  return (
    <button className="CreateTodoButton" onClick={onClickButton}>
      +
    </button>
  );
}

export { CreateTodoButton };
