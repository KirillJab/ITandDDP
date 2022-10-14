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
        <h1> Команды: </h1>
        <div class="bold-underline"></div>
        <ul>
        ${teams
          .map(
            (team, index, array) => `
        <li class="row">
            <div>
                <div class="team-icon" style="background:${team.color}"}></div>
                <h2 class="team-name">${team.name}</h2>
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
        ? `<a class="button next-button" id="end-game">Закончить игру</a>`
        : `<a class="button next-button" id="next-btn">Следующий раунд</a>`
    }
    
</section>
${
  isFinish
    ? `
    <div id="modal-container"
    class="show">
      <div id="modal">
        <h1>${teams[currentTeamId].name} победили!</h1>
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
          <a id="button close-modal">
            <span>Закрыть</span>
          </a>
      </div>
    </div>
  `
    : ""
}`;
