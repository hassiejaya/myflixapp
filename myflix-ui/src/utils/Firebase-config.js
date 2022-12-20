
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyASF35C89KyVf690zgcu8mCbLIeQxSFQDs",
  authDomain: "myflix-f379f.firebaseapp.com",
  projectId: "myflix-f379f",
  storageBucket: "myflix-f379f.appspot.com",
  messagingSenderId: "554489559694",
  appId: "1:554489559694:web:76d33f8324bd33660127df",
  measurementId: "G-BZKM3HE9D7"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);