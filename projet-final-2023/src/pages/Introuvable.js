import { Link } from "react-router-dom";

export default function Introuvable() {
  return (
    <section className="page page--etroite">
      <h1>Page introuvable</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/" className="btn btn--plein">
        Retour à l'accueil
      </Link>
    </section>
  );
}
