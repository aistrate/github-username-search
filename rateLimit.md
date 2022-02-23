## How to Increase the GitHub API Rate Limit in Development Mode

For unauthenticated requests, the GitHub API has a [rate limit](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting) of 60 requests per hour, associated with the originating IP address. You might find this limit to be too low when running the app in development mode.

When the limit is reached, the API will respond with HTTP Status 403 (Forbidden) for the remainder of the 60 minute period that started with your first request.

To increase the rate limit to 5000 requests per hour in development mode (or in general when running in local environments), you can use credentials generated through your GitHub account (which doesn't have to own the `github-username-search` repo, or a fork of it). This method is not appropriate for production, as it will make your credentials public on the client.

To increase the rate limit:

### 1. Create a GitHub OAuth application

This application will not be linked to a specific GitHub repository (your GitHub account doesn't have to be the owner of the `github-username-search` repo, or a fork of it).

- log in to your GitHub account on [github.com](https://github.com)
- go to **Settings** -> **Developer Settings** -> **OAuth Apps** (or go directly to https://github.com/settings/developers)
- click on **New OAuth App**
- assign the following mandatory fields:
  - Application name: `username-search` (the name doesn't matter)
  - Homepage URL: `http://localhost:3000`
  - Authorization callback URL: `http://localhost:3000`
- click on **Register application**
- save the Client ID (a 20-digit hex number) for later use
- click on **Generate a new client secret**
- save the client secret (a 40-digit hex number) into a local file, as the website will only display it once, immediately after generation; treat it as a password and keep it secret

### 2. Create authorization credentials and save them into config file for local environments

- concatenate the Client ID and the Client secret generated above, with a colon in between:
  ```
  <Client ID>:<Client secret>
  ```
- convert this string to Base64 (use https://www.utilities-online.info/base64, for example)
- create a file named `.env.local` in the root folder of the React app (next to the existing `.env` file), with the following content:
  ```
  REACT_APP_GITHUB_API_AUTH=Basic <Base64 string>
  ```

The React app will use the `REACT_APP_GITHUB_API_AUTH` value to add an `Authorization` HTTP header to every request made to the GitHub API.

### 3. Verify that rate limit was increased

- run the React app locally (`yarn start`, or `yarn build` followed by `serve -s build`), and use it to search for a username (e.g., "microsoft").
- in **DevTools** -> **Network** tab, find a network call to `api.github.com`
- check that its `x-ratelimit-limit` HTTP response header has a value of 5000 instead of 60
