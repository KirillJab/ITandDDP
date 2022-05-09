import { Login } from "./login";

import "../styles/game-menu.css";
import "../styles/login.css";

export const MainMenu = ({ isSignedIn, hasSavedGame, name }) => {
  return (
    <>
      <div className="menu-header-background"></div>
      <div className="menu-header">
        <span className="game-name">Alias</span>
      </div>
      {name && <h1>Привет, {name}</h1>}
      <section className="game-menu-buttons">
        {hasSavedGame && (
          <button className="menu-button" id="continue-game-btn">
            ПРОДОЛЖИТЬ ИГРУ
          </button>
        )}
        <button className="menu-button" id="new-game-btn">
          НОВАЯ ИГРА
        </button>
        <a
          href="https://letmegooglethat.com/?q=alias+game+rules&l=1"
          target="_blank"
        >
          <button className="menu-button">ПРАВИЛА</button>
        </a>
        <button className="menu-button" id="sign-out-btn">
          ВЫЙТИ
        </button>
      </section>
      {!isSignedIn && Login()}
    </>
  );
};
