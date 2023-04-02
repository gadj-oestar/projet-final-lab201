import "./panier.css";
import suprrimer from "../img/supprimer.png";

const Panier = () => {
  const close = () => {
    document.querySelector(".panier").style.display = "none";
    document.querySelector(".dark").style.display = "none";
  };

  window.onscroll = function (e) {  
    close();  
    } 

  return (
    <section className="panier">
      <figure>
        <img src={suprrimer} onClick={close} />
      </figure>
      <h1> Ton panier</h1>
      <p> votre panier est actuellement vide</p>
    </section>
  );
};

export default Panier;
