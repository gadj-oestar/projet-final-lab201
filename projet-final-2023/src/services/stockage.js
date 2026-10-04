import { get, push, ref } from "firebase/database";
import { db } from "../firebase";

// Les écritures dans la Realtime Database restent en attente tant que le
// serveur ne répond pas. On limite l'attente puis on garde une copie locale
// pour que le parcours d'achat ne bloque jamais.
const DELAI_MS = 6000;

const avecDelai = (promesse) =>
  Promise.race([
    promesse,
    new Promise((_, rejeter) =>
      setTimeout(() => rejeter(new Error("delai")), DELAI_MS)
    ),
  ]);

const lireLocal = (cle) => {
  try {
    return JSON.parse(localStorage.getItem(cle)) || [];
  } catch {
    return [];
  }
};

const ecrireLocal = (cle, valeur) => {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // stockage indisponible
  }
};

export const genererNumero = () =>
  "PDM-" + Date.now().toString(36).toUpperCase().slice(-6);

export async function enregistrerCommande(commande) {
  const locales = lireLocal("pdm-commandes");
  ecrireLocal("pdm-commandes", [commande, ...locales]);
  try {
    await avecDelai(
      push(ref(db, `commandes/${commande.uid || "invites"}`), commande)
    );
    return { enLigne: true };
  } catch {
    return { enLigne: false };
  }
}

export async function lireCommandes(uid) {
  const locales = lireLocal("pdm-commandes").filter((c) => c.uid === uid);
  try {
    const snap = await avecDelai(get(ref(db, `commandes/${uid}`)));
    const enLigne = snap.exists() ? Object.values(snap.val()) : [];
    const numeros = new Set(enLigne.map((c) => c.numero));
    return [...enLigne, ...locales.filter((c) => !numeros.has(c.numero))].sort(
      (a, b) => b.date.localeCompare(a.date)
    );
  } catch {
    return locales;
  }
}

export async function inscrireNewsletter(email) {
  const normalise = email.trim().toLowerCase();
  const locales = lireLocal("pdm-newsletter");
  if (locales.includes(normalise)) return { dejaInscrit: true };
  ecrireLocal("pdm-newsletter", [...locales, normalise]);
  try {
    await avecDelai(
      push(ref(db, "newsletter"), { email: normalise, date: new Date().toISOString() })
    );
  } catch {
    // copie locale conservée
  }
  return { dejaInscrit: false };
}
