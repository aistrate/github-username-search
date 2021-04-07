export type { UserType, User, Repo };

type UserType = "User" | "Organization";

type User = {
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  type: UserType;
  html_url: string;
  created_at: string;
  bio: string | null;
  followers: number;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
};

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
