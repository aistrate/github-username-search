import { getByText, queryByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("main menu navigation works correctly", () => {
  render(<App />);

  const menu = screen.getByRole("navigation");
  const contentContainer = screen.getByTestId("contentContainer");

  expect(
    queryByText(contentContainer, /type in a full username/i)
  ).toBeInTheDocument();

  userEvent.click(getByText(menu, /history/i));
  expect(queryByText(contentContainer, /history \(0\)/i)).toBeInTheDocument();

  userEvent.click(getByText(menu, /about/i));
  expect(queryByText(contentContainer, /how to search/i)).toBeInTheDocument();

  userEvent.click(getByText(menu, /search/i));
  expect(
    queryByText(contentContainer, /type in a full username/i)
  ).toBeInTheDocument();
});
