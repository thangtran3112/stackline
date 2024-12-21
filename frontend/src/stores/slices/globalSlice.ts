import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";
import { DARK, LIGHT } from "../../commons/constants";

export interface IThemeState {
  mode: PaletteMode;
}

const initialState: IThemeState = {
  mode: DARK,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === LIGHT ? DARK : LIGHT;
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
