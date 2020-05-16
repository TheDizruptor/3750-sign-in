import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7j3OH0f7M3MFGVg2L2yLMn6FYqhE1K98",
    authDomain: "sign-in-8a2e6.firebaseapp.com",
    databaseURL: "https://sign-in-8a2e6.firebaseio.com",
    projectId: "sign-in-8a2e6",
    storageBucket: "sign-in-8a2e6.appspot.com",
    messagingSenderId: "58408937756",
    appId: "1:58408937756:web:198b8adbfd6da9340172d9",
    measurementId: "G-CYG3K1WJ5Q"
  };

  export const myFirebase = firebase.initializeApp(firebaseConfig);
  const baseDb = myFirebase.firestore();
  export const db = baseDb;