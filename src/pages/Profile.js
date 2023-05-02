import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import store from "../components/Store";
import { firestore, storage } from "../scripts/Fire";
import * as func from "../scripts/Functions";

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    path: [],
    condition: false,
  });

  useEffect(() => {
    const name = id;

    func.setAuthListener();

    const moviesCollection = collection(firestore, "movies");

    getDocs(
      query(moviesCollection, where("userId", "==", store.User?.id))
    ).then((snapshot) => {
      const arr = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          arr.push(change.doc.data());
          this.setState({
            path: arr,
            condition: true,
          });
        } else if (change.type == "removed") {
          arr = arr.filter((v) => {
            return v.name != change.doc.data().name;
          });
          this.setState({
            path: arr,
            condition: true,
          });
        }
      });
    });
  }, []);

  const handleClick = async (e) => {
    const moviesCollection = collection(firestore, "movies");

    await deleteDoc(doc(moviesCollection, e.target.id));
    await deleteObject(ref(storage, `/images/${e.target.id}`));
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div className="profile-main"></div>
      <div className="profile-main2">
        <div className="profile-main2-part1">
          <div className="user-info">
            <img src={store.User.photoURL} />
            <h1>{store.User.displayName}</h1>
            <Link to="/">
              <button
                style={{ marginBottom: "5%" }}
                className="btn"
                onClick={func.logOut}
              >
                Sign-Out
              </button>
            </Link>
            <Link to="/moviepage">
              <button className="btn">MoviePage</button>
            </Link>
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
    </div>
  );
};

export default observer(Profile);
