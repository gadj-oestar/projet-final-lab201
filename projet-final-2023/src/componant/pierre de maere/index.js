import "./css/app.css";
import React from "react";
import logo from "../../img/Logo idea pierre de maere.png";
import connexion from "../../img/connexion1.png";
import pngegg from "../../img/pp2.png";
import rectangle from "../../img/cover_Pierredemaere.png";
import rectangle1 from "../../img/coverDeluxe.png";
import poster from "../../img/PosterVioletFINALE.png";
import pull from "../../img/Purple Hoodie Back.png";
import pull1 from "../../img/Purple Hoodie Front.png";
import pull2 from "../../img/Orange Hoodie Back.png";
import pull3 from "../../img/Orange Hoodie Front.png";
import instagram from "../../img/instagram.png";
import facebook from "../../img/facebook.png";
import twitter from "../../img/twitter.png";
import youtube from "../../img/youtube.png";
import maere from "../../img/Logo Noir.png";
import video from "../../img/video.gif";
import { Link } from "react-router-dom";
import tik from "../../img/tiktok.png";
import disque from "../../img/ribbon_roll_pierredemaere.png";
import disque1 from "../../img/ribbon_roll_PierredemaereDeluxe.png";

import Panier from "../../panier/panier";
import Identification from "../../identifiant/Identifiant";

