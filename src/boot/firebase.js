// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDSIbT0qP7w13stxZXsXR3fv-bEN8ggQTY",
  authDomain: "chatup-a4adb.firebaseapp.com",
  projectId: "chatup-a4adb",
  storageBucket: "chatup-a4adb.appspot.com",
  messagingSenderId: "75781423665",
  appId: "1:75781423665:web:4bb96ff1f5df2e9d65cb10"
};
// Initialize Firebase
let firebaseApp= firebase.initializeApp(firebaseConfig);
let firebaseAuth= firebase.auth()
let firebaseDb= firebase.database()

export{firebaseAuth, firebaseDb}