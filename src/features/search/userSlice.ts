import { createSlice } from "@reduxjs/toolkit";
import { userUrl } from "../../app/api";
import { RootState } from "../../app/store";
import {
  addFetchCases,
  createFetchThunk,
  FetchState,
} from "../../common/fetchThunk";

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

type FetchUserArg = { username: string };

type UserFetch = FetchState<User, FetchUserArg>;

const fetchUser = createFetchThunk<User, FetchUserArg, User>(
  "user/fetchUser",
  getUserUrl,
  extractUserData
);

function getUserUrl({ username }: FetchUserArg) {
  return username ? userUrl(username) : null;
}

function extractUserData(user: User): User {
  return {
    id: user.id,
    avatar_url: user.avatar_url,
    name: user.name,
    login: user.login,
    type: user.type,
    html_url: user.html_url,
    created_at: user.created_at,
    bio: user.bio,
    followers: user.followers,
    company: user.company,
    location: user.location,
    email: user.email,
    blog: user.blog,
    twitter_username: user.twitter_username,
    public_repos: user.public_repos,
  };
}

const initialState = {} as UserFetch;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    addFetchCases(builder, fetchUser);
  },
});

const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

export type { FetchUserArg, User, UserFetch, UserType };
export { fetchUser, selectUser };

export const { resetUser } = userSlice.actions;
