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

function useFetch<Data>(requestUrl: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [error404, setError404] = useState(false);

  useEffect(() => {
    setData(null);
    setError("");
    setError404(false);

    if (!requestUrl) {
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
