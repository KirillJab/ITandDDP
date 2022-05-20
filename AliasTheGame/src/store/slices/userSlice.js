import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    hasSavedGame: false,
    isSignedIn: false,
  },
  reducers: {
    setUserData(state, action) {
      state.user = { ...action.payload };
    },
    dropUserData,
  },
});
