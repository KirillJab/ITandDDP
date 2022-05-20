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
            <a class="button menu-button" id="continue-game-btn">
              ПРОДОЛЖИТЬ ИГРУ
            </a>`
            : ""
        }
        <button class="button menu-button" id="new-game-btn">НОВАЯ ИГРА</button>
        <a class="button menu-button" href="https://letmegooglethat.com/?q=alias+game+rules&l=1" target="_blank">ПРАВИЛА</a>
        <a class="button menu-button" id="sign-out-btn">ВЫЙТИ</a>
      </section>
      ${!isSignedIn ? Login("") : ""}`;
};
