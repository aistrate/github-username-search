export default Search;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Repos = [
  {
    id: 10270250,
    name: "react",
    html_url: "https://github.com/facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    fork: false,
    created_at: "2013-05-24T16:15:54Z",
    stargazers_count: 166391,
    language: "JavaScript",
    forks_count: 33414,
  },
  {
    id: 40508605,
    name: "relay",
    html_url: "https://github.com/facebook/relay",
    description:
      "Relay is a JavaScript framework for building data-driven React applications.",
    fork: false,
    created_at: "2015-08-10T22:09:16Z",
    stargazers_count: 15533,
    language: "JavaScript",
    forks_count: 33414,
  },
];

function Search() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <form action="#" style={{ marginBottom: "3.5rem" }}>
        Username:
        <input type="text" />
        <button type="submit">Search</button>
      </form>

      <UserInfo user={userData} />
    </div>
  );
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
  bio: string;
  followers: number;
  company: string;
  location: string;
  email: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
};

function UserInfo({ user }: { user: User }) {
  const dateCreated = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Avatar url={user.avatar_url} userType={user.type} />

      <h2 className="UserInfo__Title">{user.name}</h2>

      <dl>
        <Row label="Username">{user.login}</Row>
        <Row label="Type">{user.type}</Row>
        <Row label="GitHub Page">
          <Link href={user.html_url}>{user.html_url}</Link>
        </Row>
        <Row label="Created">{dateCreated}</Row>
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

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
