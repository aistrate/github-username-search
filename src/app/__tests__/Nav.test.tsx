import {
  getByText,
  queryByRole,
  queryByText,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWrapper } from "../../common/testUtils";
import App from "../App";

test("main menu navigation works correctly", () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");
  const page = screen.getByTestId("pageContainer");

  expect(queryByRole(page, "button", { name: "Search" })).toBeInTheDocument();

  userEvent.click(getByText(menu, "History"));
  expect(queryByText(page, "History (0)")).toBeInTheDocument();

  userEvent.click(getByText(menu, "About"));
  expect(queryByText(page, "How to search")).toBeInTheDocument();

  userEvent.click(getByText(menu, "Search"));
  expect(queryByRole(page, "button", { name: "Search" })).toBeInTheDocument();
});
