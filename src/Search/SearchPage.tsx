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
  const userUrl = username ? getUserUrl(username) : null;
  const repoListUrl = username ? getRepoListUrl(username, 1) : null;

  const userFetch = useFetch<User>(userUrl);
  const repoListFetch = useFetch<Repo[]>(repoListUrl);

  const info = userFetch.error404
    ? `Username '${username}' was not found.`
    : "";

  const history = useHistory();

  function handleSearch(e: SearchEvent) {
    let username = e.value;
    history.push(`/search?q=${username}`);
  }

  return (
    <>
      <SearchForm
        fieldName="Username"
        initialValue={username}
        onSearch={handleSearch}
      />

      <Message error={userFetch.error || repoListFetch.error} info={info} />

      {userFetch.data && <UserInfo user={userFetch.data} />}

      <Loading isLoading={!!userFetch.data && repoListFetch.isLoading} />
      {repoListFetch.data && <RepoList repos={repoListFetch.data} />}
    </>
  );
}

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username.toLowerCase()}`;
}

function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username.toLowerCase()}/repos?page=${page}&per_page=100&sort=pushed`;
}
