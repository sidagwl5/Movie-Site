import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import MovieForm from "./pages/MovieForm";
import MoviePage from "./pages/MoviePage";
import MovieContent from "./pages/MovieContent";
import Download from "./components/Download";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/addMovies" element={<MovieForm />} />
        <Route path="/moviepage" element={<MoviePage />} />
        <Route path="/moviepage/:id" element={<MovieContent />} />
        <Route path="/moviepage/:id/download" element={<Download />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
