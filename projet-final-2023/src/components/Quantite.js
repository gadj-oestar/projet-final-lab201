import { IconeMoins, IconePlus } from "./Icones";

export default function Quantite({ valeur, onChange, min = 1, max = 10, label }) {
  return (
    <div className="quantite" role="group" aria-label={label || "Quantité"}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, valeur - 1))}
        disabled={valeur <= min}
        aria-label="Diminuer"
      >
        <IconeMoins />
      </button>
      <span aria-live="polite">{valeur}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, valeur + 1))}
        disabled={valeur >= max}
        aria-label="Augmenter"
      >
        <IconePlus />
      </button>
    </div>
  );
}
