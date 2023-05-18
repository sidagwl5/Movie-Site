import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { tw } from "twind";
import store from "./Store";

const AddMovies = () => {
  return (
    <div className={tw("flex gap-5 items-center mr-auto")}>
      {store.user ? (
        <Link className="addmovies-link" to="/addMovies">
          <button>Add</button>
        </Link>
      ) : null}
      <Link className="addmovies-link" to="/">
        <button>Home</button>
      </Link>
      <Link className="addmovies-link" to="/moviepage">
        <button>Movie Page</button>
      </Link>
    </div>
  );
};

export default observer(AddMovies);
