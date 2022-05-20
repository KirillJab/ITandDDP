import { Login } from "./login";
import { fetchGameData, signOutFromApp } from "../api/server";
import { getDefaultGameData } from "../consts/gameData.consts";

import "../styles/game-menu.css";
import "../styles/login.css";

export const MainMenu = ({ userData, prevPage, nextPage, updateGameData }) => {
  const { isSignedIn, hasSavedGame, name } = userData;

  return (
    <>
      <div className="menu-header-background"></div>
      <div className="menu-header">
        <span className="game-name">Alias</span>
      </div>
      {name && <h1>Привет, {name}</h1>}
      <section className="game-menu-buttons">
        {hasSavedGame && (
          <button
            className="menu-button"
            id="continue-game-btn"
            onClick={() => {
              updateGameData(getDefaultGameData());
              fetchGameData(userData.id, updateGameData);
              prevPage();
            }}
          >
            ПРОДОЛЖИТЬ ИГРУ
          </button>
        )}
        <button
          className="menu-button"
          id="new-game-btn"
          onClick={() => {
            updateGameData(getDefaultGameData());
            nextPage();
          }}
        >
          НОВАЯ ИГРА
        </button>
        <a
          href="https://letmegooglethat.com/?q=alias+game+rules&l=1"
          target="_blank"
        >
          <button className="menu-button">ПРАВИЛА</button>
        </a>
        <button
          className="menu-button"
          id="sign-out-btn"
          onClick={signOutFromApp}
        >
          ВЫЙТИ
        </button>
      </section>
      {!isSignedIn && <Login />}
    </>
  );
};
