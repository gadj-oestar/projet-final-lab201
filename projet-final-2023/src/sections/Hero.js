import { Link } from "react-router-dom";
import video from "../assets/hero.mp4";
import affiche from "../assets/hero-poster.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero__video"
        src={video}
        poster={affiche}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero__voile" />
      <div className="hero__contenu">
        <p className="surtitre">Nouvel album</p>
        <h1>Regarde-Moi</h1>
        <p className="hero__texte">
          Précommande le CD en édition standard ou limitée, réserve ta place pour la tournée et
          découvre les hoodies officiels.
        </p>
        <div className="hero__actions">
          <Link to="/#album" className="btn btn--plein">
            Précommander l'album
          </Link>
          <Link to="/#tournee" className="btn btn--contour">
            Voir la tournée
          </Link>
        </div>
      </div>
    </section>
  );
}
