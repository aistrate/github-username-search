import { queryAllByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function isHistoryPageWithCount(count: number) {
  return screen.queryByText(`History (${count})`) !== null;
}

export function historyUsernames() {
  return historyUsernameLinks().map((link) => link.textContent || "");
}

export function followUsernameLink(username: string) {
  const usernameLink = historyUsernameLinks().find(
    (link) => link.textContent === username
  );

  if (!usernameLink) {
    throw new Error(`Unable to find history link for username: ${username}`);
  }

  userEvent.click(usernameLink);
}

function historyUsernameLinks() {
  return queryAllByRole(screen.getByTestId("historyList"), "link");
}
