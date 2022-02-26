import { screen } from "@testing-library/react";
import App from "../../app/App";
import * as historyPage from "../../testUtils/historyPage";
import * as nav from "../../testUtils/nav";
import * as searchPage from "../../testUtils/searchPage";
import { renderWithWrapper } from "../../testUtils/utils";
import { HistoryItem } from "./historySlice";

test("on every successful search, save username to the top of search history", async () => {
  renderWithWrapper(<App />);

  nav.goToHistoryPage();
  expectHistoryToEqual([]);

  nav.goToSearchPage();
  searchPage.searchUsername("reddit");
  await searchPage.waitForUserInfo();

  nav.goToHistoryPage();
  expectHistoryToEqual(["reddit"]);

  nav.goToSearchPage();
  searchPage.searchUsername("graphql");
  await searchPage.waitForUserInfo();

  nav.goToHistoryPage();
  expectHistoryToEqual(["graphql", "reddit"]);

  nav.goToSearchPage();
  searchPage.searchUsername("reddit");
  await searchPage.waitForUserInfo();

  nav.goToHistoryPage();
  expectHistoryToEqual(["reddit", "graphql"]);

  nav.goToSearchPage();
  searchPage.searchUsername("nonexistent");
  expect(
    await screen.findByText("Username 'nonexistent' was not found.")
  ).toBeInTheDocument();

  nav.goToHistoryPage();
  expectHistoryToEqual(["reddit", "graphql"]);
});

test("username on History page links to Search page for that username", async () => {
  renderWithWrapper(<App />);

  nav.goToSearchPage();
  searchPage.searchUsername("graphql");
  await searchPage.waitForUserInfo();

  nav.goToHistoryPage();
  expect(historyPage.headingCount()).toBe(1);

  historyPage.followUsernameLink("graphql");
  expect(searchPage.usernameInputValue()).toBe("graphql");

  const repoHeadings = await screen.findAllByRole("heading", { level: 3 });
  expect(repoHeadings.length).toBe(25);
});

test("convert username to lowercase before saving it to search history", async () => {
  renderWithWrapper(<App />);

  nav.goToSearchPage();
  searchPage.searchUsername("GraphQL"); // capitalized
  await searchPage.waitForUserInfo();

  nav.goToHistoryPage();
  expect(historyPage.historyUsernames()).not.toContain("GraphQL");
  expect(historyPage.historyUsernames()).toContain("graphql");
});

test("empty History page shows '(empty)'", async () => {
  renderWithWrapper(<App />, "/history");

  expect(historyPage.headingCount()).toBe(0);
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
  expect(historyPage.historyUsernames()).toEqual(expected);
  expect(historyPage.headingCount()).toBe(expected.length);
}

function setHistory(history: HistoryItem[]) {
  window.localStorage.setItem("searchHistory", JSON.stringify(history));
}
