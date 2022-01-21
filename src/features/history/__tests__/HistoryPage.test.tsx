import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

test("on search, save username in search history ('happy path' test)", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");
  const searchMenuItem = getByText(menu, "Search");
  const historyMenuItem = getByText(menu, "History");

  userEvent.click(historyMenuItem);
  expect(screen.queryByText("History (0)")).toBeInTheDocument();
  expectHistory([]);

  userEvent.click(searchMenuItem);
  userEvent.type(screen.getByPlaceholderText("Username"), "reddit{enter}");
  await waitForRepos();

  userEvent.click(historyMenuItem);
  expect(screen.queryByText("History (1)")).toBeInTheDocument();
  expectHistory(["reddit"]);

  userEvent.click(searchMenuItem);
  userEvent.type(screen.getByPlaceholderText("Username"), "graphql{enter}");
  await waitForRepos();

  userEvent.click(historyMenuItem);
  expect(screen.queryByText("History (2)")).toBeInTheDocument();
  expectHistory(["graphql", "reddit"]);

  userEvent.click(searchMenuItem);
  userEvent.type(screen.getByPlaceholderText("Username"), "reddit{enter}");
  await waitForRepos();

  userEvent.click(historyMenuItem);
  expect(screen.queryByText("History (2)")).toBeInTheDocument();
  expectHistory(["reddit", "graphql"]);

  userEvent.click(searchMenuItem);
  userEvent.type(screen.getByPlaceholderText("Username"), "inexistent{enter}");
  expect(
    await screen.findByText("Username 'inexistent' was not found.")
  ).toBeInTheDocument();

  userEvent.click(historyMenuItem);
  expect(screen.queryByText("History (2)")).toBeInTheDocument();
  expectHistory(["reddit", "graphql"]);
});

async function waitForRepos() {
  await screen.findAllByRole("heading", { level: 3 });
}

function expectHistory(expected: string[]) {
  const rowValues = screen.queryAllByTestId("rowValue");
  const usernames = rowValues.map((rowValue) => rowValue.textContent || "");
  expect(usernames).toEqual(expected);
}
