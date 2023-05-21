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
import store from "../components/Store";
import { firestore, storage } from "../scripts/Fire";
import * as func from "../scripts/Functions";
import "../styling/Profile.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { tw } from "twind";

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
    <div className={tw("profile-main2", "flex-col sm:flex-row! gap-10")}>
      <div className={tw("user-info", "w-full sm:w-[30%]!")}>
        <img src={store.user?.photoURL} />
        <h1>{store.user?.displayName}</h1>
        <h1>{store.user?.email}</h1>
      </div>
      <div className={tw("user-movie", "w-[80%] sm:w-[50%]!")}>
        <h4 className={tw("mb-4 text-lg font-medium")}>Movies Uploaded</h4>

        <div
          className={tw(
            "max-h-[400px] overflow-auto w-full sm:w-[70%]! md:w-[50%]!"
          )}
        >
          {data.condition
            ? Array(40)
                .fill(data.path)
                .map((v) => {
                  return (
                    <div
                      className={tw("movielist", "w-full")}
                      style={{
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.1)",

                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "4px",
                        padding: "5px 10px",
                      }}
                    >
                      <span>{v.name}</span>
                      <IconButton
                        size={"small"}
                        id={v.name}
                        onClick={handleClick}
                      >
                        <CloseIcon
                          className={tw("text-lg! text-white opacity-80!")}
                        />
                      </IconButton>
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
