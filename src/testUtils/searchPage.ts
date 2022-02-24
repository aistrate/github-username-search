import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

export async function waitForUserInfo() {
  await screen.findByTestId("userInfo");
}

function usernameInput() {
  return screen.getByPlaceholderText("Username");
}

function searchButton() {
  return screen.getByRole("button", { name: "Search" });
}
