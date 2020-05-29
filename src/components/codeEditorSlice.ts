import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store/store";

const welcomeHTML = `<h1>Welcome Devs!</h1>`;

interface CodeEditorState {
  value: string;
}

const initialState: CodeEditorState = {
  value: welcomeHTML,
};

export const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState: initialState,
  reducers: {
    snippetValue: (state, action: PayloadAction<string>) => {
      ({ ...state, value: action.payload });
    },
  },
});

export const { snippetValue } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;
