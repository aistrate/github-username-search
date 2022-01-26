import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWrapper, RoutingLocation } from "../common/testUtils";
import App from "./App";

test("main menu navigates the pages of the app", () => {
  renderWithWrapper(<App />);

  expect(screen.queryByRole("button", { name: "Search" })).toBeInTheDocument();

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("History (0)")).toBeInTheDocument();

  userEvent.click(getByText(menu, "About"));
  expect(screen.queryByText("How to search")).toBeInTheDocument();

  userEvent.click(getByText(menu, "Search"));
  expect(screen.queryByRole("button", { name: "Search" })).toBeInTheDocument();
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

  const usernameInput = screen.getByPlaceholderText("Username");
  const searchButton = screen.getByRole("button", { name: "Search" });

  userEvent.type(usernameInput, "reddit");
  userEvent.click(searchButton);

  expect(routingLocation()).toBe("/search?username=reddit");
  expect(document.title).toBe("reddit - GitHub Username Search");

  const topPagination = await screen.findByTestId("topPagination");

  // for the rest of this test we will not wait for fetch requests to complete, so as to save on execution time;
  // User and Repos requests will get aborted by the SearchPage on moving to a different user/page
  userEvent.click(getByText(topPagination, /next/i));

  expect(routingLocation()).toBe("/search?username=reddit&page=2");
  expect(document.title).toBe("reddit (page 2) - GitHub Username Search");

  userEvent.click(getByText(topPagination, /previous/i));

  expect(routingLocation()).toBe("/search?username=reddit");
  expect(document.title).toBe("reddit - GitHub Username Search");

  userEvent.clear(usernameInput);
  userEvent.type(usernameInput, "GraphQL"); // capitalized
  userEvent.click(searchButton);

  expect(routingLocation()).toBe("/search?username=graphql");
  expect(document.title).toBe("graphql - GitHub Username Search");
  expect(usernameInput).toHaveValue("graphql");

  userEvent.clear(usernameInput);
  userEvent.type(usernameInput, "nonexistent");
  userEvent.click(searchButton);

  expect(routingLocation()).toBe("/search?username=nonexistent");
  expect(document.title).toBe("nonexistent - GitHub Username Search");
  expect(
    await screen.findByText("Username 'nonexistent' was not found.")
  ).toBeInTheDocument();

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "About"));
  expect(routingLocation()).toBe("/about");
  expect(document.title).toBe("About - GitHub Username Search");

  userEvent.click(getByText(menu, "History"));
  expect(routingLocation()).toBe("/history");
  expect(document.title).toBe("History - GitHub Username Search");

  userEvent.click(screen.getByText("reddit"));
  expect(routingLocation()).toBe("/search?username=reddit");
  expect(document.title).toBe("reddit - GitHub Username Search");
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
  expect(screen.queryByRole("button", { name: "Search" })).toBeInTheDocument();
});

function routingLocation() {
  return screen.getByTestId("routingLocation").textContent || "";
}
