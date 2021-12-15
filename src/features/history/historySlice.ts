import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type HistoryItem = {
  username: string;
  timestamp: number;
};

const initialState = [] as HistoryItem[];

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistory() {
      return initialState;
    },
  },
});

const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;

export type { HistoryItem };

export { selectHistory };

export const { resetHistory } = historySlice.actions;
