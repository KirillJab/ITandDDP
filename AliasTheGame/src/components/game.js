export const Game = () => `
<div class="menu-header-background"></div>
<div class="header">
    <span class="team-name">Весёлые тюлени</span>
    <span id="turn-timer">23</span>
</div>
<section class="round-section">
    <div class="earned-points-display">
        <div id="earned-points">+5</div>
        <div id="lost-points">-1</div>
    </div>
    <div class="cards-container">
        <div class="triangle cards-top"></div>
        <div class="triangle cards-bottom"></div>
        <div class="background-card second-card"></div>
        <div class="background-card first-card"></div>
        <div class="card" id="game-card">
            <span id="game-card-word">Автоцементовоз</span>
        </div>
    </div>
</section>`;
