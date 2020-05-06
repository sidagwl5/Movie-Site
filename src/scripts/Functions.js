import firebase from "firebase";
import Fire from "./Fire";
import store from "../components/Store";


/* for login purpose */

export function Login() {

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {

      return loginHelper()
    })
    .catch(function (error) {

      console.log("error in persistance")
    });
}

function loginHelper() {

  var provider = new firebase.auth.GoogleAuthProvider();
  Fire.auth().signInWithPopup(provider).then(function (result) {

    var user = result.user;
    addUser(user)

  }).catch(function (error) {

    console.log("error in loginhelper")
  });
}


/* listener for listening to state changes */

export function setAuthListener() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      addUserListener(user.uid)
    } else {
      store.unsetUser()
    }
  });
}


/* adding new user to database */

function addUser(user) {

  Fire.firestore().collection("Users").doc(user.uid).get().then(doc => {

    if (!doc.exists) {
      return Fire.firestore().collection("Users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid
      })
    }

    else if (doc.exists) {
      console.log("user already exists")
    }
  })
}

export function addUserListener(userId) {

  Fire.firestore().collection("Users").doc(userId).onSnapshot(doc => {

    if (doc.exists) {
      store.setUser(doc.data())
    }
    else {
      console.log("doc do not exists")
    }

  })

}
export function signOut() {

  firebase.auth().signOut().then(function () {
    console.log("sign out successful")
  }).catch(function (error) {
    console.log("sign out failed")
  });
}

export function storeImage(val, id, movieName, movieURL, movieContent, category) {

  var uploadTask = Fire.storage().ref(`images/${val.name}`).put(val)

  uploadTask.on("state_changed", (snapshot) => {

    console.log(snapshot)
  }, (err) => { console.log(err) }, () => {

    Fire.storage().ref("images").child(val.name).getDownloadURL().then(url => {

      console.log(url)

      Fire.firestore().collection("movies").doc(val.name).get().then(doc => {

        if (!doc.exists) {
          return Fire.firestore().collection("movies").doc(val.name).set({

            path: url,
            userId: id,
            link: movieURL,
            name: movieName,
            description: movieContent,
            category: category

          }).then(() => {

            alert("Your Movie has been uploaded")
          })

        }
        else {

          alert("movie with same poster already exists")
        }
      })



    }

    )
  })

}

