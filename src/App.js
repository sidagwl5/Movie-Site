import "./twind.config";
import { CircularProgress } from "@mui/material";
import { tx } from "@twind/core";
import AOS from "aos";
import "aos/dist/aos.css";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Alert } from "./components/Alert";
import Download from "./components/Download";
import store from "./components/Store";
import MainPage from "./pages/MainPage";
import MovieContent from "./pages/MovieContent";
import MovieForm from "./pages/MovieForm";
import MoviePage from "./pages/MoviePage";
import Profile from "./pages/Profile";
import { setAuthListener } from "./scripts/Functions";
import { observer } from "mobx-react";
import Header from "./components/Header";
import { tw } from "twind";

const AllRoutes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("here!");

    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/moviepage" element={<MoviePage />} />
      <Route path="/moviepage/:id" element={<MovieContent />} />
      <Route path="/moviepage/:id/download" element={<Download />} />

      <Route element={<Authenticated />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/addMovies" element={<MovieForm />} />
      </Route>
    </Routes>
  );
};

const Authenticated = observer(() => {
  useEffect(() => {
    setAuthListener();
  }, []);

  return store.loading ? (
    <CircularProgress
      size={24}
      style={{
        color: "white",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : store.user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
});

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
        <div
          style={{
            position: "relative",
            background: "#141111",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
          }}
        >
          <Header />

          <div className={tw("flex-1 min-h-0 min-w-0 relative")}>
            <AllRoutes />
          </div>
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
