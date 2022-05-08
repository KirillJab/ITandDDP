import { MainMenu } from "./components/mainMenu.js";
import { NewGameSettings } from "./components/newGameSettings.js";
import { TeamsSettings } from "./components/teamsSettings.js";
import { TeamsPoints } from "./components/teamsPoints.js";
import { Round } from "./components/round.js";
import { CardSlider } from "./components/cardSlider.js";
import { Points } from "./components/points.js";
import { getPoints } from "./helpers/points.helpers.js";
import { GET_DEFAULT_GAME_DATA } from "./consts/gameData.consts";
import {
  getNewTime,
  getNewWordsAmount,
  getNextCurrentTeamId,
} from "./helpers/gameData.helpers.js";
import {
  signInWithEmail,
  signUpWithEmail,
  redirectGoogleSignUp,
  monitorAuthState,
  signOutFromApp,
  backUpGameData,
  fetchGameData,
  getWords,
  getDictionary,
} from "./api/server.js";

import "./styles.css";
import "./styles/checkbox.css";

let userData = {
  id: "",
  name: "",
  hasSavedGame: false,
  isSignedIn: false,
};

let gameData;
let roundData = {
  swipedWords: [],
  swipedWordsLength: 0,
  lastWordTeamId: -1,
  teamId: 0,
};
let wordsForRound = [];

const setGameData = (newData) => {
  gameData = JSON.parse(JSON.stringify(newData));
};
const setUserData = (newData) => {
  userData = JSON.parse(JSON.stringify(newData));
};
const setWordsForRound = (newData) => {
  wordsForRound = JSON.parse(JSON.stringify(newData));
};

const getNewWord = () => {
  if (roundData.swipedWordsLength >= wordsForRound.length) {
    roundData.swipedWordsLength = 0;
  }
  if (roundData.swipedWordsLength === wordsForRound.length - 2) {
    setWordsForRound(getWords(getDictionary(gameData.dictionaryNumber), 100));
    roundData.swipedWordsLength = 0;
  }

  return wordsForRound[roundData.swipedWordsLength++];
};

const mainContainer = document.getElementById("game-menu-container");

const addOnClick = (id, callback) => {
  document.getElementById(id).addEventListener("click", callback);
};

const swipeCard = (word, guessed) => {
  roundData.swipedWords.push({
    word,
    guessed,
  });
};

const RenderMainMenu = () => {
  mainContainer.innerHTML = MainMenu(userData);

  if (!userData.isSignedIn) {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnClick("sign-in", () => {
      signInWithEmail(email.value, password.value);
    });

    addOnClick("sign-up", () => {
      signUpWithEmail(email.value, password.value);
    });

    addOnClick("sign-in-with-google", () => redirectGoogleSignUp());
  } else {
    if (userData.hasSavedGame) {
      addOnClick("continue-game-btn", () => {
        fetchGameData(userData.id, setGameData).then(RenderTeamsPoints);
      });
    }
    addOnClick("new-game-btn", () => {
      setGameData(GET_DEFAULT_GAME_DATA);
      RenderNewGame();
    });
    addOnClick("sign-out-btn", () => {
      setUserData({
        id: "",
        name: "",
        hasSavedGame: false,
        isSignedIn: false,
      });
      signOutFromApp();
    });
  }
};

const saveAndExit = () => {
  if (gameData.maxPoints > 0) {
    backUpGameData(userData, gameData);
  }
  RenderMainMenu();
};

const RenderNewGame = () => {
  mainContainer.innerHTML = NewGameSettings(gameData);

  addOnClick("go-back-btn", RenderMainMenu);
  addOnClick("add-time", () => {
    gameData.roundTime = getNewTime(gameData.roundTime, 30);
    RenderNewGame();
  });
  addOnClick("sub-time", () => {
    gameData.roundTime = getNewTime(gameData.roundTime, -30);
    RenderNewGame();
  });
  addOnClick("add-words", () => {
    gameData.wordsToWin = getNewWordsAmount(gameData.wordsToWin, 10);
    RenderNewGame();
  });
  addOnClick("sub-words", () => {
    gameData.wordsToWin = getNewWordsAmount(gameData.wordsToWin, -10);
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
    if (gameData.teams.length < 5)
      gameData.teams.push({ name: "", points: 0, color: "#38F5F5" });
    RenderTeamsSettings();
  });
  addOnClick("next-btn", () => {
    if (
      gameData.teams.length >= 2 &&
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
      .addEventListener("change", (e) => {
        gameData.teams[i].name =
          e.target.value[0].toUpperCase() +
          e.target.value.slice(1).toLowerCase();
      });
    document
      .getElementById(`edit-team-color-${i}`)
      .addEventListener("change", (e) => {
        gameData.teams[i].color = e.target.value;
      });
  }
};

const RenderTeamsPoints = () => {
  mainContainer.innerHTML = TeamsPoints(gameData);

  addOnClick("go-back-btn", saveAndExit);

  if (!gameData.isFinish) {
    addOnClick("next-btn", RenderRound);

    if (gameData.maxPoints > 0) {
      backUpGameData(userData, gameData);
    }
  } else {
    addOnClick("close-modal", () => {
      document.getElementById("modal-container").classList.remove("show");
    });

    addOnClick("end-game", RenderMainMenu);
  }
};

const RenderRound = () => {
  mainContainer.innerHTML = Round(gameData.teams[gameData.currentTeamId]);

  roundData = {
    swipedWords: [],
    swipedWordsLength: 0,
    lastWordTeamId: -1,
    teamId: gameData.currentTeamId,
  };

  setWordsForRound(getWords(getDictionary(gameData.dictionaryNumber), 100));

  CardSlider(
    swipeCard,
    getNewWord,
    gameData.roundTime,
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
    addOnClick("choose-noone", () => {
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
  addOnClick("go-back-btn", saveAndExit);
  addOnClick("next-btn", () => {
    gameData.teams[gameData.currentTeamId].points += getPoints(
      roundData.swipedWords,
      gameData.isLastWordForAll,
      roundData.lastWordTeamId === gameData.currentTeamId
    );

    if (gameData.isLastWordForAll && roundData.lastWordTeamId !== -1) {
      gameData.teams[roundData.lastWordTeamId].points++;
    }

    const curPoints = +gameData.teams[gameData.currentTeamId].points;

    if (curPoints > gameData.maxPoints) {
      gameData.maxPoints = curPoints;
    }

    if (
      gameData.maxPoints >= gameData.wordsToWin &&
      gameData.currentTeamId === gameData.teams.length - 1
    ) {
      gameData.isOvertime = true;
      gameData.isFinish =
        gameData.teams.filter((team) => team.points === gameData.maxPoints)
          .length === 1;
    }

    gameData.currentTeamId = getNextCurrentTeamId(
      gameData.currentTeamId,
      gameData.teams.length
    );

    RenderTeamsPoints();
  });
};

RenderMainMenu();
monitorAuthState(setUserData, RenderMainMenu);
// signOutFromApp();
