import { MainMenu } from "./components/mainMenu.js";
import { NewGameSettings } from "./components/newGameSettings.js";
import { TeamsSettings } from "./components/teamsSettings.js";
import { TeamsPoints } from "./components/teamsPoints.js";
import { Round } from "./components/round.js";
import { CardSlider } from "./components/cardSlider.js";
import { Points } from "./components/points.js";
import { getPoints } from "./helpers/points.helpers.js";
import {
  getNewTime,
  getNewWordsAmount,
  getNextCurrentTeamId,
} from "./helpers/gameData.helpers.js";

const gameData = {
  dictionary: 0,
  roundTime: 60,
  wordsToWin: 50,
  isLastWordForAll: false,
  teams: [
    {
      name: "Весёлые тюлени",
      points: 0,
      color: "",
    },
    {
      name: "Мудрые черепахи",
      points: 0,
      color: "",
    },
  ],
  currentTeamId: 0,
};

let roundData = {
  swipedWords: [],
  swipedWordsLength: 0,
  lastWordTeamId: -1,
  teamId: 0,
};

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

const addOnClick = (id, callback) => {
  document.getElementById(id).addEventListener("click", callback);
};

const getNewWord = () => {
  //TODO
  if (roundData.swipedWordsLength >= wordsForRound.length) {
    roundData.swipedWordsLength = 0;
  }
  return wordsForRound[roundData.swipedWordsLength++];
};

const RenderMainMenu = () => {
  mainContainer.innerHTML = MainMenu();
  addOnClick("new-game-btn", RenderNewGame);
};

const RenderNewGame = () => {
  mainContainer.innerHTML = NewGameSettings(gameData);
  addOnClick("go-back-btn", RenderMainMenu);
  addOnClick("add-time", () => {
    getNewTime(30, gameData.roundTime);
    RenderNewGame();
  });
  addOnClick("sub-time", () => {
    getNewTime(-30, gameData.roundTime);
    RenderNewGame();
  });
  addOnClick("add-words", () => {
    getNewWordsAmount(10, gameData.wordsToWin);
    RenderNewGame();
  });
  addOnClick("sub-words", () => {
    getNewWordsAmount(-10, gameData.wordsToWin);
    RenderNewGame();
  });
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
    if (
      gameData.teams.every(
        (team) => team.name.trim() && team.name.trim().length < 17
      )
    ) {
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
  addOnClick("next-btn", RenderRound);
};

const swipeCard = (up) => {
  roundData.swipedWords.push({
    word: wordsForRound[roundData.swipedWordsLength],
    guessed: up,
  });
  console.log(roundData);
};

const RenderRound = () => {
  mainContainer.innerHTML = Round(gameData.teams[gameData.currentTeamId]);

  roundData = {
    swipedWords: [],
    swipedWordsLength: 0,
    lastWordTeamId: gameData.currentTeamId,
    teamId: gameData.currentTeamId,
  };

  CardSlider(
    swipeCard,
    getNewWord,
    gameData.roundTime / 3,
    gameData.isLastWordForAll,
    RenderPoints
  );
};

const RenderPoints = (scrollPos) => {
  mainContainer.innerHTML = Points(roundData, gameData);

  document.getElementById("points-list").scrollTop = scrollPos;

  roundData.swipedWords.forEach((word, index) => {
    if (index === roundData.swipedWords.length - 1 && gameData.isLastWordForAll)
      return;
    addOnClick(word.word, () => {
      word.guessed = !word.guessed;
      const currentScrollPos = document.getElementById("points-list").scrollTop;
      RenderPoints(currentScrollPos);
    });
  });

  if (gameData.isLastWordForAll) {
    gameData.teams.forEach((_, index) =>
      addOnClick(`choose-${index}`, () => {
        roundData.lastWordTeamId = index;
        document.getElementById("modal-container").classList.remove("show");

        const currentScrollPos =
          document.getElementById("points-list").scrollTop;
        RenderPoints(currentScrollPos);
      })
    );
    addOnClick(`choose-noone`, () => {
      roundData.lastWordTeamId = -1;
      document.getElementById("modal-container").classList.remove("show");

      const currentScrollPos = document.getElementById("points-list").scrollTop;
      RenderPoints(currentScrollPos);

      console.log(roundData);
    });
    addOnClick("choose-team-name", () => {
      document.getElementById("modal-container").classList.add("show");
    });
  }

  addOnClick("go-back-btn", RenderMainMenu);
  addOnClick("next-btn", () => {
    gameData.teams[gameData.currentTeamId].points += getPoints(
      roundData.swipedWords,
      !gameData.isLastWordForAll ||
        roundData.lastWordTeamId === gameData.currentTeamId
    );

    if (gameData.isLastWordForAll && roundData.lastWordTeamId !== -1) {
      gameData.teams[roundData.lastWordTeamId].points++;
    }

    gameData.currentTeamId = getNextCurrentTeamId(
      gameData.currentTeamId,
      gameData.teams.length
    );

    RenderTeamsPoints();
  });
};

RenderMainMenu();
