import { useRef } from "react";
import type { Repo } from "./Models";
import type { FetchResult } from "../Shared/Fetch";
import {
  Spinner,
  Message,
  LargeHeading,
  SmallHeading,
  Row,
  ExternalLink,
} from "../Shared/Styled";
import { formatDateTime, formatNumber } from "../Shared/Utils";
import Pagination from "./Pagination";

export default RepoListView;

type RepoListViewProps = {
  repoListFetch: FetchResult<Repo[]>;
  username: string;
  page: number;
  pageCount: number;
};

function RepoListView({
  repoListFetch,
  username,
  page,
  pageCount,
}: RepoListViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null!);

  return (
    <div className="RepoListView" id="repositories">
      <LargeHeading ref={headingRef}>
        Repositories
        <div className="RepoList__pagination RepoList__pagination--top">
          <Pagination username={username} page={page} pageCount={pageCount} />
        </div>
      </LargeHeading>

      <div className="RepoListView__content">
        {repoListFetch.isLoading && <Spinner />}

        {repoListFetch.error && (
          <Message type="error">{repoListFetch.error}</Message>
        )}

        {repoListFetch.data && (
          <>
            <RepoInfoList repos={repoListFetch.data} />

            <div className="RepoList__pagination RepoList__pagination--bottom">
              <Pagination
                username={username}
                page={page}
                pageCount={pageCount}
                scrollTo={headingRef}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
    <div className="RepoInfo">
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
    </div>
  );
}
