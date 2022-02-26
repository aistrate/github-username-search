import { getByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// SearchForm

export function searchUsername(username: string) {
  typeUsername(username);
  userEvent.click(searchButton());
}

export function typeUsername(username: string) {
  userEvent.type(usernameInput(), username);
}

export function clearUsername() {
  userEvent.clear(usernameInput());
}

export function usernameInputValue() {
  return usernameInput().getAttribute("value");
}

export function usernameInputHasFocus() {
  return usernameInput() === document.activeElement;
}

function usernameInput() {
  return screen.getByPlaceholderText("Username");
}

function searchButton() {
  return screen.getByRole("button", { name: "Search" });
}

// UserInfo

export function userInfoText() {
  return userInfo().textContent || "";
}

export async function waitForUserInfo() {
  await screen.findByTestId("userInfo");
}

function userInfo() {
  return screen.getByTestId("userInfo");
}

// Pagination

export function goToNextRepoPage() {
  userEvent.click(getByText(topPagination(), /next/i));
}

export function goToPreviousRepoPage() {
  userEvent.click(getByText(topPagination(), /previous/i));
}

export function paginationText() {
  return topPagination().textContent || "";
}

export async function waitForPaginationControl() {
  await screen.findByTestId("topPagination");
}

function topPagination() {
  return screen.getByTestId("topPagination");
}
