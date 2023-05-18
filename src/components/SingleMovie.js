import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fire, { firestore } from "../scripts/Fire";
import { tw } from "twind";

const SingleMovie = ({ userId, name, description, path, link }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userCollection = collection(firestore, "users");
    getDoc(doc(userCollection, userId));
  }, []);

  return (
    <div
      onClick={navigate.bind(this, "/moviepage/" + name)}
      className={tw("singlemovie-main", "cursor-pointer")}
    >
      <img
        className="singlemovie-image"
        alt={name + "movie wallpaper"}
        src={path}
      />

      <div className="singlemovie-submain">
        <h1 style={{ fontSize: "30px", color: "orange" }}>{name}</h1>
      </div>
    </div>
  );
};

export default SingleMovie;
