import { useEffect, useState, useRef } from "react";
import {
  backUpGameData,
  getDictionary,
  getWords,
  monitorAuthState,
} from "./api/server";
import { Header } from "./components/header";
import { pages } from "./consts/page.consts";
import {
  DEFAULT_USER_DATA,
  getDefaultGameData,
} from "./consts/gameData.consts.js";
import { CardSlider } from "./components";

import "./styles.css";
import "./styles/checkbox.css";

const App = () => {
  const [userData, setUserData] = useState({
    ...DEFAULT_USER_DATA,
  });
  const [gameData, setGameData] = useState(getDefaultGameData());
  const [roundData, setRoundData2] = useState();
  const swipedWordsCounter = useRef(0);
  const setRoundData = (value) => {
    //   console.log("SET RD:", value);
    //   console.log(roundData);
    setRoundData2(value);
  };

  const [wordsForRound, setWordsForRound] = useState();
  const [pageCode, setPageCode] = useState(pages.MainMenu.code);

  const addOnClick = (id, callback) => {
    document.getElementById(id).addEventListener("click", callback);
  };

  const saveAndExit = () => {
    if (gameData.maxPoints > 0) {
      console.log(userData);
      console.log(gameData);
      backUpGameData(userData, gameData);
      setUserData((prevValue) => ({ ...prevValue, hasSavedGame: true }));
    }
    setPageCode(pages.MainMenu.code);
  };

  const swipeCard = (word, guessed) => {
    setRoundData((prevValue) => ({
      ...prevValue,
      swipedWords: [
        ...prevValue.swipedWords,
        {
          word,
          guessed,
        },
      ],
    }));
  };

  const fetchWordsForRound = (amount) => {
    const words = getWords(getDictionary(gameData.dictionaryId), amount);
    setWordsForRound(words);
  };

  const getNewWord = () => {
    if (swipedWordsCounter.current >= wordsForRound.length - 1) {
      fetchWordsForRound(100);
      swipedWordsCounter.current = 0;
    }

    return wordsForRound[swipedWordsCounter.current++];
  };

  useEffect(() => {
    setRoundData({
      swipedWords: [],
      swipedWordsLength: 0,
      lastWordTeamId: -1,
      teamId: 0,
    });
    monitorAuthState(setUserData);
  }, []);

  const page = pages[pageCode];
  const sharedProps = {
    userData,
    gameData,
    roundData,
    updateUserData: (newValue) =>
      setUserData((prevValue) => ({ ...prevValue, ...newValue })),
    updateGameData: (newValue) =>
      setGameData((prevValue) => ({ ...prevValue, ...newValue })),
    updateRoundData: (newValue) =>
      setRoundData((prevValue) => {
        console.log(prevValue);
        console.log({ ...prevValue, ...newValue });
        return { ...prevValue, ...newValue };
      }),
    nextPage: () => {
      setPageCode(page.nextPageCode);
    },
    prevPage: () => setPageCode(page.prevPageCode),
    swipeCard,
    getNewWord,
  };

  useEffect(() => {
    switch (page.code) {
      case pages.Round.code:
        setRoundData({
          swipedWords: [],
          swipedWordsLength: 0,
          lastWordTeamId: -1,
          teamId: 0,
        });
        fetchWordsForRound(100);
        CardSlider(
          swipeCard,
          getNewWord,
          gameData.roundTime,
          gameData.isLastWordForAll,
          sharedProps.nextPage
        );
        break;
      case pages.Points.code:
        if (gameData.isLastWordForAll) {
          gameData.teams.forEach((_, index) =>
            addOnClick(`choose-${index}`, () => {
              document
                .getElementById("modal-container")
                .classList.remove("show");
            })
          );
          addOnClick("choose-noone", () => {
            document.getElementById("modal-container").classList.remove("show");
          });
          addOnClick("choose-team-name", () => {
            document.getElementById("modal-container").classList.add("show");
          });
        }

        break;
      case pages.TeamsPoints.code:
        if (!gameData.isFinish) {
          if (gameData.maxPoints > 0) {
            // backUpGameData(userData, gameData);
          }
        } else {
          addOnClick("close-modal", () => {
            document.getElementById("modal-container").classList.remove("show");
          });
        }
        fetchWordsForRound(100);
        break;
    }
  }, [page.code]);

  return (
    <main>
      <div className="container">
        <div className="game-menu" id="game-menu-container">
          {page.withHeader && <Header goBack={saveAndExit} />}
          {page.component({ ...sharedProps })}
        </div>
      </div>
    </main>
  );
};

export default App;