const Artiste = () => {
  const open_cart = () => {
    document.querySelector(".panier").style.display = "block";
    document.querySelector(".dark").style.display = "block";
  };
  const open = () => {
    document.querySelector(".id").style.display = "block";
    document.querySelector(".dark").style.display = "block";
  };

  return (
    <div>
      <header>
        <section className="tete">
          <div className="dark" />
          <figure>
            <img src={logo} alt="/" />
          </figure>
          <article className="logo">
            <div className="dark" />

            <figure>
              <img src={connexion} alt="" onClick={open} />
            </figure>
            <Identification />

            <figure>
              <img src={pngegg} alt="" onClick={open_cart} />
            </figure>
            <Panier />
          </article>
        </section>
        <article className="grand-bloc">
          {" "}
          <figure className="video">
            <img src={video} alt="" />
            <img src={video} alt="" />
            <img src={video} alt="" />
          </figure>
          <figure className="video1">
            <img src={video} alt="" />
            <img src={video} alt="" />
            <img src={video} alt="" />
          </figure>
          <figure className="video2">
            <img src={video} alt="" />
            <img src={video} alt="" />
            <img src={video} alt="" />
          </figure>
        </article>
      </header>
      <main>
        <section className="recomander">
          <h1>Nouvel Album</h1>
          <h2>"Regarde-Moi"</h2>
          <p>pré-commande disponible</p>
          <section className="poster">
            <article>
              <figure className="rectangle">
                <img src={rectangle} alt="/" />
              </figure>
              <figure className="disquette">
                <img src={disque} alt="/" />
              </figure>

              <article className="span">
                <span> cd "Regarde-Moi" Edition </span>
                <span>standard</span>
              </article>
              <article className="spane">
                <span>14,99€</span>
                <button>Ajouter au panier</button>
              </article>
            </article>
            <article>
              <figure className="rectangle1">
                <img src={rectangle1} alt="" />
              </figure>
              <figure className="disquette">
                <img src={disque1} alt="/" />
              </figure>

              <article className="span">
                <span> cd "Regarde-Moi" Edition</span>
                <span className="limité"> limitée</span>
              </article>
              <article className="spane">
                <span>19,99€</span>
                <button>Ajouter au panier</button>
              </article>
            </article>
          </section>
        </section>
        <section className="billeterie">
          <figure>
            <img src={poster} alt="" />
          </figure>
          <article className="sous-billeterie">
            <h2>BILLETERIE</h2>
            <h2>commandez vos billets dès maintenant</h2>
            <article className="vente">
              <select name="pets" id="pet-select">
                <option value="">Lieu</option>
                <option value="dog">paris</option>
                <option value="cat">marseille</option>
                <option value="hamster">toulouse</option>
                <option value="parrot">lille</option>
                <option value="spider">bruxelle</option>
                <option value="goldfish">Goldfish</option>
              </select>
              {/* <input type="date" /> */}
              <select name="pets" id="pet-select">
                <option value="">0</option>
                <option value="un">1</option>
                <option value="deux">2</option>
                <option value="trois">3</option>
                <option value="quatre">4</option>
                <option value="cinq">5</option>
                <option value="six">6</option>
                <option value="sept">7</option>
              </select>
            </article>
            <button>Ajouter au panier</button>
          </article>
        </section>
        <section className="shop">
          <section>
            <section className="bloc-1">
              <article className="vetement">
                <figure className="first">
                  <img src={pull} alt="" />
                </figure>
                <figure className="second">
                  <img src={pull1} alt="" />
                </figure>
              </article>
              <article className="vetement2">
                <figure className="third">
                  <img src={pull2} alt="" />
                </figure>
                <figure className="fourth">
                  <img src={pull3} alt="" />
                </figure>
              </article>
            </section>

            <article className="disque">
              <figure className="fifth">
                <img src={rectangle1} alt="" />
              </figure>
            </article>
            <section className="mini-shop">
              <article className="mini-vetement">
                <figure className="seventh">
                  <img src={pull} alt="" />
                </figure>
                <figure className="height">
                  <img src={pull1} alt="" />
                </figure>
                <figure className="mini-fifth">
                  <img src={rectangle} alt="" />
                </figure>
                <p>
                  Pack 1 Hoodie spécial <br />
                  tournée + 1 Cd
                </p>
                <span> 34,99€</span>
              </article>
              <article className="mini-vetement2">
                <figure className="nine">
                  <img src={pull2} alt="" />
                </figure>
                <figure className="ten">
                  <img src={pull3} alt="" />
                </figure>
                <figure className="mini-six">
                  <img src={rectangle} alt="" />
                </figure>
                <p>
                  Pack 1 Hoodie spécial <br />
                  “Regarde-Moi” + 1 Cd
                </p>
                <span> 34,99€</span>
              </article>
            </section>
          </section>
          <section className="bloc-2">
            <h1>Pack 2 Hoodies + 2 Cd</h1>
            <span>64,99€</span>
            <article className="case">
              <div>
                <p>XS</p>
              </div>
              <div>
                <p className="police">S</p>
              </div>
              <div>
                <p className="police">M</p>
              </div>
              <div>
                <p className="police">L</p>
              </div>
              <div>
                <p>XL</p>
              </div>
            </article>
            <button>Ajouter au panier</button>
            <article className="paragraphe">
              <p>- Les deux éditions de "Regarde-Moi", titres bonus inclus</p>
              <p>- Un Hoodie spécial tournée, coupe oversize</p>
              <p>- Un Hoodie spécial “Regarde-Moi”, coupe oversize</p>
            </article>
          </section>
        </section>
        <section className="musique">
          <iframe src="https://open.spotify.com/embed/artist/13mm5rU1jvWfWG6uQ46ypd?utm_source=generator&theme=0"></iframe>
        </section>
        <section className="inscription">
          <h2>Newsletter</h2>
          <p>Abonnez-vous pour recevoir les dernières actualités</p>
          <input type="email" placeholder="nom@email.com" />
          <button>souscrire</button>
        </section>
      </main>
      <footer>
        <div className="line"></div>
        <article className="reseau">
          <figure>
            <Link to="https://www.instagram.com/pierredemaere/#">
              <img src={instagram} alt="image" />
            </Link>

            <Link to="https://twitter.com/iamdonmcqueen?s=20">
              {" "}
              <img src={twitter} alt="image" />
            </Link>
            <img src={facebook} alt="image" />

            <img src={tik} alt="" />
          </figure>
        </article>
        <figure className="logo-footer">
          <img src={maere} alt="" />
        </figure>

        <p className="foot">
          © 2023 Store Officiel Pierre de Maere. Tous Droits Réservés.
        </p>
        <ul className="bottom">
          <li>Mentions Legales</li>
          <li>Service Clients</li>
          <li>FAQ</li>
          <li>Condition Générales de Vente</li>
          <li>Politique de Confidentialité</li>
          <li>Cookie</li>
        </ul>
      </footer>
    </div>
  );
};

export default Artiste;
