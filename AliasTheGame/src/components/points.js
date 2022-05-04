import { Header } from "./header.js";

export const Points = () => `
${Header()}
<section class="team-turn-section">
<div class="team-turn">
    <div>
        <span>Ход:</span>
        <span id="team-name-turn">Веселыё тюлени</span>
    </div>
    <div class="underline"></div>
</div>
<div class="points-screen">
    <div class="points-screen-heading">
        <h2>Набранные очки:</h2>
        <span id="points-from-turn">23</span>
    </div>
    <div class="bold-underline"></div>
    <ul>
        <li class="row">
            <div>
                <h3 class="team-name">Копия</h3>
                <label class="checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="thin-underline"></div>
        </li>
        <li class="row">
            <div>
                <h3 class="team-name">Янтарь</h3>
                <label class="checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="thin-underline"></div>
        </li>
        <li class="row">
            <div>
                <h3 class="team-name">Рыба</h3>
                <label class="checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="thin-underline"></div>
        </li>
        <li class="row">
            <div>
                <h3 class="team-name">Трансляция</h3>
                <label class="checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="thin-underline"></div>
        </li>
        <li class="row">
            <div>
                <h3 class="team-name">Сосна</h3>
                <label class="checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
        </li>
    </ul>
</div>
<button class="next-button" id="next-btn">Завершить</button>
</section>`;
