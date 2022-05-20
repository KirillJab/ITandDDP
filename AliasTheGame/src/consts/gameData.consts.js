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
  dictionaryName: DICTIONARIES_LIST[0].name,
  roundTime: 2,
  wordsToWin: 10,
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

export const getDefaultGameData = () =>
  JSON.parse(JSON.stringify(DEFAULT_GAME_DATA));

export const DEFAULT_USER_DATA = {
  id: "",
  name: "",
  hasSavedGame: false,
  isSignedIn: false,
};
