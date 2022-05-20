import {
  getDictionaryById,
  getNewTime,
  getNewWordsAmount,
  getNextDictionaryId,
  getPrevDictionaryId,
} from "../helpers/gameData.helpers.js";

import "../styles/vocabulary.css";
import "../styles/settings.css";

export const NewGameSettings = ({ gameData, nextPage, updateGameData }) => {
  const { roundTime, wordsToWin, dictionaryName, dictionaryId } = gameData;

  const updateDictionary = (id) => {
    updateGameData({
      dictionaryId: id,
      dictionaryName: getDictionaryById(id).name,
    });
  };

  return (
    <>
      <section className="game-vocabulary">
        <div>
          <span className="vocabularies-description">Cловарь:</span>
          <button
            className="vocabularies-button"
            id="choose-vocabulary-prev"
            onClick={() => updateDictionary(getPrevDictionaryId(dictionaryId))}
          >
            <span className="material-icon">arrow_back</span>
          </button>
          <span id="choosen-dictionary">{dictionaryName}</span>
          <button
            className="vocabularies-button"
            id="choose-vocabulary-next"
            onClick={() => updateDictionary(getNextDictionaryId(dictionaryId))}
          >
            <span className="material-icon">arrow_forward</span>
          </button>
        </div>
        <div className="underline"></div>
      </section>
      <section className="game-settings">
        <h2>Настройки</h2>
        <div className="bold-underline"></div>
        <ul>
          <li className="row">
            <div>
              <aside>
                <span className="material-icon">av_timer</span>
              </aside>
              <article>
                <h3>Длина раунда</h3>
                <p>за которое надо отгадать слова</p>
              </article>
              <div className="timer-display">
                <span className="minutes-timer">
                  {Math.floor(roundTime / 60)}
                </span>
                <span className="seconds-timer">
                  {(roundTime / 30) % 2 ? "30" : ""}
                </span>
                <span className="minutes-text">мин</span>
              </div>
            </div>
            <div className="controls">
              <button
                className="button"
                id="sub-time"
                onClick={() =>
                  updateGameData({
                    roundTime: getNewTime(gameData.roundTime, -30),
                  })
                }
              >
                -30 сек
              </button>
              <button
                className="button"
                id="add-time"
                onClick={() =>
                  updateGameData({
                    roundTime: getNewTime(gameData.roundTime, 30),
                  })
                }
              >
                +30 сек
              </button>
            </div>
            <div className="thin-underline"></div>
          </li>
          <li className="row">
            <div>
              <aside>
                <span className="material-icon">aod</span>
              </aside>
              <article>
                <h3>Количество слов</h3>
                <p>необходимое для победы</p>
              </article>
              <div className="words-display">
                <span className="minutes-timer" id="words-to-win-text">
                  {wordsToWin}
                </span>
              </div>
            </div>
            <div className="controls">
              <button
                className="button"
                id="sub-words"
                onClick={() =>
                  updateGameData({
                    wordsToWin: getNewWordsAmount(gameData.wordsToWin, -10),
                  })
                }
              >
                -10 слов
              </button>
              <button
                className="button"
                id="add-words"
                onClick={() =>
                  updateGameData({
                    wordsToWin: getNewWordsAmount(gameData.wordsToWin, 10),
                  })
                }
              >
                +10 слов
              </button>
            </div>
          </li>
        </ul>
        <button className="next-button" id="next-btn" onClick={nextPage}>
          Далее
        </button>
      </section>
    </>
  );
};
