import { useEffect, useState } from "react";
import { MainMenu } from "./components/mainMenu";
import {
  DEFAULT_USER_DATA,
  DEFAULT_GAME_DATA,
} from "./consts/gameData.consts.js";

import "./styles.css";
import "./styles/checkbox.css";

const App = () => {
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);
  const [gameData, setGameData] = useState(DEFAULT_GAME_DATA);
  const [roundData, setRoundData] = useState();

  const [wordsForRound, setWordsForRound] = useState();
  const [component, setComponent] = useState();

  const getNewWord = () => {
    if (roundData.swipedWordsLength >= wordsForRound.length) {
      roundData.swipedWordsLength = 0;
    }
    if (roundData.swipedWordsLength === wordsForRound.length - 2) {
      setWordsForRound(getWords(getDictionary(gameData.dictionaryId), 100));
      roundData.swipedWordsLength = 0;
    }

    return wordsForRound[roundData.swipedWordsLength++];
  };

  useEffect(() => {
    setRoundData({
      swipedWords: [],
      swipedWordsLength: 0,
      lastWordTeamId: -1,
      teamId: 0,
    });
  }, []);

  return (
    <main>
      <div className="container">
        <div className="game-menu" id="game-menu-container">
          {MainMenu(userData)}
        </div>
      </div>
    </main>
  );
};

export default App;
