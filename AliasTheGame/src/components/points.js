import { useEffect } from "react";
import { getNextCurrentTeamId } from "../helpers/gameData.helpers.js";
import { getPoints } from "../helpers/points.helpers.js";

export const Points = ({
  roundData,
  gameData,
  nextPage,
  updateRoundData,
  updateGameData,
}) => {
  const { swipedWords, lastWordTeamId } = roundData;
  const { teams, currentTeamId, isLastWordForAll } = gameData;

  const setLastWordTeamId = (id) => {
    updateRoundData({ lastWordTeamId: id });
  };

  const countPointsAndGo = () => {
    const gd = JSON.parse(JSON.stringify(gameData));
    console.log("lastWordTeamId", roundData.lastWordTeamId);
    gd.teams[gd.currentTeamId].points += getPoints(
      roundData.swipedWords,
      gd.isLastWordForAll,
      roundData.lastWordTeamId === gd.currentTeamId
    );

    if (gd.isLastWordForAll && roundData.lastWordTeamId !== -1) {
      gd.teams[roundData.lastWordTeamId].points++;
    }

    const curPoints = +gd.teams[gd.currentTeamId].points;

    if (curPoints > gd.maxPoints) {
      gd.maxPoints = curPoints;
    }

    if (
      gd.maxPoints >= gd.wordsToWin &&
      gd.currentTeamId === gd.teams.length - 1
    ) {
      gd.isOvertime = true;
      gd.isFinish =
        gd.teams.filter((team) => team.points === gd.maxPoints).length === 1;
    }

    gd.currentTeamId = getNextCurrentTeamId(gd.currentTeamId, gd.teams.length);

    updateGameData(gd);
    nextPage();
  };

  return (
    <>
      <section className="team-turn-section">
        <div className="points-screen">
          <div className="points-screen-heading">
            <h2>Набранные очки:</h2>
            <span id="points-from-turn">
              {getPoints(
                swipedWords,
                isLastWordForAll,
                lastWordTeamId === currentTeamId
              )}
            </span>
          </div>
          <div className="bold-underline" />
          <ul id="points-list">
            {swipedWords.map((word, index, array) => (
              <li className="row" key={index}>
                <div>
                  {index === array.length - 1 && isLastWordForAll ? (
                    <button
                      className="group-button"
                      id="choose-team-name"
                      // onClick={openModal}
                    >
                      <span className="material-icon">group</span>
                    </button>
                  ) : (
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        id={word.word}
                        checked={word.guessed}
                        onChange={() => {
                          if (index === array.length - 1 && isLastWordForAll) {
                            return;
                          }
                          updateRoundData({
                            swipedWords: [
                              ...swipedWords.slice(0, index),
                              { ...word, guessed: !word.guessed },
                              ...swipedWords.slice(index + 1),
                            ],
                          });
                        }}
                      />
                      <span className="checkmark" />
                    </label>
                  )}
                  <h3>{word.word}</h3>
                </div>
                {index < array.length - 1 && <div className="thin-underline" />}
              </li>
            ))}
          </ul>
        </div>
        <div className="team-turn">
          <div>
            <span id="team-name-turn">{teams[currentTeamId].name}</span>
          </div>
          <div className="underline" />
        </div>
        <button
          className="next-button"
          id="next-btn"
          onClick={countPointsAndGo}
        >
          Завершить
        </button>
      </section>
      {isLastWordForAll && (
        <div
          id="modal-container"
          // ref={modalRef}
        >
          <div id="modal">
            <h2>Какая команда отгадала последнее слово?</h2>
            <div className="underline" />
            {teams.map((team, index) => (
              <button
                id={"choose-" + index}
                onClick={() => setLastWordTeamId(index)}
              >
                <span>{team.name}</span>
              </button>
            ))}
            <button
              id="choose-noone"
              // onClick={() => setLastWordTeamId(-1)}
            >
              <span>Никто</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
