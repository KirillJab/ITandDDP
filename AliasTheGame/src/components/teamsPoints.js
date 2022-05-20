import { DEFAULT_GAME_DATA } from "../consts/gameData.consts";
import "../styles/teams-points.css";

export const TeamsPoints = ({
  gameData,
  nextPage,
  prevPage,
  updateGameData,
  updateUserData,
}) => {
  const { teams, currentTeamId, isOvertime, isFinish } = gameData;

  const endGame = () => {
    updateGameData({ ...DEFAULT_GAME_DATA });
    updateUserData({ hasSavedGame: false });
    prevPage();
  };

  return (
    <>
      <section className="teams-points-section">
        <div className="points-screen">
          {isFinish ? (
            <span> Конец игры </span>
          ) : (
            isOvertime && <span> Овертайм </span>
          )}
          <h2> Команды: </h2>
          <div className="bold-underline" />

          <ul>
            {teams.map((team, index, array) => (
              <li className="row" key={index}>
                <div>
                  <div
                    className="team-icon"
                    style={{ background: team.color }}
                  />
                  <h3 className="team-name">{team.name}</h3>
                  <span>{team.points}</span>
                </div>
                {index < array.length - 1 && <div className="thin-underline" />}
              </li>
            ))}
          </ul>
        </div>

        {isFinish ? (
          <button className="next-button" id="end-game" onClick={endGame}>
            Закончить игру
          </button>
        ) : (
          <button className="next-button" id="next-btn" onClick={nextPage}>
            Следующий раунд
          </button>
        )}
      </section>
      {isFinish && (
        <div id="modal-container" className="show">
          <div id="modal">
            <h2>{teams[currentTeamId].name} победили!</h2>
            <div className="underline" />
            <table>
              {[...teams]
                .sort((a, b) => b.points - a.points)
                .map((team, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.points} очков</td>
                  </tr>
                ))}
            </table>
            <button id="close-modal">
              <span>Закрыть</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
