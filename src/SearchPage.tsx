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
  queryString: string;
};

function SearchPage({ queryString }: SearchPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [repoList, setRepoList] = useState<Repo[]>([]);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const history = useHistory();

  queryString = queryString.trim();

  useEffect(() => {
    setUser(null);
    setRepoList([]);
    setError("");
    setInfo("");

    const username = queryString;
    fetchUser(username);
    fetchRepoList(username, 1);
  }, [queryString]);

  async function fetchUser(username: string) {
    if (username === "") {
      return;
    }

    let response: Response;
    try {
      response = await fetch(getUserUrl(username));
    } catch (err) {
      const message = (err as Error).message;
      setError(`Fetch Error: ${message}`);
      return;
    }

    if (!response.ok) {
      if (response.status === 404) {
        setInfo(`Username '${username}' was not found.`);
      } else {
        let errorData = await response.json();
        setError(`HTTP Error: (${response.status}) ${errorData.message}`);
      }
      return;
    }

    let userData: User = await response.json();
    setUser(userData);
  }

  async function fetchRepoList(username: string, page: number) {
    if (username === "") {
      return;
    }

    let response: Response;
    try {
      response = await fetch(getRepoListUrl(username, page));
    } catch (err) {
      const message = (err as Error).message;
      setError(`Fetch Error: ${message}`);
      return;
    }

    if (!response.ok) {
      if (response.status === 404) {
        setInfo(`Repos for username '${username}' were not found.`);
      } else {
        let errorData = await response.json();
        setError(`HTTP Error: (${response.status}) ${errorData.message}`);
      }
      return;
    }

    let repoListData: Repo[] = await response.json();
    setRepoList(repoListData);
  }

  function handleSearch(e: SearchEvent) {
    let username = e.value;
    history.push(`/search?q=${username}`);
  }

  return (
    <>
      <SearchForm
        fieldName="Username"
        initialValue={queryString}
        onSearch={handleSearch}
      />

      <Message error={error} info={info} />

      {user && <UserInfo user={user} />}
      {repoList.length > 0 && <RepoList repos={repoList} />}
    </>
  );
}

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function getRepoListUrl(username: string, page: number) {
  return `https://api.github.com/users/${username}/repos?page=${page}&per_page=100&sort=pushed`;
}
