import React, { useEffect, useState } from 'react';
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem("owned");

    list ? setOwned(JSON.parse(list)) : localStorage.setItem("owned", [])
  }, []);

  const setNewOwned = (list) => {
    setOwned(list);
    localStorage.setItem("owned", JSON.stringify(list));
  }

  const catchPokemon = (pokemon) => {
    let newList = owned;
    newList.push(pokemon);
    setNewOwned(newList);
  }

  const releasePokemon = (index) => {
    const elementIndex = owned.indexOf(index);
    if (elementIndex > -1) {
      let newList = owned;
      newList.splice(elementIndex, 1);
      setNewOwned(newList);
    }
  }

  return (
    <UserContext.Provider
      value={{
        owned,
        setNewOwned,
        catchPokemon,
        releasePokemon
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;