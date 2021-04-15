import { useHistory } from "react-router-dom";
import type { User, Repo } from "./Models";
import type { SearchEvent } from "./SearchForm";
import { useFetch } from "../Shared/Fetch";
import { Message, Loading } from "../Shared/Styled";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import RepoList from "./RepoInfo";

export default SearchPage;

type SearchPageProps = {
  username: string;
};

function SearchPage({ username }: SearchPageProps) {
  const lcUsername = username.toLowerCase();

  const userUrl = lcUsername ? getUserUrl(lcUsername) : null;
  const repoListUrl = lcUsername ? getRepoListUrl(lcUsername, 1) : null;

  const userFetch = useFetch<User>(userUrl);
  const repoListFetch = useFetch<Repo[]>(repoListUrl);

  const history = useHistory();

  function handleSearch(e: SearchEvent) {
    let username = e.value;
    history.push(`/search?q=${username}`);
  }

  return (
    <>
      <SearchForm initialValue={username} onSearch={handleSearch} />

      <Message
        info={
          userFetch.httpStatus === 404
            ? `Username '${username}' was not found.`
            : ""
        }
        error={userFetch.httpStatus !== 404 ? userFetch.error : null}
      />

      {userFetch.data && <UserInfo user={userFetch.data} />}

      <Message error={!userFetch.error ? repoListFetch.error : ""} />

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
