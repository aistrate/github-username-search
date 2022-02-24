import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function goToSearchPage() {
  userEvent.click(getByText(menu(), "Search"));
}

export function goToHistoryPage() {
  userEvent.click(getByText(menu(), "History"));
}

export function goToAboutPage() {
  userEvent.click(getByText(menu(), "About"));
}

function menu() {
  return screen.getByRole("navigation");
}
