import firebase from "firebase";

var Config = {
    apiKey: "AIzaSyAeSuX3UWAZxkWeQIscqMTW7X_eNuRmSN4",
    authDomain: "chatting-327a9.firebaseapp.com",
    databaseURL: "https://chatting-327a9.firebaseio.com",
    projectId: "chatting-327a9",
    storageBucket: "chatting-327a9.appspot.com",
    messagingSenderId: "772358691408",
    appId: "1:772358691408:web:29c6e3ff34b0d876"
  };
 
  const Fire = firebase.initializeApp(Config);

  export default Fire