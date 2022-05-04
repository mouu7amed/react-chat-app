import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../utilities/firebase";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": "7a065370-7133-4734-8bbe-bc95c44fc8cf",
          "User-Name": username,
          "User-Secret": password,
        },
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      setError("Oops, Incorrect Username or Password!");
    }
  };

  const loginWithGoogle = () => {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <section className="login">
      <form onSubmit={loginHandler}>
        <p className="welcome">Welcome to Unichat!</p>
        <label>Login</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login-btns">
          <button className="loginBtn" type="submit">
            Login{" "}
            <FontAwesomeIcon
              className="login-icon"
              icon={faArrowRightToBracket}
            />
          </button>
          <p className="or">or</p>
          <button className="google" onClick={loginWithGoogle}>
            Google
            <FontAwesomeIcon className="login-icon" icon={faGoogle} />
          </button>
        </div>
        <p className="error">{error}</p>
      </form>
    </section>
  );
};
