import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fire, { firestore } from "../scripts/Fire";

const SingleMovie = ({ userId, name, description, path, link }) => {
  const [uploader, setUploader] = useState(null);

  useEffect(() => {
    const userCollection = collection(firestore, "users");

    getDoc(doc(userCollection, userId)).then((doc) => {
      setUploader(doc.data());
    });
  }, []);

  return (
    <div className="singlemovie-main">
      <img
        className="singlemovie-image"
        alt={name + "movie wallpaper"}
        src={path}
      />

      <div className="singlemovie-submain">
        <h1 style={{ fontSize: "30px", color: "orange" }}>{name}</h1>
        <p>
          <span style={{ color: "white" }}>Uploaded by</span>- {uploader?.name}
        </p>
        <Link className="link" to={"/moviepage/" + name}>
          Click
        </Link>
      </div>
    </div>
  );
};

export default SingleMovie;
