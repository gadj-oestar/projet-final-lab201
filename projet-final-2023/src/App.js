import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Panier from "./components/Panier";
import Authentification from "./components/Authentification";
import Accueil from "./pages/Accueil";
import Commande from "./pages/Commande";
import Compte from "./pages/Compte";
import Introuvable from "./pages/Introuvable";

// Fait défiler jusqu'à l'ancre (#album, #tournee...) après chaque navigation.
function DefilementAncre() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const cible = document.getElementById(hash.slice(1));
      if (cible) {
        cible.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [panierOuvert, setPanierOuvert] = useState(false);

  return (
    <>
      <DefilementAncre />
      <Header onOuvrirPanier={() => setPanierOuvert(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="*" element={<Introuvable />} />
        </Routes>
      </main>
      <Footer />
      <Panier ouvert={panierOuvert} onFermer={() => setPanierOuvert(false)} />
      <Authentification />
    </>
  );
}
