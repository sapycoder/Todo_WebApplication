// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {

// };

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDpH9zR8Ix2cBzQJFG9dcJPaSH_fUe3gJI",
  authDomain: "todo-app-bdae8.firebaseapp.com",
  projectId: "todo-app-bdae8",
  storageBucket: "todo-app-bdae8.appspot.com",
  messagingSenderId: "591501581754",
  appId: "1:591501581754:web:9041febf422cd25fa61183",
  measurementId: "G-VFK7GBB2RP",
});

const db = firebaseApp.firestore();
export { db };
