import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePanier } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrix } from "../data/catalogue";
import { enregistrerCommande, genererNumero } from "../services/stockage";

const FRAIS_LIVRAISON = 4.9;

export default function Commande() {
  const { articles, total, vider } = usePanier();
  const { utilisateur, ouvrir } = useAuth();
  const [confirmation, setConfirmation] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const [champs, setChamps] = useState({
    nom: "",
    email: "",
    adresse: "",
    codePostal: "",
    ville: "",
  });

  useEffect(() => {
    if (utilisateur) {
      setChamps((c) => ({
        ...c,
        nom: c.nom || utilisateur.displayName || "",
        email: c.email || utilisateur.email || "",
      }));
    }
  }, [utilisateur]);

  // Les billets sont dématérialisés : la livraison ne concerne que les produits physiques.
  const aLivrer = articles.some((a) => !a.id.startsWith("billet-"));
  const frais = aLivrer ? FRAIS_LIVRAISON : 0;
  const maj = (e) => setChamps({ ...champs, [e.target.name]: e.target.value });

  const valider = async (e) => {
    e.preventDefault();
    setEnvoi(true);
    const commande = {
      numero: genererNumero(),
      date: new Date().toISOString(),
      uid: utilisateur?.uid || null,
      client: aLivrer ? champs : { nom: champs.nom, email: champs.email },
      articles: articles.map(({ id, nom, detail, prix, quantite }) => ({
        id,
        nom,
        detail: detail || "",
        prix,
        quantite,
      })),
      sousTotal: total,
      livraison: frais,
      total: total + frais,
    };
    await enregistrerCommande(commande);
    setEnvoi(false);
    setConfirmation(commande);
    vider();
    window.scrollTo(0, 0);
  };

  if (confirmation) {
    return (
      <section className="page page--etroite">
        <p className="surtitre">Commande confirmée</p>
        <h1>Merci {confirmation.client.nom.split(" ")[0]}</h1>
        <p>
          Ta commande <strong>{confirmation.numero}</strong> d'un montant de{" "}
          {formatPrix(confirmation.total)} est enregistrée.
        </p>
        <p className="texte-doux">
          Le paiement est simulé dans ce projet : aucun débit n'a été effectué.
        </p>
        <div className="actions">
          {utilisateur && (
            <Link to="/compte" className="btn btn--contour">
              Voir mes commandes
            </Link>
          )}
          <Link to="/" className="btn btn--plein">
            Retour à l'accueil
          </Link>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="page page--etroite">
        <h1>Commande</h1>
        <p>Ton panier est vide.</p>
        <Link to="/#boutique" className="btn btn--plein">
          Découvrir la boutique
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Finaliser la commande</h1>
      <div className="commande">
        <form className="formulaire commande__form" onSubmit={valider}>
          {!utilisateur && (
            <p className="encart">
              Tu as un compte ?{" "}
              <button type="button" className="lien" onClick={() => ouvrir("connexion")}>
                Connecte-toi
              </button>{" "}
              pour retrouver tes commandes. Sinon, continue en invité.
            </p>
          )}
          <h2>Coordonnées</h2>
          <label>
            Nom complet
            <input name="nom" required value={champs.nom} onChange={maj} autoComplete="name" />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              value={champs.email}
              onChange={maj}
              autoComplete="email"
            />
          </label>

          {aLivrer && (
            <>
              <h2>Livraison</h2>
              <label>
                Adresse
                <input
                  name="adresse"
                  required
                  value={champs.adresse}
                  onChange={maj}
                  autoComplete="street-address"
                />
              </label>
              <div className="champs-ligne">
                <label>
                  Code postal
                  <input
                    name="codePostal"
                    required
                    pattern="[0-9A-Za-z \-]{4,10}"
                    value={champs.codePostal}
                    onChange={maj}
                    autoComplete="postal-code"
                  />
                </label>
                <label>
                  Ville
                  <input
                    name="ville"
                    required
                    value={champs.ville}
                    onChange={maj}
                    autoComplete="address-level2"
                  />
                </label>
              </div>
            </>
          )}

          <p className="texte-doux">
            Paiement simulé : la commande est enregistrée sans débit réel.
          </p>
          <button className="btn btn--plein btn--large" disabled={envoi}>
            {envoi ? "Validation..." : `Valider et payer ${formatPrix(total + frais)}`}
          </button>
        </form>

        <aside className="recap">
          <h2>Récapitulatif</h2>
          <ul>
            {articles.map((a) => (
              <li key={a.cle}>
                <img src={a.image} alt="" />
                <div>
                  <strong>{a.nom}</strong>
                  <span className="texte-doux">
                    {a.detail ? `${a.detail}, ` : ""}quantité {a.quantite}
                  </span>
                </div>
                <span>{formatPrix(a.prix * a.quantite)}</span>
              </li>
            ))}
          </ul>
          <div className="ligne-total ligne-total--fine">
            <span>Sous-total</span>
            <span>{formatPrix(total)}</span>
          </div>
          <div className="ligne-total ligne-total--fine">
            <span>Livraison</span>
            <span>{frais ? formatPrix(frais) : "Billets électroniques"}</span>
          </div>
          <div className="ligne-total">
            <span>Total</span>
            <strong>{formatPrix(total + frais)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
