import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./models";

const fetchUser = createAsyncThunk<
  { data: User | null; httpStatus: number | null },
  string,
  { rejectValue: { errorMessage: string; httpStatus: number | null } }
>("user/fetchUser", async (username, { rejectWithValue }) => {
  if (!username) {
    return { data: null, httpStatus: null };
  }

  let response: Response;
  try {
    response = await fetch(getUserUrl(username), fetchOptions);
  } catch (err) {
    const errorMessage = `Error: ${(err as Error).message}`;
    return rejectWithValue({ errorMessage, httpStatus: null });
  }

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = `HTTP Error: (${response.status}) ${errorData.message}`;
    return rejectWithValue({ errorMessage, httpStatus: response.status });
  }

  const data: User = await response.json();
  return { data: extractUserFields(data), httpStatus: response.status };
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
  data: User | null;
  httpStatus: number | null;
  error: string | null;
  isLoading: boolean;
  requestUrl: string | null;
};

const initialState: UserState = {
  data: null,
  httpStatus: null,
  error: null,
  isLoading: false,
  requestUrl: null,
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
        state.httpStatus = null;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.httpStatus = action.payload.httpStatus;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.data = null;
        state.httpStatus = action.payload?.httpStatus ?? null;
        state.error = action.payload?.errorMessage ?? null;
        state.isLoading = false;
      });
  },
});

// define the environment variable in file .env.development.local (NOT production);
// the file should not be tracked by source control (add to .gitignore)
const auth = process.env.REACT_APP_GITHUB_API_AUTH;

// this will increase the GitHub API rate limit from 60 to 5000 requests/hour
const fetchOptions = auth
  ? { headers: new Headers({ Authorization: auth }) }
  : undefined;

export default userSlice.reducer;

export { fetchUser };

export const { resetUser } = userSlice.actions;
