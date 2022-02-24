import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { baseUrl } from "../../app/api";
import App from "../../app/App";
import { server } from "../../mocks/server";
import * as searchPage from "../../testUtils/searchPage";
import { renderWithWrapper } from "../../testUtils/utils";

test("nonexistent username causes 'not found' message", async () => {
  renderWithWrapper(<App />);

  searchPage.searchUsername("nonexistent");

  expect(
    await screen.findByText("Username 'nonexistent' was not found.")
  ).toBeInTheDocument();
});

test("HTTP error causes error message", async () => {
  renderWithWrapper(<App />);

  server.use(
    rest.get(`${baseUrl}/users/:username`, (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: "Internal Server Error" })
      );
    })
  );

  searchPage.searchUsername("reddit");

  expect(
    await screen.findByText("HTTP Error: (500) Internal Server Error")
  ).toBeInTheDocument();
});

test("network error causes error message", async () => {
  renderWithWrapper(<App />);

  server.use(
    rest.get(`${baseUrl}/users/:username`, (_req, res, _ctx) => {
      return res.networkError("Failed to connect");
    })
  );

  searchPage.searchUsername("reddit");

  // NodeJS-specific message (the Chrome-specific message is "Failed to fetch")
  expect(
    await screen.findByText("Error: Network request failed")
  ).toBeInTheDocument();
});

test("illegal character in search string causes validation message", () => {
  renderWithWrapper(<App />);

  const validationMessage =
    "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

  searchPage.typeUsername("google-{enter}");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();

  searchPage.typeUsername("{backspace}");
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();

  searchPage.clearUsername();
  searchPage.typeUsername("-google");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();

  searchPage.clearUsername();
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();

  searchPage.typeUsername("google-2");
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();

  searchPage.clearUsername();
  searchPage.typeUsername("google--2");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();

  searchPage.clearUsername();
  searchPage.typeUsername("google?2");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();
});

test("illegal character in URL parameter 'username' causes validation message", () => {
  renderWithWrapper(<App />, "/search?username=google-");

  const validationMessage =
    'Invalid username "google-" in the URL. ' +
    "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

  expect(screen.queryByText(validationMessage)).toBeInTheDocument();
});
