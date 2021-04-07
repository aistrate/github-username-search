import {
  LargeHeading,
  SmallHeading,
  Row,
  Link,
  formatDate,
  formatNumber,
} from "./Styled";

export type { Repo };
export { RepoList };

type Repo = {
  id: number;
  name: string;
  html_url: string;
  fork: boolean;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type RepoListProps = {
  repos: Repo[];
};

type RepoInfoProps = {
  repo: Repo;
};

function RepoList({ repos }: RepoListProps) {
  return (
    <div className="RepoList">
      <LargeHeading>Repositories</LargeHeading>

      <div>
        {repos.map((repo) => (
          <RepoInfo repo={repo}></RepoInfo>
        ))}
      </div>
    </div>
  );
}

function RepoInfo({ repo }: RepoInfoProps) {
  return (
    <div key={repo.id} className="RepoInfo">
      <SmallHeading>
        <Link href={repo.html_url}>{repo.name}</Link>
      </SmallHeading>

      <dl>
        {repo.fork && <Row label="Fork?">Yes</Row>}
        {repo.description && <Row label="Description">{repo.description}</Row>}
        {repo.homepage && (
          <Row label="Homepage">
            <Link href={repo.homepage}>{repo.homepage}</Link>
          </Row>
        )}
        {repo.language && <Row label="Language">{repo.language}</Row>}
        {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
          <Row label="Stats">
            {formatNumber(repo.stargazers_count)} stars &nbsp;| &nbsp;
            {formatNumber(repo.forks_count)} forks
          </Row>
        )}
        <Row label="Updated">{formatDate(repo.updated_at)}</Row>
      </dl>
    </div>
  );
}
