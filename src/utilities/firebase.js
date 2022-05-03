import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCTrSnRwYmZG8w5xkPmOTwieZa7a-gPnHg",
    authDomain: "unichat-61094.firebaseapp.com",
    projectId: "unichat-61094",
    storageBucket: "unichat-61094.appspot.com",
    messagingSenderId: "468567622505",
    appId: "1:468567622505:web:c95d234050a4beab60b3f8",
  })
  .auth();
