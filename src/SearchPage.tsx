import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { User, Repo } from "./Models";
import type { SearchEvent } from "./SearchForm";
import { Message } from "./Styled";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import RepoList from "./RepoInfo";

export default SearchPage;

type SearchPageProps = {
  username: string;
};

function SearchPage({ username }: SearchPageProps) {
  const user = useFetch<User>(getUserUrl(username));
  const repoList = useFetch<Repo[]>(getRepoListUrl(username, 1));

  const info = user.error404 ? `Username '${username}' was not found.` : "";

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

      <Message error={user.error || repoList.error} info={info} />

      {user.data && <UserInfo user={user.data} />}
      {repoList.data && <RepoList repos={repoList.data} />}
    </>
  );
}

function getUserUrl(username: string) {
  return username ? `https://api.github.com/users/${username}` : "";
}

function getRepoListUrl(username: string, page: number) {
  return username
    ? `https://api.github.com/users/${username}/repos?page=${page}&per_page=100&sort=pushed`
    : "";
}

function useFetch<Data>(requestUrl: string) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [error404, setError404] = useState(false);

  useEffect(() => {
    setData(null);
    setError("");
    setError404(false);

    if (requestUrl === "") {
      return;
    }

    (async () => {
      let response: Response;
      try {
        response = await fetch(requestUrl);
      } catch (err) {
        const message = (err as Error).message;
        setError(`Fetch Error: ${message}`);
        return;
      }

      if (!response.ok) {
        if (response.status === 404) {
          setError404(true);
        } else {
          let errorData = await response.json();
          setError(`HTTP Error: (${response.status}) ${errorData.message}`);
        }
        return;
      }

      setData(await response.json());
    })();
  }, [requestUrl]);

  return { data, error, error404 };
}
