export const Header = ({ goBack }) => (
  <>
    <div className="menu-header-background"></div>
    <div className="menu-header">
      <button className="go-back-button" id="go-back-btn" onClick={goBack}>
        <span className="material-icon">arrow_back</span>
      </button>
      <span className="game-name">Alias</span>
    </div>
  </>
);
