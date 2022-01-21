import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

test("on search, save username in search history", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");
  const searchMenuItem = getByText(menu, "Search");
  const historyMenuItem = getByText(menu, "History");

  userEvent.click(historyMenuItem);
  expectHistoryToEqual([]);

  userEvent.click(searchMenuItem);
  await searchForUsername("reddit");

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["reddit"]);

  userEvent.click(searchMenuItem);
  await searchForUsername("graphql");

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["graphql", "reddit"]);

  userEvent.click(searchMenuItem);
  await searchForUsername("reddit");

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["reddit", "graphql"]);

  userEvent.click(searchMenuItem);
  searchForUsername("nonexistent", false);
  expect(
    await screen.findByText("Username 'nonexistent' was not found.")
  ).toBeInTheDocument();

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["reddit", "graphql"]);
});

async function searchForUsername(username: string, waitForRepos = true) {
  userEvent.type(screen.getByPlaceholderText("Username"), username);
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  if (waitForRepos) {
    await screen.findAllByRole("heading", { level: 3 });
  }
}

function expectHistoryToEqual(expected: string[]) {
  const rowValues = screen.queryAllByTestId("rowValue");
  const usernames = rowValues.map((rowValue) => rowValue.textContent || "");
  expect(usernames).toEqual(expected);

  expect(
    screen.queryByText(`History (${expected.length})`)
  ).toBeInTheDocument();
}
