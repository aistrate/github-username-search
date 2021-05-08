import React from "react";
import styled, { css } from "styled-components/macro";
import type { UserType, User } from "./Models";
import type { FetchResult } from "../Shared/Fetch";
import { formatDateTime, formatNumber } from "../Shared/Formatting";
import { DelayedSpinner } from "../Shared/DelayedSpinner";
import { Message } from "../Styled/Message";
import { LargeHeading } from "../Styled/Headings";
import { Row } from "../Styled/Row";
import { ExternalLink } from "../Styled/Links";

export default UserView;

type UserViewProps = {
  userFetch: FetchResult<User>;
  username: string;
  className?: string;
};

function UserView({ userFetch, username, className }: UserViewProps) {
  return (
    <Container className={className}>
      {userFetch.isLoading && <DelayedSpinner />}

      {userFetch.error &&
        (userFetch.httpStatus === 404 ? (
          <Message type="info">{`Username '${username}' was not found.`}</Message>
        ) : (
          <Message type="error">{userFetch.error}</Message>
        ))}

      {userFetch.data && <UserInfo user={userFetch.data} />}
    </Container>
  );
}

type UserInfoProps = {
  user: User;
};

function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <Avatar url={user.avatar_url} userType={user.type} />

      <LargeHeading>{user.name || user.login}</LargeHeading>

      <dl>
        <Row label="Username">
          <ExternalLink href={user.html_url}>{user.login}</ExternalLink>
        </Row>
        <Row label="Type">{user.type}</Row>
        <Row label="Created">{formatDateTime(user.created_at, "date")}</Row>
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
            <ExternalLink nowrap href={user.blog}>
              {user.blog}
            </ExternalLink>
          </Row>
        )}
        {user.twitter_username && (
          <Row label="Twitter">
            <ExternalLink href={`https://twitter.com/${user.twitter_username}`}>
              @{user.twitter_username}
            </ExternalLink>
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
  const size = userType === "User" ? 180 : 100;

  return (
    <Image
      key={url}
      src={url}
      alt="Avatar"
      width={size}
      height={size}
      circular={userType === "User"}
    />
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
    <ExternalLink href={`https://github.com/${name.slice(1)}`}>
      {name}
    </ExternalLink>
  ) : (
    <>{name}</>
  );
}

const Container = styled.div`
  min-height: 60px;
  position: relative;
`;

type ImageProps = {
  circular: boolean;
};

const Image = styled.img<ImageProps>`
  height: auto;
  vertical-align: middle;

  ${({ circular }) =>
    circular &&
    css`
      border-radius: 50%;
    `}
`;
