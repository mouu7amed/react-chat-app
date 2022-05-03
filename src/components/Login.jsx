import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firebase from "firebase/compat/app";
import { auth } from "../utilities/firebase";

export const Login = () => {
  const loginWithGoogle = () => {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <section className="login">
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="welcome">Welcome to Unichat!</p>
        <label>Login</label>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <div className="login-btns">
          <button className="loginBtn">
            Login{" "}
            <FontAwesomeIcon
              className="login-icon"
              icon={faArrowRightToBracket}
            />
          </button>
          <p className="or">or</p>
          <button className="google" onClick={loginWithGoogle}>
            <FontAwesomeIcon className="login-icon" icon={faGoogle} /> Login
            With Google
          </button>
        </div>
      </form>
    </section>
  );
};
