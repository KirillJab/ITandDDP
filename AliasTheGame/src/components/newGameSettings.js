import { Header } from "./header.js";

export const NewGameSettings = ({ roundTime, wordsToWin }) => `
${Header()}
<section class="game-vocabulary">
    <div>
        <span class="vocabularies-description">Cловарь:</span>
        <button class="vocabularies-button" id="choose-vocabulary-next">
            <span class="material-icon">arrow_back</span></button>
        <span id="choosen-dictionary">Сложные слова</span>
        <button class="vocabularies-button" id="choose-vocabulary-next">
            <span class="material-icon">arrow_forward</span></button>
    </div>
    <div class="underline"></div>
</section>
<section class="game-settings">
    <h2>Настройки</h2>
    <div class="bold-underline"></div>
    <ul>
        <li class="row">
            <div>
                <aside>
                    <span class="material-icon">av_timer</span>
                </aside>
                <article>
                    <h3>Длина раунда</h3>
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
                <aside>
                    <span class="material-icon">aod</span>
                </aside>
                <article>
                    <h3>Количество слов</h3>
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
    <button class="next-button" id="next-btn">Далее</button>
</section>`;
