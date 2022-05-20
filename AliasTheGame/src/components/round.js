import "../styles/round.css";

export const Round = ({ gameData }) => {
  const { teams, currentTeamId } = gameData;

  return (
    <>
      <div className="menu-header-background" />
      <div className="header">
        <span className="team-name">{teams[currentTeamId].name}</span>
        <span id="turn-timer" />
      </div>
      <section className="round-section">
        <div className="earned-points-display">
          <div id="earned-points" />
          <div id="lost-points" />
        </div>
        <div className="cards-container">
          <div className="triangle cards-top" />
          <div className="triangle cards-bottom" />
          <div className="background-card second-card" />
          <div className="background-card first-card" />
          <div className="card" id="game-card">
            <span id="game-card-word" />
          </div>
        </div>
      </section>
    </>
  );
};
