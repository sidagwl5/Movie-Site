import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { firestore } from "../scripts/Fire";

const MovieContent = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    description: "",
    name: "",
    path: "",
    category: "",
    link: "",
  });

  useEffect(() => {
    const moviesCollection = collection(firestore, "movies");

    getDoc(doc(moviesCollection, id)).then((doc) => {
      setData(doc.data());
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

        <div className="movieContent-part1">
          <h1>Movie description</h1>
          <h4>{data.name}</h4>
          <h5>{data.category}</h5>
          <p>{data.description}</p>
          <a href={data.link}>Download</a>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieContent;
