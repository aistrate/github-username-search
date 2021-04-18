import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { User, Repo } from "./Models";
import type { HistoryItem } from "../History/Models";
import type { SearchEvent } from "./SearchForm";
import { useFetch } from "../Shared/Fetch";
import { setLocalStorageItem } from "../Shared/LocalStorage";
import { Message, Loading } from "../Shared/Styled";
import { WindowTitle } from "../Shared/Utils";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import RepoList from "./RepoInfo";

export default SearchPage;

type SearchPageProps = {
  appName: string;
  queryUsername: string | null;
  queryPage: string | null;
};

function SearchPage({ appName, queryUsername, queryPage }: SearchPageProps) {
  const username = (queryUsername || "").trim();
  const page = Math.max(1, parseInt(queryPage || "") || 1);

  const lcUsername = username.toLowerCase();

  const userUrl = lcUsername ? getUserUrl(lcUsername) : null;
  const repoListUrl = lcUsername ? getRepoListUrl(lcUsername, page) : null;

  const userFetch = useFetch<User>(userUrl);
  const repoListFetch = useFetch<Repo[]>(repoListUrl);

  useStoreToHistory(userFetch);

  const browserHistory = useHistory();

  function handleSearch(e: SearchEvent) {
    let username = e.value;
    browserHistory.push(`/search?q=${username}`);
  }

  return (
    <>
      <WindowTitle value={getWindowTitle(appName, username, page)} />

      <SearchForm initialValue={username} onSearch={handleSearch} />

      {userFetch.error &&
        (userFetch.httpStatus === 404 ? (
          <Message type="info">{`Username '${username}' was not found.`}</Message>
        ) : (
          <Message type="error">{userFetch.error}</Message>
        ))}

      {userFetch.data && <UserInfo user={userFetch.data} />}

      {!userFetch.error && repoListFetch.error && (
        <Message type="error">{`(Repositories) ${repoListFetch.error}`}</Message>
      )}

      <Loading isLoading={!!userFetch.data && repoListFetch.isLoading} />
      {repoListFetch.data && <RepoList repos={repoListFetch.data} />}
    </>
  );
}

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username}/repos?page=${page}&per_page=30&sort=pushed`;
}

const usernameRegex = /\/users\/([^/]+)/;

function extractUsername(url: string) {
  const match = usernameRegex.exec(url);
  return match ? match[1] : "";
}

function useStoreToHistory(fetch: ReturnType<typeof useFetch>) {
  useEffect(() => {
    if (fetch.requestUrl && !fetch.isLoading && !fetch.error) {
      const lcUsername = extractUsername(fetch.requestUrl).toLowerCase();

      setLocalStorageItem<HistoryItem[]>("searchHistory", [], (history) =>
        addToHistory(lcUsername, history)
      );
    }
  }, [fetch.requestUrl, fetch.isLoading, fetch.error]);

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
}

function getWindowTitle(appName: string, username: string, page: number) {
  const title =
    username === ""
      ? "Search"
      : page === 1
      ? username
      : `${username} (page ${page})`;

  return `${title} - ${appName}`;
}
