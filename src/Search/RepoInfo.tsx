import type { Repo } from "./Models";
import {
  LargeHeading,
  SmallHeading,
  Row,
  ExternalLink,
} from "../Shared/Styled";
import { formatDateTime, formatNumber } from "../Shared/Utils";
import Pagination from "./Pagination";

export default RepoList;

type RepoListProps = {
  repos: Repo[];
  username: string;
  page: number;
};

function RepoList({ repos, username, page }: RepoListProps) {
  return (
    <div className="RepoList">
      <LargeHeading>
        Repositories
        <div className="RepoList__pagination">
          <Pagination username={username} page={page} />
        </div>
      </LargeHeading>

      <div>
        {repos.length > 0 ? (
          repos.map((repo) => <RepoInfo key={repo.id} repo={repo} />)
        ) : (
          <>(none)</>
        )}
      </div>
    </div>
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
            <ExternalLink href={repo.homepage}>{repo.homepage}</ExternalLink>
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
