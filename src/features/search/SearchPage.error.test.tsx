import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { baseUrl } from "../../app/api";
import App from "../../app/App";
import { server } from "../../mocks/server";
import { renderWithWrapper } from "../../testUtils/utils";

test("nonexistent username causes 'not found' message", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "nonexistent");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

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

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

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

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  // NodeJS-specific message (the Chrome-specific message is "Failed to fetch")
  expect(
    await screen.findByText("Error: Network request failed")
  ).toBeInTheDocument();
});

test("illegal character in search string causes validation message", () => {
  renderWithWrapper(<App />);

  const input = screen.getByPlaceholderText("Username");
  const validationMessage =
    "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

  userEvent.type(input, "google-{enter}");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();

  userEvent.type(input, "{backspace}");
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();

  userEvent.clear(input);
  userEvent.type(input, "-google");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();

  userEvent.clear(input);
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();

  userEvent.type(input, "google-2");
  expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();

  userEvent.clear(input);
  userEvent.type(input, "google--2");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();

  userEvent.clear(input);
  userEvent.type(input, "google?2");
  expect(screen.queryByText(validationMessage)).toBeInTheDocument();
});

test("illegal character in URL parameter 'username' causes validation message", () => {
  renderWithWrapper(<App />, "/search?username=google-");

  const validationMessage =
    'Invalid username "google-" in the URL. ' +
    "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

  expect(screen.queryByText(validationMessage)).toBeInTheDocument();
});
