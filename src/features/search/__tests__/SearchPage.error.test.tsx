import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

test("non-existing username causes 'not found' message", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "ababab1234");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(
    await screen.findByText(/username 'ababab1234' was not found./i)
  ).toBeInTheDocument();
});

test("illegal character in search string causes validation message", async () => {
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

test("illegal character in URL parameter 'username' causes validation message", async () => {
  renderWithWrapper(<App />, { routerEntries: ["/search?username=google-"] });

  const validationMessage =
    'Invalid username "google-" in the URL. ' +
    "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

  expect(screen.queryByText(validationMessage)).toBeInTheDocument();
});
