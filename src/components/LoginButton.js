import React, { Component } from 'react';
import * as func from "../scripts/Functions"
import {observer} from "mobx-react"
import store from "./Store"
import {Link} from "react-router-dom"

class LoginButton extends Component {
    render() {
        return (
         
                
                    (store.isLoggedIn)?<Link className = "loginbutton-link" to = {"/profile/" + store.User.displayName} ><img className = "dp" src = {store.User.photoURL} alt = "profile pic" /></Link>:<button className = "loginbutton-button"  onClick = {()=>func.Login()}>SignIn</button>
                
            
        );
    }
}

export default observer(LoginButton)