import logo from "../assets/logo-blanc.png";

const reseaux = [
  ["Instagram", "https://www.instagram.com/pierredemaere/"],
  ["Facebook", "https://www.facebook.com/PierreDeMaere"],
  ["Spotify", "https://open.spotify.com/artist/13mm5rU1jvWfWG6uQ46ypd"],
];

export default function Footer() {
  return (
    <footer className="pied">
      <img src={logo} alt="Pierre de Maere" className="pied__logo" loading="lazy" />
      <ul className="pied__reseaux">
        {reseaux.map(([nom, url]) => (
          <li key={nom}>
            <a href={url} target="_blank" rel="noreferrer">
              {nom}
            </a>
          </li>
        ))}
      </ul>
      <p className="texte-doux">
        Projet pédagogique réalisé en 2023, sans lien officiel avec l'artiste. Paiement simulé,
        aucune commande n'est expédiée.
      </p>
    </footer>
  );
}
