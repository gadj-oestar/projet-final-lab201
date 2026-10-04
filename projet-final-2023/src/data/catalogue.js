import albumStandard from "../assets/album-standard.webp";
import albumLimitee from "../assets/album-limitee.webp";
import cdStandard from "../assets/cd-standard.webp";
import cdLimitee from "../assets/cd-limitee.webp";
import violetFace from "../assets/purple-hoodie-front.webp";
import violetDos from "../assets/purple-hoodie-back.webp";
import orangeFace from "../assets/orange-hoodie-front.webp";
import orangeDos from "../assets/orange-hoodie-back.webp";

export const TAILLES = ["XS", "S", "M", "L", "XL"];

export const albums = [
  {
    id: "cd-standard",
    nom: "CD \"Regarde-Moi\"",
    edition: "Édition standard",
    prix: 14.99,
    image: albumStandard,
    disque: cdStandard,
  },
  {
    id: "cd-limitee",
    nom: "CD \"Regarde-Moi\"",
    edition: "Édition limitée",
    prix: 19.99,
    image: albumLimitee,
    disque: cdLimitee,
  },
];

export const packs = [
  {
    id: "pack-2-hoodies",
    nom: "Pack 2 Hoodies + 2 CD",
    prix: 64.99,
    images: [violetDos, orangeDos],
    tailles: true,
    details: [
      "Les deux éditions de \"Regarde-Moi\", titres bonus inclus",
      "Un hoodie spécial tournée, coupe oversize",
      "Un hoodie spécial \"Regarde-Moi\", coupe oversize",
    ],
    vedette: true,
  },
  {
    id: "pack-hoodie-tournee",
    nom: "Pack hoodie spécial tournée + 1 CD",
    prix: 34.99,
    images: [orangeDos, orangeFace],
    tailles: true,
  },
  {
    id: "pack-hoodie-regarde-moi",
    nom: "Pack hoodie \"Regarde-Moi\" + 1 CD",
    prix: 34.99,
    images: [violetDos, violetFace],
    tailles: true,
  },
];

// Dates reprises de l'affiche officielle de la tournée 2023.
export const PRIX_BILLET = 35;

export const concerts = [
  ["2023-01-28", "Dardilly"],
  ["2023-02-03", "Lucé"],
  ["2023-02-04", "Vannes"],
  ["2023-02-24", "Annecy"],
  ["2023-02-25", "Audincourt"],
  ["2023-03-02", "Saint-Avertin"],
  ["2023-03-03", "Nantes"],
  ["2023-03-07", "Clichy-sous-Bois"],
  ["2023-03-10", "Savigny-le-Temple"],
  ["2023-03-15", "Thiers"],
  ["2023-03-16", "Lyon"],
  ["2023-03-17", "Sully-sur-Loire"],
  ["2023-03-22", "Liège"],
  ["2023-03-23", "Namur"],
  ["2023-03-25", "Genève"],
  ["2023-03-29", "Amsterdam"],
  ["2023-05-12", "Paris"],
  ["2023-05-16", "Sélestat"],
  ["2023-05-18", "Bruxelles"],
].map(([date, ville]) => ({ id: `billet-${date}`, date, ville }));

export const formatPrix = (n) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export const formatDate = (iso, options = { day: "2-digit", month: "short" }) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", options);
