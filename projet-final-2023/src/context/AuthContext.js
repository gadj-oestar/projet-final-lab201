import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

const MESSAGES = {
  "auth/invalid-email": "Adresse email invalide.",
  "auth/missing-password": "Saisis ton mot de passe.",
  "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
  "auth/email-already-in-use": "Un compte existe déjà avec cette adresse.",
  "auth/user-not-found": "Aucun compte ne correspond à cette adresse.",
  "auth/wrong-password": "Email ou mot de passe incorrect.",
  "auth/invalid-credential": "Email ou mot de passe incorrect.",
  "auth/invalid-login-credentials": "Email ou mot de passe incorrect.",
  "auth/too-many-requests": "Trop de tentatives. Réessaie dans quelques minutes.",
  "auth/network-request-failed": "Connexion réseau impossible.",
  "auth/internal-error": "Service momentanément indisponible. Réessaie.",
};

export const messageErreur = (e) => {
  if (!MESSAGES[e?.code]) console.warn("Erreur d'authentification", e);
  return MESSAGES[e?.code] || "Une erreur est survenue. Réessaie.";
};

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [pret, setPret] = useState(false);
  const [modale, setModale] = useState(null); // "connexion" | "inscription" | "oubli" | null

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUtilisateur(u);
        setPret(true);
      }),
    []
  );

  const valeur = {
    utilisateur,
    pret,
    modale,
    ouvrir: (vue = "connexion") => setModale(vue),
    fermer: () => setModale(null),
    connexion: (email, mdp) => signInWithEmailAndPassword(auth, email, mdp),
    inscription: async (nom, email, mdp) => {
      const { user } = await createUserWithEmailAndPassword(auth, email, mdp);
      if (nom) {
        await updateProfile(user, { displayName: nom });
        setUtilisateur({ ...user, displayName: nom });
      }
      return user;
    },
    reinitialiser: (email) => sendPasswordResetEmail(auth, email),
    deconnexion: () => signOut(auth),
  };

  return <AuthContext.Provider value={valeur}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
