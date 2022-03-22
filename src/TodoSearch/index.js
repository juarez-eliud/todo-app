import React, {useContext}from "react";
import "./TodoSearch.css";
import { TodoContext } from "../TodoContext";

function TodoSearch() {
  const { searchValue, setSearchValue } = useContext(TodoContext);

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  //Reset input search
  const handleKeyDown = (event) => {
    event.keyCode === 27 && setSearchValue('');
  };

  return (
    <>
      <span key="value" className="">{`Estas buscando: ${searchValue}`}</span>
      <input
        key="searchFunction"
        className="TodoSearch"
        placeholder="Search"
        onChange={onSearchValueChange}
        value={searchValue}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}

export { TodoSearch };
