import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import PokemonList from "pages/PokemonList";
import MyPokemon from "pages/MyPokemon";
import PokemonDetail from "pages/PokemonDetail";

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
          <PokemonList width={width} />
        </Route>

        <Route
          exact
          path="/my-pokemon"
        >
          <MyPokemon width={width} />
        </Route>

        <Route
          exact
          path="/detail/:name"
        >
          <PokemonDetail width={width} />
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
