import { Header } from "./header.js";

import "../styles/vocabulary.css";
import "../styles/settings.css";

export const NewGameSettings = ({ roundTime, wordsToWin, dictionaryName }) => `
${Header()}
<section class="game-vocabulary">
    <div>
        <span class="vocabularies-description">Cловарь:</span>
        <button class="button vocabularies-button" id="choose-vocabulary-prev">
            <span class="material-icon">arrow_back</span></button>
        <span id="choosen-dictionary">${dictionaryName}</span>
        <button class="button vocabularies-button" id="choose-vocabulary-next">
            <span class="material-icon">arrow_forward</span></button>
    </div>
    <div class="underline"></div>
</section>
<section class="game-settings">
    <h1>Настройки</h1>
    <div class="bold-underline"></div>
    <ul>
        <li class="row">
            <div>
                <aside class="row-aside">
                    <span class="aside-icon material-icon">av_timer</span>
                </aside>
                <article class="row-article">
                    <h2>Длина раунда</h2>
                    <p>за которое надо отгадать слова</p>
                </article>
                <div class="timer-display">
                    <span class="minutes-timer">${Math.floor(
                      roundTime / 60
                    )}</span>
                    <span class="seconds-timer">${
                      (roundTime / 30) % 2 ? "30" : ""
                    }</span>
                    <span class="minutes-text">мин</span>
                </div>
            </div>
            <div class="controls">
                <button class="button" id="sub-time">-30 сек</button>
                <button class="button" id="add-time">+30 сек</button>
            </div>
            <div class="thin-underline"></div>
        </li>
        <li class="row">
            <div>
                <aside class="row-aside">
                    <span class="aside-icon material-icon">aod</span>
                </aside>
                <article class="row-article">
                    <h2>Количество слов</h2>
                    <p>необходимое для победы</p>
                </article>
                <div class="words-display">
                    <span class="minutes-timer" id="words-to-win-text">${wordsToWin}</span>
                </div>
            </div>
            <div class="controls">
                <button class="button" id="sub-words">-10 слов</button>
                <button class="button" id="add-words">+10 слов</button>
            </div>
        </li>
    </ul>
    <a class="button next-button" id="next-btn">Далее</a>
</section>`;
