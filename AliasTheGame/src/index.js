import { MainMenu } from "./components/mainMenu.js";
import { NewGameSettings } from "./components/newGameSettings.js";
import { TeamsSettings } from "./components/teamsSettings.js";
import { TeamsPoints } from "./components/teamsPoints.js";
import { Game } from "./components/game.js";
import { CardSlider } from "./components/cardSlider.js";
import { Points } from "./components/points.js";

const gameData = {
  dictionary: 0,
  roundTime: 60,
  wordsToWin: 50,
  isLastWordForAll: false,
  teams: [
    {
      name: "Весёлые тюлени",
      points: 0,
    },
    {
      name: "Мудрые черепахи",
      points: 0,
    },
  ],
};

let wordIndex = 0;
const wordsForRound = [
  "название",
  "мост",
  "семья",
  "изделие",
  "книжка",
  "новое",
  "мэр",
  "возможность",
  "итог",
  "баба",
  "категория",
  "телевизор",
];

const mainContainer = document.getElementById("game-menu-container");

const getNewWord = () => {
  wordsForRound[wordIndex];
  wordIndex++;
};

const swipeUp = () => {};

const changeTime = (delta) => {
  gameData.roundTime =
    gameData.roundTime + delta >= 30 && gameData.roundTime + delta <= 600
      ? gameData.roundTime + delta
      : gameData.roundTime;
  RenderNewGame(gameData);
};
const changeWordsAmount = (delta) => {
  gameData.wordsToWin =
    gameData.wordsToWin + delta >= 10 && gameData.wordsToWin + delta <= 1000
      ? gameData.wordsToWin + delta
      : gameData.wordsToWin;
  RenderNewGame(gameData);
};

const addOnClick = (id, callback) => {
  document.getElementById(id).addEventListener("click", callback);
};

const RenderMainMenu = () => {
  mainContainer.innerHTML = MainMenu();
  addOnClick("new-game-btn", RenderNewGame);
};

const RenderNewGame = () => {
  mainContainer.innerHTML = NewGameSettings(gameData);
  addOnClick("go-back-btn", RenderMainMenu);
  addOnClick("add-time", () => changeTime(30));
  addOnClick("sub-time", () => changeTime(-30));
  addOnClick("add-words", () => changeWordsAmount(10));
  addOnClick("sub-words", () => changeWordsAmount(-10));
  addOnClick("next-btn", RenderTeamsSettings);
};

const RenderTeamsSettings = () => {
  mainContainer.innerHTML = TeamsSettings(gameData);
  addOnClick("go-back-btn", RenderMainMenu);
  addOnClick("prev-settings-btn", RenderNewGame);
  addOnClick("is-last-word-for-all", () => {
    gameData.isLastWordForAll = !gameData.isLastWordForAll;
    console.log(gameData.isLastWordForAll);
  });
  addOnClick("add-team", () => {
    if (gameData.teams.length < 5) gameData.teams.push({ name: "", points: 0 });
    RenderTeamsSettings();
  });
  addOnClick("next-btn", () => {
    console.log(gameData.teams);
    if (gameData.teams.every((team) => team.name.trim())) {
      RenderTeamsPoints();
    }
  });

  for (let i = 0; i < gameData.teams.length; i++) {
    addOnClick(`delete-team-${i}`, () => {
      gameData.teams.splice(i, 1);
      RenderTeamsSettings();
    });
    document
      .getElementById(`edit-team-name-${i}`)
      .addEventListener("input", (e) => {
        gameData.teams[i].name =
          e.target.value[0].toUpperCase() +
          e.target.value.slice(1).toLowerCase();
      });
  }
};

const RenderTeamsPoints = () => {
  mainContainer.innerHTML = TeamsPoints(gameData.teams);
  addOnClick("go-back-btn", RenderMainMenu);
  addOnClick("next-btn", RenderGame);
};

const RenderGame = () => {
  mainContainer.innerHTML = Game();

  const timerElement = document.getElementById("turn-timer");
  let timeLeft = gameData.roundTime;

  timerElement.textContent = timeLeft;
  const timer = setInterval(() => {
    timeLeft -= 11;
    if (timeLeft === 0) {
      clearInterval(timer);
      RenderPoints();
    }
    timerElement.textContent = timeLeft;
  }, 1000);

  CardSlider();
};

const RenderPoints = () => {
  mainContainer.innerHTML = Points();
  addOnClick("go-back-btn", RenderMainMenu);
};

RenderMainMenu();
