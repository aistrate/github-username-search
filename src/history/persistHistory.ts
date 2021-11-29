import { useEffect, useState } from "react";
import type { FetchResult } from "../common/fetch";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../common/localStorage";
import type { User } from "../search/models";
import { HistoryItem } from "./models";

export { useLoadHistory, useSaveToHistory };

const localStorageKey = "searchHistory";

function useLoadHistory() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    setHistory(getLocalStorageItem<HistoryItem[]>(localStorageKey, []));
  }, []);

  return history;
}

function useSaveToHistory({ requestUrl, isLoading, error }: FetchResult<User>) {
  useEffect(() => {
    if (requestUrl && !isLoading && !error) {
      const lcUsername = extractUsername(requestUrl).toLowerCase();

      setLocalStorageItem<HistoryItem[]>(localStorageKey, [], (history) =>
        addToHistory(lcUsername, history)
      );
    }
  }, [requestUrl, isLoading, error]);
}

const usernameRegex = /\/users\/([^/]+)/;

function extractUsername(url: string) {
  const match = usernameRegex.exec(url);
  return match ? match[1] : "";
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
