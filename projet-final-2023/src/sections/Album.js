import { useState } from "react";
import { albums, formatPrix } from "../data/catalogue";
import { usePanier } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Quantite from "../components/Quantite";

function CarteAlbum({ album }) {
  const { ajouter } = usePanier();
  const notifier = useToast();
  const [quantite, setQuantite] = useState(1);

  const ajouterAuPanier = () => {
    ajouter(
      {
        cle: album.id,
        id: album.id,
        nom: album.nom,
        detail: album.edition,
        prix: album.prix,
        image: album.image,
      },
      quantite
    );
    notifier(`${album.nom}, ${album.edition.toLowerCase()} ajouté au panier.`);
    setQuantite(1);
  };

  return (
    <article className="carte-album">
      <div className="carte-album__visuel">
        <img className="carte-album__disque" src={album.disque} alt="" loading="lazy" />
        <img
          className="carte-album__pochette"
          src={album.image}
          alt={`Pochette ${album.edition.toLowerCase()} de Regarde-Moi`}
          loading="lazy"
        />
      </div>
      <div className="carte-album__infos">
        <div>
          <h3>{album.nom}</h3>
          <p className="texte-doux">{album.edition}</p>
        </div>
        <p className="prix">{formatPrix(album.prix)}</p>
      </div>
      <div className="carte-album__achat">
        <Quantite valeur={quantite} onChange={setQuantite} />
        <button className="btn btn--plein" onClick={ajouterAuPanier}>
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}

export default function Album() {
  return (
    <section id="album" className="section">
      <div className="section__tete">
        <p className="surtitre">Précommande disponible</p>
        <h2>"Regarde-Moi"</h2>
      </div>
      <div className="grille-albums">
        {albums.map((a) => (
          <CarteAlbum key={a.id} album={a} />
        ))}
      </div>
    </section>
  );
}
