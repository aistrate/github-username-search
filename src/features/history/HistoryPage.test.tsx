import { getByText, queryAllByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../app/App";
import { renderWithWrapper } from "../../common/testUtils";

test("on every successful search, save username to the top of search history", async () => {
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

test("username on History page links to Search page for that username", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "Search"));
  await searchForUsername("graphql");

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText(`History (1)`)).toBeInTheDocument();

  userEvent.click(screen.getByText("graphql"));
  expect(screen.getByPlaceholderText("Username")).toHaveValue("graphql");

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  expect(repoHeadings.length).toBe(25);
});

test("convert username to lowercase before saving it to search history", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "Search"));
  await searchForUsername("GraphQL"); // capitalized

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("graphql")).toBeInTheDocument();
});

async function searchForUsername(username: string, waitForUserInfo = true) {
  // on the Search Page
  userEvent.type(screen.getByPlaceholderText("Username"), username);
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  if (waitForUserInfo) {
    await screen.findByTestId("userInfo");
  }
}

function expectHistoryToEqual(expected: string[]) {
  // on the History Page
  const historyLinks = queryAllByRole(
    screen.getByTestId("historyList"),
    "link"
  );
  const usernames = historyLinks.map((link) => link.textContent || "");
  expect(usernames).toEqual(expected);

  expect(
    screen.queryByText(`History (${expected.length})`)
  ).toBeInTheDocument();
}
