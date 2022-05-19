import { Login } from "./login";

import "../styles/game-menu.css";
import "../styles/login.css";

export const MainMenu = ({ isSignedIn, hasSavedGame, name }) => {
  return `
      <div class="menu-header-background"></div>
      <div class="menu-header">
        <span class="game-name">Alias</span>
      </div>
      ${name ? `<h1>Привет, ${name}</h1>` : ""}
      <section class="game-menu-buttons">
        ${
          hasSavedGame
            ? `
            <button class="menu-button" id="continue-game-btn">
              ПРОДОЛЖИТЬ ИГРУ
            </button>`
            : ""
        }
        <button class="menu-button" id="new-game-btn">НОВАЯ ИГРА</button>
        <a href="https://letmegooglethat.com/?q=alias+game+rules&l=1" target="_blank"><button class="menu-button">ПРАВИЛА</button></a>
        <button class="menu-button" id="sign-out-btn">ВЫЙТИ</button>
      </section>
      ${!isSignedIn ? Login("") : ""}`;
};
