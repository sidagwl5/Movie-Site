import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import * as func from "../scripts/Functions";
import store from "./Store";

const LoginButton = () => {
  return store.user ? (
    <Link className="loginbutton-link" to={"/profile"}>
      <img className="dp" src={store.user?.photoURL} alt="profile pic" />
    </Link>
  ) : (
    <button className="loginbutton-button" onClick={() => func.Login()}>
      SignIn
    </button>
  );
};

export default observer(LoginButton);
