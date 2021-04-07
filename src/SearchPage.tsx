import { useState } from "react";
import type { User, Repo } from "./Models";
import type { SearchEvent } from "./SearchForm";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import RepoList from "./RepoInfo";

export default SearchPage;

const repoData: Repo[] = [
  {
    id: 10270250,
    name: "react",
    html_url: "https://github.com/facebook/react",
    fork: false,
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    homepage: "https://reactjs.org",
    language: "JavaScript",
    stargazers_count: 166391,
    forks_count: 33414,
    updated_at: "2021-04-04T20:01:12Z",
  },
  {
    id: 40508605,
    name: "relay",
    html_url: "https://github.com/facebook/relay",
    fork: false,
    description:
      "Relay is a JavaScript framework for building data-driven React applications.",
    homepage: "https://relay.dev",
    language: "JavaScript",
    stargazers_count: 15533,
    forks_count: 33414,
    updated_at: "2021-04-04T09:00:37Z",
  },
];

function SearchPage() {
  const [user, setUser] = useState<User | null>(null);

  const handleSearch = async (e: SearchEvent) => {
    let username = e.value;
    let response = await fetch(getUserUrl(username));

    if (response.ok) {
      let userData: User = await response.json();
      setUser(userData);
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  return (
    <>
      <SearchForm fieldName="Username" onSearch={handleSearch} />

      {user && <UserInfo user={user} />}

      {/* <RepoList repos={repoData} /> */}
    </>
  );
}

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}
