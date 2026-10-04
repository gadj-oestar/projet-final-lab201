import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Configuration web Firebase : ces identifiants sont publics par conception,
// la sécurité repose sur les règles de la base et de l'authentification.
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
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
