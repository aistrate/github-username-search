import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import type { User, Repo } from "./Models";
import type { HistoryItem } from "../History/Models";
import type { SearchEvent } from "./SearchForm";
import type { FetchResult } from "../Shared/Fetch";
import { useFetch } from "../Shared/Fetch";
import { setLocalStorageItem } from "../Shared/LocalStorage";
import { WindowTitle } from "../Shared/WindowTitle";
import SearchForm from "./SearchForm";
import UserView from "./UserView";
import RepoListView from "./RepoListView";

export default SearchPage;

const reposPerPage = 30;

type SearchPageProps = {
  queryUsername: string | null;
  queryPage: string | null;
};

function SearchPage({ queryUsername, queryPage }: SearchPageProps) {
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
    const username = e.value;
    const search = `?q=${username}`;

    if (browserHistory.location.search !== search) {
      browserHistory.push(`/search${search}`);
    }
  }

  const totalRepoCount = userFetch.data?.public_repos;
  const pageCount =
    totalRepoCount !== undefined ? Math.ceil(totalRepoCount / reposPerPage) : 0;

  return (
    <>
      <WindowTitle value={getWindowTitle(username, page)} />

      <StyledSearchForm initialValue={username} onSearch={handleSearch} />

      <StyledUserView userFetch={userFetch} username={username} />

      {userFetch.data && (
        <StyledRepoListView
          repoListFetch={repoListFetch}
          username={username}
          page={page}
          pageCount={pageCount}
        />
      )}
    </>
  );
}

const StyledSearchForm = styled(SearchForm)`
  margin-top: 1.5rem;
`;

const StyledUserView = styled(UserView)`
  margin-top: 3.5rem;
`;

const StyledRepoListView = styled(RepoListView)`
  margin-top: 3.5rem;
`;

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username}/repos?page=${page}&per_page=${reposPerPage}&sort=pushed`;
}

const usernameRegex = /\/users\/([^/]+)/;

function extractUsername(url: string) {
  const match = usernameRegex.exec(url);
  return match ? match[1] : "";
}

function useStoreToHistory(userFetch: FetchResult<User>) {
  useEffect(() => {
    if (userFetch.requestUrl && !userFetch.isLoading && !userFetch.error) {
      const lcUsername = extractUsername(userFetch.requestUrl).toLowerCase();

      setLocalStorageItem<HistoryItem[]>("searchHistory", [], (history) =>
        addToHistory(lcUsername, history)
      );
    }
  }, [userFetch.requestUrl, userFetch.isLoading, userFetch.error]);

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

function getWindowTitle(username: string, page: number) {
  return username === ""
    ? "Search"
    : page === 1
    ? username
    : `${username} (page ${page})`;
}
