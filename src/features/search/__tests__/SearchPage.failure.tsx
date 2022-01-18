import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

test("non-existing username displays 'not found' message", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "ababab1234");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(
    await screen.findByText(/username 'ababab1234' was not found./i)
  ).toBeInTheDocument();
});

test("hyphens not allowed at beginning or end of search string", async () => {
  renderWithWrapper(<App />);

  userEvent.type(screen.getByPlaceholderText("Username"), "reddit-");
  userEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(
    screen.queryByText(
      /username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen./i
    )
  ).toBeInTheDocument();
});
