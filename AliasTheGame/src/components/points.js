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
        <h1>Набранные очки:</h1>
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
                ? `<button class="button group-button" id="choose-team-name"><span class="material-icon">group</span></button>`
                : `
                <label class="checkbox">
                    <input type="checkbox" id="${word.word}" 
                    ${word.guessed ? "checked" : ""}>
                    <span class="checkmark"></span>
                </label>`
            }
                <h2>${word.word}</h2>
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
<div class="team-turn">
    <div>
        <span id="team-name-turn">${teams[currentTeamId].name}</span>
    </div>
    <div class="underline"></div>
</div>
<a class="button next-button" id="next-btn">Завершить</a>
</section>
${
  isLastWordForAll
    ? `
    <div id="modal-container">
      <div id="modal">
        <h1>Какая команда отгадала последнее слово?</h1>
        <div class="underline"></div>
        ${teams
          .map(
            (team, index) => `
          <a class="button" id=${"choose-" + index}>
            <span>${team.name}</span>
          </a>`
          )
          .join("")}
          <a class="button" id="choose-noone">
            <span>Никто</span>
          </a>
      </div>
    </div>
  `
    : ""
}`;
