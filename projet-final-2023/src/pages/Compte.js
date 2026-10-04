import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatPrix } from "../data/catalogue";
import { lireCommandes } from "../services/stockage";

export default function Compte() {
  const { utilisateur, pret, ouvrir, deconnexion } = useAuth();
  const notifier = useToast();
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState(null);

  useEffect(() => {
    if (!utilisateur) return;
    let actif = true;
    lireCommandes(utilisateur.uid).then((c) => actif && setCommandes(c));
    return () => {
      actif = false;
    };
  }, [utilisateur]);

  if (!pret) return <section className="page page--etroite" />;

  if (!utilisateur) {
    return (
      <section className="page page--etroite">
        <h1>Mon compte</h1>
        <p>Connecte-toi pour voir tes commandes.</p>
        <button className="btn btn--plein" onClick={() => ouvrir("connexion")}>
          Se connecter
        </button>
      </section>
    );
  }

  const seDeconnecter = async () => {
    await deconnexion();
    notifier("Tu es déconnecté.");
    navigate("/");
  };

  return (
    <section className="page page--etroite">
      <p className="surtitre">Mon compte</p>
      <h1>Bonjour {utilisateur.displayName || ""}</h1>
      <p className="texte-doux">{utilisateur.email}</p>

      <h2>Mes commandes</h2>
      {commandes === null ? (
        <p className="texte-doux">Chargement...</p>
      ) : commandes.length === 0 ? (
        <p>
          Aucune commande pour le moment. <Link to="/#boutique">Voir la boutique</Link>
        </p>
      ) : (
        <ul className="historique">
          {commandes.map((c) => (
            <li key={c.numero}>
              <div>
                <strong>{c.numero}</strong>
                <span className="texte-doux">
                  {new Date(c.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <span className="texte-doux">
                {c.articles.map((a) => `${a.quantite} × ${a.nom}`).join(", ")}
              </span>
              <strong>{formatPrix(c.total)}</strong>
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn--contour" onClick={seDeconnecter}>
        Se déconnecter
      </button>
    </section>
  );
}
