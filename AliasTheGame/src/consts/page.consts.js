import {
  MainMenu,
  NewGameSettings,
  TeamsSettings,
  TeamsPoints,
  Round,
  Points,
} from "../components";

export const pages = {
  MainMenu: {
    code: "MainMenu",
    withHeader: false,
    prevPageCode: "TeamsPoints",
    nextPageCode: "NewGameSettings",

    component: MainMenu,
  },
  NewGameSettings: {
    code: "NewGameSettings",
    withHeader: true,
    prevPageCode: "MainMenu",
    nextPageCode: "TeamsSettings",

    component: NewGameSettings,
  },
  TeamsSettings: {
    code: "TeamsSettings",
    withHeader: true,
    prevPageCode: "NewGameSettings",
    nextPageCode: "TeamsPoints",

    component: TeamsSettings,
  },
  TeamsPoints: {
    code: "TeamsPoints",
    withHeader: true,
    prevPageCode: "MainMenu",
    nextPageCode: "Round",

    component: TeamsPoints,
  },
  Round: {
    code: "Round",
    withHeader: false,
    prevPageCode: "TeamsPoints",
    nextPageCode: "Points",

    component: Round,
  },
  Points: {
    code: "Points",
    withHeader: true,
    prevPageCode: "Round",
    nextPageCode: "TeamsPoints",

    component: Points,
  },
};
