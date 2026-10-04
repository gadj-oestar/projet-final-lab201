import Hero from "../sections/Hero";
import Album from "../sections/Album";
import Tournee from "../sections/Tournee";
import Boutique from "../sections/Boutique";
import Ecouter from "../sections/Ecouter";
import Newsletter from "../sections/Newsletter";

export default function Accueil() {
  return (
    <>
      <Hero />
      <Album />
      <Tournee />
      <Boutique />
      <Ecouter />
      <Newsletter />
    </>
  );
}
