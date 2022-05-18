import { Header } from "./header.js";
import { getPoints } from "../helpers/points.helpers.js";

export const Points = (
  { swipedWords, lastWordTeamId },
  { teams, currentTeamId, isLastWordForAll }
) => `
${Header()}
<section class="team-turn-section">
<div class="points-screen">
    <div class="points-screen-heading">
        <h2>Набранные очки:</h2>
        <span id="points-from-turn">${getPoints(
          swipedWords,
          isLastWordForAll,
          lastWordTeamId === currentTeamId
        )}</span>
    </div>
    <div class="bold-underline"></div>
    <ul id="points-list">
    ${swipedWords
      .map(
        (word, index, array) =>
          `<li class="row">
            <div>
            ${
              index === array.length - 1 && isLastWordForAll
                ? `<button class="group-button" id="choose-team-name"><span class="material-icon">group</span></button>`
                : `
                <label class="checkbox">
                    <input type="checkbox" id="${word.word}" 
                    ${word.guessed ? "checked" : ""}>
                    <span class="checkmark"></span>
                </label>`
            }
                <h3>${word.word}</h3>
            </div>
            ${
              index < array.length - 2 + +isLastWordForAll
                ? `<div class="thin-underline"></div>`
                : ""
            }
        </li>`
      )
      .join("")}
    </ul>
</div>
<div class="team-turn">
    <div>
        <span id="team-name-turn">${teams[currentTeamId].name}</span>
    </div>
    <div class="underline"></div>
</div>
<button class="next-button" id="next-btn">Завершить</button>
</section>
${
  isLastWordForAll
    ? `
    <div id="modal-container">
      <div id="modal">
        <h2>Какая команда отгадала последнее слово?</h2>
        <div class="underline"></div>
        ${teams
          .map(
            (team, index) => `
          <button id=${"choose-" + index}>
            <span>${team.name}</span>
          </button>`
          )
          .join("")}
          <button id="choose-noone">
            <span>Никто</span>
          </button>
      </div>
    </div>
  `
    : ""
}`;
