import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useFetch } from "../common/fetch";
import WindowTitle from "../common/WindowTitle";
import { useSaveToHistory } from "../history/persistHistory";
import Message from "../styled/Message";
import type { Repo, User } from "./models";
import RepoListView from "./RepoListView";
import type { SearchEvent } from "./SearchForm";
import SearchForm from "./SearchForm";
import UserView from "./UserView";
import { validateUsername } from "./validation";

export default SearchPage;

const reposPerPage = 30;

type SearchPageProps = {
  queryUsername: string | null;
  queryPage: string | null;
};

function SearchPage({ queryUsername, queryPage }: SearchPageProps) {
  let username = (queryUsername || "").trim();
  const page = Math.max(1, parseInt(queryPage || "") || 1);

  const queryValidationError = validateQuery(username);
  if (queryValidationError) {
    username = "";
  }

  const lcUsername = username.toLowerCase();

  const userUrl = lcUsername ? getUserUrl(lcUsername) : null;
  const repoListUrl = lcUsername ? getRepoListUrl(lcUsername, page) : null;

  const userFetch = useFetch<User>(userUrl);
  const repoListFetch = useFetch<Repo[]>(repoListUrl);

  useSaveToHistory(userFetch);

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

      {queryValidationError && (
        <StyledMessage type="error">{queryValidationError}</StyledMessage>
      )}

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

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username}/repos?page=${page}&per_page=${reposPerPage}&sort=pushed`;
}

function validateQuery(username: string) {
  const validationError = validateUsername(username);

  if (validationError) {
    return `Invalid username "${username}" in the URL. ${validationError}`;
  }

  return null;
}

function getWindowTitle(username: string, page: number) {
  return username === ""
    ? "Search"
    : page === 1
    ? username
    : `${username} (page ${page})`;
}

const StyledSearchForm = styled(SearchForm)`
  margin-top: 1.5rem;
`;

const StyledMessage = styled(Message)`
  margin-top: 3.5rem;
`;

const StyledUserView = styled(UserView)`
  margin-top: 3.5rem;
`;

const StyledRepoListView = styled(RepoListView)`
  margin-top: 3.5rem;
`;
