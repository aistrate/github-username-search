import React from "react";
import type { UserType, User } from "./Models";
import { LargeHeading, Row, Link } from "../Shared/Styled";
import { formatDate, formatNumber } from "../Shared/Utils";

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
            <CompanyList names={user.company} />
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
    </div>
  );
}

type AvatarProps = {
  url: string;
  userType: UserType;
};

function Avatar({ url, userType }: AvatarProps) {
  return userType === "User" ? (
    <img
      src={url}
      alt="Avatar"
      width="180"
      height="180"
      className="Avatar Avatar--user"
    />
  ) : (
    <img src={url} alt="Avatar" width="100" height="100" className="Avatar" />
  );
}

type CompanyListProps = {
  names: string;
};

function CompanyList({ names }: CompanyListProps) {
  // 'names' can be a comma-separated list
  const companyList = names
    .split(",")
    .map((name) => name.trim())
    .map((name) => <Company name={name} />);

  const joined = companyList
    .slice(1)
    .reduce((accumulator, company) => accumulator.concat(<>, </>, company), [
      companyList[0],
    ]);

  // use createElement with spread argument to avoid React's warning:
  // 'Each child in a list should have a unique "key" prop'
  return React.createElement(React.Fragment, null, ...joined);
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
