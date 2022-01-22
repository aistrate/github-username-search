import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWrapper } from "../common/testUtils";
import App from "./App";

test.only("main menu navigation works correctly", () => {
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
