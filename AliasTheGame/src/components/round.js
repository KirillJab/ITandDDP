export const Round = ({ name }) => `
<div class="menu-header-background"></div>
<div class="header">
    <span class="team-name">${name}</span>
    <span id="turn-timer"></span>
</div>
<section class="round-section">
    <div class="earned-points-display">
        <div id="earned-points"></div>
        <div id="lost-points"></div>
    </div>
    <div class="cards-container">
        <div class="triangle cards-top"></div>
        <div class="triangle cards-bottom"></div>
        <div class="background-card second-card"></div>
        <div class="background-card first-card"></div>
        <div class="card" id="game-card">
            <span id="game-card-word"></span>
        </div>
    </div>
</section>`;
