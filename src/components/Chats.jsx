import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useNavigate } from "react-router-dom";
import { auth } from "../utilities/firebase";
import { useAuth } from "../utilities/Auth";
import axios from "axios";
import { Loading } from "./Loading";
import { Login } from "./Login";

export const Chats = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": "7a065370-7133-4734-8bbe-bc95c44fc8cf",
          "User-Name": user.email,
          "User-Secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log("Error, ", error);
            });
        });
      });
  }, [user, navigate]);

  const logoutHandler = async () => {
    await auth.signOut();
    navigate("/");
  };

  if (!user || loading) return <Loading />;

  return (
    <section className="chats">
      <nav className="nav-bar">
        <p className="logo">UniChat</p>
        <button className="logout" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
      <div className="chat-container">
        <ChatEngine
          height="calc(100vh - 70px)"
          projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </section>
  );
};
