import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { getLocalStorageItem } from "../../common/localStorage";

type HistoryItem = {
  username: string;
  timestamp: number;
};

const localStorageKey = "searchHistory";

const loadHistory = () => (dispatch: AppDispatch) => {
  const history = getLocalStorageItem<HistoryItem[]>(localStorageKey, []);

  return dispatch(setHistory(history));
};

const initialState = null as HistoryItem[] | null;

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory(_state, action: PayloadAction<HistoryItem[]>) {
      return action.payload;
    },
    resetHistory() {
      return initialState;
    },
  },
});

const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;
export const { setHistory, resetHistory } = historySlice.actions;

export type { HistoryItem };
export { loadHistory, selectHistory };
