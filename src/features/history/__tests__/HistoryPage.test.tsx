import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../app/App";
import { renderWithWrapper } from "../../../common/testUtils";

test("on search, save username in search history ('happy path' test)", async () => {
  renderWithWrapper(<App />);

  const menu = screen.getByRole("navigation");

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("History (0)")).toBeInTheDocument();

  userEvent.click(getByText(menu, "Search"));
  userEvent.type(screen.getByPlaceholderText("Username"), "reddit{enter}");
  await waitForRepos();

  userEvent.click(getByText(menu, "History"));
  expect(screen.queryByText("History (1)")).toBeInTheDocument();
});

async function waitForRepos() {
  await screen.findAllByRole("heading", { level: 3 });
}
