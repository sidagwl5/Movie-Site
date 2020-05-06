import React, { Component } from 'react'
import Loading from "../components/Loading";
import Fire from "../scripts/Fire";

export default class MovieContent extends Component {


    state = {

        content: "",
        name: "",
        image: "",
        category: "",
        link: ""
    }

    componentDidMount() {




        Fire.firestore().collection("movies").where("name", "==", this.props.match.params.id).get().then(snapshot => {

            snapshot.forEach(doc => {

                if (doc.exists) {

                    this.setState({

                        content: doc.data().description,
                        category: doc.data().category,
                        link: doc.data().link,
                        image: doc.data().path,
                        name: doc.data().name
                    })
                }
                else {

                    console.log("nothing")
                }
            })
        })


    }

    render() {
        return (


            (this.state.content) ?
                <div className="movieContent-main">

                    <div className="movieContent-submain">

                        <img title={this.state.name} alt={this.state.name + "movie wallpaper"} src={this.state.image} />

                        <div className="movieContent-part1">

                            <h1>Movie description</h1>
                            <h4>{this.state.name}</h4>
                            <h5>{this.state.category}</h5>
                            <p >{this.state.content}</p>
                            <a href={this.state.link}>Download</a>
                        </div>

                    </div>

                </div> : <Loading />
        )
    }
}
