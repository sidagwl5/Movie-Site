import React, { Component } from "react";
import LoginButton from "./LoginButton";
import AddMovies from "./AddMovies";
import { tw } from "twind";

class Header extends Component {
  render() {
    return (
      <div className={tw("header-main1", "p-[4vw] sm:p-[2vw]!")}>
        <AddMovies />
        <LoginButton />
      </div>
    );
  }
}

export default Header;
