import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../utilities/firebase";

export const Login = () => {
  const [tooltip, setTooltip] = useState("");

  const loginWithGoogle = (e) => {
    e.preventDefault();
    setTooltip("Redirecting ...");
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <section className="login">
      <form>
        <label className="welcome">Welcome to Unichat!</label>

        <button className="google" type="submit" onClick={loginWithGoogle}>
          Continue with Google
          <FontAwesomeIcon className="login-icon" icon={faGoogle} />
        </button>

        <p className="tooltip">{tooltip}</p>
      </form>
    </section>
  );
};
