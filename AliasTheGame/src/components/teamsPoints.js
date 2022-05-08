import { Header } from "./header.js";

import "../styles/teams-points.css";

export const TeamsPoints = ({ teams, currentTeamId, isOvertime, isFinish }) => `
${Header()}
<section class="teams-points-section">
    <div class="points-screen">
    ${
      isFinish
        ? `<span> Конец игры </span>`
        : isOvertime
        ? "<span> Овертайм </span>"
        : ""
    }
        <h2> Команды: </h2>
        <div class="bold-underline"></div>
        <ul>
        ${teams
          .map(
            (team, index, array) => `
        <li class="row">
            <div>
                <div class="team-icon" style="background:${team.color}"}></div>
                <h3 class="team-name">${team.name}</h3>
                <span>${team.points}</span>
            </div>
            ${
              index < array.length - 1
                ? `<div class="thin-underline"></div>`
                : ""
            }
        </li>`
          )
          .join("")}
        </ul>
    </div>
    ${
      isFinish
        ? `<button class="next-button" id="end-game">Закончить игру</button>`
        : `<button class="next-button" id="next-btn">Следующий раунд</button>`
    }
    
</section>
${
  isFinish
    ? `
    <div id="modal-container"
    class="show">
      <div id="modal">
        <h2>${teams[currentTeamId].name} победили!</h2>
        <div class="underline"></div>
        <table>
        ${[...teams]
          .sort((a, b) => b.points - a.points)
          .map(
            (team, index) =>
              `<tr>
              <td>${index + 1})</td><td>${team.name}</td><td>${
                team.points
              } очков</td>
              </tr>`
          )
          .join("")}
          </table>
          <button id="close-modal">
            <span>Закрыть</span>
          </button>
      </div>
    </div>
  `
    : ""
}`;
