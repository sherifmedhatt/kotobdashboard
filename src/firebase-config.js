// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfx5aQ5EJWRucuxfI6rYBH6uk8LrDCdNM",
  authDomain: "kotobbookstore-2b1e5.firebaseapp.com",
  databaseURL: "https://kotobbookstore-2b1e5-default-rtdb.firebaseio.com",
  projectId: "kotobbookstore-2b1e5",
  storageBucket: "kotobbookstore-2b1e5.appspot.com",
  messagingSenderId: "737330979273",
  appId: "1:737330979273:web:698142d27edb9d38a44818",
  measurementId: "G-LGGVBFESDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  export const auth = getAuth(app);