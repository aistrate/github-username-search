import type { UserType, User } from "./Models";
import { LargeHeading, Row, Link } from "./Styled";
import { formatDate, formatNumber } from "./Utils";

export default UserInfo;

type UserInfoProps = {
  user: User;
};

function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="UserInfo">
      <Avatar url={user.avatar_url} userType={user.type} />

      <LargeHeading>{user.name || user.login}</LargeHeading>

      <dl>
        <Row label="Username">
          <Link href={user.html_url}>{user.login}</Link>
        </Row>
        <Row label="Type">{user.type}</Row>
        <Row label="Created">{formatDate(user.created_at)}</Row>
        {user.bio && <Row label="Bio">{user.bio}</Row>}
        {user.followers > 0 && (
          <Row label="Followers">{formatNumber(user.followers)}</Row>
        )}
        {user.company && (
          <Row label="Company">
            <Company name={user.company} />
          </Row>
        )}
        {user.location && <Row label="Location">{user.location}</Row>}
        {user.email && <Row label="Email">{user.email}</Row>}
        {user.blog && (
          <Row label="Blog">
            <Link href={user.blog}>{truncate(user.blog, 80)}</Link>
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
    </div>
  );
}

type AvatarProps = {
  url: string;
  userType: UserType;
};

function Avatar({ url, userType }: AvatarProps) {
  return userType === "User" ? (
    <img src={url} alt="Avatar" width="180" className="Avatar Avatar--user" />
  ) : (
    <img src={url} alt="Avatar" width="100" className="Avatar" />
  );
}

type CompanyProps = {
  name: string;
};

function Company({ name }: CompanyProps) {
  // 'name' can be a comma-separated list
  const companies = name
    .split(",")
    .map((c) => c.trim())
    .map((company) =>
      company[0] === "@" ? (
        <Link href={`https://github.com/${company.slice(1)}`}>{company}</Link>
      ) : (
        <>{company}</>
      )
    );

  const comma = <>, </>;

  const joined = companies
    .slice(1)
    .reduce((accumulator, company) => accumulator.concat(comma, company), [
      companies[0],
    ]);

  return <>{joined}</>;
}

function truncate(s: string, maxLength: number) {
  return s.length > maxLength ? s.substring(0, maxLength) + "..." : s;
}
