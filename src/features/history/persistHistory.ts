import { useEffect, useState } from "react";
import type { FetchState } from "../../common/fetchThunk";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../common/localStorage";
import type { User } from "../search/models";
import type { FetchUserArg } from "../search/userSlice";
import type { HistoryItem } from "./models";

export { useLoadHistory, useSaveToHistory };

const localStorageKey = "searchHistory";

function useLoadHistory() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    setHistory(getLocalStorageItem<HistoryItem[]>(localStorageKey, []));
  }, []);

  return history;
}

function useSaveToHistory({
  fetchArg,
  isLoading,
  error,
}: FetchState<User, FetchUserArg>) {
  const lcUsername = (fetchArg?.username || "").toLowerCase();

  useEffect(() => {
    if (lcUsername && !isLoading && !error) {
      setLocalStorageItem<HistoryItem[]>(localStorageKey, [], (history) =>
        addToHistory(lcUsername, history)
      );
    }
  }, [lcUsername, isLoading, error]);
}

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
