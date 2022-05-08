export const getNewTime = (roundTime, delta) => {
  return roundTime + delta >= 10 && roundTime + delta <= 600
    ? roundTime + delta
    : roundTime;
};

export const getNewWordsAmount = (wordsToWin, delta) => {
  return wordsToWin + delta >= 10 && wordsToWin + delta <= 100
    ? wordsToWin + delta
    : wordsToWin;
};

export const getNextCurrentTeamId = (currentId, teamsCount) => {
  return currentId + 1 < teamsCount ? currentId + 1 : 0;
};
