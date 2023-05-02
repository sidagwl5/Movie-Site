import React, { Component } from "react";
import store from "./Store";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

class AddMovies extends Component {
  render() {
    return store.user ? (
      <Link className="addmovies-link" to="/addMovies">
        <button>Add</button>
      </Link>
    ) : null;
  }
}

export default observer(AddMovies);
