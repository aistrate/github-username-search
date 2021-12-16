import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../common/localStorage";

type HistoryItem = {
  username: string;
  timestamp: number;
};

const localStorageKey = "searchHistory";
const localStorageDefaultValue = [] as HistoryItem[];

const loadHistory = () => (dispatch: AppDispatch) => {
  const history = getLocalStorageItem<HistoryItem[]>(
    localStorageKey,
    localStorageDefaultValue
  );

  return dispatch(setHistory(history));
};

const saveToHistory = (username: string) => () => {
  // don't dispatch to the store, only save to localStorage
  setLocalStorageItem<HistoryItem[]>(
    localStorageKey,
    localStorageDefaultValue,
    (history) => addToHistory(username, history)
  );
};

function addToHistory(username: string, history: HistoryItem[]) {
  const maxHistoryLength = 100;

  history = history.filter((item) => item.username !== username);

  history = [
    {
      username,
      timestamp: Date.now(),
    },
    ...history,
  ];

  history = history.slice(0, maxHistoryLength);

  return history;
}

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
export { loadHistory, saveToHistory, selectHistory };
