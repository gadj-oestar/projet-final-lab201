import { auth } from "../../componant/init";
import { useState } from "react";
import "./firebase css/SignIn.css";
import { db } from "../FireBase-Helper/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import login from "./loginIn/Login";

const SignIn = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailLogin, setEmailLogin] = useState("");
  // const [passwordLogin, setPasswordLogin] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // const login = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       emailLogin,
  //       passwordLogin
  //     );
  //     const user = userCredential.user;
  //     console.log(` ${user.uid} connected`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <section className="login-container">
        <div>
          <header>
            <h2>Identification</h2>
          </header>

          <form onSubmit={signIn}>
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              required="required"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required="required"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button>inscriptio</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
