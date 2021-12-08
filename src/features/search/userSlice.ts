import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "./models";

const fetchUser = createAsyncThunk<
  UserState,
  string,
  { rejectValue: UserState }
>("user/fetchUser", async (username, { rejectWithValue }) => {
  if (!username) {
    return { isLoading: false };
  }

  let response: Response;
  try {
    response = await fetch(getUserUrl(username), fetchOptions);
  } catch (err) {
    const error = `Error: ${(err as Error).message}`;
    return rejectWithValue({ error, isLoading: false });
  }

  if (!response.ok) {
    const errorData = await response.json();
    const error = `HTTP Error: (${response.status}) ${errorData.message}`;
    return rejectWithValue({
      error,
      httpStatus: response.status,
      isLoading: false,
    });
  }

  const data: User = await response.json();
  return {
    data: extractUserFields(data),
    httpStatus: response.status,
    isLoading: false,
  };
});

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function extractUserFields(user: User): User {
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

type UserState = {
  data?: User;
  error?: string;
  httpStatus?: number;
  requestUrl?: string;
  isLoading: boolean;
};

const initialState: UserState = {
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        return {
          data: state.data, // to avoid flickering
          isLoading: true,
        };
      })
      .addCase(fetchUser.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(fetchUser.rejected, (_state, action) => {
        return action.payload || { error: "Unknown error", isLoading: false };
      });
  },
});

const selectUser = (state: RootState) => state.user;

// define the environment variable in file .env.development.local (NOT production);
// the file should not be tracked by source control (add to .gitignore)
const auth = process.env.REACT_APP_GITHUB_API_AUTH;

// this will increase the GitHub API rate limit from 60 to 5000 requests/hour
const fetchOptions = auth
  ? { headers: new Headers({ Authorization: auth }) }
  : undefined;

export default userSlice.reducer;

export type { UserState };

export { fetchUser, selectUser };

export const { resetUser } = userSlice.actions;
