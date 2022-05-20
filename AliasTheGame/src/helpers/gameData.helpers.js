import { DICTIONARIES_LIST } from "../consts/gameData.consts";

export const getNewTime = (roundTime, delta) => {
  return roundTime + delta >= 10 && roundTime + delta <= 300
    ? roundTime + delta
    : roundTime;
};

export const getNewWordsAmount = (wordsToWin, delta) => {
  return wordsToWin + delta >= 10 && wordsToWin + delta <= 200
    ? wordsToWin + delta
    : wordsToWin;
};

export const getNextCurrentTeamId = (currentId, teamsCount) => {
  return currentId + 1 < teamsCount ? currentId + 1 : 0;
};

export const getNextDictionaryId = (currentId) => {
  return currentId + 1 < DICTIONARIES_LIST.length ? currentId + 1 : 0;
};

export const getPrevDictionaryId = (currentId) => {
  return currentId - 1 < 0 ? DICTIONARIES_LIST.length - 1 : currentId - 1;
};

export const getDictionaryById = (id) => DICTIONARIES_LIST[id];
