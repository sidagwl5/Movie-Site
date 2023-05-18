import {
  setPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  browserLocalPersistence,
} from "firebase/auth";
import {
  collection,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Fire, { auth, firestore, storage } from "./Fire";
import store from "../components/Store";
import { enqueueSnackbar } from "notistack";

/* for login purpose */

export function Login() {
  setPersistence(auth, browserLocalPersistence)
    .then(function () {
      loginHelper();
    })
    .catch(function (error) {
      console.error("error in persistance");
    });
}

function loginHelper() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(function (result) {
      const user = result.user;
      addUser(user);
    })
    .catch(function (error) {
      console.error("error in loginhelper");
    });
}

/* listener for listening to state changes */

export function setAuthListener() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      addUserListener(user.uid);
    } else {
      store.unsetUser();
    }
  });
}

/* adding new user to database */

function addUser(user) {
  const userCollection = collection(firestore, "Users");

  getDoc(doc(userCollection, user.uid)).then((docInstance) => {
    if (!docInstance.exists()) {
      setDoc(doc(userCollection, user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
      });
    } else {
      console.error("user already exists");
    }
  });
}

export function addUserListener(userId) {
  const userCollection = collection(firestore, "Users");

  onSnapshot(doc(userCollection, userId), (doc) => {
    if (doc.exists()) {
      store.setUser(doc.data());
    } else {
      console.error("doc do not exists");
    }
  });
}

export function logOut() {
  signOut(auth)
    .then(function () {
      enqueueSnackbar({
        variant: "success",
        message: "Successfully logged out",
      });
    })
    .catch(function (error) {
      enqueueSnackbar({
        variant: "error",
        message: error?.message ?? "Something went wrong",
      });
    });
}

export async function storeImage(
  id,
  {
    image: val,
    data: movieName,
    url: movieURL,
    content: movieContent,
    category,
  }
) {
  try {
    await uploadBytes(ref(storage, `images/${val.name}`), val);
    const url = await getDownloadURL(ref(storage, `images/${val.name}`));
    const moviesCollection = collection(firestore, "movies");
    const movieDoc = await getDoc(doc(moviesCollection, val.name));

    if (!movieDoc.exists()) {
      await setDoc(doc(moviesCollection, movieName), {
        path: url,
        userId: id,
        link: movieURL,
        name: movieName,
        description: movieContent,
        category: category,
      });

      enqueueSnackbar({
        variant: "success",
        message: "Movie uploaded successfully",
      });
    } else {
      throw new Error("Movie with same name already exists");
    }
  } catch (error) {
    enqueueSnackbar({
      variant: "error",
      message:
        error?.message ||
        error.response?.data?.message ||
        "Something went wrong",
    });
  }
}
