import React, { Component, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import MovieForm from "./pages/MovieForm";
import MoviePage from "./pages/MoviePage";
import MovieContent from "./pages/MovieContent";
import Download from "./components/Download";
import AOS from "aos";
import "aos/dist/aos.css";
import "./twind.config";
import { tx } from "@twind/core";
import { Alert } from "./components/Alert";
import { SnackbarProvider } from "notistack";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
        classes={{
          root: tx("min-w-max!"),
        }}
        Components={{
          default: Alert,
          success: Alert,
          error: Alert,
          info: Alert,
          warning: Alert,
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/addMovies" element={<MovieForm />} />
          <Route path="/moviepage" element={<MoviePage />} />
          <Route path="/moviepage/:id" element={<MovieContent />} />
          <Route path="/moviepage/:id/download" element={<Download />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
