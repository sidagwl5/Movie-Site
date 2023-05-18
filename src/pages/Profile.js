import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../components/Store";
import { firestore, storage } from "../scripts/Fire";
import * as func from "../scripts/Functions";
import "../styling/Profile.css";

const Profile = () => {
  const [data, setData] = useState({
    path: [],
    condition: false,
  });

  useEffect(() => {
    func.setAuthListener();

    const moviesCollection = collection(firestore, "movies");

    const subscribe = onSnapshot(
      query(moviesCollection, where("userId", "==", store.user?.id)),
      (snapshot) => {
        const arr = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            arr.push(change.doc.data());
          }
        });

        setData({
          path: arr,
          condition: true,
        });
      }
    );

    return subscribe;
  }, []);

  const handleClick = async (e) => {
    const moviesCollection = collection(firestore, "movies");

    await deleteDoc(doc(moviesCollection, e.target.id));
    await deleteObject(ref(storage, `/images/${e.target.id}`));
  };

  return (
    <div className="profile-main2">
      <div className="profile-main2-part1">
        <div className="user-info">
          <img src={store.user?.photoURL} />
          <h1>{store.user?.displayName}</h1>
        </div>
        <div className="user-movie">
          <h4>Movies Uploaded</h4>
          {data.condition
            ? data.path.map((v) => {
                return (
                  <div
                    className="movielist"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      width: "50%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "4px",
                      padding: "10px",
                    }}
                  >
                    <span>{v.name}</span>
                    <button
                      style={{
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        color: "white",
                      }}
                      id={v.name}
                      onClick={handleClick}
                    >
                      x
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
