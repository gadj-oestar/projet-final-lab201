import "./Identifiant.css";
import suprrimer from "../img/supprimer.png";

const Identification = () => {
  const close = () => {
    document.querySelector(".id").style.display = "none";
    document.querySelector(".dark").style.display = "none";
  };

  window.onscroll = function (e) {
    close();
  };
  return (
    <section className="id">
      <figure className="clic">
        <img src={suprrimer} onClick={close}  alt="/"/>
      </figure>
      <article className=" connexion">
        <form>
          <h3>connexion</h3>
          <h3>creer un compte</h3>

          <input type="email" placeholder="email" className="email" />
          <input type="password" placeholder="password" />
          <p className="spanee">Mot de passe oublié</p>

          <button> connexion</button>
        </form>
      </article>
    </section>
  );
};

export default Identification;
