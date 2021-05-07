import { useRef } from "react";
import styled, { css } from "styled-components/macro";
import type { Repo } from "./Models";
import type { FetchResult } from "../Shared/Fetch";
import { formatDateTime, formatNumber } from "../Shared/Formatting";
import { DelayedSpinner } from "../Shared/DelayedSpinner";
import { Message } from "../Styled/Message";
import { LargeHeading, SmallHeading } from "../Styled/Headings";
import { Row } from "../Styled/Row";
import { ExternalLink } from "../Styled/Link";
import Pagination from "../Shared/Pagination";

export default RepoListView;

type RepoListViewProps = {
  repoListFetch: FetchResult<Repo[]>;
  username: string;
  page: number;
  pageCount: number;
  className?: string;
};

function RepoListView({
  repoListFetch,
  username,
  page,
  pageCount,
  className,
}: RepoListViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null!);

  function getPageUrl(page: number) {
    return `/search?q=${username}&page=${page}`;
  }

  return (
    <div className={className}>
      <LargeHeading ref={headingRef}>
        Repositories
        <TopPagination>
          <Pagination
            page={page}
            pageCount={pageCount}
            getPageUrl={getPageUrl}
            isLoading={repoListFetch.isLoading}
          />
        </TopPagination>
      </LargeHeading>

      <Content>
        {repoListFetch.isLoading && <DelayedSpinner />}

        {repoListFetch.error && (
          <Message type="error">{repoListFetch.error}</Message>
        )}

        {repoListFetch.data && (
          <>
            <RepoInfoList repos={repoListFetch.data} />

            <BottomPagination>
              <Pagination
                page={page}
                pageCount={pageCount}
                getPageUrl={getPageUrl}
                isLoading={repoListFetch.isLoading}
                scrollTo={headingRef}
              />
            </BottomPagination>
          </>
        )}
      </Content>
    </div>
  );
}

const paginationStyle = css`
  float: right;

  @media (max-width: 40em) {
    & {
      float: none;
    }
  }
`;

const TopPagination = styled.div`
  ${paginationStyle}

  line-height: 2rem;
  position: relative;
  top: 1px;

  @media (max-width: 40em) {
    & {
      margin-top: 0.83em;
    }
  }
`;

const BottomPagination = styled.div`
  ${paginationStyle}

  margin: 0.83em 0;

  @media (max-width: 40em) {
    & {
      margin-top: 1.5em;
    }
  }
`;

const Content = styled.div`
  min-height: 60px;
  position: relative;
`;

type RepoInfoListProps = {
  repos: Repo[];
};

function RepoInfoList({ repos }: RepoInfoListProps) {
  return repos.length > 0 ? (
    <>
      {repos.map((repo) => (
        <RepoInfo key={repo.id} repo={repo} />
      ))}
    </>
  ) : (
    <>(none)</>
  );
}

type RepoInfoProps = {
  repo: Repo;
};

function RepoInfo({ repo }: RepoInfoProps) {
  return (
    <RepoInfoContainer>
      <SmallHeading>
        <ExternalLink href={repo.html_url}>{repo.name}</ExternalLink>
      </SmallHeading>

      <dl>
        {repo.fork && <Row label="Fork?">Yes</Row>}
        {repo.description && <Row label="Description">{repo.description}</Row>}
        {repo.homepage && (
          <Row label="Homepage">
            <ExternalLink nowrap href={repo.homepage}>
              {repo.homepage}
            </ExternalLink>
          </Row>
        )}
        {repo.language && <Row label="Language">{repo.language}</Row>}
        {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
          <Row label="Stats">
            {formatNumber(repo.stargazers_count)} stars &nbsp;| &nbsp;
            {formatNumber(repo.forks_count)} forks
          </Row>
        )}
        <Row label="Pushed">{formatDateTime(repo.pushed_at, "date-time")}</Row>
      </dl>
    </RepoInfoContainer>
  );
}

const RepoInfoContainer = styled.div`
  & + & {
    margin-top: 2.5rem;
  }
`;
