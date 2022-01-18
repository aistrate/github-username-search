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

  userEvent.click(getByText(menu, /history/i));
  expect(queryByText(page, /history \(0\)/i)).toBeInTheDocument();

  userEvent.click(getByText(menu, /about/i));
  expect(queryByText(page, /how to search/i)).toBeInTheDocument();

  userEvent.click(getByText(menu, /search/i));
  expect(queryByRole(page, "button", { name: "Search" })).toBeInTheDocument();
});
