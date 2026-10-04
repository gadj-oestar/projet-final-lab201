import { useState } from "react";
import { inscrireNewsletter } from "../services/stockage";

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState({ type: "", texte: "" });
  const [envoi, setEnvoi] = useState(false);

  const soumettre = async (e) => {
    e.preventDefault();
    if (!EMAIL_VALIDE.test(email.trim())) {
      setEtat({ type: "erreur", texte: "Saisis une adresse email valide." });
      return;
    }
    setEnvoi(true);
    const { dejaInscrit } = await inscrireNewsletter(email);
    setEnvoi(false);
    setEtat(
      dejaInscrit
        ? { type: "info", texte: "Cette adresse est déjà inscrite." }
        : { type: "succes", texte: "Merci, ton inscription est enregistrée." }
    );
    if (!dejaInscrit) setEmail("");
  };

  return (
    <section className="section newsletter">
      <h2>Newsletter</h2>
      <p className="texte-doux">Abonne-toi pour recevoir les dernières actualités.</p>
      <form className="newsletter__form" onSubmit={soumettre} noValidate>
        <label className="sr-only" htmlFor="newsletter-email">
          Adresse email
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="nom@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button className="btn btn--plein" disabled={envoi}>
          {envoi ? "Envoi..." : "S'abonner"}
        </button>
      </form>
      {etat.texte && (
        <p className={`message message--${etat.type}`} role="status">
          {etat.texte}
        </p>
      )}
    </section>
  );
}
