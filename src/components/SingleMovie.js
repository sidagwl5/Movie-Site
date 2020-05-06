import React, { Component } from 'react';
import {Link} from "react-router-dom"
import store from "./Store"
import Fire from "../scripts/Fire"

class SingleMovie extends Component {

    constructor(){

        super()
        this.state = {

            uploader : null
        }
    }

    componentDidMount(){

             Fire.firestore().collection("Users").where("id", "==", this.props.userId).get().then(snapshot=>{

                  snapshot.forEach(doc=>{

                         this.setState({

                            uploader : doc.data().displayName
                         })
                  })
             })

    }

    render() {
        return (
            <div className = "singlemovie-main">
                   <img className = "singlemovie-image" alt = {this.props.name + "movie wallpaper"} src = {this.props.image} />

                   <div className = "singlemovie-submain">
                   <h1 style = {{fontSize : "30px", color : "orange"}}>{this.props.name}</h1>
                    <p><span style = {{color : "white"}}>Uploaded by</span>- {this.state.uploader}</p>
                    <Link className = "link" to = {"/moviepage/" + this.props.name}>Click</Link>
                   </div>    
            </div>
        );
    }
}


export default SingleMovie;