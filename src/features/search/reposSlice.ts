import { createSlice } from "@reduxjs/toolkit";
import { reposUrl } from "../../app/api";
import { RootState } from "../../app/store";
import {
  addFetchCases,
  createFetchThunk,
  FetchState,
} from "../../common/fetchThunk";

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

type ReposFetch = FetchState<Repo[], FetchReposArg>;

const fetchRepos = createFetchThunk<Repo[], FetchReposArg, Repo[]>(
  "repos/fetchRepos",
  getReposUrl,
  extractReposData
);

function getReposUrl({ username, page }: FetchReposArg) {
  return username ? reposUrl(username, page) : null;
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

const initialState = {} as ReposFetch;

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

export type { FetchReposArg, Repo, ReposFetch };
export { fetchRepos, selectRepos };

export const { resetRepos } = reposSlice.actions;
