import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { User, Repo } from "./Models";
import type { HistoryItem } from "../History/Models";
import type { SearchEvent } from "./SearchForm";
import { useFetch } from "../Shared/Fetch";
import { setLocalStorageItem } from "../Shared/LocalStorage";
import { Message, Loading } from "../Shared/Styled";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import RepoList from "./RepoInfo";

export default SearchPage;

type SearchPageProps = {
  username: string;
  page: number;
};

function SearchPage({ username, page }: SearchPageProps) {
  const lcUsername = username.toLowerCase();

  const userUrl = lcUsername ? getUserUrl(lcUsername) : null;
  const repoListUrl = lcUsername ? getRepoListUrl(lcUsername, page) : null;

  const userFetch = useFetch<User>(userUrl);
  const repoListFetch = useFetch<Repo[]>(repoListUrl);

  useEffect(() => {
    const maxHistoryLength = 100;

    function addUsername(history: HistoryItem[]) {
      const lcUsername = username.toLowerCase();

      history = history.filter(
        (item) => item.username.toLowerCase() !== lcUsername
      );

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

    // if User fetch was successful, add username to history
    if (
      userUrl &&
      userFetch.requestUrl === userUrl &&
      !userFetch.isLoading &&
      userFetch.httpStatus === 200
    ) {
      setLocalStorageItem("searchHistory", [], addUsername);
    }
  }, [
    username,
    userUrl,
    userFetch.requestUrl,
    userFetch.isLoading,
    userFetch.httpStatus,
  ]);

  const browserHistory = useHistory();

  function handleSearch(e: SearchEvent) {
    let username = e.value;
    browserHistory.push(`/search?q=${username}`);
  }

  return (
    <>
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
