import { getDictionaryById } from "../helpers/gameData.helpers";

export const DICTIONARIES = {
  easy: {
    name: "Лёгкий словарь",
  },
  medium: {
    name: "Средний словарь",
  },
  hard: {
    name: "Сложный словарь",
  },
};

export const DICTIONARIES_LIST = Object.values(DICTIONARIES);

export const DEFAULT_GAME_DATA = {
  dictionaryId: 0,
  dictionaryName: getDictionaryById(0).name,
  roundTime: 60,
  wordsToWin: 50,
  isLastWordForAll: false,
  teams: [
    {
      name: "Весёлые тюлени",
      points: 0,
      color: "#FFF38B",
    },
    {
      name: "Мудрые черепахи",
      points: 0,
      color: "#38F5F5",
    },
  ],
  currentTeamId: 0,
  maxPoints: 0,
  isOvertime: false,
  isFinish: false,
};

export const DEFAULT_USER_DATA = {
  id: "",
  name: "",
  hasSavedGame: false,
  isSignedIn: false,
};
