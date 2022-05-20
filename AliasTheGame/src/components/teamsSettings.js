import { Header } from "./header.js";

import "../styles/teams.css";
import "../styles/points.css";
import "../styles/last-word.css";

export const TeamsSettings = ({
  gameData,
  nextPage,
  prevPage,
  updateGameData,
}) => {
  const { isLastWordForAll, teams } = gameData;

  const addNewTeam = () => {
    if (teams.length < 5) {
      updateGameData({
        teams: [...teams, { name: "", points: 0, color: "#38F5F5" }],
      });
    }
  };

  const updateTeamByIndex = (index, obj) => {
    const team = { ...teams[index], ...obj };
    updateGameData({
      teams: [...teams.slice(0, index), team, ...teams.slice(index + 1)],
    });
  };

  const deleteTeam = (index) => {
    updateGameData({
      teams: [...teams.slice(0, index), ...teams.slice(index + 1)],
    });
  };

  return (
    <>
      <section className="last-word-section">
        <aside>
          <span className="material-icon">campaign_two_tone</span>
        </aside>
        <article>
          <h3>Последнее слово для всех</h3>
          <p>слово, неотгаданное в лимит времени, могут угадывать все</p>
        </article>
        <label className="checkbox">
          <input
            type="checkbox"
            id="is-last-word-for-all"
            checked={isLastWordForAll}
            onChange={() =>
              updateGameData({ isLastWordForAll: !isLastWordForAll })
            }
          />
          <span className="checkmark"></span>
        </label>
      </section>

      <section className="teams-section">
        <h2>Команды</h2>
        <div className="bold-underline"></div>
        <ul>
          {teams.map((team, index, array) => (
            <li className="row" key={index}>
              <div>
                <div className="team-icon">
                  <input
                    type="color"
                    value={team.color}
                    onChange={(e) =>
                      updateTeamByIndex(index, { color: e.target.value })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Название команды"
                  value={team.name}
                  onChange={(e) =>
                    updateTeamByIndex(index, { name: e.target.value })
                  }
                  maxLength="16"
                />
                <button
                  id={`delete-team-${index}`}
                  onClick={() => deleteTeam(index)}
                >
                  <span className="material-icon">close</span>
                </button>
              </div>
              {index < array.length - 1 && (
                <div className="thin-underline"></div>
              )}
            </li>
          ))}
        </ul>
        <div className="controls">
          <button
            className="button-naked add-team-button"
            id="add-team"
            onClick={addNewTeam}
          >
            Добавить команду
          </button>
        </div>
      </section>
      <button
        className="goback-button"
        id="prev-settings-btn"
        onClick={prevPage}
      >
        Назад
      </button>
      <button
        className="next-button"
        id="next-btn"
        onClick={nextPage}
        disabled={teams.filter((team) => team.name.trim()).length <= 1}
      >
        Начать
      </button>
    </>
  );
};
