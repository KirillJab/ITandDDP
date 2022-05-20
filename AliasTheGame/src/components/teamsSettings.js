import { Header } from "./header.js";

import "../styles/teams.css";
import "../styles/points.css";
import "../styles/last-word.css";

export const TeamsSettings = ({ isLastWordForAll, teams }) => `
${Header()}
<section class="last-word-section">
    <aside class="row-aside">
        <span class="aside-icon material-icon">campaign_two_tone</span>
    </aside>
    <article class="row-article">
        <h2>Последнее слово для всех</h2>
        <p>слово, неотгаданное в лимит времени, могут угадывать все</p>
    </article>
    <label class="checkbox">
        <input type="checkbox" id="is-last-word-for-all" ${
          isLastWordForAll ? "checked" : ""
        }>
        <span class="checkmark"></span>
    </label>
</section>

<section class="teams-section">
    <h1>Команды</h1>
    <div class="bold-underline"></div>
    <ul>
    ${teams
      .map(
        (team, index, array) => `
      <li class="row">
          <div>
              <div class="team-icon">
                <input type="color" value="${
                  team.color
                }" id="edit-team-color-${index}">
              </div>
              <input type="text" placeholder="Название команды" value="${
                team.name
              }" id="edit-team-name-${index}" maxlength="16">
              <button class="button" id="delete-team-${index}">
                  <span class="material-icon">close</span>
              </button>
          </div>
          ${
            index < array.length - 1 ? `<div class="thin-underline"></div>` : ""
          }
      </li>`
      )
      .join("")}
        
    </ul>
    <div class="controls">
        <button class="button button-naked add-team-button" id="add-team">
            Добавить команду
        </button>
    </div>
</section>
<a class="button goback-button" id="prev-settings-btn">Назад</a>
<a class="button next-button" id="next-btn">Начать</a>
</div>`;
