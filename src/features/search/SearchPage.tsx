import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Message from "../../common/styled/Message";
import WindowTitle from "../../common/WindowTitle";
import { useSaveToHistory } from "../history/persistHistory";
import RepoListView from "./RepoListView";
import {
  fetchRepos,
  reposPerPage,
  resetRepos,
  selectRepos,
} from "./reposSlice";
import type { SearchEvent } from "./SearchForm";
import SearchForm from "./SearchForm";
import { fetchUser, resetUser, selectUser } from "./userSlice";
import UserView from "./UserView";
import { validateUsername } from "./validation";

export default SearchPage;

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ username: lcUsername }));
  }, [dispatch, lcUsername]);

  useEffect(() => {
    dispatch(fetchRepos({ username: lcUsername, page }));
  }, [dispatch, lcUsername, page]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
      dispatch(resetRepos());
    };
  }, [dispatch]);

  const userFetch = useSelector(selectUser);
  const reposFetch = useSelector(selectRepos);

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
          reposFetch={reposFetch}
          username={username}
          page={page}
          pageCount={pageCount}
        />
      )}
    </>
  );
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
