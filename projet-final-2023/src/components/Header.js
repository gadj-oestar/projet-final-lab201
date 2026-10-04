import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-blanc.png";
import { usePanier } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { IconeCompte, IconeFermer, IconeMenu, IconePanier } from "./Icones";

const liens = [
  ["/#album", "Album"],
  ["/#tournee", "Tournée"],
  ["/#boutique", "Boutique"],
  ["/#ecouter", "Écouter"],
];

export default function Header({ onOuvrirPanier }) {
  const { nombre } = usePanier();
  const { utilisateur, ouvrir } = useAuth();
  const [menu, setMenu] = useState(false);
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 40);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  return (
    <header className={`entete ${defile || menu ? "entete--plein" : ""}`}>
      <div className="entete__inner">
        <button
          className="icone-btn entete__burger"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menu}
        >
          {menu ? <IconeFermer /> : <IconeMenu />}
        </button>

        <Link to="/" className="entete__logo" onClick={() => setMenu(false)}>
          <img src={logo} alt="Pierre de Maere, accueil" />
        </Link>

        <nav className={`entete__nav ${menu ? "est-ouvert" : ""}`} aria-label="Navigation principale">
          {liens.map(([href, texte]) => (
            <Link key={href} to={href} onClick={() => setMenu(false)}>
              {texte}
            </Link>
          ))}
        </nav>

        <div className="entete__actions">
          {utilisateur ? (
            <NavLink to="/compte" className="icone-btn" aria-label="Mon compte">
              <IconeCompte />
            </NavLink>
          ) : (
            <button className="icone-btn" onClick={() => ouvrir("connexion")} aria-label="Se connecter">
              <IconeCompte />
            </button>
          )}
          <button
            className="icone-btn"
            onClick={onOuvrirPanier}
            aria-label={`Ouvrir le panier, ${nombre} article${nombre > 1 ? "s" : ""}`}
          >
            <IconePanier />
            {nombre > 0 && <span className="pastille">{nombre}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
