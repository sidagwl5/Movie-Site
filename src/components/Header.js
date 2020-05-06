import React, { Component } from 'react';
import LoginButton from "./LoginButton"
import AddMovies from "./AddMovies"

class Header extends Component {
    render() {
        return (
            <div className = "header-main1">
         
          
                 <AddMovies />
                 <LoginButton />
             
            </div>
        );
    }
}



export default Header;