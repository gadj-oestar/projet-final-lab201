import { useState } from "react";
import { formatPrix, packs, TAILLES } from "../data/catalogue";
import { usePanier } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function ChoixTaille({ valeur, onChange, nom }) {
  return (
    <fieldset className="tailles">
      <legend>Taille</legend>
      {TAILLES.map((t) => (
        <label key={t} className={valeur === t ? "est-actif" : ""}>
          <input
            type="radio"
            name={nom}
            value={t}
            checked={valeur === t}
            onChange={() => onChange(t)}
          />
          {t}
        </label>
      ))}
    </fieldset>
  );
}

function CartePack({ pack }) {
  const { ajouter } = usePanier();
  const notifier = useToast();
  const [taille, setTaille] = useState("M");
  const [image, setImage] = useState(0);

  const ajouterAuPanier = () => {
    ajouter({
      cle: `${pack.id}-${taille}`,
      id: pack.id,
      nom: pack.nom,
      detail: `Taille ${taille}`,
      prix: pack.prix,
      image: pack.images[0],
    });
    notifier(`${pack.nom} (taille ${taille}) ajouté au panier.`);
  };

  return (
    <article className={`carte-pack ${pack.vedette ? "carte-pack--vedette" : ""}`}>
      <div className="carte-pack__galerie">
        <img src={pack.images[image]} alt={pack.nom} loading="lazy" />
        <div className="vignettes">
          {pack.images.map((src, i) => (
            <button
              key={src}
              className={i === image ? "est-actif" : ""}
              onClick={() => setImage(i)}
              aria-label={`Voir l'image ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <div className="carte-pack__infos">
        <h3>{pack.nom}</h3>
        <p className="prix">{formatPrix(pack.prix)}</p>
        {pack.details && (
          <ul className="liste-details">
            {pack.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
        <ChoixTaille valeur={taille} onChange={setTaille} nom={`taille-${pack.id}`} />
        <button className="btn btn--plein" onClick={ajouterAuPanier}>
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}

export default function Boutique() {
  return (
    <section id="boutique" className="section">
      <div className="section__tete">
        <p className="surtitre">Merch officiel</p>
        <h2>Boutique</h2>
      </div>
      <div className="grille-packs">
        {packs.map((p) => (
          <CartePack key={p.id} pack={p} />
        ))}
      </div>
    </section>
  );
}
