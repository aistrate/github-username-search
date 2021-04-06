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
    <div style={{ marginTop: "2rem" }}>
      <SearchForm />
      <UserInfo user={userData} />
      <RepoList repos={repoData} />
    </div>
  );
}

function SearchForm() {
  return (
    <form action="#" style={{ marginBottom: "3.5rem" }}>
      <TextInput placeholder="Username" />
      <Button type="submit">Search</Button>
    </form>
  );
}

function TextInput(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className="TextInput"
      type="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      {...props}
    />
  );
}

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return <button className="Button" {...props} />;
}

type UserType = "User" | "Organization";

type User = {
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  type: UserType;
  html_url: string;
  created_at: string;
  bio: string | null;
  followers: number;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
};

type UserInfoProps = {
  user: User;
};

function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <Avatar url={user.avatar_url} userType={user.type} />

      <LargeHeading>{user.name}</LargeHeading>

      <dl>
        <Row label="Username">
          <Link href={user.html_url}>{user.login}</Link>
        </Row>
        <Row label="Type">{user.type}</Row>
        <Row label="Created">{formatDate(user.created_at)}</Row>
        {user.bio && <Row label="Bio">{user.bio}</Row>}
        <Row label="Followers">{formatNumber(user.followers)}</Row>
        {user.company && (
          <Row label="Company">
            <Company name={user.company} />
          </Row>
        )}
        {user.location && <Row label="Location">{user.location}</Row>}
        {user.email && <Row label="Email">{user.email}</Row>}
        {user.blog && (
          <Row label="Blog">
            <Link href={user.blog}>{user.blog}</Link>
          </Row>
        )}
        {user.twitter_username && (
          <Row label="Twitter">
            <Link href={`https://twitter.com/${user.twitter_username}`}>
              @{user.twitter_username}
            </Link>
          </Row>
        )}
        <Row label="Repositories">{formatNumber(user.public_repos)}</Row>
      </dl>
    </>
  );
}

type Repo = {
  id: number;
  name: string;
  html_url: string;
  fork: boolean;
  description: string | null;
  homepage: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type RepoListProps = {
  repos: Repo[];
};

type RepoInfoProps = {
  repo: Repo;
};

function RepoList({ repos }: RepoListProps) {
  return (
    <div className="RepoList">
      <LargeHeading>Repositories</LargeHeading>

      <div>
        {repos.map((repo) => (
          <RepoInfo repo={repo}></RepoInfo>
        ))}
      </div>
    </div>
  );
}

function RepoInfo({ repo }: RepoInfoProps) {
  return (
    <div key={repo.id} className="RepoInfo">
      <h3>
        <Link href={repo.html_url}>{repo.name}</Link>
      </h3>

      <dl>
        {repo.fork && <Row label="Fork?">Yes</Row>}
        {repo.description && <Row label="Description">{repo.description}</Row>}
        {repo.homepage && (
          <Row label="Homepage">
            <Link href={repo.homepage}>{repo.homepage}</Link>
          </Row>
        )}
        {repo.language && <Row label="Language">{repo.language}</Row>}
        {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
          <Row label="Stats">
            {formatNumber(repo.stargazers_count)} stars &nbsp;| &nbsp;
            {formatNumber(repo.forks_count)} forks
          </Row>
        )}
        <Row label="Updated">{formatDate(repo.updated_at)}</Row>
      </dl>
    </div>
  );
}

function LargeHeading(props: React.ComponentPropsWithoutRef<"h2">) {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h2 className="LargeHeading" {...props}></h2>;
}

type AvatarProps = {
  url: string;
  userType: UserType;
};

function Avatar({ url, userType }: AvatarProps) {
  return userType === "User" ? (
    <img
      className="Avatar Avatar--user"
      alt="Avatar"
      width="180"
      height="180"
      src={url}
    />
  ) : (
    <img className="Avatar" alt="Avatar" width="100" height="100" src={url} />
  );
}

type RowProps = {
  label: string;
  children?: React.ReactNode;
};

function Row({ label, children }: RowProps) {
  return (
    <div className="Row">
      <dt className="Row__label">{label}:</dt>
      <dd className="Row__content">{children}</dd>
    </div>
  );
}

function Link(props: React.ComponentPropsWithoutRef<"a">) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target="_blank" className="Link" {...props} />;
}

type CompanyProps = {
  name: string;
};

function Company({ name }: CompanyProps) {
  return name[0] === "@" ? (
    <Link href={`https://github.com/${name.slice(1)}`}>{name}</Link>
  ) : (
    <>{name}</>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
