import SearchForm from "./SearchForm";
import type { User } from "./UserInfo";
import { UserInfo } from "./UserInfo";
import type { Repo } from "./RepoInfo";
import { RepoList } from "./RepoInfo";

export default SearchPage;

const userData: User = {
  id: 69631,
  avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
  //avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
  name: "Facebook",
  login: "facebook",
  type: "Organization",
  html_url: "https://github.com/facebook",
  created_at: "2009-04-02T03:35:22Z",
  bio:
    "We are working to build community through open source technology. NB: members must have two-factor auth.",
  followers: 23144,
  company: "@microsoft",
  location: "Menlo Park, California",
  email: "abc@example.com",
  blog: "https://opensource.fb.com",
  twitter_username: "fabpot",
  public_repos: 1117,
};

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
  return (
    <>
      <SearchForm />
      <UserInfo user={userData} />
      <RepoList repos={repoData} />
    </>
  );
}
