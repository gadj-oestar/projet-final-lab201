// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxnzsN5toINpCgeWdkyeae2cTrJZ5RaXA",
  authDomain: "projet-final-2023.firebaseapp.com",
  databaseURL:
    "https://projet-final-2023-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projet-final-2023",
  storageBucket: "projet-final-2023.appspot.com",
  messagingSenderId: "966563990003",
  appId: "1:966563990003:web:ac8fc83827d5a37ff1ea86",
  measurementId: "G-MMGTTZEY7P",
  databaseURL : "https://projet-final-2023-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getDatabase(app);

