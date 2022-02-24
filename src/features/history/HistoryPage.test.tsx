import { getByText, queryAllByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../app/App";
import * as searchPage from "../../testUtils/searchPage";
import { renderWithWrapper } from "../../testUtils/utils";
import { HistoryItem } from "./historySlice";

test("on every successful search, save username to the top of search history", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");
  const searchMenuItem = getByText(menu, "Search");
  const historyMenuItem = getByText(menu, "History");

  userEvent.click(historyMenuItem);
  expectHistoryToEqual([]);

  userEvent.click(searchMenuItem);
  searchPage.searchUsername("reddit");
  await searchPage.waitForUserInfo();

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["reddit"]);

  userEvent.click(searchMenuItem);
  searchPage.searchUsername("graphql");
  await searchPage.waitForUserInfo();

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["graphql", "reddit"]);

  userEvent.click(searchMenuItem);
  searchPage.searchUsername("reddit");
  await searchPage.waitForUserInfo();

  userEvent.click(historyMenuItem);
  expectHistoryToEqual(["reddit", "graphql"]);

  userEvent.click(searchMenuItem);
  searchPage.searchUsername("nonexistent");
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
  searchPage.searchUsername("graphql");
  await searchPage.waitForUserInfo();

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("History (1)")).toBeInTheDocument();

  userEvent.click(screen.getByText("graphql"));
  expect(searchPage.usernameInputValue()).toBe("graphql");

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  expect(repoHeadings.length).toBe(25);
});

test("convert username to lowercase before saving it to search history", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "Search"));
  searchPage.searchUsername("GraphQL"); // capitalized
  await searchPage.waitForUserInfo();

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("GraphQL")).not.toBeInTheDocument();
  expect(screen.queryByText("graphql")).toBeInTheDocument();
});

test("empty History page shows '(empty)'", async () => {
  renderWithWrapper(<App />, "/history");

  expect(screen.queryByText("History (0)")).toBeInTheDocument();
  expect(screen.getByTestId("historyList")).toHaveTextContent("(empty)");
});

test("render the History page with history data (snapshot test)", async () => {
  setHistory([
    { username: "reddit", timestamp: 1643299499644 },
    { username: "graphql", timestamp: 1643299495994 },
  ]);

  const { container } = renderWithWrapper(<App />, "/history");

  expect(container.firstChild).toMatchSnapshot();
});

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

function setHistory(history: HistoryItem[]) {
  window.localStorage.setItem("searchHistory", JSON.stringify(history));
}
