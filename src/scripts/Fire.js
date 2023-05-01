import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const Config = {
  apiKey: "AIzaSyAeSuX3UWAZxkWeQIscqMTW7X_eNuRmSN4",
  authDomain: "chatting-327a9.firebaseapp.com",
  databaseURL: "https://chatting-327a9.firebaseio.com",
  projectId: "chatting-327a9",
  storageBucket: "chatting-327a9.appspot.com",
  messagingSenderId: "772358691408",
  appId: "1:772358691408:web:29c6e3ff34b0d876",
};

const app = initializeApp(Config);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
