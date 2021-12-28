import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { reposPerPage } from "../../app/api";
import { useAppDispatch } from "../../app/store";
import Message from "../../common/styled/Message";
import WindowTitle from "../../common/WindowTitle";
import { saveToHistory } from "../history/historySlice";
import RepoListView from "./RepoListView";
import { fetchRepos, resetRepos, selectRepos } from "./reposSlice";
import SearchForm, { SearchEvent } from "./SearchForm";
import { fetchUser, resetUser, selectUser, UserFetch } from "./userSlice";
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

  const { userFetch, reposFetch } = useFetch(username, page);

  useSaveToHistory(userFetch);

  const location = useLocation();
  const navigate = useNavigate();

  function handleSearch(e: SearchEvent) {
    const username = e.value;
    const search = `?username=${username}`;

    if (location.search !== search) {
      navigate(`/search${search}`);
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

      <StyledUserView userFetch={userFetch} />

      {userFetch.data && (
        <StyledRepoListView reposFetch={reposFetch} pageCount={pageCount} />
      )}
    </>
  );
}

function useFetch(username: string, page: number) {
  const lcUsername = username.toLowerCase();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchUser({ username: lcUsername }));

    return () => {
      promise.abort();
    };
  }, [dispatch, lcUsername]);

  useEffect(() => {
    const promise = dispatch(fetchRepos({ username: lcUsername, page }));

    return () => {
      promise.abort();
    };
  }, [dispatch, lcUsername, page]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
      dispatch(resetRepos());
    };
  }, [dispatch]);

  const userFetch = useSelector(selectUser);
  const reposFetch = useSelector(selectRepos);

  return { userFetch, reposFetch };
}

function useSaveToHistory({ fetchArg, isLoading, error }: UserFetch) {
  const lcUsername = (fetchArg?.username || "").toLowerCase();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lcUsername && !isLoading && !error) {
      dispatch(saveToHistory(lcUsername));
    }
  }, [dispatch, lcUsername, isLoading, error]);
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
