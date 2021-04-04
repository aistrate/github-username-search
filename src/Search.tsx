export default Search;

const userData = {
  id: 69631,
  avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
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

function Search() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <form action="#">
        Username:
        <input type="text" />
        <button type="submit">Search</button>
      </form>

      <UserInfo user={userData} />
    </div>
  );
}

function UserInfo({ user }: { user: typeof userData }) {
  const dateCreated = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <h2 className="UserInfo__Title">{user.name}</h2>
      <dl>
        <FieldRow label="Username">{user.login}</FieldRow>
        <FieldRow label="Type">{user.type}</FieldRow>
        <FieldRow label="GitHub Page">
          <FieldLink href={user.html_url}>{user.html_url}</FieldLink>
        </FieldRow>
        <FieldRow label="Created">{dateCreated}</FieldRow>
        {user.bio && <FieldRow label="Bio">{user.bio}</FieldRow>}
        <FieldRow label="Followers">{formatNumber(user.followers)}</FieldRow>
        {user.company && (
          <FieldRow label="Company">
            <Company name={user.company} />
          </FieldRow>
        )}
        {user.location && <FieldRow label="Location">{user.location}</FieldRow>}
        {user.email && <FieldRow label="Email">{user.email}</FieldRow>}
        {user.blog && (
          <FieldRow label="Blog">
            <FieldLink href={user.blog}>{user.blog}</FieldLink>
          </FieldRow>
        )}
        {user.twitter_username && (
          <FieldRow label="Twitter">
            <FieldLink href={`https://twitter.com/${user.twitter_username}`}>
              @{user.twitter_username}
            </FieldLink>
          </FieldRow>
        )}
        <FieldRow label="Repositories">
          {formatNumber(user.public_repos)}
        </FieldRow>
      </dl>
    </>
  );
}

type FieldRowProps = {
  label: string;
  children?: React.ReactNode;
};

function FieldRow({ label, children }: FieldRowProps) {
  return (
    <div className="FieldRow">
      <dt className="FieldRow__label">{label}:</dt>
      <dd className="FieldRow__content">{children}</dd>
    </div>
  );
}

function FieldLink(props: React.ComponentPropsWithoutRef<"a">) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target="_blank" className="FieldLink" {...props} />;
}

function Company({ name }: { name: string }) {
  return name[0] === "@" ? (
    <FieldLink href={`https://github.com/${name.slice(1)}`}>{name}</FieldLink>
  ) : (
    <>{name}</>
  );
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
