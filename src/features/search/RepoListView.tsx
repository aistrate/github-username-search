import React, { useRef } from "react";
import styled, { css } from "styled-components/macro";
import Delayed from "../../common/Delayed";
import {
  formatDateTime,
  formatNumber,
  formatUrl,
} from "../../common/formatting";
import Pagination from "../../common/Pagination";
import { LargeHeading, SmallHeading } from "../../common/styled/headings";
import { ExternalLink } from "../../common/styled/links";
import Message from "../../common/styled/Message";
import Row from "../../common/styled/Row";
import Spinner from "../../common/styled/Spinner";
import { Repo, ReposFetch } from "./reposSlice";

export default RepoListView;

type RepoListViewProps = {
  reposFetch: ReposFetch;
  pageCount: number;
  className?: string;
};

function RepoListView({ reposFetch, pageCount, className }: RepoListViewProps) {
  const username = reposFetch.fetchArg?.username || "";
  const page = reposFetch.fetchArg?.page || 1;

  const headingRef = useRef<HTMLHeadingElement>(null!);

  function getPageUrl(page: number) {
    return page === 1
      ? `/search?username=${username}`
      : `/search?username=${username}&page=${page}`;
  }

  return (
    <div className={className}>
      <LargeHeading ref={headingRef}>
        Repositories
        <TopPagination data-testid="topPagination">
          <Pagination
            page={page}
            pageCount={pageCount}
            getPageUrl={getPageUrl}
            isLoading={reposFetch.isLoading}
          />
        </TopPagination>
      </LargeHeading>

      <Content>
        {reposFetch.isLoading && (
          <Delayed>
            <Spinner data-testid="reposSpinner" />
          </Delayed>
        )}

        {reposFetch.error && <Message type="error">{reposFetch.error}</Message>}

        {reposFetch.data && (
          <>
            <RepoInfoList repos={reposFetch.data} />

            <BottomPagination>
              <Pagination
                page={page}
                pageCount={pageCount}
                getPageUrl={getPageUrl}
                isLoading={reposFetch.isLoading}
                scrollTo={headingRef}
              />
            </BottomPagination>
          </>
        )}
      </Content>
    </div>
  );
}

type RepoInfoListProps = {
  repos: Repo[];
};

const RepoInfoList = React.memo(({ repos }: RepoInfoListProps) => {
  return repos.length > 0 ? (
    <>
      {repos.map((repo) => (
        <RepoInfo key={repo.id} repo={repo} />
      ))}
    </>
  ) : (
    <>(none)</>
  );
});

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
            <ExternalLink nowrap href={formatUrl(repo.homepage)}>
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

const RepoInfoContainer = styled.div`
  & + & {
    margin-top: 2.5rem;
  }
`;
