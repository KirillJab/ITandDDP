import { Header } from "./header.js";

export const TeamsPoints = (teams) => `
${Header()}
<section class="teams-points-section">
    <div class="points-screen">
        <h2>Команды:</h2>
        <div class="bold-underline"></div>
        <ul>
        ${teams
          .map(
            (team, index, array) => `
        <li class="row">
            <div>
                <div class="team-icon"></div>
                <h3 class="team-name">${team.name}</h3>
                <span id="team1">${team.points}</span>
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
    <button class="next-button" id="next-btn">Следующий раунд</button>
</section>`;
