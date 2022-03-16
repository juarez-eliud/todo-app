import React from "react";
import "./TodoSearch.css";

function TodoSearch({ searchValue, setSearchValue }) {
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
        placeholder="ph"
        onChange={onSearchValueChange}
        value={searchValue}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}

export { TodoSearch };
