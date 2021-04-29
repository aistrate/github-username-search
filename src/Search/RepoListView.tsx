import { useRef } from "react";
import styles from "./RepoListView.module.css";
import type { Repo } from "./Models";
import type { FetchResult } from "../Shared/Fetch";
import { formatDateTime, formatNumber } from "../Shared/Formatting";
import Spinner from "../Shared/Spinner";
import Message from "../Styled/Message";
import { LargeHeading, SmallHeading } from "../Styled/Headings";
import Row from "../Styled/Row";
import { ExternalLink } from "../Styled/Links";
import Pagination from "../Shared/Pagination";

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

  function getPageUrl(page: number) {
    return `/search?q=${username}&page=${page}`;
  }

  return (
    <div className={styles.RepoListView}>
      <LargeHeading ref={headingRef}>
        Repositories
        <div className={`${styles.pagination} ${styles.topPagination}`}>
          <Pagination
            page={page}
            pageCount={pageCount}
            getPageUrl={getPageUrl}
            isLoading={repoListFetch.isLoading}
          />
        </div>
      </LargeHeading>

      <div className={styles.content}>
        {repoListFetch.isLoading && <Spinner />}

        {repoListFetch.error && (
          <Message type="error">{repoListFetch.error}</Message>
        )}

        {repoListFetch.data && (
          <>
            <RepoInfoList repos={repoListFetch.data} />

            <div className={`${styles.pagination} ${styles.bottomPagination}`}>
              <Pagination
                page={page}
                pageCount={pageCount}
                getPageUrl={getPageUrl}
                isLoading={repoListFetch.isLoading}
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
    <div className={styles.RepoInfo}>
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
