import { screen } from "@testing-library/react";
import * as aboutPage from "../testUtils/aboutPage";
import * as historyPage from "../testUtils/historyPage";
import * as nav from "../testUtils/nav";
import * as searchPage from "../testUtils/searchPage";
import { renderWithWrapper, RoutingLocation } from "../testUtils/utils";
import App from "./App";

test("main menu navigates the pages of the app", () => {
  renderWithWrapper(<App />);

  expect(searchPage.isSearchPage()).toBe(true);

  nav.goToHistoryPage();
  expect(historyPage.isHistoryPage()).toBe(true);
  expect(historyPage.headingCount()).toBe(0);

  nav.goToAboutPage();
  expect(aboutPage.isAboutPage()).toBe(true);

  nav.goToSearchPage();
  expect(searchPage.isSearchPage()).toBe(true);
});

test("on navigating around the app, change routing location and document title", async () => {
  renderWithWrapper(
    <>
      <RoutingLocation />
      <App />
    </>
  );

  expect(routingLocation()).toBe("/search");
  expect(document.title).toBe("Search - GitHub Username Search");

  searchPage.searchUsername("reddit");

  expect(routingLocation()).toBe("/search?username=reddit");
  expect(document.title).toBe("reddit - GitHub Username Search");

  await searchPage.waitForPaginationControl();

  // for the rest of this test we will not wait for fetch requests to complete, to keep the test simple;
  // User and Repos requests will get aborted by the SearchPage on moving to a different user/page
  searchPage.goToNextRepoPage();

  expect(routingLocation()).toBe("/search?username=reddit&page=2");
  expect(document.title).toBe("reddit (page 2) - GitHub Username Search");

  searchPage.goToPreviousRepoPage();

  expect(routingLocation()).toBe("/search?username=reddit");
  expect(document.title).toBe("reddit - GitHub Username Search");

  searchPage.clearUsername();
  searchPage.searchUsername("GraphQL"); // capitalized

  expect(routingLocation()).toBe("/search?username=graphql");
  expect(document.title).toBe("graphql - GitHub Username Search");
  expect(searchPage.usernameInputValue()).toBe("graphql");

  searchPage.clearUsername();
  searchPage.searchUsername("nonexistent");

  expect(routingLocation()).toBe("/search?username=nonexistent");
  expect(document.title).toBe("nonexistent - GitHub Username Search");
  expect(
    await screen.findByText("Username 'nonexistent' was not found.")
  ).toBeInTheDocument();

  nav.goToAboutPage();
  expect(routingLocation()).toBe("/about");
  expect(document.title).toBe("About - GitHub Username Search");

  nav.goToHistoryPage();
  expect(routingLocation()).toBe("/history");
  expect(document.title).toBe("History - GitHub Username Search");

  historyPage.followUsernameLink("reddit");
  expect(routingLocation()).toBe("/search?username=reddit");
  expect(document.title).toBe("reddit - GitHub Username Search");
});

test("root route ('/') redirects to the Search page", () => {
  renderWithWrapper(
    <>
      <RoutingLocation />
      <App />
    </>,
    "/"
  );

  expect(routingLocation()).toBe("/search");
  expect(searchPage.isSearchPage()).toBe(true);
});

test("nonexistent route redirects to the Search page", () => {
  renderWithWrapper(
    <>
      <RoutingLocation />
      <App />
    </>,
    "/nonexistent-route"
  );

  expect(routingLocation()).toBe("/search");
  expect(searchPage.isSearchPage()).toBe(true);
});

function routingLocation() {
  return screen.getByTestId("routingLocation").textContent || "";
}
