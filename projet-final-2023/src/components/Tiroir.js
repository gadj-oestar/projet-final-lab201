import { useEffect } from "react";
import { IconeFermer } from "./Icones";

// Panneau latéral ou fenêtre modale avec fond, fermeture au clavier et au clic.
export default function Tiroir({ ouvert, onFermer, titre, children, variante = "tiroir" }) {
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e) => e.key === "Escape" && onFermer();
    document.addEventListener("keydown", surTouche);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = "";
    };
  }, [ouvert, onFermer]);

  if (!ouvert) return null;

  return (
    <div className={`calque calque--${variante}`} onMouseDown={onFermer}>
      <div
        className={`panneau panneau--${variante}`}
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="panneau__tete">
          <h2>{titre}</h2>
          <button className="icone-btn" onClick={onFermer} aria-label="Fermer">
            <IconeFermer />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
