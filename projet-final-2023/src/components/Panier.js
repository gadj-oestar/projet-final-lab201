import { Link } from "react-router-dom";
import { usePanier } from "../context/CartContext";
import { formatPrix } from "../data/catalogue";
import Tiroir from "./Tiroir";
import Quantite from "./Quantite";
import { IconeCorbeille } from "./Icones";

export default function Panier({ ouvert, onFermer }) {
  const { articles, total, changerQuantite, retirer } = usePanier();

  return (
    <Tiroir ouvert={ouvert} onFermer={onFermer} titre="Ton panier">
      {articles.length === 0 ? (
        <div className="panier-vide">
          <p>Ton panier est vide pour le moment.</p>
          <Link to="/#boutique" className="btn btn--contour" onClick={onFermer}>
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <>
          <ul className="panier-liste">
            {articles.map((a) => (
              <li key={a.cle} className="panier-ligne">
                <img src={a.image} alt="" />
                <div className="panier-ligne__infos">
                  <strong>{a.nom}</strong>
                  {a.detail && <span className="texte-doux">{a.detail}</span>}
                  <span>{formatPrix(a.prix)}</span>
                  <Quantite
                    valeur={a.quantite}
                    onChange={(q) => changerQuantite(a.cle, q)}
                    max={a.max || 10}
                  />
                </div>
                <button
                  className="icone-btn"
                  onClick={() => retirer(a.cle)}
                  aria-label={`Retirer ${a.nom} du panier`}
                >
                  <IconeCorbeille />
                </button>
              </li>
            ))}
          </ul>
          <div className="panier-pied">
            <div className="ligne-total">
              <span>Total</span>
              <strong>{formatPrix(total)}</strong>
            </div>
            <Link to="/commande" className="btn btn--plein btn--large" onClick={onFermer}>
              Passer la commande
            </Link>
          </div>
        </>
      )}
    </Tiroir>
  );
}
