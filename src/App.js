import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from "pages/Home";
import PokemonList from "pages/PokemonList";
import MyPokemon from "pages/MyPokemon";

import { useWindowSize } from "utils";

function App() {
  const [width] = useWindowSize();

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
        >
          {/* <Home /> */}
          <PokemonList width={width} />
        </Route>

        <Route
          exact
          path="/my-pokemon"
        >
          <MyPokemon width={width} />
        </Route>

        {/* If no route found */}
        <Route path="/:any">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
