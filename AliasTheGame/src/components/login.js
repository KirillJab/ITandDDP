import { useState, useEffect } from "react";
import {
  signInWithEmail,
  signUpWithEmail,
  redirectGoogleSignUp,
} from "../api/server";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email]);

  return (
    <div id="modal-container" className="show">
      <div id="modal">
        <h2>Пожалуйста, войдите в свой аккаунт</h2>
        <div className="underline"></div>
        <div className="inputs">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            minLength="6"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="controls">
          <button id="sign-up" onClick={() => signUpWithEmail(email, password)}>
            <span>Регистрация</span>
          </button>
          <button id="sign-in" onClick={() => signInWithEmail(email, password)}>
            <span>Войти</span>
          </button>
        </div>
        <a id="sign-in-with-google" onClick={redirectGoogleSignUp}>
          Войти через Google
        </a>
      </div>
    </div>
  );
};
