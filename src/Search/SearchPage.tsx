import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { User, Repo } from "./Models";
import type { SearchEvent } from "./SearchForm";
import { useFetch, usePagedFetch } from "../Shared/Fetch";
import { Message, Loading } from "../Shared/Styled";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import RepoList from "./RepoInfo";

import { Button } from "../Shared/Styled";

export default SearchPage;

type SearchPageProps = {
  username: string;
};

function SearchPage({ username }: SearchPageProps) {
  const lcUsername = username.toLowerCase();

  const userUrl = lcUsername ? getUserUrl(lcUsername) : null;
  const repoListUrl = useCallback(
    (page: number) => (lcUsername ? getRepoListUrl(lcUsername, page) : null),
    [lcUsername]
  );

  const userFetch = useFetch<User>(userUrl);
  const repoListFetch = usePagedFetch<Repo>(repoListUrl, [lcUsername]);

  const history = useHistory();

  function handleSearch(e: SearchEvent) {
    let username = e.value;
    history.push(`/search?q=${username}`);
  }

  function handleNextPage() {
    repoListFetch.nextPage();
  }

  return (
    <>
      <SearchForm
        fieldName="Username"
        initialValue={username}
        onSearch={handleSearch}
      />

      <Button
        type="button"
        onClick={handleNextPage}
        disabled={repoListFetch.isLoading}
        style={{ marginTop: "2rem", marginLeft: 0 }}
      >
        Next Page
      </Button>

      <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>
        {repoListFetch.data?.length || 0}
      </p>

      <Message
        info={userFetch.error404 ? `Username '${username}' was not found.` : ""}
        error={userFetch.error || repoListFetch.error}
      />

      {userFetch.data && <UserInfo user={userFetch.data} />}

      <Loading isLoading={!!userFetch.data && repoListFetch.isLoading} />
      {repoListFetch.data && <RepoList repos={repoListFetch.data} />}
    </>
  );
}

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username}/repos?page=${page}&per_page=100&sort=pushed`;
}
