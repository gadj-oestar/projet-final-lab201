import { useEffect, useState } from "react";
import { messageErreur, useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Tiroir from "./Tiroir";

const TITRES = {
  connexion: "Connexion",
  inscription: "Créer un compte",
  oubli: "Mot de passe oublié",
};

export default function Authentification() {
  const { modale, fermer, ouvrir, connexion, inscription, reinitialiser } = useAuth();
  const notifier = useToast();
  const [champs, setChamps] = useState({ nom: "", email: "", mdp: "" });
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    setErreur("");
  }, [modale]);

  const maj = (e) => setChamps({ ...champs, [e.target.name]: e.target.value });

  const soumettre = async (e) => {
    e.preventDefault();
    setErreur("");
    setEnvoi(true);
    try {
      if (modale === "connexion") {
        await connexion(champs.email, champs.mdp);
        notifier("Tu es connecté.");
        fermer();
      } else if (modale === "inscription") {
        await inscription(champs.nom.trim(), champs.email, champs.mdp);
        notifier("Ton compte a été créé.");
        fermer();
      } else {
        await reinitialiser(champs.email);
        notifier("Si un compte existe, un email de réinitialisation a été envoyé.");
        ouvrir("connexion");
      }
      setChamps({ nom: "", email: champs.email, mdp: "" });
    } catch (err) {
      setErreur(messageErreur(err));
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <Tiroir ouvert={!!modale} onFermer={fermer} titre={TITRES[modale] || ""} variante="modale">
      {modale !== "oubli" && (
        <div className="onglets" role="tablist">
          <button
            role="tab"
            aria-selected={modale === "connexion"}
            onClick={() => ouvrir("connexion")}
          >
            Connexion
          </button>
          <button
            role="tab"
            aria-selected={modale === "inscription"}
            onClick={() => ouvrir("inscription")}
          >
            Créer un compte
          </button>
        </div>
      )}

      <form className="formulaire" onSubmit={soumettre} noValidate={false}>
        {modale === "inscription" && (
          <label>
            Prénom
            <input name="nom" value={champs.nom} onChange={maj} autoComplete="given-name" />
          </label>
        )}
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
        {modale !== "oubli" && (
          <label>
            Mot de passe
            <input
              type="password"
              name="mdp"
              required
              minLength={6}
              value={champs.mdp}
              onChange={maj}
              autoComplete={modale === "inscription" ? "new-password" : "current-password"}
            />
          </label>
        )}

        {erreur && (
          <p className="message message--erreur" role="alert">
            {erreur}
          </p>
        )}

        <button className="btn btn--plein btn--large" disabled={envoi}>
          {envoi
            ? "Patiente..."
            : modale === "connexion"
            ? "Se connecter"
            : modale === "inscription"
            ? "Créer mon compte"
            : "Envoyer le lien"}
        </button>

        {modale === "connexion" && (
          <button type="button" className="lien" onClick={() => ouvrir("oubli")}>
            Mot de passe oublié ?
          </button>
        )}
        {modale === "oubli" && (
          <button type="button" className="lien" onClick={() => ouvrir("connexion")}>
            Retour à la connexion
          </button>
        )}
      </form>
    </Tiroir>
  );
}
