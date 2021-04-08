import { useState } from "react";
import type { User } from "./Models";
import type { SearchEvent } from "./SearchForm";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
// import RepoList from "./RepoInfo";

export default SearchPage;

// const repoData: Repo[] = [
//   {
//     id: 10270250,
//     name: "react",
//     html_url: "https://github.com/facebook/react",
//     fork: false,
//     description:
//       "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
//     homepage: "https://reactjs.org",
//     language: "JavaScript",
//     stargazers_count: 166391,
//     forks_count: 33414,
//     updated_at: "2021-04-04T20:01:12Z",
//   },
//   {
//     id: 40508605,
//     name: "relay",
//     html_url: "https://github.com/facebook/relay",
//     fork: false,
//     description:
//       "Relay is a JavaScript framework for building data-driven React applications.",
//     homepage: "https://relay.dev",
//     language: "JavaScript",
//     stargazers_count: 15533,
//     forks_count: 33414,
//     updated_at: "2021-04-04T09:00:37Z",
//   },
// ];

function SearchPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSearch = async (e: SearchEvent) => {
    let username = e.value;

    setError("");
    setInfo("");

    let response: Response;
    try {
      response = await fetch(getUserUrl(username));
    } catch (err) {
      const message = (err as Error).message;
      setError(`Fetch Error: ${message}`);
      setUser(null);
      return;
    }

    if (!response.ok) {
      if (response.status === 404) {
        setInfo(`Username '${username}' was not found.`);
      } else {
        let errorData = await response.json();
        setError(`HTTP Error: (${response.status}) ${errorData.message}`);
      }

      setUser(null);
      return;
    }

    let userData: User = await response.json();
    setUser(userData);
  };

  return (
    <>
      <SearchForm fieldName="Username" onSearch={handleSearch} />

      <Message error={error} info={info} />

      {user && <UserInfo user={user} />}

      {/* <RepoList repos={repoData} /> */}
    </>
  );
}

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

type MessageProps = {
  error?: string;
  info?: string;
};

function Message({ error, info }: MessageProps) {
  return (
    <div className="Message">
      {error && <div className="Message__error">{error}</div>}
      {info && <div>{info}</div>}
    </div>
  );
}
