import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SingleMovie from "../components/SingleMovie";
import { firestore } from "../scripts/Fire";
import * as func from "../scripts/Functions";
import { tw } from "twind";
import { CircularProgress } from "@mui/material";

const MoviePage = () => {
  const [category, setCategory] = useState("all");
  const [name, setName] = useState("");
  const [data, setData] = useState({
    path: [],
    condition: false,
  });

  useEffect(() => {
    func.setAuthListener();
  }, []);

  useEffect(() => {
    const moviesCollection = collection(firestore, "movies");

    const whereCondition =
      name && category !== "all"
        ? where("name", ">=", name, "category", "==", category)
        : name
        ? where("name", ">=", name)
        : category !== "all"
        ? where("category", "==", category)
        : orderBy("name", "asc");

    getDocs(query(moviesCollection, whereCondition)).then((snapshot) => {
      setData({
        path: snapshot.docs.map((doc) => doc.data()),
        condition: true,
      });
    });
  }, [name, category]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = (e) => {
    setCategory(e.target.id);
  };

  return (
    <div className="moviepage-main">
      <div className="moviepage-submain">
        <div className="moviepage-part1"></div>

        <h1>
          <span>Movie</span> section
        </h1>

        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter the name of movie..."
        />

        <div className="moviepage-part2">
          <button id="sci-fi" onClick={handleClick}>
            Sci-fi
          </button>
          <button id="anime" onClick={handleClick}>
            Anime
          </button>
          <button id="horror" onClick={handleClick}>
            Horror
          </button>
          <button id="all" onClick={handleClick}>
            All
          </button>
        </div>

        <div className="moviepage-part3">
          {data.path.length ? (
            data.path.map((v) => {
              return <SingleMovie {...v} />;
            })
          ) : !data.condition ? (
            <p
              className={tw(
                "w-full flex justify-center items-center italic text-white"
              )}
            >
              <CircularProgress
                size={20}
                className={tw("text-white! opacity-80")}
              />
            </p>
          ) : (
            <p
              className={tw(
                "w-full flex justify-center items-center italic text-white opacity-60"
              )}
            >
              No movies present
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
