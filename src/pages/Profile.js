import React, { Component } from 'react';
import store from "../components/Store"
import * as func from "../scripts/Functions"
import {observer} from "mobx-react"
import {Link} from "react-router-dom"
import Fire from "../scripts/Fire"

class Profile extends Component {



    constructor(){

          super()
          this.state = {

            path : [],
            condition : false
          }
    }

 componentDidMount(){

    const name = this.props.match.params.id
  
    func.setAuthListener()
                     
    Fire.firestore().collection("Users").where("displayName", "==", name).get().then(snapshot=>{


        snapshot.forEach(doc=>{

            const id = doc.data().id
            var arr = [];
            Fire.firestore().collection("movies").where("userId", "==", id).onSnapshot((snapshot)=>{
    
                
                snapshot.docChanges().forEach(change=>{
                   
                
                               if(change.type == "added")
                               {
                                
                                arr.push(change.doc.data())
                                this.setState({
                                    path : arr,
                                    condition : true
                                })
                               }
                               else if(change.type == "removed"){
                                 
                                   arr = arr.filter(v=>{

                                         return v.name != change.doc.data().name
                                   })
                                   this.setState({
                                    path : arr,
                                    condition : true
                                })

                               }
                })
            })

        })
        })
}


    handleClick(e){


          Fire.firestore().collection("movies").where("name", "==", e.target.id).get().then(snapshot=>{

                snapshot.forEach(doc=>{

                    Fire.firestore().collection("movies").doc(doc.id).delete()

                    Fire.storage().ref("images/").child(doc.id).delete().then(()=>{

                        console.log("deleted successfully")
                    })
                    
                })

               
          })


    }


    render() {
        return (
            <div style = {{width : "100%", height : "100vh", position : "relative"}}>
           <div  className = "profile-main">
              
               </div>
               <div className = "profile-main2">
                   <div className = "profile-main2-part1">
                       <div className = "user-info">
                       <img src = {store.User.photoURL} />
                       <h1>{store.User.displayName}</h1>
                       <Link to = "/"><button style = {{marginBottom : "5%"}} className = "btn" onClick = {()=>func.signOut()}>Sign-Out</button></Link>
                       <Link to = "/moviepage"><button className = "btn">MoviePage</button></Link>
                           </div>
                           <div className = "user-movie">
                              <h4>Movies Uploaded</h4>
                              {

                                    (this.state.condition)?this.state.path.map(v=>{

                                          return(
                                            <div className = "movielist" style = {{backgroundColor : "rgba(0,0,0,0.2)", width : "50%",display : "flex",justifyContent : "space-between",marginTop : "4px" ,padding : "10px"}}>
                                              <span>{v.name}</span>
                                              <button style = {{borderRadius : "4px",border : "none", backgroundColor : "rgba(0,0,0,0.4)", color : "white"}} id ={v.name} onClick = {(e)=>this.handleClick(e)}>x</button>
                                              </div>
                                          )
                                    }) : null

                              }
                           </div>
                    </div>   
                </div>   
               </div>
           
        );
    }
}


export default observer(Profile)