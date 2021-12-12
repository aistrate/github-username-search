import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { FetchState } from "../../common/fetchThunk";
import { addFetchCases, createFetchThunk } from "../../common/fetchThunk";

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
  pushed_at: string;
};

type FetchReposArg = { username: string; page: number };

const fetchRepos = createFetchThunk<Repo[], FetchReposArg, Repo[]>(
  "repos/fetchRepos",
  getReposUrl,
  extractReposData
);

const reposPerPage = 30;

function getReposUrl({ username, page }: FetchReposArg) {
  return username
    ? `https://api.github.com/users/${username}/repos?page=${page}&per_page=${reposPerPage}&sort=pushed`
    : null;
}

function extractReposData(repos: Repo[]): Repo[] {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    fork: repo.fork,
    description: repo.description,
    homepage: repo.homepage,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    pushed_at: repo.pushed_at,
  }));
}

const initialState = {} as FetchState<Repo[], FetchReposArg>;

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    resetRepos() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    addFetchCases(builder, fetchRepos);
  },
});

const selectRepos = (state: RootState) => state.repos;

export default reposSlice.reducer;

export type { FetchReposArg, Repo };

export { fetchRepos, selectRepos, reposPerPage };

export const { resetRepos } = reposSlice.actions;
