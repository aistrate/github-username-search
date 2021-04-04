export default Search;

const user = {
  login: "facebook",
  id: 69631,
  avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
  html_url: "https://github.com/facebook",
  type: "Organization",
  name: "Facebook",
  company: null,
  blog: "https://opensource.fb.com",
  location: "Menlo Park, California",
  email: null,
  bio:
    "We are working to build community through open source technology. NB: members must have two-factor auth.",
  twitter_username: "fabpot",
  public_repos: 117,
  followers: 0,
  created_at: "2009-04-02T03:35:22Z",
};

function Search() {
  return (
    <div>
      <h1>Search</h1>

      <form action="#">
        Username
        <input type="text" />
        <button type="submit">Search</button>
      </form>

      <UserInfo />
    </div>
  );
}

function UserInfo() {
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
        <FieldRow label="GitHub">{user.html_url}</FieldRow>
        <FieldRow label="Created">{dateCreated}</FieldRow>
        {user.bio && <FieldRow label="Bio">{user.bio}</FieldRow>}
        <FieldRow label="Followers">{user.followers}</FieldRow>
        {user.company && <FieldRow label="Company">{user.company}</FieldRow>}
        {user.location && <FieldRow label="Location">{user.location}</FieldRow>}
        {user.email && <FieldRow label="Email">{user.email}</FieldRow>}
        {user.blog && <FieldRow label="Blog">{user.blog}</FieldRow>}
        {user.twitter_username && (
          <FieldRow label="Twitter">@{user.twitter_username}</FieldRow>
        )}
        <FieldRow label="Repositories">{user.public_repos}</FieldRow>
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
