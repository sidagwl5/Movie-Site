import React, { Component } from 'react';
import Fire from '../scripts/Fire';
import SingleMovie from "../components/SingleMovie"
import Loading from "../components/Loading"
import Header from "../components/Header"
import * as func from "../scripts/Functions"


class MoviePage extends Component {

    constructor() {

        super()
        this.state = {
            path: [],
            condition: false,
            checked: false,

        }
    }


    componentDidMount() {


        func.setAuthListener()
        Fire.firestore().collection("movies").orderBy("name").get().then(snapshot => {
            var arr = [];
            snapshot.forEach(doc => {
                arr.push(doc.data())
                this.setState({
                    path: arr,
                    condition: true,

                })

            })
        })


    }


    handleChange(e) {

        if (e.target.value === '') {

            Fire.firestore().collection("movies").orderBy("name").get().then(snapshot => {
                var arr = [];
                snapshot.forEach(doc => {
                    arr.push(doc.data())
                    this.setState({
                        path: arr,
                        condition: true
                    })

                })
            })
        }

        else {
            Fire.firestore().collection("movies").where("name", ">=", e.target.value).get().then(snapshot => {
                var arr = [];

                snapshot.forEach(doc => {
                    arr.push(doc.data())
                    this.setState({
                        path: arr,
                        condition: true
                    })

                })
            })

        }

        console.log(e.target.value);
    }


    handleClick(e) {


        if (e.target.id != "All") {
            Fire.firestore().collection("movies").where("category", "==", e.target.id).get().then(snapshot => {


                if (snapshot.empty == false) {
                    var arr = [];

                    snapshot.forEach(doc => {
                        arr.push(doc.data())
                        this.setState({
                            path: arr,
                            condition: true
                        })

                    })
                }
                else {
                    alert("no movies found")
                }

            })
        }
        else {


            Fire.firestore().collection("movies").orderBy("name").get().then(snapshot => {
                var arr = [];
                snapshot.forEach(doc => {
                    arr.push(doc.data())
                    this.setState({
                        path: arr,
                        condition: true
                    })

                })
            })


        }



    }

    
    render() {
        return (
            <div className="moviepage-main">

                <div className="moviepage-submain">

                    <div className="moviepage-part1">
                    </div>

                    <h1><span>Movie</span> section</h1>

                    <input type="text" onChange={(e) => this.handleChange(e)} placeholder="Enter the name of movie..." />


                
                    <div className="moviepage-part2">

                        <button id="Sci-fi" onClick={(e) => this.handleClick(e)}>Sci-fi</button>
                        <button id="Anime" onClick={(e) => this.handleClick(e)}>Anime</button>
                        <button id="Horror" onClick={(e) => this.handleClick(e)}>Horror</button>
                        <button id="All" onClick={(e) => this.handleClick(e)}>All</button>

                    </div>      

                    <div className = "moviepage-part3">

                    {
                        (this.state.condition) ?

                            this.state.path.map(v => {
                                return (
                                    <SingleMovie userId={v.userId} image={v.path} description={v.description} url={v.link} name={v.name} />
                                )
                            })

                            : <Loading />

                    }


                    </div> 

                </div>

            </div>
        );
    }
}

export default MoviePage;