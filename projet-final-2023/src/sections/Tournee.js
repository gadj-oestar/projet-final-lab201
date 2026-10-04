import { useState } from "react";
import affiche from "../assets/affiche-tournee.jpg";
import { concerts, formatDate, formatPrix, PRIX_BILLET } from "../data/catalogue";
import { usePanier } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Quantite from "../components/Quantite";

const MAX_BILLETS = 8;

export default function Tournee() {
  const { ajouter } = usePanier();
  const notifier = useToast();
  const [choix, setChoix] = useState(concerts[0].id);
  const [quantite, setQuantite] = useState(1);
  const concert = concerts.find((c) => c.id === choix);

  const reserver = (e) => {
    e.preventDefault();
    const date = formatDate(concert.date, { day: "numeric", month: "long", year: "numeric" });
    ajouter(
      {
        cle: concert.id,
        id: concert.id,
        nom: `Billet ${concert.ville}`,
        detail: date,
        prix: PRIX_BILLET,
        image: affiche,
        max: MAX_BILLETS,
      },
      quantite
    );
    notifier(`${quantite} billet${quantite > 1 ? "s" : ""} pour ${concert.ville} ajouté${quantite > 1 ? "s" : ""} au panier.`);
    setQuantite(1);
  };

  return (
    <section id="tournee" className="section section--sombre">
      <div className="tournee">
        <img
          className="tournee__affiche"
          src={affiche}
          alt="Affiche de la tournée 2023 de Pierre de Maere"
          loading="lazy"
        />
        <div className="tournee__contenu">
          <p className="surtitre">Tour 2023</p>
          <h2>Billetterie</h2>
          <p className="texte-doux">
            En tournée en France, en Belgique, en Suisse et aux Pays-Bas. Choisis ta date et le
            nombre de places.
          </p>

          <ul className="dates" role="radiogroup" aria-label="Dates de concert">
            {concerts.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={choix === c.id}
                  className={`date ${choix === c.id ? "est-actif" : ""}`}
                  onClick={() => setChoix(c.id)}
                >
                  <span className="date__jour">{formatDate(c.date)}</span>
                  <span className="date__ville">{c.ville}</span>
                </button>
              </li>
            ))}
          </ul>

          <form className="reservation" onSubmit={reserver}>
            <div>
              <p className="reservation__choix">
                {concert.ville},{" "}
                {formatDate(concert.date, { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="texte-doux">
                {formatPrix(PRIX_BILLET)} la place, {MAX_BILLETS} maximum
              </p>
            </div>
            <Quantite valeur={quantite} onChange={setQuantite} max={MAX_BILLETS} label="Nombre de places" />
            <button className="btn btn--plein">
              Réserver {formatPrix(PRIX_BILLET * quantite)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
