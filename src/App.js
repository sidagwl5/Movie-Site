import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import MainPage from "./pages/MainPage"
import Profile from "./pages/Profile"
import MovieForm from './pages/MovieForm';
import MoviePage from "./pages/MoviePage";
import MovieContent from "./pages/MovieContent";
import Download from "./components/Download";
import AOS from "aos";
import 'aos/dist/aos.css';



class App extends Component {

    componentDidMount() {

        AOS.init({

            duration: 1000
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/addMovies" component={MovieForm} />
                    <Route exact path="/moviepage" component={MoviePage} />
                    <Route exact path="/moviepage/:id" component={MovieContent} />
                    <Route exact path="/moviepage/:id/download" component={Download} />
                </div>
            </Router>
        );
    }
}

export default App;