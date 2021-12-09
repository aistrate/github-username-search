import { createAsyncThunk } from "@reduxjs/toolkit";

type FetchState<Data> = {
  data?: Data;
  error?: string;
  httpStatus?: number;
  requestUrl?: string;
  isLoading: boolean;
};

const createFetchThunk = <Data, ThunkArg, ResponseData>(
  typePrefix: string,
  getRequestUrl: (arg: ThunkArg) => string | null,
  selectFields: (responseData: ResponseData) => Data
) =>
  createAsyncThunk<
    FetchState<Data>,
    ThunkArg,
    { rejectValue: FetchState<Data> }
  >(typePrefix, async (thunkArg, { rejectWithValue }) => {
    const requestUrl = getRequestUrl(thunkArg);

    if (!requestUrl) {
      return { isLoading: false };
    }

    let response: Response;
    try {
      response = await fetch(requestUrl, fetchOptions);
    } catch (err) {
      const error = `Error: ${(err as Error).message}`;
      return rejectWithValue({ error, requestUrl, isLoading: false });
    }

    if (!response.ok) {
      const errorData = await response.json();
      const error = `HTTP Error: (${response.status}) ${errorData.message}`;
      return rejectWithValue({
        error,
        httpStatus: response.status,
        requestUrl,
        isLoading: false,
      });
    }

    const responseData: ResponseData = await response.json();
    return {
      data: selectFields(responseData),
      httpStatus: response.status,
      requestUrl,
      isLoading: false,
    };
  });

// define the environment variable in file .env.development.local (NOT production);
// the file should not be tracked by source control (add to .gitignore)
const auth = process.env.REACT_APP_GITHUB_API_AUTH;

// this will increase the GitHub API rate limit from 60 to 5000 requests/hour
const fetchOptions = auth
  ? { headers: new Headers({ Authorization: auth }) }
  : undefined;

export type { FetchState };

export { createFetchThunk };
