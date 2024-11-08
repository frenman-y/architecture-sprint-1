import React, { useRef, useEffect } from "react";
import * as auth from "../utils/auth.js";
import "../blocks/auth-form/auth-form.css";
import "../blocks/login/login.css";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOnLogin = (e) => {
    e.preventDefault();
    auth
      .login(email, password)
      .then((res) => {
        dispatchEvent(
          new CustomEvent("is-sign-in", {
            detail: {
              status: true,
              email: email,
            },
          })
        );
      })
      .catch((err) => {
        dispatchEvent(
          new CustomEvent("is-sign-in", {
            detail: {
              status: false,
            },
          })
        );
      });
  };

  const handleIsSignOut = (event) => {
    localStorage.removeItem("jwt");
  };

  React.useEffect(() => {
    addEventListener("is-sign-out", handleIsSignOut);
    //return () => window.removeEventListener("is-sign-out", handleIsSignOut);
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          dispatchEvent(
            new CustomEvent("is-sign-in", {
              detail: {
                status: true,
                email: res.data.email,
              },
            })
          );
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleOnLogin}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="name"
              id="email"
              className="auth-form__textfield"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-form__input">
            <input
              type="password"
              name="password"
              id="password"
              className="auth-form__textfield"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="auth-form__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
