import { useEffect } from "react";
import type { User } from "./Models";
import type { HistoryItem } from "../history/Models";
import type { FetchResult } from "../common/Fetch";
import { setLocalStorageItem } from "../common/LocalStorage";

export { useStoreToHistory };

function useStoreToHistory({
  requestUrl,
  isLoading,
  error,
}: FetchResult<User>) {
  useEffect(() => {
    if (requestUrl && !isLoading && !error) {
      const lcUsername = extractUsername(requestUrl).toLowerCase();

      setLocalStorageItem<HistoryItem[]>("searchHistory", [], (history) =>
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
