import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { firestore } from "../scripts/Fire";
import { CircularProgress } from "@mui/material";
import { tw } from "twind";

const MovieContent = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const moviesCollection = collection(firestore, "movies");

    getDoc(doc(moviesCollection, id))
      .then((doc) => {
        setData(doc.data());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return data ? (
    <div className="movieContent-main">
      <div className="movieContent-submain">
        <img
          title={data.name}
          alt={data.name + "movie wallpaper"}
          src={data.path}
        />

        <div className={tw("movieContent-part1", "gap-2 flex flex-col")}>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <h5>{data.category}</h5>
          <a href={data.link}>Download</a>
        </div>
      </div>
    </div>
  ) : loading ? (
    <CircularProgress
      size={24}
      className={tw(
        "text-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
      )}
    />
  ) : (
    <p
      className={tw(
        "text-white absolute opacity-80 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
      )}
    >
      No such movie found...
    </p>
  );
};

export default MovieContent;
