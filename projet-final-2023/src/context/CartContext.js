import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CLE_STOCKAGE = "pdm-panier";
const CartContext = createContext(null);

const lirePanier = () => {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    return brut ? JSON.parse(brut) : [];
  } catch {
    return [];
  }
};

function reducer(articles, action) {
  switch (action.type) {
    case "ajouter": {
      const { article, quantite } = action;
      const existant = articles.find((a) => a.cle === article.cle);
      if (existant) {
        return articles.map((a) =>
          a.cle === article.cle ? { ...a, quantite: a.quantite + quantite } : a
        );
      }
      return [...articles, { ...article, quantite }];
    }
    case "quantite":
      return articles
        .map((a) => (a.cle === action.cle ? { ...a, quantite: action.quantite } : a))
        .filter((a) => a.quantite > 0);
    case "retirer":
      return articles.filter((a) => a.cle !== action.cle);
    case "vider":
      return [];
    default:
      return articles;
  }
}

export function CartProvider({ children }) {
  const [articles, dispatch] = useReducer(reducer, undefined, lirePanier);

  useEffect(() => {
    try {
      localStorage.setItem(CLE_STOCKAGE, JSON.stringify(articles));
    } catch {
      // stockage indisponible (navigation privée) : le panier reste en mémoire
    }
  }, [articles]);

  const valeur = useMemo(() => {
    const nombre = articles.reduce((s, a) => s + a.quantite, 0);
    const total = articles.reduce((s, a) => s + a.quantite * a.prix, 0);
    return {
      articles,
      nombre,
      total,
      ajouter: (article, quantite = 1) => dispatch({ type: "ajouter", article, quantite }),
      changerQuantite: (cle, quantite) => dispatch({ type: "quantite", cle, quantite }),
      retirer: (cle) => dispatch({ type: "retirer", cle }),
      vider: () => dispatch({ type: "vider" }),
    };
  }, [articles]);

  return <CartContext.Provider value={valeur}>{children}</CartContext.Provider>;
}

export const usePanier = () => useContext(CartContext);
